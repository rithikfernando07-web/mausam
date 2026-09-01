import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pin, Eye, EyeOff, ArrowUp, ArrowDown, RotateCcw, SlidersHorizontal, Check, Sparkles } from 'lucide-react';
import type { UserProfile, PersonalizationCard, PersonaType } from '../../types';

interface Props {
  user: UserProfile;
  cards: PersonalizationCard[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
}

const ALL_PERSONAS: { id: PersonaType; label: string; icon: string; desc: string }[] = [
  { id: 'health', label: 'Health & Wellness', icon: '❤️', desc: 'AQI, pollen, UV & skin health' },
  { id: 'fitness', label: 'Fitness & Running', icon: '🏃', desc: 'Best running window & comfort' },
  { id: 'beach', label: 'Beach & Surfing', icon: '🏄', desc: 'Wave height, tides & beach safety' },
  { id: 'travel', label: 'Travel & Trips', icon: '✈️', desc: 'Saved cities & auto packing guide' },
  { id: 'family', label: 'Family & Kids', icon: '👨‍👩‍👧', desc: 'School commute & outdoor play' },
  { id: 'farmer', label: 'Gardening & Agri', icon: '🌱', desc: 'Soil moisture & crop planting' },
  { id: 'commuter', label: 'Daily Commute', icon: '🚗', desc: 'Road conditions & traffic delay' },
  { id: 'event', label: 'Event Planner', icon: '🎉', desc: 'Outdoor suitability & Plan B' },
];

export default function EditDashboardModal({ user, cards, isOpen, onClose, onUpdateUser }: Props) {
  if (!isOpen) return null;

  const currentPersonas = user.selectedPersonas || [];
  const hiddenWidgets = user.hiddenWidgets || [];
  const pinnedWidgets = user.pinnedWidgets || [];
  const customOrder = user.customWidgetOrder || cards.map(c => c.id);

  const togglePersona = (id: PersonaType) => {
    const updated = currentPersonas.includes(id)
      ? currentPersonas.filter(p => p !== id)
      : [...currentPersonas, id];
    onUpdateUser({ selectedPersonas: updated, interests: updated });
  };

  const toggleHide = (cardId: string) => {
    const updated = hiddenWidgets.includes(cardId)
      ? hiddenWidgets.filter(id => id !== cardId)
      : [...hiddenWidgets, cardId];
    onUpdateUser({ hiddenWidgets: updated });
  };

  const togglePin = (cardId: string) => {
    const updated = pinnedWidgets.includes(cardId)
      ? pinnedWidgets.filter(id => id !== cardId)
      : [...pinnedWidgets, cardId];
    onUpdateUser({ pinnedWidgets: updated });
  };

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...customOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    onUpdateUser({ customWidgetOrder: newOrder });
  };

  const resetDashboard = () => {
    onUpdateUser({
      hiddenWidgets: [],
      pinnedWidgets: [],
      customWidgetOrder: undefined,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900/95 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5 text-white my-8 max-h-[90vh] overflow-y-auto scrollbar-none"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">Customize Homepage</h2>
                <p className="text-xs text-slate-400">Add, rearrange, pin, and prioritize widgets</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Persona Switcher Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Active Lifestyle Personas</span>
              <span className="text-sky-400 text-[11px]">Multi-select enabled</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ALL_PERSONAS.map((p) => {
                const isSelected = currentPersonas.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePersona(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-start space-x-2.5 ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-500/40 text-white shadow-sm'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl shrink-0">{p.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-xs truncate">{p.label}</span>
                        {isSelected && <Check className="w-3 h-3 text-sky-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{p.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manage & Reorder Dashboard Widgets */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Widget Order & Visibility</span>
              <button
                onClick={resetDashboard}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default</span>
              </button>
            </div>

            <div className="space-y-2">
              {cards.map((card, idx) => {
                const isHidden = hiddenWidgets.includes(card.id);
                const isPinned = pinnedWidgets.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      isHidden
                        ? 'bg-white/5 border-white/5 opacity-50'
                        : isPinned
                        ? 'bg-sky-500/15 border-sky-500/30 text-white'
                        : 'bg-slate-800/60 border-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col space-y-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveWidget(idx, 'up')}
                          className="p-0.5 text-slate-400 hover:text-white disabled:opacity-20"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === cards.length - 1}
                          onClick={() => moveWidget(idx, 'down')}
                          className="p-0.5 text-slate-400 hover:text-white disabled:opacity-20"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-white">{card.title}</span>
                          {isPinned && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-500/30 text-sky-300 font-semibold">
                              PINNED
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">{card.reason}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => togglePin(card.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isPinned
                            ? 'bg-sky-500 text-white border-sky-400'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                        title={isPinned ? 'Unpin widget' : 'Pin widget to top'}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleHide(card.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isHidden
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                        title={isHidden ? 'Show widget' : 'Hide widget'}
                      >
                        {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Done Button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all text-sm flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Dashboard Layout</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
