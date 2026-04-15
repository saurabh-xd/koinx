"use client"
import HarvestCard from "../components/cards/HarvestCard";
import Header from "@/components/header";



export default function Home() {

 const data = {
    stcg: {
      profits: 70200.88,
      losses: 1548.53,
    },
    ltcg: {
      profits: 5020,
      losses: 3050,
    },
  }

  

  return (
   <main className="p-6 mx-16 min-h-screen">

    <Header/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pre Harvest */}
        <HarvestCard
          title="Pre Harvesting"
          stcg={data.stcg}
          ltcg={data.ltcg}
        />

        {/* After Harvest */}
        <HarvestCard
          title="After Harvesting"
          stcg={data.stcg}
          ltcg={data.ltcg}
          highlight
        />
      </div>

     
    </main>
  );
}
