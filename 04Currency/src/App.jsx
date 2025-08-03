import React, { useState, useEffect, useId } from 'react';
import { Moon, Sun, ArrowUpDown, TrendingUp, DollarSign, Euro, PoundSterling } from 'lucide-react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyData';

// Subtle geometric background animation
const GeometricBackground = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`
            absolute rounded-full opacity-5 animate-float-geometric
            ${darkMode ? 'bg-blue-400' : 'bg-white'}
          `}
          style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        />
      ))}
      
      {/* Grid pattern overlay */}
      <div 
        className={`
          absolute inset-0 opacity-5
          ${darkMode ? 'bg-slate-400' : 'bg-slate-800'}
        `}
        style={{
          backgroundImage: `
            linear-gradient(${darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(30, 41, 59, 0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(30, 41, 59, 0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

// Loading skeleton component
const LoadingSkeleton = ({ darkMode }) => (
  <div className="space-y-6">
    <div className={`
      h-24 rounded-2xl animate-pulse
      ${darkMode ? 'bg-slate-700/30' : 'bg-slate-200/30'}
    `} />
    <div className={`
      h-24 rounded-2xl animate-pulse
      ${darkMode ? 'bg-slate-700/30' : 'bg-slate-200/30'}
    `} />
    <div className={`
      h-12 rounded-xl animate-pulse
      ${darkMode ? 'bg-slate-700/30' : 'bg-slate-200/30'}
    `} />
  </div>
);

// Main App Component
const App = () => {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('PKR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: currencyInfo, loading } = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  useEffect(() => {
    setMounted(true);
  }, []);

  const swapCurrencies = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFrom(to);
      setTo(from);
      setAmount(convertedAmount);
      setConvertedAmount(amount);
      setIsSwapping(false);
    }, 400);
  };

  const handleConvert = async () => {
    if (!currencyInfo[to] || !amount) return;
    
    setIsConverting(true);
    // Professional loading delay
    setTimeout(() => {
      const result = parseFloat(amount) * currencyInfo[to];
      setConvertedAmount(result.toFixed(2));
      setIsConverting(false);
    }, 1200);
  };

  const getCurrencyIcon = (currency) => {
    switch(currency) {
      case 'USD': return <DollarSign size={20} />;
      case 'EUR': return <Euro size={20} />;
      case 'GBP': return <PoundSterling size={20} />;
      default: return <TrendingUp size={20} />;
    }
  };

  return (
    <div className={`
      min-h-screen flex justify-center items-center p-4 transition-all duration-700 ease-out
      ${darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }
      relative overflow-hidden
    `}>
      {/* Geometric Background */}
      <GeometricBackground darkMode={darkMode} />

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`
          fixed top-6 right-6 p-4 rounded-2xl transition-all duration-500 ease-out z-20
          ${darkMode 
            ? 'bg-white-400/90 text-slate-900 hover:bg-amber-300 shadow-amber-400/20' 
            : 'bg-slate-800/90 text-white hover:bg-slate-700 shadow-slate-800/20'
          }
          hover:scale-110 shadow-xl backdrop-blur-sm glass-effect
          transform hover:rotate-6 active:scale-95
        `}
      >
        <div className="transition-transform duration-300">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </div>
      </button>

      {/* Main Container */}
      <div className={`
        w-full max-w-lg mx-auto transition-all duration-700 ease-out
        ${mounted ? 'animate-slide-up' : 'opacity-0'}
      `}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`
              p-3 rounded-2xl transition-all duration-500
              ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'}
            `}>
              {getCurrencyIcon(from)}
            </div>
            <h1 className={`
              text-3xl font-light tracking-tight transition-colors duration-500
              ${darkMode ? 'text-white' : 'text-slate-800'}
            `}>
              Currency Exchange
            </h1>
          </div>
          <p className={`
            text-lg transition-colors duration-500
            ${darkMode ? 'text-slate-400' : 'text-slate-600'}
          `}>
            Professional exchange rates
          </p>
        </div>

        {/* Main Card */}
        <div className={`
          rounded-3xl p-8 transition-all duration-700 ease-out glass-effect
          ${darkMode 
            ? 'bg-slate-800/40 border-slate-700/30 shadow-2xl' 
            : 'bg-white/60 border-white/50 shadow-xl'
          }
          border backdrop-blur-xl
        `}>
          {loading ? (
            <LoadingSkeleton darkMode={darkMode} />
          ) : (
            <div className="space-y-8">
              {/* From Input */}
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options.filter((cur) => cur !== to)}
                selectedCurrency={from}
                onAmountChange={setAmount}
                onCurrencyChange={setFrom}
                darkMode={darkMode}
              />

              {/* Swap Section */}
              <div className="relative flex justify-center">
                <div className={`
                  h-px w-full transition-colors duration-500
                  ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}
                `} />
                <button
                  onClick={swapCurrencies}
                  disabled={isSwapping}
                  className={`
                    absolute top-1/2 -translate-y-1/2 p-4 rounded-2xl
                    transition-all duration-500 ease-out disabled:opacity-50
                    ${darkMode 
                      ? 'bg-slate-700/80 text-slate-300 hover:bg-slate-600 border-slate-600' 
                      : 'bg-white/80 text-slate-600 hover:bg-slate-50 border-slate-200'
                    }
                    border backdrop-blur-sm hover:scale-110 active:scale-95
                    ${isSwapping ? 'animate-spin' : ''}
                    shadow-lg hover:shadow-xl
                  `}
                >
                  <ArrowUpDown size={20} />
                </button>
              </div>

              {/* To Input */}
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options.filter((cur) => cur !== from)}
                selectedCurrency={to}
                onCurrencyChange={setTo}
                amountDisabled
                darkMode={darkMode}
              />

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={isConverting || loading || !amount}
                className={`
                  w-full py-4 px-8 rounded-2xl font-medium text-lg
                  transition-all duration-500 ease-out relative overflow-hidden
                  ${darkMode 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white shadow-slate-800/25'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl
                  ${isConverting ? 'cursor-wait' : ''}
                `}
              >
                {/* Progress bar for loading */}
                {isConverting && (
                  <div className={`
                    absolute bottom-0 left-0 h-1 animate-progress
                    ${darkMode ? 'bg-blue-400' : 'bg-white'}
                    opacity-60
                  `} />
                )}
                
                <span className="relative z-10">
                  {isConverting 
                    ? 'Processing Exchange...' 
                    : `Convert ${from} to ${to}`
                  }
                </span>
              </button>

              {/* Exchange Rate Info */}
              {convertedAmount && !isConverting && (
                <div className={`
                  text-center p-4 rounded-xl transition-all duration-500
                  ${darkMode ? 'bg-slate-700/30 text-slate-300' : 'bg-slate-100/50 text-slate-600'}
                  animate-fade-in
                `}>
                  <p className="text-sm">
                    1 {from.toUpperCase()} = {currencyInfo[to]?.toFixed(4)} {to.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`
            text-sm transition-colors duration-500
            ${darkMode ? 'text-slate-500' : 'text-slate-400'}
          `}>
            Real-time rates • Secure • Professional
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;