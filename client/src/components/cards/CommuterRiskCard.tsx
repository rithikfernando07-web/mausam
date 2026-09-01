import React from 'react';
import type { CommuterRiskData } from '../../types';
import { Car, AlertTriangle, Eye, CloudRain, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
  data: CommuterRiskData;
}

export default function CommuterRiskCard({ data }: Props) {
  const getRiskBadge = (score: CommuterRiskData['commuteRiskScore']) => {
    switch (score) {
      case 'LOW':
        return { bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'LOW TRAVEL RISK' };
      case 'MODERATE':
        return { bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'MODERATE RISK' };
      default:
        return { bg: 'bg-rose-500/20 text-rose-400 border-rose-500/30', label: 'HIGH TRAVEL RISK' };
    }
  };

  const risk = getRiskBadge(data.commuteRiskScore);

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-amber-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Daily Commute & Traffic</h3>
            <p className="text-xs text-slate-400">Road Safety & Visibility</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border ${risk.bg} text-[11px] font-bold`}>
          {risk.label}
        </div>
      </div>

      {/* Main Risk Alert Display */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium uppercase tracking-wider">Traffic & Delay Status</span>
          <span className={`font-semibold ${data.weatherImpact === 'Major disruption' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {data.weatherImpact}
          </span>
        </div>
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className={`w-5 h-5 ${data.commuteRiskScore === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`} />
          <p className="text-sm font-semibold text-white leading-snug">{data.travelAdvice}</p>
        </div>
      </div>

      {/* Commute Indicators */}
      <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <Eye className="w-4 h-4 text-cyan-400 mx-auto" />
          <span className="text-slate-400 text-[11px] block">Visibility</span>
          <span className="font-bold text-white block">{data.visibility} km</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <CloudRain className="w-4 h-4 text-blue-400 mx-auto" />
          <span className="text-slate-400 text-[11px] block">Rain</span>
          <span className="font-bold text-white block">{data.rainIntensity}</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <Car className="w-4 h-4 text-amber-400 mx-auto" />
          <span className="text-slate-400 text-[11px] block">Road State</span>
          <span className="font-bold text-white block">{data.roadCondition}</span>
        </div>
      </div>
    </div>
  );
}
