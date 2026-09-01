import React, { useState } from 'react';
import type { AgriGardenData } from '../../types';
import { Sprout, Droplets, CloudRain, Sun, Wind, CheckCircle2, ChevronRight, Flower2 } from 'lucide-react';

interface Props {
  data: AgriGardenData;
}

export default function GardeningAgriCard({ data }: Props) {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-emerald-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Gardening & Agriculture</h3>
            <p className="text-xs text-slate-400">Soil Moisture & Planting Guide</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          Soil: {data.soilMoisture}%
        </div>
      </div>

      {/* Soil Moisture & 24h Rain */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Soil Moisture</span>
            <Droplets className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-emerald-400">{data.soilMoisture}%</span>
            <span className="text-xs text-slate-300 font-medium">{data.soilMoisture < 50 ? 'Low' : 'Optimal'}</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full"
              style={{ width: `${data.soilMoisture}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>24h Rain Forecast</span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-blue-400">{data.rainfallForecast24h}</span>
            <span className="text-xs text-slate-400">mm expected</span>
          </div>
          <p className="text-[11px] text-slate-400">Sunlight: <span className="text-amber-300 font-semibold">{data.sunlightHours} hrs</span></p>
        </div>
      </div>

      {/* Gardening Recommendation Engine */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start space-x-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-xs text-emerald-300 block mb-0.5">Gardening Engine Advice</span>
          <p className="text-xs text-slate-300 leading-relaxed">{data.recommendation}</p>
        </div>
      </div>

      {/* Seasonal Planting Guide */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Seasonal Planting Recommendations</span>
          <span className="text-emerald-400 text-[11px] font-semibold">Live Advisor</span>
        </div>

        <div className="space-y-1.5">
          {data.seasonalPlantingGuide.map((plant, idx) => (
            <div
              key={plant.crop}
              onClick={() => setSelectedCropIndex(idx)}
              className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                selectedCropIndex === idx
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-white'
                  : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Flower2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold">{plant.crop}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{plant.plantType}</span>
                </div>
                <span className="text-[10px] text-emerald-300">{plant.season}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 pl-5.5">{plant.advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
