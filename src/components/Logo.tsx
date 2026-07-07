/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import logoImg from '../assets/images/Logo_pelos_polo.jpg';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export default function Logo({ className = '', showText = true, size = 'md', onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`} onClick={onClick}>
      {/* Emblem image (replaces SVG) */}
      <div className={`${sizeClasses[size]} relative select-none shrink-0 drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]`}>
        <div className="w-full h-full rounded-full p-1 bg-gradient-to-br from-[#050505] to-[#111111] border-2 border-[#DFBA6B] flex items-center justify-center overflow-hidden">
          <img
            src={logoImg}
            alt="pelos & polos Logo"
            className="w-[88%] h-[88%] object-cover rounded-full"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif leading-none tracking-wider text-white font-semibold ${textSizes[size]}`}>
            pelos <span className="text-[#C5A059] font-sans font-light">&</span> polos
          </span>
          <span className="text-[9px] tracking-[0.2em] font-sans text-gray-400 font-medium uppercase mt-1">
            Mascotas Premium
          </span>
        </div>
      )}
    </div>
  );
}
