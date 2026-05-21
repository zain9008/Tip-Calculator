"use client";

import { Users, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export default function PeopleInput({ value, onChange, error }: Props) {
  const count = parseInt(value) || 0;

  const decrement = () => {
    if (count > 1) onChange(String(count - 1));
  };

  const increment = () => {
    onChange(String(Math.max(1, count) + 1));
  };

  return (
    <div className="bg-[#0c1828] rounded-2xl p-5 border border-white/5">
      <label
        htmlFor="people"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3"
      >
        <Users className="w-3.5 h-3.5" />
        Number of People
      </label>

      <div
        className={`flex items-center bg-[#111f32] rounded-xl border transition-all duration-200 overflow-hidden ${
          error
            ? "border-red-500/60 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
            : "border-white/5"
        }`}
      >
        <motion.button
          type="button"
          onClick={decrement}
          whileTap={{ scale: 0.88 }}
          disabled={count <= 1}
          aria-label="Decrease number of people"
          className="w-14 h-14 flex items-center justify-center text-slate-500 hover:text-teal-400 disabled:opacity-25 disabled:cursor-not-allowed transition-colors flex-shrink-0 border-r border-white/5"
        >
          <Minus className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>

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
          className="flex-1 bg-transparent text-white text-2xl font-bold text-center placeholder:text-slate-700 outline-none py-3"
        />

        <motion.button
          type="button"
          onClick={increment}
          whileTap={{ scale: 0.88 }}
          aria-label="Increase number of people"
          className="w-14 h-14 flex items-center justify-center text-slate-500 hover:text-teal-400 transition-colors flex-shrink-0 border-l border-white/5"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id="people-error"
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
