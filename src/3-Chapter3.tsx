import { CircuitDiagram } from './CircuitDiagram';
import { circuits } from './circuits';
import React from 'react';
import { ArrowLeft, Wifi, Zap, Cpu, Activity, Wrench, CheckSquare, AlertTriangle, Code } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export const codeChapter3 = `// ESP8266 NodeMCU 1.0 + L298N. WiFi/Blynk, NOT Bluetooth.
#define BLYNK_TEMPLATE_ID "YOUR_TEMPLATE_ID"
#define BLYNK_TEMPLATE_NAME "WiFi control car"
#define BLYNK_AUTH_TOKEN "YOUR_DEVICE_AUTH_TOKEN"
#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
const byte ENA = D7, ENB = D0;
const byte IN1 = D1, IN2 = D2, IN3 = D5, IN4 = D6;
char ssid[] = "YOUR_2_4_GHZ_WIFI";
char pass[] = "YOUR_WIFI_PASSWORD";
int x = 50, y = 50, Speed = 0;
unsigned long lastCommand = 0, lastReconnect = 0;
const unsigned long commandTimeout = 500;
bool haveCommand = false;
void stopCar() {
  analogWrite(ENA, 0); analogWrite(ENB, 0);
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}
// Match Simple-mode integer datastreams V0 and V1, each 0..100.
BLYNK_WRITE(V0) { x = constrain(param.asInt(), 0, 100); lastCommand = millis(); haveCommand = true; }
BLYNK_WRITE(V1) { y = constrain(param.asInt(), 0, 100); lastCommand = millis(); haveCommand = true; }
BLYNK_WRITE(V2) { Speed = constrain(param.asInt(), 0, 255); }
BLYNK_CONNECTED() {
  // Never restore old motion on reconnect. Move joystick again to drive.
  x = y = 50; Speed = 0; haveCommand = false; stopCar();
  Blynk.virtualWrite(V0, 50); Blynk.virtualWrite(V1, 50); Blynk.virtualWrite(V2, 0);
}
void setup() {
  Serial.begin(115200);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  analogWriteRange(255); // Consistent with old and new ESP8266 cores.
  stopCar();
  WiFi.mode(WIFI_STA); WiFi.begin(ssid, pass);
  Blynk.config(BLYNK_AUTH_TOKEN);
}
void loop() {
  if (WiFi.status() != WL_CONNECTED || !Blynk.connected()) {
    stopCar(); haveCommand = false;
    if (WiFi.status() == WL_CONNECTED && millis() - lastReconnect >= 5000) {
      lastReconnect = millis(); Blynk.connect(50); // Bounded reconnect, motors off.
    }
    delay(1); return;
  }
  Blynk.run();
  if (!haveCommand || millis() - lastCommand >= commandTimeout || Speed == 0) {
    stopCar(); delay(1); return;
  }
  // Boundaries 30 and 70 are neutral; no stale direction at equality.
  int left = 0, right = 0;
  if (y > 70) { left = 1; right = 1; }
  else if (y < 30) { left = -1; right = -1; }
  else if (x < 30) { left = -1; right = 1; }
  else if (x > 70) { left = 1; right = -1; }
  else { stopCar(); delay(1); return; }
  // Disable bridge before changing direction.
  analogWrite(ENA, 0); analogWrite(ENB, 0);
  digitalWrite(IN1, left > 0 ? HIGH : LOW); digitalWrite(IN2, left < 0 ? HIGH : LOW);
  digitalWrite(IN3, right > 0 ? HIGH : LOW); digitalWrite(IN4, right < 0 ? HIGH : LOW);
  analogWrite(ENA, Speed); analogWrite(ENB, Speed);
  delay(1);
}`;

interface Chapter3Props {
  onBack: () => void;
}

