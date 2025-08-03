    import React, { useId, useState } from 'react';

    const InputBox = ({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = 'USD',
    amountDisabled = false,
    currencyDisabled = false,
    className = '',
    darkMode = false,
    }) => {
    const amountInputId = useId();
    const [focused, setFocused] = useState(false);

    return (
        <div className={`
        ${darkMode 
            ? 'bg-slate-800/70 border-slate-700/50 shadow-slate-900/20' 
            : 'bg-white/80 border-white/40 shadow-black/5'
        } 
        p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 ease-out
        hover:shadow-xl hover:border-opacity-60
        ${focused ? 'ring-1 ring-blue-500/30 shadow-lg' : ''}
        ${className}
        `}>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
            <label 
                htmlFor={amountInputId} 
                className={`
                block text-sm font-medium mb-3 transition-colors duration-300
                ${darkMode ? 'text-slate-300' : 'text-slate-600'}
                `}
            >
                {label}
            </label>
            <input
                id={amountInputId}
                className={`
                w-full bg-transparent text-2xl font-light tracking-wide
                outline-none transition-all duration-300 ease-out
                ${darkMode ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-500'}
                ${focused ? 'transform scale-105' : ''}
                `}
                type="number"
                placeholder="0.00"
                disabled={amountDisabled}
                value={amount}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => onAmountChange?.(e.target.value)}
            />
            </div>
            
            <div className="flex flex-col justify-end">
            <label className={`
                block text-sm font-medium mb-3 transition-colors duration-300
                ${darkMode ? 'text-slate-300' : 'text-slate-600'}
            `}>
                Currency
            </label>
            <select
                className={`
                px-4 py-2 rounded-lg font-medium cursor-pointer outline-none
                transition-all duration-300 ease-out min-w-[100px]
                ${darkMode 
                    ? 'bg-slate-700/80 text-white border-slate-600/50 focus:bg-slate-700' 
                    : 'bg-slate-100/80 text-slate-800 border-slate-300/50 focus:bg-white'
                }
                border focus:ring-1 focus:ring-blue-500/30 hover:shadow-md
                `}
                value={selectedCurrency}
                disabled={currencyDisabled}
                onChange={(e) => onCurrencyChange?.(e.target.value)}
            >
                {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                    {currency.toUpperCase()}
                </option>
                ))}
            </select>
            </div>
        </div>
        </div>
    );
    };

    export default InputBox;