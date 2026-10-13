import { ProjectChapter, type Lesson } from './ProjectChapter';
export const lesson:Lesson={number:4,title:'Chase the Light!',intro:'Two light sensors turn a lightweight servo pointer toward the brighter side. It is a simple feedback experiment, not a solar tracker calibrated in lux.',
objectives:['Build two voltage dividers.','Read analog values and compare them.','Use a deadband and motion limits.','Explain why feedback can hunt or stop at a mechanical limit.'],
parts:['Arduino Uno R3 and USB cable.','Two similar photoresistors (LDRs), two 10kΩ resistors, breadboard and jumpers.','A positional SG90-type servo with known voltage and stall current, a light cardboard pointer and a divider between the sensors.','External regulated 5V servo supply rated for stall current.'],
principles:['Each LDR changes resistance with light. It is not a calibrated light meter; individual parts differ.','This divider connects LDR to 5V and 10kΩ to ground, with analog input at their junction. More light normally lowers LDR resistance and increases the reading.','Uno analogRead returns 0-1023 relative to the analog reference. Compare both sensors under the same lamp before interpreting the difference.','Move by one degree per 30ms only when the difference exceeds a deadband. This reduces hunting but does not guarantee perfect stability.','Mount both sensors and the divider on the moving pointer. Test whether increasing servo angle actually turns toward the right sensor; invert turnSign if not.'],
wiring:['Power off. Left LDR: one leg → Uno 5V; other leg → A0 AND one end of left 10kΩ resistor. Other resistor end → GND.','Right LDR: one leg → Uno 5V; other → A1 AND one end of right 10kΩ. Other resistor end → GND.','Uno D9 → servo signal. External regulated 5V + → servo red. External supply - → servo GND AND Uno GND. USB → Uno. Do not join external positive to Uno 5V.','Mount a lightweight pointer and two sensors on the servo after testing angles with the horn detached. Place a small opaque divider between the LDRs.'],
procedure:['Upload with the servo horn detached and open Serial Monitor at 9600.','Cover each LDR separately: its reading should fall. Under equal light note the right-minus-left difference and set sensorOffset to that baseline.','Test a small light on the right. If the pointer turns left, switch off, change turnSign from 1 to -1 and upload.','Reattach the light pointer with power off. Keep movement in the 30-150° example bounds; reduce the bounds to match your mechanism.','Move a room lamp gently left/right. Observe settling, hunting, shadows and end stops. Never stare into bright LEDs or shine lasers.'],
code:`#include <Servo.h>
Servo pointer;
const byte leftPin = A0, rightPin = A1;
const int turnSign = 1; // Reverse if increasing angle turns away from right light.
const int sensorOffset = 0; // Measured right-minus-left under equal light.
const int deadband = 40;
int angle = 90;
void setup() { Serial.begin(9600); pointer.attach(9); pointer.write(angle); }
void loop() {
  int left = analogRead(leftPin), right = analogRead(rightPin);
  int error = right - left - sensorOffset;
  if (error > deadband) angle += turnSign;
  else if (error < -deadband) angle -= turnSign;
  angle = constrain(angle, 30, 150);
  pointer.write(angle);
  Serial.print(left); Serial.print(' '); Serial.print(right); Serial.print(' '); Serial.println(angle);
  delay(30);
}`,
expected:['The pointer moves toward the brighter side after direction and equal-light calibration.','Within the deadband it stays still; at the configured angle limit it stops moving. It cannot reach a lamp outside its travel range.'],
troubleshooting:['Reading always 0/1023: check the divider junction and resistor-to-ground path.','It hunts: increase deadband, shield from changing room light and inspect servo supply stability.','It runs away from light: check turnSign and left/right placement.','Servo buzzes at limit: power off and reduce the allowed range; do not force the horn.'],
safety:['Use a separate servo supply with common ground and disconnect both supplies before rewiring.','Do not attach a laser or heavy object. Keep fingers clear.','Raw ADC counts are not lux and sensor behaviour depends on actual parts.'],
exercises:['Compare readings with and without the divider.','Plot the two readings in Serial Plotter and vary deadband.','Explain why a shadow can fool this controller.'],
checks:['What is the role of the 10kΩ resistor?','Which way should the reading change when you cover an LDR?','Why do we need turnSign?','What is deadband?'],
sources:[{title:'Adafruit photocell voltage divider',url:'https://learn.adafruit.com/photocells/using-a-photocell'},{title:'Arduino servo power guidance',url:'https://github.com/arduino/docs-content/blob/main/content/learn/04.electronics/05.servo-motors/servo-motors.md'}]};
export function Chapter4({onBack}:{onBack:()=>void}){return <ProjectChapter lesson={lesson} onBack={onBack}/>;}
