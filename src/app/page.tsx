"use client";
import Header from "@/components/header/header";
import HarvestCard from "../components/cards/HarvestCard";
import HoldingsTable from "@/components/table/holdingsTable";
import { getCapitalGains, getHoldings } from "@/services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [holdings, setHoldings] = useState<any[]>([]);
  const [gains, setGains] = useState<any>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {

      try {
        const h = await getHoldings();
        const g = await getCapitalGains();
  
           setHoldings(h as any[]);
           setGains(g);
      } catch (error) {
        setError("Failed to load data. Please try again.")
      }
    };

    fetchData();
  }, []);

if (error) {
  return (
    <main className="p-6 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-red-500 font-medium">
         {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
        >
          Retry
        </button>
      </div>
    </main>
  )
}


 if (!gains) {
  return (
    <main className="p-6 min-h-screen flex flex-col max-w-[1400px] mx-auto animate-pulse">
      
      {/* Header skeleton */}
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6" />

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="h-50 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="h-50 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>

      {/* Table skeleton */}
      <div className="bg-gray-200 dark:bg-gray-800 rounded-xl h-[300px]" />
    </main>
  )
}

  const computeUpdatedGains = () => {
    const updated = JSON.parse(JSON.stringify(gains));

    holdings.forEach((h) => {
      if (!selected.includes(h.coin)) return;

      // STCG
      if (h.stcg.gain > 0) {
        updated.stcg.profits += h.stcg.gain;
      } else {
        updated.stcg.losses += Math.abs(h.stcg.gain);
      }

      // LTCG    
      if (h.ltcg.gain > 0) {
        updated.ltcg.profits += h.ltcg.gain;
      } else {
        updated.ltcg.losses += Math.abs(h.ltcg.gain);
      }
    });

    return updated;
  };

  const preStcgNet = gains.stcg.profits - gains.stcg.losses;
  const preLtcgNet = gains.ltcg.profits - gains.ltcg.losses;

  const preRealised = preStcgNet + preLtcgNet;
      
  const updated = computeUpdatedGains();

  const postStcgNet = updated.stcg.profits - updated.stcg.losses;
  const postLtcgNet = updated.ltcg.profits - updated.ltcg.losses;

  const postRealised = postStcgNet + postLtcgNet;

  const savings = preRealised - postRealised;
  const showSavings = postRealised < preRealised;

  return (
    <main className="p-6  min-h-screen flex flex-col max-w-[1400px] mx-auto">
      <Header />
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
