import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Gauge, 
  TrendingUp, 
  Zap, 
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

// Distances in Kilometers
const DISTANCES = [
  { 
    id: '5k', 
    name: '5K Run', 
    distance: 5.0, 
    description: 'A fast-paced sprint. Tests aerobic capacity.',
    icon: Flame,
    color: 'from-orange-500 to-amber-500',
    glowColor: 'glow-coral'
  },
  { 
    id: '10k', 
    name: '10K Run', 
    distance: 10.0, 
    description: 'Perfect balance of speed and stamina.',
    icon: Zap,
    color: 'from-teal-400 to-emerald-500',
    glowColor: 'glow-teal'
  },
  { 
    id: 'half-marathon', 
    name: 'Half Marathon', 
    distance: 21.0975, 
    description: 'A true endurance milestone (13.1 miles).',
    icon: Gauge,
    color: 'from-cyan-500 to-blue-500',
    glowColor: 'glow-teal'
  },
  { 
    id: 'marathon', 
    name: 'Marathon', 
    distance: 42.195, 
    description: 'The ultimate standard of legendary running (26.2 miles).',
    icon: Award,
    color: 'from-rose-500 to-pink-500',
    glowColor: 'glow-coral'
  }
];

// Presets (seconds per km)
const PRESETS = [
  { name: 'Elite Pace (3:30)', seconds: 210, type: 'Intervals' },
  { name: 'Tempo Run (4:15)', seconds: 255, type: 'Threshold' },
  { name: 'Half Goal (5:00)', seconds: 300, type: 'Moderate' },
  { name: 'Marathon Goal (5:30)', seconds: 330, type: 'Aerobic' },
  { name: 'Easy Jog (6:30)', seconds: 390, type: 'Recovery' }
];

