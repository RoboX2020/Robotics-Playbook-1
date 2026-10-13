import { ProjectChapter, type Lesson } from './ProjectChapter';
export const lesson:Lesson={number:6,title:'Beat the Blink!',intro:'Build a reaction-time game with one button and one LED. Learn state machines, button debouncing and elapsed-time measurement without adding motors.',
objectives:['Use INPUT_PULLUP with an active-low button.','Debounce a physical contact.','Distinguish waiting, cue and result states.','Measure elapsed time with millis rather than counting loop iterations.'],
parts:['Arduino Uno R3 and USB cable.','One normally-open pushbutton, one LED, one 330Ω resistor, breadboard and jumpers.'],
principles:['INPUT_PULLUP makes an unpressed button HIGH. Pressing connects the input to ground, so it reads LOW.','A button can bounce between states for a few milliseconds. Accept a change only after 25ms of stable input.','A pseudo-random wait makes the LED cue less predictable. A0 is left unconnected as a weak seed source, not secure randomness.','millis timestamps are unsigned long. Subtract timestamps to measure elapsed time; this pattern handles timer wrap for short intervals.','Press once to start, release, then press as soon as the LED lights. An early press reports a false start.'],
wiring:['Power off. Uno D2 → one side of the pushbutton; opposite switched side → GND. No 5V wire is needed because INPUT_PULLUP is used.','Four-legged buttons often have two legs internally joined on each side. Check which pair connects only when pressed, or use a meter.','Uno D8 → 330Ω resistor → LED anode; LED cathode → GND. USB powers the Uno. Leave A0 unconnected for the seed.'],
procedure:['Upload the sketch and open Serial Monitor at 9600.','Press and release to start a round. Keep the button released while waiting.','When the LED turns on, press quickly; read your reaction time.','Start another round and press early. Confirm that FALSE START appears.','Hold the button after a result: it must not repeatedly start rounds. Release before the next press.'],
code:`const byte buttonPin = 2, ledPin = 8;
enum State { IDLE, WAIT_RELEASE, WAIT_CUE, CUE };
State state = IDLE;
bool rawPrevious = HIGH, stable = HIGH;
unsigned long changedAt = 0, roundAt = 0, waitMs = 0, cueAt = 0;
void setup() {
  pinMode(buttonPin, INPUT_PULLUP); pinMode(ledPin, OUTPUT);
  Serial.begin(9600); randomSeed(analogRead(A0));
  Serial.println("Press then release to start");
}
void loop() {
  unsigned long now = millis();
  bool raw = digitalRead(buttonPin), pressed = false, released = false;
  if (raw != rawPrevious) { changedAt = now; rawPrevious = raw; }
  if (now - changedAt >= 25 && stable != raw) {
    stable = raw; pressed = stable == LOW; released = stable == HIGH;
  }
  if (state == IDLE && pressed) state = WAIT_RELEASE;
  else if (state == WAIT_RELEASE && released) {
    roundAt = now; waitMs = random(1500, 5000); state = WAIT_CUE;
    Serial.println("Wait for the LED");
  } else if (state == WAIT_CUE) {
    if (pressed) { Serial.println("FALSE START. Press to restart"); state = IDLE; }
    else if (now - roundAt >= waitMs) { digitalWrite(ledPin, HIGH); cueAt = now; state = CUE; }
  } else if (state == CUE && pressed) {
    digitalWrite(ledPin, LOW); Serial.print("Reaction incl. debounce: ");
    Serial.print(now - cueAt); Serial.println(" ms. Press to restart"); state = IDLE;
  }
}`,
expected:['One result per debounced press. Early presses are rejected.','The reported time includes roughly 25ms debounce plus sampling delay. It is a game, not a medical or scientific reflex measurement.'],
troubleshooting:['Always pressed: check which button legs are internally joined.','No LED: check polarity, resistor and D8.','Repeated starts: confirm the debouncing and state transitions were copied completely.'],
safety:['Disconnect USB before moving wires and keep a resistor in series with the LED.','Do not use button force or competitive results as a measure of anyone’s health.'],
exercises:['Collect five results and compare median versus mean.','Change the wait range while keeping it unpredictable.','Explain the effect of the 25ms debounce on the reported result.'],
checks:['Why is pressed LOW?','What is a false start?','Why subtract millis values?','Why is this not a calibrated reaction-time instrument?'],
sources:[{title:'SparkFun joystick guide: internal pull-up and switch contacts',url:'https://learn.sparkfun.com/tutorials/thumb-joystick-hookup-guide/all'},{title:'Arduino Uno R3',url:'https://docs.arduino.cc/hardware/uno-rev3/'}]};
export function Chapter6({onBack}:{onBack:()=>void}){return <ProjectChapter lesson={lesson} onBack={onBack}/>;}
