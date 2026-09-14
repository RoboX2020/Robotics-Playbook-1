import React, { useState } from 'react';
import { ArrowLeft, Eye, Cpu, Radio, RotateCw, Code, CheckSquare, Play, Terminal, AlertTriangle, Wrench, ShieldCheck, HelpCircle, Cable, Zap } from 'lucide-react';

interface Chapter2Props {
  onBack: () => void;
}

export function Chapter2({ onBack }: Chapter2Props) {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalOutput(['$ arduino-cli compile --fqbn arduino:avr:uno auto_gate.ino', 'Compiling sketch...']);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, 'Sketch uses 2,054 bytes (6%) of program storage space.', 'Global variables use 37 bytes (1%) of dynamic memory.']);
    }, 1000);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '$ arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno auto_gate.ino', 'Connecting to programmer...', 'Uploading...']);
    }, 2000);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, 'Upload successful!', 'avrdude done.  Thank you.', '', '🚧 Gate system ready — wave your hand in front of the sensor!']);
      setIsRunning(false);
    }, 3500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* ───────── HEADER ───────── */}
      <header className="mb-12">
        <div className="inline-block bg-[#4D96FF] text-white border-4 border-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Chapter 02
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase underline decoration-[#4D96FF]">Sense the World! 👁️</h1>
        <p className="text-lg font-bold">
          Time to give your robot a superpower — the ability to <em>see</em>! You'll build an automatic gate that opens
          when an object approaches and closes when it leaves. Along the way you'll learn how a robot reads an input,
          makes a decision, and controls an output.
        </p>
      </header>

      {/* ───────── LEARNING OBJECTIVES ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">🎯</span> Learning Objectives
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(77,150,255,1)]">
          <ul className="space-y-3">
            {[
              'Identify the Arduino Uno R3 power pins, ground pins, and digital I/O pins.',
              'Connect an IR obstacle sensor module and a servo motor safely.',
              'Explain why all parts in one circuit need a common ground.',
              'Upload and test Arduino code that reads a sensor and moves a servo.',
              'Troubleshoot common wiring, power, and sensor logic problems.',
            ].map((obj, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-3 border-4 border-black rounded-xl">
                <span className="bg-[#4D96FF] text-white font-black text-sm w-8 h-8 flex items-center justify-center rounded-full border-2 border-black shrink-0">{i + 1}</span>
                <span className="font-medium">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── CORE CONCEPTS ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Eye className="w-6 h-6 text-[#4D96FF]" /> Core Concepts
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(77,150,255,1)]">
          <ul className="space-y-4">
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">🧠</span>
              <div>
                <strong className="text-xl block">Arduino Uno R3</strong>
                <span>The brain of the project. It runs your program, reads the IR sensor on a digital pin, and sends a control signal to the servo motor.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">👁️</span>
              <div>
                <strong className="text-xl block">IR Sensor Module</strong>
                <span>Has an infrared LED and a receiver. When an object reflects infrared light back, the module changes its OUT signal. Most modules output <strong>LOW</strong> when an object is detected, but some output HIGH.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">⚙️</span>
              <div>
                <strong className="text-xl block">Servo Motor (SG90)</strong>
                <span>A motor that can move to a chosen angle, usually 0° to 180°. It has three wires: <strong>power</strong> (red), <strong>ground</strong> (brown/black), and <strong>signal</strong> (orange/yellow).</span>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">🔀</span>
              <div>
                <strong className="text-xl block">Digital Input & Output</strong>
                <span>A digital pin reads or writes two states: HIGH or LOW. Pin 2 reads the sensor; Pin 9 sends the timed signal that controls the servo position.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">⏚</span>
              <div>
                <strong className="text-xl block">Common Ground</strong>
                <span>All connected parts must share the same ground reference. Without it, the Arduino and modules may not agree on what HIGH and LOW mean, causing random behaviour.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ───────── PARTS LIST ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Wrench className="w-6 h-6 text-[#FF6B6B]" /> The Parts List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-blue-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Arduino Uno R3</h3>
              <p className="text-sm font-medium">Main controller board + USB cable.</p>
            </div>
          </div>

          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-purple-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Radio className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">IR Sensor Module</h3>
              <p className="text-sm font-medium">Detects objects using reflected infrared light.</p>
            </div>
          </div>

          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-orange-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <RotateCw className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Servo Motor (SG90)</h3>
              <p className="text-sm font-medium">Moves the gate arm from closed to open.</p>
            </div>
          </div>

          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-green-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Cable className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Jumper Wires (6+)</h3>
              <p className="text-sm font-medium">Male-to-female wires to connect modules to pins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CIRCUIT DIAGRAM ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">🔌</span> The Wiring Diagram
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
          <p className="text-lg font-bold mb-4">Follow the connections carefully!</p>

          {/* CONNECTION TABLE */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-4 border-black text-sm font-medium">
              <thead>
                <tr className="bg-black text-white text-left">
                  <th className="p-3 font-black uppercase tracking-wide">Component Terminal</th>
                  <th className="p-3 font-black uppercase tracking-wide">→ Arduino Pin</th>
                  <th className="p-3 font-black uppercase tracking-wide">What It Does</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['IR Sensor VCC', '5V', 'Provides power to the IR sensor'],
                  ['IR Sensor GND', 'GND', 'Completes the circuit, shares ground'],
                  ['IR Sensor OUT', 'Digital Pin 2', 'Sends HIGH/LOW reading to Arduino'],
                  ['Servo Red Wire', '5V', 'Provides servo power (SG90)'],
                  ['Servo Brown/Black', 'GND', 'Servo ground — must connect to Arduino GND'],
                  ['Servo Orange/Yellow', 'Digital Pin 9', 'Receives the servo control signal'],
                ].map(([terminal, pin, desc], i) => (
                  <tr key={i} className={`border-t-2 border-black ${i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                    <td className="p-3 font-bold">{terminal}</td>
                    <td className="p-3"><code className="bg-black text-white px-2 py-0.5 rounded text-xs font-bold">{pin}</code></td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SVG CIRCUIT DIAGRAM */}
          <div className="bg-white border-4 border-black rounded-xl p-6 md:p-8 relative min-h-[350px] flex items-center justify-center">
            <svg viewBox="0 0 520 280" className="w-full max-w-2xl drop-shadow-md">
              {/* Arduino board */}
              <rect x="20" y="60" width="120" height="160" rx="12" fill="#0ea5e9" stroke="#000" strokeWidth="4" />
              <text x="40" y="145" fontFamily="monospace" fontWeight="bold" fill="#fff" fontSize="20">UNO</text>
              <text x="40" y="165" fontFamily="monospace" fontWeight="bold" fill="#fff" fontSize="10">R3</text>

              {/* Arduino pins */}
              <circle cx="130" cy="90" r="5" fill="#000" />
              <text x="85" y="95" fontSize="10" fontWeight="bold" fill="#fff">5V</text>

              <circle cx="130" cy="115" r="5" fill="#000" />
              <text x="85" y="120" fontSize="10" fontWeight="bold" fill="#fff">GND</text>

              <circle cx="130" cy="145" r="5" fill="#000" />
              <text x="85" y="150" fontSize="10" fontWeight="bold" fill="#fff">Pin 2</text>

              <circle cx="130" cy="185" r="5" fill="#000" />
              <text x="85" y="190" fontSize="10" fontWeight="bold" fill="#fff">Pin 9</text>

              {/* IR Sensor module */}
              <rect x="280" y="30" width="100" height="80" rx="8" fill="#a855f7" stroke="#000" strokeWidth="4" />
              <text x="293" y="65" fontFamily="monospace" fontWeight="bold" fill="#fff" fontSize="12">IR Sensor</text>
              <text x="303" y="82" fontFamily="monospace" fill="#fff" fontSize="9">Module</text>
              {/* IR emitter/receiver dots */}
              <circle cx="310" cy="100" r="4" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <circle cx="340" cy="100" r="4" fill="#1e293b" stroke="#000" strokeWidth="2" />

              {/* IR sensor labels */}
              <text x="285" y="25" fontSize="9" fontWeight="bold" fill="#666">VCC  GND  OUT</text>
              <circle cx="295" cy="30" r="3" fill="#ef4444" />
              <circle cx="320" cy="30" r="3" fill="#000" />
              <circle cx="350" cy="30" r="3" fill="#4D96FF" />

              {/* Servo motor */}
              <rect x="280" y="160" width="100" height="80" rx="8" fill="#f97316" stroke="#000" strokeWidth="4" />
              <text x="295" y="200" fontFamily="monospace" fontWeight="bold" fill="#fff" fontSize="12">SERVO</text>
              <text x="303" y="218" fontFamily="monospace" fill="#fff" fontSize="9">SG90</text>
              {/* Servo horn */}
              <line x1="370" y1="200" x2="400" y2="200" stroke="#000" strokeWidth="4" strokeLinecap="round" />
              <circle cx="370" cy="200" r="6" fill="#fff" stroke="#000" strokeWidth="3" />

              {/* Servo labels */}
              <text x="282" y="155" fontSize="9" fontWeight="bold" fill="#666">RED  BLK  SIG</text>
              <circle cx="293" cy="160" r="3" fill="#ef4444" />
              <circle cx="320" cy="160" r="3" fill="#000" />
              <circle cx="350" cy="160" r="3" fill="#f59e0b" />

              {/* Wires — 5V (red) */}
              <path d="M130 90 Q200 50 295 30" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="6,3" />
              <path d="M130 90 Q200 130 293 160" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="6,3" />

              {/* Wires — GND (black) */}
              <path d="M130 115 Q210 70 320 30" stroke="#000" strokeWidth="3" fill="none" />
              <path d="M130 115 Q210 145 320 160" stroke="#000" strokeWidth="3" fill="none" />

              {/* Wire — IR OUT to Pin 2 (blue) */}
              <path d="M130 145 Q220 120 350 30" stroke="#4D96FF" strokeWidth="3" fill="none" strokeDasharray="8,4" />

              {/* Wire — Servo SIG to Pin 9 (yellow) */}
              <path d="M130 185 Q220 200 350 160" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="8,4" />

              {/* Legend */}
              <rect x="410" y="40" width="100" height="100" rx="6" fill="#f8fafc" stroke="#000" strokeWidth="2" />
              <text x="425" y="58" fontSize="10" fontWeight="bold">Legend</text>
              <line x1="420" y1="72" x2="440" y2="72" stroke="#ef4444" strokeWidth="3" strokeDasharray="4,2" />
              <text x="445" y="76" fontSize="9">5V Power</text>
              <line x1="420" y1="92" x2="440" y2="92" stroke="#000" strokeWidth="3" />
              <text x="445" y="96" fontSize="9">Ground</text>
              <line x1="420" y1="112" x2="440" y2="112" stroke="#4D96FF" strokeWidth="3" strokeDasharray="6,3" />
              <text x="445" y="116" fontSize="9">IR OUT</text>
              <line x1="420" y1="132" x2="440" y2="132" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,3" />
              <text x="445" y="136" fontSize="9">Servo SIG</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ───────── IMPORTANT WIRING POINTS ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-[#FFD700]" /> Important Wiring Points
        </h2>
        <div className="doodle-card p-6 bg-[#FFF9DB] shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
          <ul className="space-y-3">
            {[
              { emoji: '⏚', text: 'Common grounding is required — Arduino GND, IR sensor GND, and servo GND must all connect together.' },
              { emoji: '🔍', text: 'Check terminals before powering: VCC → 5V, GND → GND, OUT/SIG → digital pin.' },
              { emoji: '🚫', text: 'Do NOT connect VCC directly to GND. That creates a short circuit and can damage your board!' },
              { emoji: '🔌', text: 'Small SG90 servos can run from Arduino 5V for a demo. Larger servos need a separate 5V supply.' },
              { emoji: '🔗', text: 'If using a separate servo supply, connect supply negative to both servo GND and Arduino GND.' },
              { emoji: '📌', text: 'Pin 9 is used for the servo signal because it supports PWM and is common in servo examples.' },
              { emoji: '🔧', text: 'The IR sensor may have a small potentiometer screw — turning it adjusts detection distance.' },
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-3 border-4 border-black rounded-xl">
                <span className="text-2xl shrink-0">{point.emoji}</span>
                <span className="font-medium">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── CODE ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Code className="w-6 h-6 text-[#6BCB77]" /> The Code
        </h2>

        <div className="mb-6 doodle-card p-6 bg-[#4D96FF]/10 border-4 border-black border-dashed">
          <h3 className="text-lg font-black uppercase mb-2">Build with Blocks or AI</h3>
          <p className="font-bold text-sm mb-4">Want to drag-and-drop your code or let AI help you write it? Design your own logic without typing!</p>
          <a href="https://thestempedia.com/product/pictoblox/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-black text-white font-black uppercase text-xs rounded hover:bg-gray-800 transition-colors">
            Open PictoBlox
          </a>
        </div>

        <div className="doodle-card p-0 bg-[#1A1A1A] text-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          {/* Header */}
          <div className="bg-black p-4 border-b-4 border-black flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF6B6B] border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-[#FFD700] border-2 border-black"></div>
              <div className="w-4 h-4 rounded-full bg-[#6BCB77] border-2 border-black"></div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] px-2 py-1 bg-white/10 rounded border border-white/20 font-bold uppercase tracking-widest hidden sm:inline-block">auto_gate.ino</span>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-2 bg-[#6BCB77] text-black px-3 py-1.5 rounded font-black text-xs uppercase hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-none"
              >
                <Play className="w-3 h-3 fill-black" /> {isRunning ? 'Running...' : 'Run / Upload'}
              </button>
            </div>
          </div>

          {/* Code Area */}
          <div className="p-4 overflow-x-auto border-b-4 border-black font-mono text-sm leading-relaxed bg-[#1A1A1A] relative">
            <div className="flex">
              <div className="text-gray-600 text-right select-none pr-4 border-r-2 border-gray-800 flex flex-col mr-4">
                {Array.from({ length: 26 }).map((_, i) => (
                  <span key={i + 1}>{i + 1}</span>
                ))}
              </div>
              <div className="flex-1">
                <pre className="m-0 p-0 overflow-visible"><span className="text-[#FF6B6B]">#include</span> <span className="text-[#6BCB77]">&lt;Servo.h&gt;</span>
{'\n'}
<span className="text-[#FF6B6B]">const int</span> irSensorPin = <span className="text-purple-400">2</span>;   <span className="text-gray-500">// IR sensor OUT → digital pin 2</span>
<span className="text-[#FF6B6B]">const int</span> servoPin = <span className="text-purple-400">9</span>;      <span className="text-gray-500">// Servo signal → digital pin 9</span>
{'\n'}
<span className="text-[#4D96FF]">Servo</span> gateServo;
{'\n'}
<span className="text-gray-500">// Most IR modules output LOW when object detected.</span>
<span className="text-gray-500">// Change LOW to HIGH if yours works backwards.</span>
<span className="text-[#FF6B6B]">const int</span> objectDetectedState = <span className="text-[#6BCB77]">LOW</span>;
{'\n'}
<span className="text-[#FF6B6B]">void</span> <span className="text-[#4D96FF]">setup</span>() {'{'}
  <span className="text-[#FFD700]">pinMode</span>(irSensorPin, <span className="text-[#6BCB77]">INPUT</span>);
  gateServo.<span className="text-[#FFD700]">attach</span>(servoPin);
  gateServo.<span className="text-[#FFD700]">write</span>(<span className="text-purple-400">0</span>);        <span className="text-gray-500">// Start position: closed</span>
  <span className="text-[#FFD700]">delay</span>(<span className="text-purple-400">500</span>);
{'}'}
{'\n'}
<span className="text-[#FF6B6B]">void</span> <span className="text-[#4D96FF]">loop</span>() {'{'}
  <span className="text-[#FF6B6B]">int</span> sensorValue = <span className="text-[#FFD700]">digitalRead</span>(irSensorPin);
{'\n'}
  <span className="text-[#FF6B6B]">if</span> (sensorValue == objectDetectedState) {'{'}
    gateServo.<span className="text-[#FFD700]">write</span>(<span className="text-purple-400">90</span>);     <span className="text-gray-500">// Open the gate</span>
    <span className="text-[#FFD700]">delay</span>(<span className="text-purple-400">1000</span>);             <span className="text-gray-500">// Hold 1 second</span>
  {'}'} <span className="text-[#FF6B6B]">else</span> {'{'}
    gateServo.<span className="text-[#FFD700]">write</span>(<span className="text-purple-400">0</span>);      <span className="text-gray-500">// Close the gate</span>
  {'}'}
  <span className="text-[#FFD700]">delay</span>(<span className="text-purple-400">50</span>);                 <span className="text-gray-500">// Stable reading delay</span>
{'}'}</pre>
              </div>
            </div>
          </div>

          {/* Terminal Area */}
          <div className="bg-black p-4 font-mono text-xs h-48 overflow-y-auto">
            <div className="flex items-center gap-2 text-gray-500 mb-3 border-b border-gray-800 pb-2">
              <Terminal className="w-4 h-4" />
              <span className="uppercase font-bold tracking-widest text-[10px]">Terminal Output</span>
            </div>
            {terminalOutput.length === 0 ? (
              <div className="text-gray-600 flex items-center h-full justify-center pb-8 opacity-50">
                Click "Run / Upload" to simulate compiling and flashing the Arduino.
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className={`${line.includes('Error') ? 'text-red-400' : line.includes('successful') || line.includes('Gate system') ? 'text-[#6BCB77]' : 'text-gray-300'}`}>
                    {line}
                  </div>
                ))}
                {isRunning && <div className="text-gray-500 animate-pulse mt-1">_</div>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── HOW THE CODE WORKS ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">🧮</span> How the Code Works
        </h2>
        <div className="doodle-card p-6 md:p-8 bg-[#FAFAFA] shadow-[8px_8px_0px_0px_rgba(107,203,119,1)] relative overflow-hidden">
          <div className="absolute -right-8 -top-8 opacity-10">
            <span className="text-9xl">IF</span>
          </div>
          <ol className="list-decimal pl-6 space-y-3 font-medium text-lg">
            <li>The <code className="bg-black text-white px-2 py-0.5 rounded text-sm">Servo.h</code> library is included so Arduino can control the servo easily.</li>
            <li>IR sensor OUT → <strong>digital pin 2</strong>. Servo signal → <strong>digital pin 9</strong>.</li>
            <li>In <code className="bg-black text-white px-2 py-0.5 rounded text-sm">setup()</code>, pin 2 is set as INPUT, the servo attaches to pin 9, and the gate starts closed (0°).</li>
            <li>In <code className="bg-black text-white px-2 py-0.5 rounded text-sm">loop()</code>, Arduino reads the sensor value every cycle.</li>
            <li>If an object is detected → servo moves to <strong>90°</strong> (gate opens).</li>
            <li>If no object → servo moves back to <strong>0°</strong> (gate closes).</li>
            <li>A small 50ms delay keeps readings stable.</li>
          </ol>
        </div>
      </section>

      {/* ───────── LAB PROCEDURE ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">🔬</span> Lab Procedure
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(77,150,255,1)]">
          <ol className="list-decimal pl-6 space-y-3 font-medium text-lg">
            <li>Place the Arduino on the table <strong>without</strong> connecting USB power yet.</li>
            <li>Connect IR sensor VCC → Arduino <strong>5V</strong>.</li>
            <li>Connect IR sensor GND → Arduino <strong>GND</strong>.</li>
            <li>Connect IR sensor OUT → Arduino <strong>digital pin 2</strong>.</li>
            <li>Connect servo red wire → Arduino <strong>5V</strong>.</li>
            <li>Connect servo brown/black wire → Arduino <strong>GND</strong>.</li>
            <li>Connect servo orange/yellow wire → Arduino <strong>digital pin 9</strong>.</li>
            <li>Attach the servo horn and optional cardboard gate arm.</li>
            <li>Connect the Arduino to computer via USB.</li>
            <li>Open Arduino IDE, paste the code, select <strong>Arduino Uno</strong> and the correct port, then upload.</li>
            <li>Move an object in front of the IR sensor and <strong>observe the servo motion!</strong> 🎉</li>
          </ol>
        </div>
      </section>

      {/* ───────── EXPECTED RESULT ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">✅</span> Expected Result
        </h2>
        <div className="doodle-card p-6 bg-[#6BCB77]/20 shadow-[8px_8px_0px_0px_rgba(107,203,119,1)]">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🚧</span>
            <div>
              <p className="font-bold text-lg mb-2">When no object is in front of the IR sensor, the servo stays at 0° (gate closed).</p>
              <p className="font-bold text-lg mb-2">When an object is detected, the servo turns to 90° for about one second (gate opens).</p>
              <p className="font-medium text-gray-700">If the sensor behaves the opposite way, change <code className="bg-black text-white px-2 py-0.5 rounded text-sm">objectDetectedState</code> from <code className="bg-black text-white px-2 py-0.5 rounded text-sm">LOW</code> to <code className="bg-black text-white px-2 py-0.5 rounded text-sm">HIGH</code> in the code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TROUBLESHOOTING ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-[#FF6B6B]" /> Troubleshooting
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,107,107,1)]">
          <div className="overflow-x-auto">
            <table className="w-full border-4 border-black text-sm font-medium">
              <thead>
                <tr className="bg-black text-white text-left">
                  <th className="p-3 font-black uppercase tracking-wide">Problem</th>
                  <th className="p-3 font-black uppercase tracking-wide">Likely Cause</th>
                  <th className="p-3 font-black uppercase tracking-wide">Fix</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Servo does not move', 'Wrong power/ground/signal wire', 'Check red→5V, brown/black→GND, signal→pin 9'],
                  ['Sensor light changes but no servo reaction', 'OUT wire or code pin mismatch', 'Verify IR OUT goes to digital pin 2'],
                  ['Servo jitters or Arduino resets', 'Servo drawing too much current', 'Use separate 5V supply; connect grounds together'],
                  ['Servo moves opposite of expected', 'Sensor output logic is reversed', 'Change objectDetectedState from LOW to HIGH'],
                  ['Sensor detects too far or too near', 'Sensitivity needs adjustment', 'Turn the small potentiometer slowly and retest'],
                  ['Nothing works after wiring', 'No common ground or loose jumper', 'Reconnect all GND wires; press jumpers firmly'],
                ].map(([problem, cause, fix], i) => (
                  <tr key={i} className={`border-t-2 border-black ${i % 2 === 0 ? 'bg-red-50' : 'bg-white'}`}>
                    <td className="p-3 font-bold">{problem}</td>
                    <td className="p-3">{cause}</td>
                    <td className="p-3">{fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ───────── SAFETY ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#6BCB77]" /> Safety & Good Practice
        </h2>
        <div className="doodle-card p-6 bg-[#6BCB77]/10 shadow-[8px_8px_0px_0px_rgba(107,203,119,1)]">
          <ul className="space-y-3">
            {[
              '✅ Always check wiring before plugging in USB power.',
              '✅ Keep metal objects away from exposed pins.',
              '✅ Do not force the servo horn by hand while powered.',
              '✅ Disconnect power before changing wires.',
              '✅ Use colour coding: red for 5V, black/brown for GND, another colour for signal.',
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3 bg-white p-3 border-4 border-black rounded-xl font-bold">
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── EXERCISES ───────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-black" /> Your Turn! (Exercises)
        </h2>
        <div className="space-y-6">
          <div className="doodle-card p-6 bg-[#4D96FF] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
              <span className="text-2xl">🚗</span> Exercise 1: Parking Garage
            </h3>
            <p className="font-bold text-sm">
              Add a second IR sensor on digital pin 3 for the exit. Open the gate for either sensor,
              and only close when <em>both</em> sensors show no object. (Hint: use <code>||</code> in your <code>if</code> condition.)
            </p>
          </div>

          <div className="doodle-card p-6 bg-[#FF6B6B] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
              <span className="text-2xl">💡</span> Exercise 2: Add an LED Indicator
            </h3>
            <p className="font-bold text-sm">
              Connect a green LED to pin 7 with a 220Ω resistor. Light it up when the gate is open,
              turn it off when closed. (Hint: use <code>digitalWrite(7, HIGH)</code> inside the <code>if</code> block.)
            </p>
          </div>

          <div className="doodle-card p-6 bg-[#6BCB77] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
              <span className="text-2xl">🎵</span> Exercise 3: Buzzer Alert
            </h3>
            <p className="font-bold text-sm">
              Add a piezo buzzer on pin 8. Play a short beep (<code>tone(8, 1000, 200)</code>) when an object
              is first detected. Make sure the buzzer only beeps once per detection, not continuously!
            </p>
          </div>
        </div>
      </section>

      {/* ───────── QUICK STUDENT CHECK ───────── */}
      <section>
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-[#FFD700]" /> Quick Student Check
        </h2>
        <div className="doodle-card p-6 bg-[#FFD700]/20 shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
          <ol className="list-decimal pl-6 space-y-4 font-bold text-lg">
            <li>What is the job of the IR sensor in this project?</li>
            <li>Which Arduino pin reads the IR sensor output?</li>
            <li>Which Arduino pin controls the servo signal?</li>
            <li>Why do the Arduino, sensor, and servo need common ground?</li>
            <li>What should you change in the code if the servo opens when no object is present?</li>
          </ol>
        </div>
      </section>

      <div className="mt-16 text-center">
        <button
          onClick={onBack}
          className="doodle-button w-full"
        >
          Finish Chapter 02
        </button>
      </div>
    </div>
  );
}
