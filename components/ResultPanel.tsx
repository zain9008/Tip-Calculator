"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type CalculationResult, formatCurrency } from "@/lib/calculate";

interface Props {
  result: CalculationResult | null;
}

function AnimatedValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function ResultPanel({ result }: Props) {
  const tipAmount = result ? formatCurrency(result.tipAmount) : "$0.00";
  const total = result ? formatCurrency(result.total) : "$0.00";
  const perPerson = result ? formatCurrency(result.perPerson) : "$0.00";

  return (
    <div className="bg-[#0c1828] rounded-2xl border border-white/[0.06] overflow-hidden">
      {/* Label */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
          Results
        </p>
      </div>

      {/* Tip row */}
      <div className="px-5 pb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300 leading-none mb-1">Tip amount</p>
          <p className="text-[11px] text-slate-600">on the full bill</p>
        </div>
        <div className="text-xl font-bold text-white tabular-nums font-mono flex-shrink-0">
          <AnimatedValue value={tipAmount} />
        </div>
      </div>

      <div className="h-px bg-white/[0.04] mx-5" />

      {/* Total row */}
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300 leading-none mb-1">Grand total</p>
          <p className="text-[11px] text-slate-600">bill + tip</p>
        </div>
        <div className="text-xl font-bold text-white tabular-nums font-mono flex-shrink-0">
          <AnimatedValue value={total} />
        </div>
      </div>

      {/* Per person — prominent bottom section */}
      <div className="border-t border-amber-500/[0.15] bg-gradient-to-b from-amber-500/[0.06] to-transparent px-5 py-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-amber-400/60 mb-3">
          Each person owes
        </p>
        <div className="flex items-end justify-between gap-3 min-w-0">
          <div className="text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums font-mono leading-none min-w-0 break-all">
            <AnimatedValue value={perPerson} />
          </div>
          {result ? (
            <p className="text-[11px] text-slate-600 text-right leading-relaxed pb-0.5 flex-shrink-0">
              {formatCurrency(result.total)}
              <br />
              divided by {result.people}
            </p>
          ) : (
            <p className="text-[11px] text-slate-700 text-right leading-relaxed pb-0.5 flex-shrink-0">
              enter bill
              <br />
              and tip above
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
