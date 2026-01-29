'use client';

import React from 'react';
import { useAsymptoticState } from '@/hooks/useAsymptoticState';
import { CRTContainer } from '@/components/CRTContainer';
import { ASCIIStatus } from '@/components/ASCIIStatus';
import { Terminal } from '@/components/Terminal';
import { FileExplorer } from '@/components/FileExplorer';

export default function Home() {
    const { state, executeCommand } = useAsymptoticState();

    return (
        <CRTContainer coherence={state.coherence}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-[var(--foreground)]/20 pb-4 shrink-0">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-[var(--foreground)] text-shadow-glow glitch-text" data-text="Asymptotic-X">
                            Asymptotic-X
                        </h1>
                        <p className="text-xs md:text-sm text-[var(--crt-blue)] opacity-80 tracking-widest">
                            OBSERVER LAYER // TERMINAL LINK ESTABLISHED
                        </p>
                    </div>
                    <ASCIIStatus status={state.subjectCStatus} coherence={state.coherence} />
                </header>

                {/* Main Content Grid */}
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 pb-4">
                    <section className="flex flex-col h-full min-h-[300px]">
                        <h2 className="text-xs mb-2 opacity-50 uppercase tracking-wider">System Logs</h2>
                        <div className="flex-1 min-h-0">
                            <Terminal logs={state.logs} onCommand={executeCommand} />
                        </div>
                    </section>
                    <section className="flex flex-col h-full min-h-[300px]">
                        <h2 className="text-xs mb-2 opacity-50 uppercase tracking-wider">Dark Matter Vault</h2>
                        <div className="flex-1 min-h-0">
                            <FileExplorer particles={state.particles} />
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="shrink-0 flex justify-between items-end text-[10px] text-gray-600 font-mono border-t border-[var(--foreground)]/10 pt-2">
                    <span>SECURE CONNECTION: wss://sapphire-dispatch.cloud.run</span>
                    <span>UID: JULES-AGENT-001 | 55Hz RESONANCE ACTIVE</span>
                </footer>
            </div>
        </CRTContainer>
    );
}
