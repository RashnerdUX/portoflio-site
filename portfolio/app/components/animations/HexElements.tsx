import React from 'react';

export const HexElements: React.FC = () => {
  // Elder Futhark runes with meanings
  const runicSymbols = [
    'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ',
    'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'
  ];

  // Hexadecimal symbols
  const hexSymbols = [
    'A', 'B', 'C', 'D', 'E', 'F'
  ];

  // Alchemical symbols
  const alchemicalSymbols = [
    '☿', '♀', '♂', '♃', '♄', '♅', '♆', '♇', // Planetary
    '🜀', '🜁', '🜂', '🜃', // Classical elements
    '🜎', '🜏', '🜐', '🜑', '🜒', '🜓', // Alchemical processes
    '⚫', '⚪', '🔴', '🟡', '🔵' // Basic elements
  ];

  // Geometric/Sacred symbols
  const geometricSymbols = [
    '△', '▲', '▽', '▼', // Triangles
    '◇', '◆', '◈', '⬟', '⬢', '⬡', // Diamonds and hexagons
    '○', '●', '◉', '◎', '⊙', // Circles
    '✚', '✛', '✜', '⚡', '✦', '✧', '✩', '✪' // Crosses and stars
  ];

  // Nordic/Viking symbols
  const nordicSymbols = [
    '☬', '⚡', '❅', '❆', '❇', '⚔', '🛡', '⚒', // Nordic mystical
    'ᚦ', 'ᚼ', 'ᚱ', 'ᚴ', 'ᚱ', 'ᚢ' // Additional runes for Nordic feel
  ];

  // Greek letters (ancient wisdom)
  const greekSymbols = [
    'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ',
    'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ',
    'Φ', 'Χ', 'Ψ', 'Ω'
  ];

  // Combine all symbols with weighted distribution
  const allSymbols = [
    ...runicSymbols,        // 24 symbols - 35% weight
    ...hexSymbols,          // 6 symbols - 9% weight  
    ...alchemicalSymbols,   // 11 symbols - 16% weight
    ...geometricSymbols,    // 24 symbols - 35% weight
    ...nordicSymbols,       // 14 symbols - 20% weight
    ...greekSymbols         // 24 symbols - 35% weight
  ];

  // Get random symbol with category weighting
  const getRandomSymbol = () => {
    const rand = Math.random();
    if (rand < 0.3) return runicSymbols[Math.floor(Math.random() * runicSymbols.length)];
    if (rand < 0.45) return alchemicalSymbols[Math.floor(Math.random() * alchemicalSymbols.length)];
    if (rand < 0.65) return geometricSymbols[Math.floor(Math.random() * geometricSymbols.length)];
    if (rand < 0.8) return greekSymbols[Math.floor(Math.random() * greekSymbols.length)];
    if (rand < 0.9) return nordicSymbols[Math.floor(Math.random() * nordicSymbols.length)];
    return hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
  };

  // Get symbol category for styling
  const getSymbolCategory = (symbol: string) => {
    if (runicSymbols.includes(symbol)) return 'runic';
    if (alchemicalSymbols.includes(symbol)) return 'alchemical';
    if (geometricSymbols.includes(symbol)) return 'geometric';
    if (greekSymbols.includes(symbol)) return 'greek';
    if (nordicSymbols.includes(symbol)) return 'nordic';
    return 'hex';
  };

  // Animation variants for different movement patterns
  const getAnimationStyle = (index: number) => {
    const patterns = [
      'animate-pulse', 
      'animate-bounce', 
      'animate-spin',
      'animate-ping'
    ];
    
    const directions = [
      { transform: 'translateX(100px)' },
      { transform: 'translateY(100px)' },
      { transform: 'translate(50px, 50px)' },
      { transform: 'translate(-50px, 50px)' }
    ];

    return {
      pattern: patterns[index % patterns.length],
      direction: directions[index % directions.length]
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Enchantment Symbols */}
      {[...Array(18)].map((_, i) => {
        const { pattern } = getAnimationStyle(i);
        const symbol = getRandomSymbol();
        const category = getSymbolCategory(symbol);
        
        // Category-specific styling
        const categoryStyles = {
          runic: { color: 'text-red-200', glow: '#fecaca, #dc2626, #b91c1c' },
          alchemical: { color: 'text-red-300', glow: '#fca5a5, #ef4444, #dc2626' },
          geometric: { color: 'text-red-400', glow: '#f87171, #dc2626, #991b1b' },
          greek: { color: 'text-red-300', glow: '#fca5a5, #ef4444, #b91c1c' },
          nordic: { color: 'text-red-200', glow: '#fecaca, #dc2626, #7f1d1d' },
          hex: { color: 'text-red-500', glow: '#ef4444, #dc2626, #991b1b' }
        };

        const style = categoryStyles[category as keyof typeof categoryStyles];
        
        return (
          <div
            key={`symbol-${i}`}
            className={`absolute ${pattern} select-none`}
            style={{
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 95}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${16 + Math.random() * 24}px`,
            }}
          >
            <span 
              className={`
                inline-block font-bold
                ${style.color}
                opacity-70 hover:opacity-100
                transition-all duration-1000
                drop-shadow-lg
              `}
              style={{
                textShadow: `
                  0 0 10px ${style.glow.split(', ')[0]},
                  0 0 20px ${style.glow.split(', ')[1]},
                  0 0 30px ${style.glow.split(', ')[2]}
                `,
                filter: 'brightness(1.2)',
              }}
            >
              {symbol}
            </span>
          </div>
        );
      })}

      {/* Floating Enchantment Chains (mixed symbol sequences) */}
      {[...Array(6)].map((_, i) => {
        const chainLength = 3 + Math.floor(Math.random() * 4);
        const symbolChain = Array.from({ length: chainLength }, () => getRandomSymbol()).join(' ');

        return (
          <div
            key={`symbol-chain-${i}`}
            className="absolute animate-pulse select-none"
            style={{
              left: `${Math.random() * 85}%`,
              top: `${Math.random() * 85}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <div 
              className="text-red-400 font-mono text-sm opacity-60 tracking-wider"
              style={{
                textShadow: `
                  0 0 8px #fca5a5,
                  0 0 16px #ef4444,
                  0 0 24px #dc2626
                `,
                transform: `rotate(${-15 + Math.random() * 30}deg)`,
              }}
            >
              {symbolChain}
            </div>
          </div>
        );
      })}

      {/* Mystical Glow Orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`glow-orb-${i}`}
          className="absolute rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 16}px`,
            background: `radial-gradient(circle, 
              rgba(220, 38, 38, 0.8) 0%, 
              rgba(185, 28, 28, 0.4) 50%, 
              rgba(127, 29, 29, 0.1) 100%
            )`,
            boxShadow: `
              0 0 20px rgba(220, 38, 38, 0.6),
              0 0 40px rgba(185, 28, 28, 0.4),
              0 0 60px rgba(127, 29, 29, 0.2)
            `,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Floating Symbol Circles (enchantment formations) */}
      {[...Array(4)].map((_, i) => {
        const circleSymbols = Array.from({ length: 6 }, () => getRandomSymbol());

        return (
          <div
            key={`symbol-circle-${i}`}
            className="absolute animate-spin select-none"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              width: '80px',
              height: '80px',
            }}
          >
            {circleSymbols.map((symbol, symbolIndex) => {
              const category = getSymbolCategory(symbol);
              const categoryColors = {
                runic: 'text-red-200',
                alchemical: 'text-red-300',
                geometric: 'text-red-400',
                greek: 'text-red-300',
                nordic: 'text-red-200',
                hex: 'text-red-500'
              };

              return (
                <span
                  key={symbolIndex}
                  className={`absolute ${categoryColors[category as keyof typeof categoryColors]} font-bold opacity-40`}
                  style={{
                    fontSize: '14px',
                    left: '50%',
                    top: '50%',
                    transform: `
                      translate(-50%, -50%) 
                      rotate(${symbolIndex * 60}deg) 
                      translateY(-30px) 
                      rotate(-${symbolIndex * 60}deg)
                    `,
                    textShadow: `
                      0 0 8px #fecaca,
                      0 0 16px #dc2626
                    `,
                  }}
                >
                  {symbol}
                </span>
              );
            })}
          </div>
        );
      })}

      {/* Streaming Mixed Symbols (Matrix-like effect) */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`symbol-stream-${i}`}
          className="absolute flex flex-col items-center select-none animate-slideDown"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: '-20px',
            animationDuration: `${8 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          {Array.from({ length: 8 }, (_, j) => {
            const symbol = getRandomSymbol();
            const category = getSymbolCategory(symbol);
            const categoryColors = {
              runic: 'text-red-200',
              alchemical: 'text-red-300',
              geometric: 'text-red-400',
              greek: 'text-red-300',
              nordic: 'text-red-200',
              hex: 'text-red-500'
            };

            return (
              <span
                key={j}
                className={`${categoryColors[category as keyof typeof categoryColors]} font-mono text-xs opacity-50 mb-2`}
                style={{
                  textShadow: '0 0 6px #ef4444',
                  animationDelay: `${j * 0.1}s`,
                }}
              >
                {symbol}
              </span>
            );
          })}
        </div>
      ))}

      {/* Custom CSS for slideDown animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideDown {
            from {
              transform: translateY(-100vh);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            to {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
          .animate-slideDown {
            animation: slideDown linear infinite;
          }
        `
      }} />
    </div>
  );
};