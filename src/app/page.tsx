"use client"
import HarvestCard from "../components/cards/HarvestCard";
import Header from "@/components/header";
import HoldingsTable from "@/components/table/holdingsTable";
import { getCapitalGains, getHoldings } from "@/services/api";
import { useEffect, useState } from "react";

export default function Home() {


  const [holdings, setHoldings] = useState<any[]>([]) //list of assets (coins)
  const [gains, setGains] = useState<any>(null)   //current profit/loss summary
  const [selected, setSelected] = useState<string[]>([]) //what user selected

  useEffect(() => {
    const fetchData = async () => {                  // when app opens-
      const h = await getHoldings()                  // get all assests
      const g = await getCapitalGains()              // get current gains

      setHoldings(h as any[])
      setGains(g)
    }

    fetchData()
  }, [])

  if (!gains) return <p className="text-white p-6">Loading...</p>

  const computeUpdatedGains = () => {
  const updated = JSON.parse(JSON.stringify(gains)) // ✅ FIX

  holdings.forEach((h) => {
    if (!selected.includes(h.coin)) return

    // STCG
    if (h.stcg.gain > 0) {
      updated.stcg.profits += h.stcg.gain
    } else {
      updated.stcg.losses += Math.abs(h.stcg.gain)
    }

    // LTCG
    if (h.ltcg.gain > 0) {
      updated.ltcg.profits += h.ltcg.gain
    } else {
      updated.ltcg.losses += Math.abs(h.ltcg.gain)
    }
  })

  return updated
}

const preStcgNet = gains.stcg.profits - gains.stcg.losses
const preLtcgNet = gains.ltcg.profits - gains.ltcg.losses

const preRealised = preStcgNet + preLtcgNet

const updated = computeUpdatedGains()

const postStcgNet =
  updated.stcg.profits - updated.stcg.losses

const postLtcgNet =
  updated.ltcg.profits - updated.ltcg.losses

const postRealised = postStcgNet + postLtcgNet

const savings = preRealised - postRealised
const showSavings = postRealised < preRealised

  return (
   <main className="p-6  min-h-screen flex flex-col max-w-[1400px] mx-auto">

    <Header/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    
       <HarvestCard
        title="Pre Harvesting"
        stcg={gains.stcg}   
        ltcg={gains.ltcg}
      />

      
      <HarvestCard
        title="After Harvesting"
        stcg={updated.stcg}   
        ltcg={updated.ltcg}
        highlight
        showSavings={showSavings}  
        savings={savings}           
      />
      </div>

       <HoldingsTable
      holdings={holdings}   
      selected={selected}
      setSelected={setSelected}
    />
    </main>
  );
}
