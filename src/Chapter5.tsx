import { ProjectChapter, type Lesson } from './ProjectChapter';
export const lesson:Lesson={number:5,title:'Look Around!',intro:'Build a joystick-controlled pan/tilt head from two positional servos. Your thumb chooses a position on each axis. The website does not connect to the joystick or the hardware.',
objectives:['Read two analog joystick axes.','Map a sensor range to a safe angle range.','Apply a centre dead zone and limit travel.','Separate servo power from logic power.'],
parts:['Arduino Uno R3 and USB cable.','Analog two-axis potentiometer joystick labelled VCC, GND, VRx and VRy (not a Qwiic/I2C joystick).','Two positional servos, a light pan/tilt bracket and external regulated 5V supply rated for the combined stall current.','Jumpers and a lightweight cardboard pointer; no camera is needed.'],
principles:['A basic thumb joystick contains two potentiometers. The wiper of each gives a voltage that changes with stick position.','Uno reads about 0-1023, but centre and endpoints vary. This sketch uses a centre dead zone of 480-544; measure and adjust it.','This is position control: release returns to centre. It is not velocity control or phone Bluetooth.','Pan example range is 40-140°; tilt is 60-120°. These are starting limits, not proof that your bracket can safely move that far.','Both servos share ground with the Uno, but their power comes from an external supply. Two moving or blocked servos can draw much more than idle current.'],
wiring:['Power off. Joystick VCC → Uno 5V; GND → GND; VRx → A0; VRy → A1. Leave joystick SW unconnected in this lesson.','Uno D9 → pan signal; D10 → tilt signal. Check each servo’s labelled wiring.','Both servo red wires → external regulated 5V positive. Both grounds → external supply negative AND Uno GND. USB powers Uno only. Do not join external positive to Uno 5V.','Test horns detached. With both supplies off, assemble the lightweight bracket centred at 90°, leaving wires enough slack to move.'],
procedure:['Upload with horns detached; open Serial Monitor at 9600. Confirm joystick values change and centres are close to 512.','Measure centre and revise the dead zone if necessary.','Attach bracket while powered off. Reduce pan/tilt bounds if anything binds.','Move one axis gently, then both. Verify the mapped direction and change a reversed axis mapping if needed.','Release the stick: the head should return near 90°. Stop if servos buzz, supply drops or bracket jams.'],
code:`#include <Servo.h>
Servo pan, tilt;
int centred(int raw) { return raw >= 480 && raw <= 544 ? 512 : raw; }
void setup() {
  Serial.begin(9600); pan.attach(9); tilt.attach(10);
  pan.write(90); tilt.write(90);
}
void loop() {
  int x = centred(analogRead(A0)), y = centred(analogRead(A1));
  int panAngle = constrain(map(x, 0, 1023, 40, 140), 40, 140);
  int tiltAngle = constrain(map(y, 0, 1023, 60, 120), 60, 120);
  pan.write(panAngle); tilt.write(tiltAngle);
  Serial.print(x); Serial.print(' '); Serial.println(y);
  delay(30);
}`,
expected:['Each joystick axis commands one servo within the specified bounds.','Centre returns close to 90°, with a dead zone to reduce centre jitter.'],
troubleshooting:['Both axes fixed: confirm analog potentiometer joystick, VCC, ground and VRx/VRy.','Axes swapped: swap the A0/A1 mapping, with power off.','Direction reversed: swap that map output range, keeping constrain bounds ordered.','Servo resets/jitters: inspect supply capacity, common ground and mechanical load. Do not power both through an Uno I/O pin.'],
safety:['No heavy camera, laser or sharp pointer. Keep fingers out of the bracket.','Use external servo power rated for combined stall current; never test against a hard stop.','Servo.h uses timers; do not assume analogWrite on timer-associated pins remains available while servos are attached.'],
exercises:['Measure real joystick endpoints and map those instead of ideal 0/1023.','Reverse only the pan direction.','Add smoothing and compare response time with the original sketch.'],
checks:['What is a potentiometer wiper?','What happens when you release the joystick?','Why do two servos need an external supply?','Why should ranges be reduced before mounting a heavy load?'],
sources:[{title:'SparkFun analog thumb joystick guide',url:'https://learn.sparkfun.com/tutorials/thumb-joystick-hookup-guide/all'},{title:'Arduino Servo library timer notes',url:'https://github.com/arduino-libraries/Servo/blob/master/src/Servo.h'}]};
export function Chapter5({onBack}:{onBack:()=>void}){return <ProjectChapter lesson={lesson} onBack={onBack}/>;}
