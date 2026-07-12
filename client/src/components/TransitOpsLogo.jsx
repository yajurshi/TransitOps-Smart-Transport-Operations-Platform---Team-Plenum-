import React from 'react';
import logoSrc from '../assets/icons/logo.jpeg';

/**
 * Reusable TransitOps branded logo component.
 *
 * Props:
 *   size      - px height of the logo image (default 56)
 *   showText  - whether to render the brand name + tagline (default true)
 *   textAlign - 'center' | 'left' (default 'center')
 *   className - extra classes on the wrapper
 */
export const TransitOpsLogo = ({
  size = 56,
  showText = true,
  textAlign = 'center',
  className = '',
}) => {
  const isCenter = textAlign === 'center';

  return (
    <div
      className={`flex flex-col ${isCenter ? 'items-center' : 'items-start'} gap-2 ${className}`}
    >
      <img
        src={logoSrc}
        alt="TransitOps Logo"
        style={{ height: size, width: 'auto' }}
        className="object-contain select-none mix-blend-multiply"
        draggable={false}
      />
      {showText && (
        <div className={`${isCenter ? 'text-center' : 'text-left'}`}>
          <p className="text-sm font-black tracking-tight text-slate-800 leading-tight">
            TransitOps
          </p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-snug">
            Smart Transport Operations Platform
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Compact inline logo for use in sidebars / headers.
 * Renders the logo image + "TransitOps" in one horizontal row.
 */
export const TransitOpsLogoInline = ({ size = 32, className = '' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <img
      src={logoSrc}
      alt="TransitOps"
      style={{ height: size, width: 'auto' }}
      className="object-contain select-none flex-shrink-0 mix-blend-multiply"
      draggable={false}
    />
    <div>
      <span className="font-bold text-slate-800 text-base tracking-wide leading-tight block">
        TransitOps
      </span>
      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider leading-tight block">
        Operations Platform
      </span>
    </div>
  </div>
);

/**
 * Logo-only (no text) — for collapsed sidebar or header favicon-style usage.
 */
export const TransitOpsLogoIcon = ({ size = 32, className = '', title = 'TransitOps' }) => (
  <img
    src={logoSrc}
    alt={title}
    title={title}
    style={{ height: size, width: 'auto' }}
    className={`object-contain select-none mix-blend-multiply ${className}`}
    draggable={false}
  />
);
