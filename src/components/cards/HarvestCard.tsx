"use client"

import { Card, CardContent } from "@/components/ui/card"

type Gains = {
  profits: number
  losses: number
}

type Props = {
  title: string
  stcg: Gains
  ltcg: Gains
  highlight?: boolean
  showSavings?: boolean
  savings?: number
}

const format = (num: number) =>
  `$${Math.abs(num).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`

const signed = (num: number) =>
  num < 0 ? `- ${format(num)}` : format(num)

export default function HarvestCard({
  title,
  stcg,
  ltcg,
  highlight = false,
  showSavings = false,
  savings = 0,
}: Props) {
  const stcgNet = stcg.profits - stcg.losses
  const ltcgNet = ltcg.profits - ltcg.losses
  const realised = stcgNet + ltcgNet

  return (
    <Card
      className={`rounded-xl p-5 ${
        highlight
          ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
          : "bg-card "
      }`}
    >
      <CardContent className="p-0 space-y-4">
        
        {/* Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Header row */}
        <div className="grid grid-cols-3 text-sm">
          <span></span>
          <span>Short-term</span>
          <span>Long-term</span>
        </div>

        {/* Profits */}
        <Row
          label="Profits"
          stcg={stcg.profits}
          ltcg={ltcg.profits}
        />

        {/* Losses */}
        <Row
          label="Losses"
          stcg={-stcg.losses}
          ltcg={-ltcg.losses}
        />

        {/* Net */}
        <Row
          label="Net Capital Gains"
          stcg={stcgNet}
          ltcg={ltcgNet}
          bold
        />

        {/* Divider */}
        <div className="  pt-3">

          {/* Total */}
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold ">
              {highlight
                ? "Effective Capital Gains:"
                : "Realised Capital Gains:"}
            </span>

            <span className="text-xl font-semibold">
              {signed(realised)}
            </span>
          </div>

          {/* Savings */}
         {highlight && showSavings && (
            <p className="text-sm mt-7">
              🎉 You are going to save upto <span className="text-bold">{format(savings)}</span> 
            </p>
         )}
        </div>
      </CardContent>
    </Card>
  )
}

function Row({
  label,
  stcg,
  ltcg,
  bold = false,
}: {
  label: string
  stcg: number
  ltcg: number
  bold?: boolean
}) {
  return (
    <div className="grid grid-cols-3 text-sm">
      <span className="">{label}</span>

      <span className={bold ? "font-semibold" : ""}>
        {formatWithSign(stcg)}
      </span>

      <span className={bold ? "font-semibold" : ""}>
        {formatWithSign(ltcg)}
      </span>
    </div>
  )
}

function formatWithSign(num: number) {
  return num < 0
    ? `- $${Math.abs(num).toLocaleString("en-US")}`
    : `$${num.toLocaleString("en-US")}`
}