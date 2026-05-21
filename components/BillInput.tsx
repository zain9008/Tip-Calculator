"use client";

import { DollarSign, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export default function BillInput({ value, onChange, error }: Props) {
  return (
    <div className="p-5">
      <label
        htmlFor="bill"
        className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2.5"
      >
        Bill Amount
      </label>

      <div
        className={`flex items-center gap-3 bg-[#0a1421] rounded-xl px-4 py-3.5 border transition-all duration-200 ${
          error
            ? "border-red-500/40 bg-red-950/10"
            : "border-white/[0.06] focus-within:border-teal-500/40 focus-within:bg-[#0b1928]"
        }`}
      >
        <DollarSign
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            error ? "text-red-400/60" : "text-teal-400/70"
          }`}
        />
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
          className="flex-1 bg-transparent text-lg font-semibold text-white placeholder:text-slate-700 outline-none min-w-0 tabular-nums"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id="bill-error"
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-red-400 text-xs font-medium overflow-hidden"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
