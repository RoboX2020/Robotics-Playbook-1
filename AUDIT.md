# Robotics Playbook draft accuracy checkpoint

12 October 2026. Separate branch only. Main and live deployment unchanged.

Chapter0 orientation; chapters1-3 repaired; chapters4-11 added in the original UI. One complete displayed sketch per practical chapter, each with a matching labelled connection diagram and a downloadable .ino generated from the displayed code. Optional exercise descriptions are not complete sketches and require a wiring/pin review.

## Verified
- TypeScript and Vite production build pass.
- Exact downloadable sketches compile for Uno AVR core1.8.8 / Servo1.3.0, except chapter3, compiled for NodeMCU ESP8266 core3.1.2 / Blynk1.4.0.
- Views0-11 rendered at320,390,1280px without document-width overflow.
- All11 downloads and clipboard buttons return the exact displayed code; no JS errors.
- Actual sketch logic regressions pass for gate detect/clear, car direction/neutral boundaries/timeout/WiFi loss/reconnect, and fan hysteresis/range fault.
- Fresh remote checkout passes TypeScript and Vite build. Three accidental duplicate source files were removed before final build.

## Remaining
- No physical hardware or real phone/app verification.
- Current live code, car image, all7 original commits and both remote branches were searched. The documented car is ESP8266 NodeMCU + L298N + Blynk IoT over WiFi. No separate Bluetooth module/app, car PDF, APK or old downloadable sketch was found. Treat chapter3 as the documented WiFi car.
- Motor driver regulators, power ratings, clone-module pinouts and servo calibration require exact kit checks before classroom use.
- Current car timeout is conservative and stops when a stationary joystick stops sending updates. Do not claim continuous driving or safety certification.
- Drawn diagrams use component symbols and labelled module terminals, not breadboard placement photos. All11 inspected at320px, with390px renders too. Exact module pinouts still require the classroom kit check.

Run npm ci, npx tsx scripts/export-sketches.ts, npm run lint and npm run build. Download folders are public/sketches/chapterN/chapterN.ino.
