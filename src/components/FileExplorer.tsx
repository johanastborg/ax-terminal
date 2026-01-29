import React from 'react';
import { Particle } from '../hooks/useAsymptoticState';

type FileExplorerProps = {
  particles: Particle[];
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ particles }) => {
  return (
    <div className="border border-[var(--foreground)] p-4 bg-black/80 h-full overflow-y-auto shadow-[0_0_15px_rgba(0,255,65,0.1)]">
        <h3 className="text-xs uppercase mb-4 border-b border-[var(--foreground)]/30 pb-1 tracking-widest text-[var(--crt-blue)] flex justify-between">
            <span>/mnt/dark-matter</span>
            <span>MOUNTED (RW)</span>
        </h3>

        {particles.length === 0 && (
            <div className="text-center opacity-50 text-xs py-10 animate-pulse">
                SCANNING DARK MATTER VAULT...
            </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="flex flex-col items-center justify-center p-3 border border-gray-900 bg-black hover:border-[var(--foreground)] transition-all cursor-pointer group hover:bg-gray-900/50"
                >
                    {/* Particle Representation */}
                    <div className="relative flex items-center justify-center mb-3 h-16 w-16">
                        <div
                            className={`transition-all duration-1000 ease-in-out absolute
                                ${p.type === 'dir'
                                    ? 'border-2 border-[var(--crt-blue)] rounded-none'
                                    : 'bg-[var(--foreground)] rounded-full'
                                }`}
                            style={{
                                width: `${Math.max(10, p.mass * 40)}px`,
                                height: `${Math.max(10, p.mass * 40)}px`,
                                opacity: 0.6 + (p.mass * 0.4),
                                boxShadow: `0 0 ${p.mass * 15}px ${p.type === 'dir' ? 'var(--crt-blue)' : 'var(--foreground)'}`
                            }}
                        />
                        {/* Orbiting effect for heavy particles */}
                        {p.mass > 0.7 && (
                             <div className="absolute w-full h-full border border-dashed border-[var(--crt-red)] rounded-full animate-[spin_4s_linear_infinite] opacity-30" />
                        )}
                    </div>

                    <span className="text-[10px] truncate w-full text-center font-mono group-hover:text-[var(--crt-blue)]">
                        {p.name}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono mt-1">
                        MASS: {(p.mass * 10).toFixed(2)} TeV
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
};
