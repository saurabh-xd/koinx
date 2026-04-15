import React from 'react'

export default function PreHarvestCard() {
  return (
    <div className="bg-[#111] p-5 rounded-xl space-y-3">
  <h2 className="text-lg font-semibold">Pre Harvesting</h2>

  <div className="space-y-2">
    <CardRow label="Profits" value="$4000" />
    <CardRow label="Losses" value="$2000" />
    <CardRow label="Net Capital Gains" value="$2000" />
  </div>

  <div className="pt-3 border-t border-gray-700 text-lg font-semibold">
    Realised Capital Gains: $2000
  </div>
</div>
  )
}
