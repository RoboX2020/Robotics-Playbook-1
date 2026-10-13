import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { Chapter1 } from './Chapter1';
import { Chapter2 } from './Chapter2';
import { Chapter3 } from './Chapter3';

import { Chapter4 } from './Chapter4';
import { Chapter5 } from './Chapter5';
import { Chapter6 } from './Chapter6';
import { Chapter7 } from './Chapter7';

import { Chapter0 } from './Chapter0';
import { Chapter8 } from './Chapter8';
import { Chapter9 } from './Chapter9';
import { Chapter10 } from './Chapter10';
import { Chapter11 } from './Chapter11';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chapter-1' | 'chapter-2' | 'chapter-3' | 'chapter-4' | 'chapter-5' | 'chapter-6' | 'chapter-7' | 'chapter-0' | 'chapter-8' | 'chapter-9' | 'chapter-10' | 'chapter-11'>('dashboard');

  return (
    <div className="min-h-screen bg-transparent py-8 selection:bg-yellow-300">
      {currentView === 'dashboard' && (
        <Dashboard onSelectChapter={(id) => setCurrentView(id as 'chapter-1' | 'chapter-2' | 'chapter-3' | 'chapter-4' | 'chapter-5' | 'chapter-6' | 'chapter-7' | 'chapter-0' | 'chapter-8' | 'chapter-9' | 'chapter-10' | 'chapter-11')} />
      )}
      {currentView === 'chapter-1' && (
        <Chapter1 onBack={() => setCurrentView('dashboard')} />
      )}
      {currentView === 'chapter-2' && (
        <Chapter2 onBack={() => setCurrentView('dashboard')} />
      )}
      {currentView === 'chapter-3' && (
        <Chapter3 onBack={() => setCurrentView('dashboard')} />
      )}
      {currentView === 'chapter-4' && <Chapter4 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-5' && <Chapter5 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-6' && <Chapter6 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-7' && <Chapter7 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-0' && <Chapter0 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-8' && <Chapter8 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-9' && <Chapter9 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-10' && <Chapter10 onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'chapter-11' && <Chapter11 onBack={() => setCurrentView('dashboard')} />}
    </div>
  );
}