export function Chapter3({ onBack }: Chapter3Props) {
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
        <div className="inline-block bg-[#FF6B6B] text-white border-4 border-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Chapter 03
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase underline decoration-[#FF6B6B]">Move It! 🚗</h1>
        <p className="text-lg font-bold">
          Welcome to Chapter 3! Now that you've mastered the basics of electronics, it's time to build something that moves. In this chapter, we will build a smart, wireless-controlled car. 
        </p>
        <div className="mt-4 p-4 bg-yellow-100 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3">
           <AlertTriangle className="w-6 h-6 shrink-0 text-yellow-600" />
           <p className="font-medium text-sm">
             <strong>A Quick Note on Wireless Tech:</strong> Many beginner robotic cars use Bluetooth for local control. However, for this project, we are stepping into the world of <strong>IoT (Internet of Things)</strong>! We will use the <strong>ESP8266 NodeMCU</strong> microcontroller and the <strong>Blynk</strong> platform to control our car via <strong>WiFi</strong>. ESP8266 has no built-in Bluetooth. Blynk IoT uses WiFi and a cloud account, not phone Bluetooth pairing. Use a 2.4GHz network without a captive portal. Only test locally with the car in sight; internet control is not a safe remote-driving system.
           </p>
        </div>
      </header>

      {/* Parts List */}
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
              <h3 className="font-bold text-xl">ESP8266 NodeMCU</h3>
              <p className="text-sm font-medium">The brain of our car, featuring built-in WiFi capabilities.</p>
            </div>
          </div>
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-red-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Activity className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">L298N Motor Driver</h3>
              <p className="text-sm font-medium">Takes weak signals and uses them to switch high-power electricity to the motors.</p>
            </div>
          </div>
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-yellow-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">DC Gear Motors</h3>
              <p className="text-sm font-medium">Convert electrical energy into mechanical movement.</p>
            </div>
          </div>
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-green-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <span className="text-2xl">🔋</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">Li-ion Batteries</h3>
              <p className="text-sm font-medium">Use an instructor-approved protected pack, switch and fuse matched to the motors. Two Li-ion cells are 7.4V nominal but 8.4V fully charged, not a regulated 7.4V supply. Never assemble or charge loose cells in this beginner lab.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#FFD700]" /> Circuit Diagram and Wiring
        </h2>
        <div className="doodle-card p-6 bg-white overflow-hidden">
          <div className="p-4 border-4 border-black rounded-xl mb-6 font-mono text-sm space-y-2" role="img" aria-label="Car connection diagram">
            <p>NodeMCU D7 → ENA; D0 → ENB</p><p>D1 → IN1; D2 → IN2; D5 → IN3; D6 → IN4</p>
            <p>OUT1/OUT2 → left motor; OUT3/OUT4 → right motor</p>
            <p>Approved motor pack + → driver VS; pack - → driver GND</p>
            <p>USB power bank → NodeMCU USB; NodeMCU GND → driver GND</p>
            <p>Remove ENA/ENB jumpers. Add 10kΩ from each EN to GND.</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Power Connections</h3>
              <ul className="list-disc list-inside font-medium space-y-1">
                <li>Keep power off while wiring. Use the protected motor pack approved by your instructor; check its fully charged voltage against motor and driver ratings.</li>
                <li>Connect the <strong>Positive (Red)</strong> wire to the <strong>12V</strong> terminal on the L298N.</li>
                <li>Connect the <strong>Negative (Black)</strong> wire to the <strong>GND</strong> terminal on the L298N.</li>
                <li>Power NodeMCU through USB from a separate USB power bank. Do not connect the L298N 5V terminal to NodeMCU VIN or 3V3 in this lesson.</li>
                <li>Connect driver GND to NodeMCU GND. The L298N module logic requires 5V: use its documented onboard regulator only within that board's stated voltage range, or a separate regulated 5V logic supply with its regulator jumper removed. Never feed an output regulator from another supply.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Motor Connections</h3>
              <ul className="list-disc list-inside font-medium space-y-1">
                <li><strong>Motor 1 (Left):</strong> Connect to the <strong>OUT1</strong> and <strong>OUT2</strong> terminals.</li>
                <li><strong>Motor 2 (Right):</strong> Connect to the <strong>OUT3</strong> and <strong>OUT4</strong> terminals.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Logic Connections (ESP8266 to L298N)</h3>
              <ul className="list-disc list-inside font-medium space-y-1">
                <li><strong>ENA</strong> &rarr; <strong>D7</strong></li>
                <li><strong>IN1</strong> &rarr; <strong>D1</strong></li>
                <li><strong>IN2</strong> &rarr; <strong>D2</strong></li>
                <li><strong>IN3</strong> &rarr; <strong>D5</strong></li>
                <li><strong>IN4</strong> &rarr; <strong>D6</strong></li>
                <li><strong>ENB</strong> &rarr; <strong>D0</strong></li>
              <li>Remove ENA and ENB jumpers before PWM wiring; otherwise a jumper may hold the enable pin at 5V. Add a 10kΩ pull-down from each enable input to GND to keep motors off during reset. ESP8266 GPIO must never receive 5V.</li>
                <li>D3 and D4 are boot-sensitive pins, so this revised map leaves them unused. The L298 has a voltage drop; verify motor stall current and heat instead of treating its headline current rating as a safe module limit.</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-100 border-4 border-black rounded-xl">
              <p className="font-bold">How does it go in reverse?</p>
              <p className="text-sm">The L298N uses an internal circuit called an <strong>H-Bridge</strong>. By changing the logic signals on IN1 and IN2 (e.g., from HIGH/LOW to LOW/HIGH), the H-Bridge flips the polarity of the electricity going to the motor, making it spin backward!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blynk App Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Wifi className="w-6 h-6 text-[#4D96FF]" /> Setting Up Blynk
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(77,150,255,1)]">
           <p className="font-medium mb-4">Blynk makes it easy to build apps that talk to microcontrollers over the internet using <strong>Virtual Pins</strong>.</p>
           
           <h3 className="text-lg font-black uppercase mb-2">Step 1: Web Dashboard</h3>
           <ol className="list-decimal list-inside font-medium space-y-2 mb-6">
             <li>Use your Blynk IoT account. Check whether the required widgets are included in your plan; do not start a paid subscription for this lesson.</li>
             <li>Create a <strong>New Template</strong> named "WiFi control car" (Hardware: ESP8266).</li>
             <li>Create three <strong>Virtual Pin</strong> datastreams:
                <ul className="list-disc list-inside ml-6 mt-1 text-sm text-gray-700">
                  <li><code>X</code> on pin <code>V0</code> (integer 0-100, default 50)</li>
                  <li><code>Y</code> on pin <code>V1</code> (integer 0-100, default 50)</li>
                  <li><code>Speed</code> on pin <code>V2</code> (0-255)</li>
                </ul>
             </li>
             <li>Create a <strong>New Device</strong> from this template and copy its Template ID, Template Name and device Auth Token into the three definitions at the top of the sketch. Keep token and WiFi password private; never post a filled sketch.</li>
           </ol>

           <h3 className="text-lg font-black uppercase mb-2">Step 2: Mobile App</h3>
           <ol className="list-decimal list-inside font-medium space-y-2">
             <li>Install the Blynk IoT app and log in.</li>
             <li>Open your device and tap the setup icon.</li>
             <li>Add a <strong>Slider</strong> and link it to <code>Speed (V2)</code>.</li>
             <li>Add a <strong>Joystick in Simple mode</strong>: link X to <code>X (V0)</code> and Y to <code>Y (V1)</code>. Turn Autoreturn ON. Do not select Advanced mode; it sends a different combined data format.</li>
           <li>Install the ESP8266 board package and Blynk library in Arduino IDE. Select NodeMCU 1.0 (ESP-12E Module), the correct USB port, and upload with motor power disconnected. The debug baud rate is 115200.</li>
             <li>Verify the device is online. With wheels lifted, set Speed low, move the joystick and release. If a wheel spins backward, power off and swap that motor's OUT wires.</li>
             <li>The 500ms command timeout intentionally stops if new X/Y updates stop. A stationary held joystick may not keep transmitting, so keep moving it during short tests. This is a conservative teaching control, not continuous driving or a certified emergency stop.</li>
             <li>Test release-to-stop, neutral boundaries (30 and 70), WiFi loss and reconnect. Reconnect resets Speed to zero. Use a physical power switch and keep people clear; do not drive until all checks pass.</li>
           </ol>
        </div>
      </section>
      <section className="mb-12 doodle-card p-6">
        <h2 className="text-2xl font-black mb-4 uppercase">Connection troubleshooting</h2>
        <p className="mb-3">Compile error about template: fill the definitions before includes. Offline device: check the unique device token, 2.4GHz SSID/password and internet access. App online but no motion: match Simple-mode V0/V1 and V2 ranges, increase Speed only slightly, remove enable jumpers, and check common ground.</p>
        <p>Bluetooth module or an HC-05 app? That is a different project and will not connect to this sketch. Tell your instructor the exact board, radio module, phone OS and app name before substituting code. An actual classroom hardware test is still required.</p>
      </section>

      {/* Code Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Code className="w-6 h-6 text-[#4D96FF]" /> The Code
        </h2>
        <CircuitDiagram number={3} connections={circuits[3]}/><CodeBlock code={codeChapter3} downloadHref="/sketches/chapter3/chapter3.ino" />
      </section>

      {/* Student Assignments */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-[#FFD700]" /> Student Assignments: Unleash Creativity!
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,215,0,1)] space-y-6">
          <div>
            <h3 className="text-xl font-black mb-2 uppercase text-pink-600">Assignment 1: Design a Custom Car Body</h3>
            <p className="font-medium">
              Your primary assignment is to design the most unique and creative body for your car. Let your imagination run wild!
              Use foamboards, cardboard, LEGO bricks, balsa wood, or even 3D-print your own chassis. Ensure you leave room to access the NodeMCU's USB port and the battery pack.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-black mb-2 uppercase text-blue-600">Assignment 2: Code Modifications</h3>
            <ul className="list-disc list-inside font-medium space-y-1">
              <li><strong>Headlights:</strong> Add two LEDs to the front of the car and a virtual Switch in Blynk. (Each LED needs its own 220&Omega; resistor. This car already uses six pins and some NodeMCU pins affect boot, so sketch your pin plan and have your instructor check it before wiring.)</li>
              <li><strong>Horn:</strong> Connect a piezo buzzer and add a push-button widget to honk. (Use a free pin from your plan and a small buzzer; ask your instructor to check the wiring first.)</li>
              <li><strong>Speed Limits:</strong> Modify the code so reversing automatically halves the speed.</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
