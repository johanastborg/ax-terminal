import React, { useState, useEffect, useRef } from 'react';

type TerminalProps = {
  logs: string[];
  onCollapse: () => void;
};

export const Terminal: React.FC<TerminalProps> = ({ logs, onCollapse }) => {
  const [input, setInput] = useState('');
  const [localLogs, setLocalLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Sync prop logs to local logs, but we might want to keep history?
  // For now, let's just display the logs passed in + local command history if we wanted.
  // Actually, let's just render the logs passed in.

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, localLogs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    if (cmd === 'ax collapse') {
      onCollapse();
    } else if (cmd === 'help') {
        // We can't easily push to the parent's log stream if it's strictly from the hook,
        // but we can assume the parent might accept a log, or we just handle it via the hook.
        // For simplicity, this terminal is "read-only" regarding the system logs except for the collapse trigger.
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full w-full border border-[var(--foreground)] bg-black/90 p-4 font-mono text-xs md:text-sm shadow-[0_0_15px_rgba(0,255,65,0.1)]">
        <div className="mb-2 border-b border-[var(--foreground)]/30 pb-1 text-[var(--crt-blue)] uppercase tracking-wider text-xs">
            /var/log/syslog
        </div>
      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        {logs.map((log, i) => (
          <div key={i} className="text-[var(--foreground)] opacity-90 break-words font-mono">
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {log}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex border-t border-[var(--foreground)]/30 pt-2 bg-black">
        <span className="mr-2 text-[var(--crt-blue)] animate-pulse">➜</span>
        <span className="mr-2 text-[var(--foreground)]">root@asymptotic:~#</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[var(--foreground)] caret-[var(--crt-red)]"
          placeholder="Try 'ax collapse'"
          autoFocus
        />
      </form>
    </div>
  );
};
