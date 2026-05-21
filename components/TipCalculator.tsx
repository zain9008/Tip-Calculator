"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Wallet, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import BillInput from "./BillInput";
import TipSelector from "./TipSelector";
import PeopleInput from "./PeopleInput";
import ResultPanel from "./ResultPanel";
import { calculate, type CalculationResult } from "@/lib/calculate";

const PRESET_TIPS = [10, 15, 20];

interface Touched {
  bill: boolean;
  tip: boolean;
  people: boolean;
}

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [people, setPeople] = useState("1");
  const [touched, setTouched] = useState<Touched>({
    bill: false,
    tip: false,
    people: false,
  });

  // --- Validation ---

  const billError = useMemo(() => {
    if (!touched.bill || bill === "") return "";
    const val = parseFloat(bill);
    if (isNaN(val)) return "Enter a valid number";
    if (val <= 0) return "Bill must be greater than $0";
    return "";
  }, [bill, touched.bill]);

  const tipError = useMemo(() => {
    if (!touched.tip || tipPercent === "") return "";
    const val = parseFloat(tipPercent);
    if (isNaN(val)) return "Enter a valid percentage";
    if (val < 0) return "Tip cannot be negative";
    if (val > 100) return "Tip cannot exceed 100%";
    return "";
  }, [tipPercent, touched.tip]);

  const peopleError = useMemo(() => {
    if (!touched.people || people === "") return "";
    const raw = parseFloat(people);
    const val = parseInt(people, 10);
    if (isNaN(val)) return "Enter a whole number";
    if (!Number.isInteger(raw)) return "Must be a whole number";
    if (val < 1) return "At least 1 person required";
    return "";
  }, [people, touched.people]);

  // --- Live Calculation ---

  const result = useMemo((): CalculationResult | null => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = parseInt(people, 10);

    if (!bill || isNaN(b) || b <= 0) return null;
    if (tipPercent === "" || isNaN(t) || t < 0 || t > 100) return null;
    if (!people || isNaN(p) || p < 1 || !Number.isInteger(parseFloat(people))) return null;

    return calculate(b, t, p);
  }, [bill, tipPercent, people]);

  // --- Handlers ---

  const handleBillChange = useCallback((value: string) => {
    setBill(value);
    setTouched((prev) => ({ ...prev, bill: true }));
  }, []);

  const handlePresetSelect = useCallback((preset: number) => {
    setActivePreset(preset);
    setTipPercent(String(preset));
    setTouched((prev) => ({ ...prev, tip: true }));
  }, []);

  const handleCustomTip = useCallback((value: string) => {
    setActivePreset(null);
    setTipPercent(value);
    setTouched((prev) => ({ ...prev, tip: value !== "" }));
  }, []);

  const handlePeopleChange = useCallback((value: string) => {
    setPeople(value);
    setTouched((prev) => ({ ...prev, people: true }));
  }, []);

  const handleReset = useCallback(() => {
    setBill("");
    setTipPercent("");
    setActivePreset(null);
    setPeople("1");
    setTouched({ bill: false, tip: false, people: false });
    toast.success("Calculator cleared", { duration: 2000 });
  }, []);

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Tip Calculator
          </h1>
        </div>
        <p className="text-slate-500 text-sm">Split the bill, keep the peace</p>
      </motion.div>

      {/* Calculator — inputs on left on desktop, results stacked on mobile */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:items-start gap-5">
        {/* Inputs panel */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="space-y-4"
        >
          <BillInput
            value={bill}
            onChange={handleBillChange}
            error={billError}
          />
          <TipSelector
            tipPercent={tipPercent}
            activePreset={activePreset}
            presets={PRESET_TIPS}
            onPresetSelect={handlePresetSelect}
            onCustomChange={handleCustomTip}
            error={tipError}
          />
          <PeopleInput
            value={people}
            onChange={handlePeopleChange}
            error={peopleError}
          />

          {/* Reset button */}
          <motion.button
            type="button"
            onClick={handleReset}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors border border-white/5 text-sm font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </motion.div>

        {/* Results panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          <ResultPanel result={result} />
        </motion.div>
      </div>
    </div>
  );
}