export default function App() {
  // Default pace: 5:00 min/km (300 seconds)
  const [paceSeconds, setPaceSeconds] = useState<number>(300);

  // Convert seconds to MM:SS pace string
  const formatPace = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Convert pace in seconds/km to km/h speed
  const calculateSpeedKmh = (secs: number) => {
    if (secs === 0) return 0;
    return (3600 / secs).toFixed(2);
  };

  // Convert pace in seconds/km to minutes/mile pace
  const calculateMilePace = (secs: number) => {
    const secsPerMile = Math.round(secs / 0.621371192);
    const mins = Math.floor(secsPerMile / 60);
    const remainingSecs = secsPerMile % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Calculate total time for a given distance in km
  const calculateRaceTime = (secs: number, distance: number) => {
    const totalSecs = Math.round(secs * distance);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const remainingSecs = totalSecs % 60;

    const parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0 || hrs > 0) parts.push(`${mins}m`);
    parts.push(`${remainingSecs}s`);

    return {
      formatted: parts.join(' '),
      digital: `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`
    };
  };

  // Handle slider adjustment
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaceSeconds(parseInt(e.target.value, 10));
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 z-10 select-none">
      
      {/* Ambient glowing blobs in background */}
      <div className="neon-blob top-10 left-10 bg-teal-500/20" />
      <div className="neon-blob bottom-10 right-10 bg-rose-500/20" />

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center">
        
        {/* Header */}
        <header className="text-center mb-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>PacePulse V2.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 glow-text-teal">
              PacePulse
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-slate-400 text-base sm:text-lg max-w-xl mx-auto"
          >
            Fine-tune your running pace and instantly project your ultimate target race finishes.
          </motion.p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Panel: Slider & Presets (5 cols on lg) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Control Panel Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <h2 className="text-xl font-bold flex items-center gap-2.5 text-slate-200 mb-6">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                <span>Pace Settings</span>
              </h2>

              {/* Digital Pace Display */}
              <div className="flex flex-col items-center justify-center py-6 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-8 relative">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Target Pace</span>
                <div className="flex items-baseline gap-1 text-teal-400 glow-text-teal">
                  <span className="text-5xl sm:text-6xl font-bold font-mono tracking-tight">
                    {formatPace(paceSeconds)}
                  </span>
                  <span className="text-lg font-medium text-slate-400 font-outfit">/km</span>
                </div>
                <div className="mt-3 flex gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="text-teal-400 font-mono">{calculateSpeedKmh(paceSeconds)}</span> km/h
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="flex items-center gap-1">
                    <span className="text-sky-400 font-mono">{calculateMilePace(paceSeconds)}</span> /mile
                  </span>
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                  <span>Fast (3:00)</span>
                  <span>Slow (10:00)</span>
                </div>
                
                <input
                  type="range"
                  min="180"
                  max="600"
                  value={paceSeconds}
                  onChange={handleSliderChange}
                  className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer pace-slider transition-all duration-150"
                  id="pace-slider"
                  aria-label="Running Pace Slider"
                />
              </div>

              {/* Reset to Standard button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setPaceSeconds(300)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-slate-400 hover:text-teal-400 text-xs font-medium transition-all duration-200 cursor-pointer"
                  id="btn-reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to 5:00</span>
                </button>
              </div>
            </div>

            {/* Pace Presets Panel */}
            <div className="glass-card rounded-2xl p-6 relative">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Quick Training Presets</span>
              </h3>
              
              <div className="flex flex-col gap-2.5">
                {PRESETS.map((preset) => {
                  const isActive = paceSeconds === preset.seconds;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => setPaceSeconds(preset.seconds)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-250 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-teal-500/15 to-cyan-500/5 border-teal-500/50 text-teal-300 shadow-[0_0_15px_-3px_rgba(20,184,166,0.25)]'
                          : 'bg-slate-950/30 border-slate-900 hover:border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{preset.name}</span>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{preset.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-teal-400 transform translate-x-1' : 'text-slate-600'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          {/* Right Panel: Race Times Dashboard (7 cols on lg) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {DISTANCES.map((item) => {
              const Icon = item.icon;
              const times = calculateRaceTime(paceSeconds, item.distance);
              const isHalfOrFull = item.id === 'half-marathon' || item.id === 'marathon';

              return (
                <div 
                  key={item.id}
                  className={`glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                    isHalfOrFull ? 'border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.03)]' : ''
                  }`}
                >
                  {/* Decorative corner accent gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.color} opacity-[0.03] rounded-bl-full pointer-events-none`} />
                  
                  {/* Card Top: Icon and Name */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-slate-400">{item.name}</span>
                        {isHalfOrFull && (
                          <span className="px-1.5 py-0.5 rounded-md bg-teal-500/10 text-teal-400 text-[9px] font-bold uppercase tracking-wider border border-teal-500/20">
                            Key Race
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[80%] mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200`}>
                      <Icon className="w-5 h-5 text-slate-300" />
                    </div>
                  </div>

                  {/* Card Bottom: Times and Pace Projector */}
                  <div className="mt-8">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Projected Time</span>
                    
                    {/* Time Value */}
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                        {times.digital}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-900 pt-2.5">
                      <span className="text-slate-500 font-medium">Distance</span>
                      <span className="font-bold text-slate-300 font-mono">{item.distance.toLocaleString()} km</span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Avg Speed</span>
                      <span className="font-bold text-slate-300 font-mono">{calculateSpeedKmh(paceSeconds)} km/h</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Tip / Footer info block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 glass-card rounded-2xl p-5 flex items-start gap-4 max-w-3xl mx-auto border-teal-500/10"
        >
          <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-teal-300">Runners Pro-Tip</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Marathon projections are highly dependent on volume and endurance. A standard projection assumes sufficient weekly mileage. If you're targeting a sub-4 hour marathon, target a pace faster than <strong className="text-teal-400 font-mono">5:41 min/km</strong>.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-widest relative z-10">
        <p>&copy; {new Date().getFullYear()} PacePulse App. Engineered for High-performance Athletes.</p>
      </footer>
    </div>
  );
}
