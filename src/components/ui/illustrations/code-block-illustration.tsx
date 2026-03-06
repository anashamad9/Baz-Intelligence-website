'use client'
import React from 'react'
import CodeBlock from "@/components/code-block"
import { Braces } from 'lucide-react'

const RESPONSE_JSON = `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Load training data
df = pd.read_csv("housing.csv")
X = df[["sqft", "bedrooms", "bathrooms", "zipcode_score"]]
y = df["price"]

# Train / validation split
X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(
    n_estimators=300,
    max_depth=12,
    random_state=42,
    n_jobs=-1
)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_val)
mae = mean_absolute_error(y_val, preds)
print(f"Validation MAE: \${mae:,.2f}")

# Inference example
sample = pd.DataFrame([{
    "sqft": 1850,
    "bedrooms": 3,
    "bathrooms": 2,
    "zipcode_score": 8.7
}])
pred_price = model.predict(sample)[0]
print(f"Predicted price: \${pred_price:,.0f}")`

export default function CodeBlockIllustration() {
    return (
        <div className="bg-card shadow-black/6.5 relative z-10 overflow-hidden rounded-2xl border border-black/10 px-1 pb-1 shadow-lg backdrop-blur">
            <div className="relative h-10">
                <div className="flex h-full items-center gap-1">
                    <button className="text-foreground/75 relative z-10 flex h-8 items-center gap-1.5 rounded-lg px-3 font-mono text-xs outline-none first:rounded-tl-xl">
                        <Braces className="size-3 text-amber-600" />
                        ml_model.py
                    </button>
                </div>
                <div className="bg-card absolute -bottom-px left-4 top-1 w-[153px] rounded-t-xl border-x border-t border-black/10">
                    <div className="bg-card absolute -right-4 bottom-0 size-4">
                        <div className="bg-card absolute inset-0 rounded-bl-xl border-b border-l border-black/10"></div>
                    </div>
                </div>
            </div>

            <div className="h-96 rounded-xl border border-black/20 bg-[#101114]">
                <div className="mask-y-from-80% scheme-dark h-full overflow-auto">
                    <CodeBlock
                        code={RESPONSE_JSON}
                        lang="python"
                        theme="dark"
                        maxHeight={360}
                        lineNumbers
                        className="-mx-1 [&_pre]:h-fit [&_pre]:min-h-[12rem] [&_pre]:rounded-xl [&_pre]:border-none [&_pre]:!bg-transparent [&_pre]:pb-0"
                    />
                </div>
            </div>
        </div>
    )
}
