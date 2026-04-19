import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type Language = 'en' | 'ar'

type AvatarPerson = {
  src?: string
  fallback: string
  name: Record<Language, string>
}

const avatars: AvatarPerson[] = [
  {
    src: '/avatars/anas-hamad.png',
    fallback: 'AH',
    name: {
      en: 'Anas Hamad',
      ar: 'أنس حمد'
    }
  },
  {
    src: '/avatars/mohammad-doleh.png',
    fallback: 'MD',
    name: {
      en: 'Mohammad Doleh',
      ar: 'محمد دوله'
    }
  }
]

const AvatarGroupTooltipDemo = ({ language = 'en', tooltipClassName }: { language?: Language; tooltipClassName?: string }) => {
  return (
    <div className='flex -space-x-2'>
      {avatars.map((avatar, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Avatar className='rounded-md border-[1px] border-zinc-200/70 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md'>
              {avatar.src ? (
                <AvatarImage
                  src={avatar.src}
                  alt={avatar.name[language]}
                  loading='eager'
                  decoding='async'
                  className='rounded-md object-cover'
                />
              ) : null}
              <AvatarFallback className='rounded-md text-xs'>{avatar.fallback}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className={tooltipClassName}>{avatar.name[language]}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export default AvatarGroupTooltipDemo
