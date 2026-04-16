"use client"

type Props = {
  item: any
  checked: boolean
  onToggle: (coin: string) => void
}

export default function HoldingRow({ item, checked, onToggle }: Props) {
  const gainColor = (value: number) =>
    value > 0 ? "text-green-400" : value < 0 ? "text-red-400" : ""

  return (
    <tr className="border-t border-gray-800 hover:bg-gray-900 transition">
      {/* Checkbox */}
      <td className="p-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.coin)}
        />
      </td>

      {/* Asset */}
      <td className="p-2 flex items-center gap-2">
        <img src={item.logo} className="w-6 h-6" />
        <div>
          <p>{item.coin}</p>
          <p className="text-xs text-gray-400">{item.coinName}</p>
        </div>
      </td>

      {/* Holdings */}
      <td className="p-2">
        <p>{item.totalHolding.toFixed(4)}</p>
        <p className="text-xs text-gray-400">
          ₹{item.averageBuyPrice.toFixed(2)}
        </p>
      </td>

      {/* Current Price */}
      <td className="p-2">₹{item.currentPrice.toLocaleString()}</td>

      {/* STCG */}
      <td className={`p-2 ${gainColor(item.stcg.gain)}`}>
        ₹{item.stcg.gain.toFixed(2)}
      </td>

      {/* LTCG */}
      <td className={`p-2 ${gainColor(item.ltcg.gain)}`}>
        ₹{item.ltcg.gain.toFixed(2)}
      </td>

      {/* Amount to Sell */}
      <td className="p-2">
        {checked ? item.totalHolding.toFixed(4) : "-"}
      </td>
    </tr>
  )
}