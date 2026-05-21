"use client";

import { DollarSign } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export default function BillInput({ value, onChange, error }: Props) {
  return (
    <div className="bg-[#0c1828] rounded-2xl p-5 border border-white/5">
      <label
        htmlFor="bill"
        className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3"
      >
        Bill Amount
      </label>

      <div
        className={`flex items-center gap-3 bg-[#111f32] rounded-xl px-4 py-3.5 border transition-all duration-200 ${
          error
            ? "border-red-500/60 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
            : "border-white/5 focus-within:border-teal-500/50 focus-within:shadow-[0_0_0_1px_rgba(20,184,166,0.15)]"
        }`}
      >
        <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
          <DollarSign className="w-4 h-4 text-teal-400" strokeWidth={2.5} />
        </div>
        <input
          id="bill"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={error ? "bill-error" : undefined}
          aria-invalid={!!error}
          className="flex-1 bg-transparent text-white text-xl font-semibold placeholder:text-slate-700 outline-none w-full min-w-0"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id="bill-error"
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-red-400 text-xs font-medium overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
