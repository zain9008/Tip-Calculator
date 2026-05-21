"use client";

import { Percent } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  tipPercent: string;
  activePreset: number | null;
  presets: number[];
  onPresetSelect: (preset: number) => void;
  onCustomChange: (value: string) => void;
  error: string;
}

export default function TipSelector({
  tipPercent,
  activePreset,
  presets,
  onPresetSelect,
  onCustomChange,
  error,
}: Props) {
  const customValue = activePreset === null ? tipPercent : "";

  return (
    <div className="bg-[#0c1828] rounded-2xl p-5 border border-white/5">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
        Select Tip %
      </p>

      {/* Preset buttons */}
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        {presets.map((preset) => {
          const isActive = activePreset === preset;
          return (
            <motion.button
              key={preset}
              type="button"
              onClick={() => onPresetSelect(preset)}
              whileTap={{ scale: 0.94 }}
              aria-label={`Set tip to ${preset} percent`}
              aria-pressed={isActive}
              className={`py-3 rounded-xl font-bold text-sm transition-all duration-200 border ${
                isActive
                  ? "bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-[0_0_16px_rgba(20,184,166,0.18)]"
                  : "bg-[#111f32] text-slate-300 border-white/5 hover:border-teal-500/25 hover:text-teal-200"
              }`}
            >
              {preset}%
            </motion.button>
          );
        })}
      </div>

      {/* Custom input */}
      <div
        className={`flex items-center gap-3 bg-[#111f32] rounded-xl px-4 py-3.5 border transition-all duration-200 ${
          error
            ? "border-red-500/60 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
            : "border-white/5 focus-within:border-teal-500/50 focus-within:shadow-[0_0_0_1px_rgba(20,184,166,0.15)]"
        }`}
      >
        <input
          id="tip-custom"
          type="number"
          inputMode="decimal"
          min="0"
          max="100"
          step="0.5"
          placeholder="Custom"
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          aria-label="Custom tip percentage"
          aria-describedby={error ? "tip-error" : undefined}
          aria-invalid={!!error}
          className="flex-1 bg-transparent text-white text-xl font-semibold placeholder:text-slate-700 outline-none w-full min-w-0"
        />
        <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
          <Percent className="w-4 h-4 text-teal-400" strokeWidth={2.5} />
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id="tip-error"
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
