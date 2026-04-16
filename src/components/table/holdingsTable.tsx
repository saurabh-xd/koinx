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
    <div className="bg-card p-4 rounded-xl mt-6">
      <h2 className="text-lg font-semibold mb-4">Holdings</h2>

      {/* SCROLL FIX */}
      <div className="max-h-[400px] overflow-y-auto rounded-lg ">
       <Table className="table-fixed">
  {/* HEADER */}
  <TableHeader>
    <TableRow>
      <TableHead>
        <input
          type="checkbox"
          checked={selected.length === holdings.length}
          onChange={toggleAll}
        />
      </TableHead>
      <TableHead className="w-[200px]">Asset</TableHead>
      <TableHead>Holdings</TableHead>
      <TableHead>Total current Value</TableHead>

      <TableHead  onClick={toggleSort}
  className="cursor-pointer select-none flex items-center gap-1"
  >
      Short-Term
  {sortOrder === "asc" ? (
    <ArrowUp  />
  ) : (
    <ArrowDown  />
  )}
     </TableHead>

      <TableHead>Long-term</TableHead>
      <TableHead>Amount to Sell</TableHead>
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
            isChecked ? "bg-blue-100 hover:bg-blue-100" : ""
          }`}
        >
          {/* Checkbox */}
          <TableCell>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggle(item.coin)}
            />
          </TableCell>

          {/* Asset */}
          <TableCell className="flex items-center gap-2">
            <img src={item.logo} className="w-6 h-6" />
            <div>
              <p>{item.coin}</p>
              <p className="text-xs text-gray-400  truncate max-w-[120px]">
                {item.coinName}
              </p>
            </div>
          </TableCell>

          {/* Holdings */}
          <TableCell>
            <p>{item.totalHolding.toFixed(4)}</p>
            <p className="text-xs text-gray-400">
              ${item.averageBuyPrice.toFixed(2)}
            </p>
          </TableCell>

          {/* Total Value */}
          <TableCell>
            $
            {(item.totalHolding * item.currentPrice).toLocaleString()}
          </TableCell>

          {/* STCG */}
          <TableCell
            className={
              item.stcg.gain > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            ${item.stcg.gain.toFixed(2)}
            <p className="text-xs text-gray-400">
              {item.stcg.balance.toFixed(4)}
            </p>
          </TableCell>

          {/* LTCG */}
          <TableCell
            className={
              item.ltcg.gain > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            ${item.ltcg.gain.toFixed(2)}
            <p className="text-xs text-gray-400">
              {item.ltcg.balance.toFixed(4)}
            </p>
          </TableCell>

          {/* Amount to Sell */}
          <TableCell>
            {isChecked
              ? item.totalHolding.toFixed(4)
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