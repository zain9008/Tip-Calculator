"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Receipt, UserCheck } from "lucide-react";
import { type CalculationResult, formatCurrency } from "@/lib/calculate";

interface Props {
  result: CalculationResult | null;
}

function AnimatedValue({ value }: { value: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="tabular-nums"
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
    <div className="flex flex-col gap-4">
      {/* Tip Amount */}
      <div className="bg-[#0c1828] rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Tip Amount
            </p>
            <p className="text-xs text-slate-600 mt-0.5">per bill total</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-white font-mono flex-shrink-0">
          <AnimatedValue value={tipAmount} />
        </div>
      </div>

      {/* Grand Total */}
      <div className="bg-[#0c1828] rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
            <Receipt className="w-4 h-4 text-slate-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Total
            </p>
            <p className="text-xs text-slate-600 mt-0.5">bill + tip</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-white font-mono flex-shrink-0">
          <AnimatedValue value={total} />
        </div>
      </div>

      {/* Per Person — highlighted */}
      <div className="bg-[#0e1a0f] rounded-2xl p-6 border border-amber-500/25 flex items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-transparent pointer-events-none" />

        <div className="flex items-center gap-3 min-w-0 relative">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">
              Per Person
            </p>
            <p className="text-xs text-amber-400/40 mt-0.5">each owes</p>
          </div>
        </div>
        <div className="text-3xl font-bold text-amber-400 font-mono flex-shrink-0 relative">
          <AnimatedValue value={perPerson} />
        </div>
      </div>
    </div>
  );
}
