import { useState, useEffect, useCallback } from 'react';

export type Particle = {
  id: string;
  name: string;
  mass: number; // 0-1
  type: 'file' | 'dir';
};

export type AsymptoticState = {
  coherence: number;
  particles: Particle[];
  logs: string[];
  subjectCStatus: 'STABLE' | 'DECOHERING' | 'CRITICAL' | 'ENTANGLED';
};

const INITIAL_STATE: AsymptoticState = {
  coherence: 100.0,
  particles: [],
  logs: ['> CONNECTING TO SAPPHIRE DISPATCHER...', '> ESTABLISHING QUANTUM TUNNEL...'],
  subjectCStatus: 'STABLE',
};

export const useAsymptoticState = () => {
  const [state, setState] = useState<AsymptoticState>(INITIAL_STATE);

  // Simulate WebSocket stream
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate coherence fluctuation
      const coherenceDelta = (Math.random() - 0.5) * 5;

      setState(prev => {
        let newCoherence = Math.max(0, Math.min(100, prev.coherence + coherenceDelta));

        // Randomly add a log
        let newLogs = prev.logs;
        if (Math.random() > 0.9) {
           const messages = [
             '> DETECTED 55HZ RESONANCE',
             '> WAVEFUNCTION COLLAPSE IMMINENT',
             '> PACKET LOSS IN DARK MATTER VAULT',
             '> UPDATING SAPPHIRE CORE...',
             '> NISNEUMANN ENGINE SYNCED'
           ];
           newLogs = [...prev.logs, messages[Math.floor(Math.random() * messages.length)]].slice(-20);
        }

        let newStatus: AsymptoticState['subjectCStatus'] = 'STABLE';
        if (newCoherence < 30) newStatus = 'CRITICAL';
        else if (newCoherence < 60) newStatus = 'DECOHERING';
        else if (newCoherence < 80) newStatus = 'ENTANGLED';

        return {
          ...prev,
          coherence: newCoherence,
          logs: newLogs,
          subjectCStatus: newStatus
        };
      });

    }, 800);

    // Initial mock file load
    setTimeout(() => {
        setState(prev => ({
            ...prev,
            particles: [
                { id: '1', name: 'manifest.json', mass: 0.1, type: 'file' },
                { id: '2', name: 'core_dump.bin', mass: 0.8, type: 'file' },
                { id: '3', name: '/mnt/dark-matter', mass: 1.0, type: 'dir' },
                { id: '4', name: 'entropy_logs.txt', mass: 0.3, type: 'file' },
                { id: '5', name: 'ghost_in_shell.sh', mass: 0.5, type: 'file' },
                { id: '6', name: 'sapphire.lock', mass: 0.9, type: 'file' },
            ],
            logs: [...prev.logs, '> FILESYSTEM MOUNTED: /mnt/dark-matter']
        }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const collapse = useCallback(() => {
      setState(prev => ({
          ...prev,
          coherence: 100,
          logs: [...prev.logs, '> AX COLLAPSE INITIATED: STATE RESTORED']
      }));
  }, []);

  return { state, collapse };
};
