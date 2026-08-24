import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { Chapter1 } from './Chapter1';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chapter-1'>('dashboard');

  return (
    <div className="min-h-screen bg-transparent py-8 selection:bg-yellow-300">
      {currentView === 'dashboard' && (
        <Dashboard onSelectChapter={(id) => setCurrentView(id as 'chapter-1')} />
      )}
      {currentView === 'chapter-1' && (
        <Chapter1 onBack={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
}
