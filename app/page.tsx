import TipCalculator from "@/components/TipCalculator";

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-4xl">
        <TipCalculator />
      </div>
    </main>
  );
}
