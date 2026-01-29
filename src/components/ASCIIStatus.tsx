import React from 'react';

type ASCIIStatusProps = {
  status: string; // STABLE, DECOHERING, etc.
  coherence: number;
};

export const ASCIIStatus: React.FC<ASCIIStatusProps> = ({ status, coherence }) => {
  const art = `
      /\\
     /  \\
    < ** >
     \\  /
      \\/
  `;

  // Color logic
  let colorClass = 'text-[var(--crt-blue)]';
  if (status === 'DECOHERING') colorClass = 'text-yellow-400';
  if (status === 'CRITICAL') colorClass = 'text-[var(--crt-red)] animate-pulse';
  if (status === 'ENTANGLED') colorClass = 'text-purple-400';

  return (
    <div className="border border-[var(--foreground)] p-4 w-full md:w-auto bg-black/80 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,65,0.2)]">
      <h3 className="text-xs uppercase mb-2 border-b border-[var(--foreground)]/30 pb-1 tracking-widest">Subject C [Observer]</h3>
      <div className="flex gap-6 items-center">
        <pre className={`text-xs leading-none font-bold ${colorClass} whitespace-pre text-shadow-glow`}>
            {art}
        </pre>
        <div className="flex flex-col gap-1 text-xs font-mono w-full">
             <div className="flex justify-between gap-4">
                <span className="opacity-70">STATUS:</span>
                <span className={`font-bold ${colorClass}`}>{status}</span>
             </div>
             <div className="flex justify-between gap-4">
                <span className="opacity-70">COHERENCE:</span>
                <span className="font-bold">{coherence.toFixed(1)}%</span>
             </div>
             <div className="w-full bg-gray-900 h-2 mt-2 border border-[var(--foreground)]/50 relative overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ease-out ${status === 'CRITICAL' ? 'bg-[var(--crt-red)]' : 'bg-[var(--crt-blue)]'}`}
                    style={{ width: `${coherence}%` }}
                />
             </div>
        </div>
      </div>
    </div>
  );
};
