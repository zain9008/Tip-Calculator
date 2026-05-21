"use client";

import { Percent, AlertCircle } from "lucide-react";
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
    <div className="p-5">
      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2.5">
        Tip Percentage
      </p>

      {/* Preset buttons */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {presets.map((preset) => {
          const isActive = activePreset === preset;
          return (
            <motion.button
              key={preset}
              type="button"
              onClick={() => onPresetSelect(preset)}
              whileTap={{ scale: 0.95 }}
              aria-label={`Set tip to ${preset} percent`}
              aria-pressed={isActive}
              className={`h-11 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                isActive
                  ? "bg-teal-400/15 text-teal-300 border-teal-400/40"
                  : "bg-[#0a1421] text-slate-400 border-white/[0.06] hover:border-teal-500/30 hover:text-teal-300/80"
              }`}
            >
              {preset}%
            </motion.button>
          );
        })}
      </div>

      {/* Custom input */}
      <div
        className={`flex items-center gap-3 bg-[#0a1421] rounded-xl px-4 py-3.5 border transition-all duration-200 ${
          error
            ? "border-red-500/40 bg-red-950/10"
            : "border-white/[0.06] focus-within:border-teal-500/40 focus-within:bg-[#0b1928]"
        }`}
      >
        <input
          id="tip-custom"
          type="number"
          inputMode="decimal"
          min="0"
          max="100"
          step="0.5"
          placeholder="Custom %"
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          aria-label="Custom tip percentage"
          aria-describedby={error ? "tip-error" : undefined}
          aria-invalid={!!error}
          className="flex-1 bg-transparent text-lg font-semibold text-white placeholder:text-slate-700 outline-none min-w-0 tabular-nums"
        />
        <Percent
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            error ? "text-red-400/60" : "text-teal-400/70"
          }`}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id="tip-error"
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
