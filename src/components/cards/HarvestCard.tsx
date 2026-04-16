"use client";

import { Card, CardContent } from "@/components/ui/card";

type Gains = {
  profits: number;
  losses: number;
};

type Props = {
  title: string;
  stcg: Gains;
  ltcg: Gains;
  highlight?: boolean;
  showSavings?: boolean;
  savings?: number;
};

const format = (num: number) =>
  `$${Math.abs(num).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;

const signed = (num: number) => (num < 0 ? `- ${format(num)}` : format(num));

export default function HarvestCard({
  title,
  stcg,
  ltcg,
  highlight = false,
  showSavings = false,
  savings = 0,
}: Props) {
  const stcgNet = stcg.profits - stcg.losses;
  const ltcgNet = ltcg.profits - ltcg.losses;
  const realised = stcgNet + ltcgNet;

  return (
    <Card
      className={`rounded-xl p-5 ${
        highlight ?
          "bg-gradient-to-r from-[#3C9AFF] to-[#0066FE] text-white"
        : "bg-card "
      }`}
    >
      <CardContent className="p-0 space-y-4">
       
        <h2 className="md:text-xl text-lg font-semibold">{title}</h2>

      
        <div className="grid grid-cols-[2fr_1fr_1fr] items-center mb-2 text-sm md:text-base">
          <span></span>
          <span className="text-right pr-4 whitespace-nowrap">Short-term</span>
          <span className="text-right">Long-term</span>
        </div>

       
        <Row label="Profits" stcg={stcg.profits} ltcg={ltcg.profits} />

        
        <Row label="Losses" stcg={-stcg.losses} ltcg={-ltcg.losses} />

      
        <Row label="Net Capital Gains" stcg={stcgNet} ltcg={ltcgNet} bold />

       
        <div className="  pt-3">
        
          <div className="flex items-center gap-5 md:gap-7">
            <span className="md:text-xl text-base font-bold whitespace-nowrap">
              {highlight ?
                "Effective Capital Gains:"
              : "Realised Capital Gains:"}
            </span>

            <span className="md:text-2xl text-lg font-semibold ">{signed(realised)}</span>
          </div>

          {highlight && showSavings && (
            <p className="text-sm mt-7">
              🎉 You are going to save upto{" "}
              <span className="text-bold text-base">{format(savings)}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  stcg,
  ltcg,
  bold = false,
}: {
  label: string;
  stcg: number;
  ltcg: number;
  bold?: boolean;
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm py-1">
      <span>{label}</span>

      <span className={`text-right text-nowrap pr-4 ${bold ? "font-semibold" : ""}`}>
        {formatWithSign(stcg)}
      </span>

      <span className={`text-right ${bold ? "font-semibold" : ""}`}>
        {formatWithSign(ltcg)}
      </span>
    </div>
  );
}

function formatWithSign(num: number) {
  return num < 0 ?
      `- $${Math.abs(num).toLocaleString("en-US")}`
    : `$${num.toLocaleString("en-US")}`;
}
