import Image from "next/image";

export default function Home() {
  return (
     <main className="p-6 bg-black min-h-screen text-white">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#111] p-4 rounded-xl">
          Pre Harvesting
        </div>

        <div className="bg-blue-600 p-4 rounded-xl">
          After Harvesting
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111] p-4 rounded-xl">
        Holdings Table
      </div>
    </main>
  );
}
