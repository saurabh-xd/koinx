"use client"

import { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDown, ArrowUp } from "@phosphor-icons/react"

type Props = {
  holdings: any[]
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export default function HoldingsTable({
  holdings,
  selected,
  setSelected,
}: Props) {
  
  const [showAll, setShowAll] = useState(false)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const toggleSort = () => {
  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
}

  const toggle = (coin: string) => {
    setSelected((prev) =>
      prev.includes(coin)
        ? prev.filter((c) => c !== coin)
        : [...prev, coin]
    )
  }

  const toggleAll = () => {
    if (selected.length === holdings.length) {
      setSelected([])
    } else {
      setSelected(holdings.map((h) => h.coin))
    }
  }

  const gainColor = (value: number) =>
    value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : ""

 const sortedHoldings = useMemo(() => {
  return [...holdings].sort((a, b) => {
    return sortOrder === "asc"
      ? a.stcg.gain - b.stcg.gain
      : b.stcg.gain - a.stcg.gain
  })
}, [holdings, sortOrder])

const visibleHoldings = showAll
  ? sortedHoldings
  : sortedHoldings.slice(0, 4)
  return (
    <div className="bg-card dark:bg-[#171A26] p-4 rounded-xl mt-6 shadow-[0px_2px_16px_rgba(25,40,57,0.09)]">
      <h2 className="text-lg font-semibold mb-4">Holdings</h2>

      
      <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded-lg">
      <Table className="min-w-[800px] table-fixed">
  {/* HEADER */}
  <TableHeader className="bg-[#F1F5F9] dark:bg-[#0A0A12]">
    <TableRow>
      <TableHead className="w-[40px] text-center">
        <input
          type="checkbox"
          checked={selected.length === holdings.length}
          onChange={toggleAll}
          className="cursor-pointer"
        />
      </TableHead>
      <TableHead className="w-[200px] px-3 text-sm font-semibold">Asset</TableHead>
      <TableHead>
  <div className="flex flex-col ">
    <span className="text-sm font-semibold">Holdings</span>
    <span className="text-[11px] text-[#64748B] mt-1">
      Current Market Rate
    </span>
  </div>
</TableHead>
      <TableHead className="text-sm font-semibold  truncate">Total current Value</TableHead>

      <TableHead  onClick={toggleSort}
  className="cursor-pointer select-none flex items-center gap-1 text-sm font-semibold"
  >
      Short-Term
  {sortOrder === "asc" ? (
    <ArrowUp  />
  ) : (
    <ArrowDown  />
  )}
     </TableHead>

      <TableHead className="text-sm font-semibold">Long-term</TableHead>
      <TableHead className="text-sm font-semibold">Amount to Sell</TableHead>
    </TableRow>
  </TableHeader>

  {/* BODY */}
  <TableBody>
    {visibleHoldings.map((item, idx) => {
      const isChecked = selected.includes(item.coin)

      return (
        <TableRow
          key={`${item.coin}-${idx}`}
          className={`cursor-pointer ${
            isChecked ? "bg-[#EAF2FF] hover:bg-[#DBE2EC] dark:bg-[#121D3A]" : ""
          }`}
        >
          {/* Checkbox */}
          <TableCell className="w-[40px] pr-3 text-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggle(item.coin)}
              className="cursor-pointer"
            />
          </TableCell>

          {/* Asset */}
          <TableCell className="flex items-center gap-2">
            <img src={item.logo} className="w-6 h-6" />
            <div>
              <p className="truncate max-w-[85px] text-base">{item.coinName}</p>
              <p className="text-xs ">
                {item.coin}
              </p>
            </div>
          </TableCell>

          {/* Holdings */}
          <TableCell>
            <p className="text-sm truncate">{item.totalHolding.toFixed(4)} {item.coin}</p>
            <p className="text-xs text-[#64748B]">
              ${item.averageBuyPrice.toFixed(2)}
            </p>
          </TableCell>

          {/* Total Value */}
          <TableCell className="text-sm">
            $
            {(item.totalHolding * item.currentPrice).toLocaleString()}
          </TableCell>

          {/* STCG */}
          <TableCell
            className={
              item.stcg.gain > 0
                ? "text-green-500 text-sm"
                : "text-red-500 text-sm"
            }
          >
            ${item.stcg.gain.toFixed(2)} 
            <p className="text-xs text-[#64748B]">
              {item.stcg.balance.toFixed(4)} {item.coin}
            </p>
          </TableCell>

          {/* LTCG */}
          <TableCell
            className={
              item.ltcg.gain > 0
                ? "text-green-500 text-sm"
                : "text-red-500 text-sm"
            }
          >
            ${item.ltcg.gain.toFixed(2)}
            <p className="text-xs text-gray-400">
              {item.ltcg.balance.toFixed(4)} {item.coin}
            </p>
          </TableCell>

          {/* Amount to Sell */}
          <TableCell className="text-sm">
            {isChecked
              ? `${item.totalHolding.toFixed(4)} ${item.coin} `
              : "-"}
          </TableCell>
        </TableRow>
      )
    })}
  </TableBody>
</Table>
      </div>

      {/* View all */}
      <p 
      onClick={() => setShowAll((prev) => !prev)}
      className="text-[#0052FE] text-sm mt-3 cursor-pointer underline">
         {showAll ? "Show less" : "View all"}
      </p>
    </div>
  )
}