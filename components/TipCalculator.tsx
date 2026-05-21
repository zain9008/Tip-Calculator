"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Receipt, RotateCcw } from "lucide-react";
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

  const result = useMemo((): CalculationResult | null => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = parseInt(people, 10);

    if (!bill || isNaN(b) || b <= 0) return null;
    if (tipPercent === "" || isNaN(t) || t < 0 || t > 100) return null;
    if (!people || isNaN(p) || p < 1 || !Number.isInteger(parseFloat(people)))
      return null;

    return calculate(b, t, p);
  }, [bill, tipPercent, people]);

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
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-teal-400/15 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-teal-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Tip Calculator
          </h1>
        </div>
        <p className="text-sm text-slate-500">Split the bill, keep the peace</p>
      </motion.header>

      {/* Two-panel grid: results first on mobile so they stay above keyboard */}
      <div className="flex flex-col-reverse gap-4 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-5 lg:items-start">

        {/* Inputs — single unified card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="bg-[#0c1828] rounded-2xl border border-white/[0.06] overflow-hidden"
        >
          <BillInput
            value={bill}
            onChange={handleBillChange}
            error={billError}
          />

          <div className="h-px bg-white/[0.04] mx-5" />

          <TipSelector
            tipPercent={tipPercent}
            activePreset={activePreset}
            presets={PRESET_TIPS}
            onPresetSelect={handlePresetSelect}
            onCustomChange={handleCustomTip}
            error={tipError}
          />

          <div className="h-px bg-white/[0.04] mx-5" />

          <PeopleInput
            value={people}
            onChange={handlePeopleChange}
            error={peopleError}
          />

          <div className="h-px bg-white/[0.04]" />

          {/* Reset */}
          <div className="p-4">
            <motion.button
              type="button"
              onClick={handleReset}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.06] text-slate-500 hover:text-slate-200 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all text-sm font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <ResultPanel result={result} />
        </motion.div>

      </div>
    </div>
  );
}
