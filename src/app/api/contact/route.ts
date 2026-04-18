import { createSign } from 'node:crypto'
import { NextResponse } from 'next/server'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'
const GOOGLE_SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets'

type ContactSubmission = {
  language: 'en' | 'ar'
  intent: 'learn' | 'know'
  fullName: string
  companyName: string
  role: string
  roleElse: string
  employees: string
  email: string
  phoneCode: string
  phone: string
  country: string
  details: string
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

function encodeBase64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function createJwt(serviceAccountEmail: string, rawPrivateKey: string): string {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: serviceAccountEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }
  const unsignedToken = `${encodeBase64Url(JSON.stringify(header))}.${encodeBase64Url(JSON.stringify(payload))}`
  const privateKey = rawPrivateKey.replace(/\\n/g, '\n')
  const signer = createSign('RSA-SHA256')
  signer.update(unsignedToken)
  signer.end()
  const signature = signer.sign(privateKey)

  return `${unsignedToken}.${encodeBase64Url(signature)}`
}

async function getGoogleAccessToken(): Promise<string> {
  const serviceAccountEmail = getRequiredEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL')
  const privateKey = getRequiredEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY')
  const assertion = createJwt(serviceAccountEmail, privateKey)

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  })

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Google token request failed (${tokenResponse.status}): ${errorText}`)
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string }
  if (!tokenData.access_token) {
    throw new Error('Google token response did not include access_token')
  }

  return tokenData.access_token
}

function validateSubmission(input: unknown): ContactSubmission {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid payload')
  }
  const data = input as Record<string, unknown>
  const requiredFields: Array<keyof ContactSubmission> = [
    'language',
    'intent',
    'fullName',
    'companyName',
    'role',
    'employees',
    'email',
    'phoneCode',
    'phone',
    'country',
  ]

  for (const field of requiredFields) {
    const value = data[field]
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error(`Missing required field: ${field}`)
    }
  }

  const language = data.language as string
  const intent = data.intent as string
  if (language !== 'en' && language !== 'ar') {
    throw new Error('Invalid language')
  }
  if (intent !== 'learn' && intent !== 'know') {
    throw new Error('Invalid intent')
  }

  const submission: ContactSubmission = {
    language,
    intent,
    fullName: (data.fullName as string).trim(),
    companyName: (data.companyName as string).trim(),
    role: (data.role as string).trim(),
    roleElse: typeof data.roleElse === 'string' ? data.roleElse.trim() : '',
    employees: (data.employees as string).trim(),
    email: (data.email as string).trim(),
    phoneCode: (data.phoneCode as string).trim(),
    phone: (data.phone as string).trim(),
    country: (data.country as string).trim(),
    details: typeof data.details === 'string' ? data.details.trim() : '',
  }

  return submission
}

async function appendToSheet(submission: ContactSubmission, userAgent: string) {
  const spreadsheetId = getRequiredEnv('GOOGLE_SHEETS_SPREADSHEET_ID')
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Form Responses 1'
  const range = encodeURIComponent(`${sheetName}!A:Z`)
  const accessToken = await getGoogleAccessToken()
  const [phoneCountryCode = '', phoneDialCode = ''] = submission.phoneCode.split(':')

  const values = [
    [
      new Date().toISOString(),
      submission.language,
      submission.intent,
      submission.fullName,
      submission.companyName,
      submission.role,
      submission.roleElse,
      submission.employees,
      submission.email,
      phoneCountryCode,
      phoneDialCode,
      submission.phone,
      submission.country,
      submission.details,
      userAgent,
    ],
  ]

  const appendUrl = `${GOOGLE_SHEETS_API_BASE}/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const appendResponse = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
    cache: 'no-store',
  })

  if (!appendResponse.ok) {
    const errorText = await appendResponse.text()
    throw new Error(`Google Sheets append failed (${appendResponse.status}): ${errorText}`)
  }
}

export async function POST(request: Request) {
  try {
    const payload = validateSubmission(await request.json())
    await appendToSheet(payload, request.headers.get('user-agent') || '')
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to save submission' },
      { status: 500 },
    )
  }
}

