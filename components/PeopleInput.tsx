"use client";

import { Minus, Plus, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export default function PeopleInput({ value, onChange, error }: Props) {
  const count = parseInt(value) || 0;

  return (
    <div className="p-5">
      <label
        htmlFor="people"
        className="block text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2.5"
      >
        Split Between
      </label>

      <div
        className={`flex items-center bg-[#0a1421] rounded-xl border transition-all duration-200 overflow-hidden ${
          error ? "border-red-500/40 bg-red-950/10" : "border-white/[0.06]"
        }`}
      >
        <motion.button
          type="button"
          onClick={() => count > 1 && onChange(String(count - 1))}
          whileTap={{ scale: 0.9 }}
          disabled={count <= 1}
          aria-label="Decrease number of people"
          className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-teal-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-r border-white/[0.06] flex-shrink-0"
        >
          <Minus className="w-4 h-4" />
        </motion.button>

        <div className="flex-1 flex items-center justify-center gap-2 py-2.5">
          <input
            id="people"
            type="number"
            inputMode="numeric"
            min="1"
            placeholder="1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={error ? "people-error" : undefined}
            aria-invalid={!!error}
            className="w-12 bg-transparent text-xl font-bold text-white text-center placeholder:text-slate-700 outline-none tabular-nums"
          />
          <span className="text-sm text-slate-500">
            {count === 1 ? "person" : "people"}
          </span>
        </div>

        <motion.button
          type="button"
          onClick={() => onChange(String(Math.max(0, count) + 1))}
          whileTap={{ scale: 0.9 }}
          aria-label="Increase number of people"
          className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-teal-400 transition-colors border-l border-white/[0.06] flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id="people-error"
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
