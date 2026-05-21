import TipCalculator from "@/components/TipCalculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060d18] flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-3xl">
        <TipCalculator />
      </div>
    </main>
  );
}
