import { ProjectChapter, type Lesson } from './ProjectChapter';
export const lesson:Lesson={
 number:7,title:'Measure the Gap!',intro:'Build a tabletop parking alarm. The gate read a yes/no input. Now measure distance, turn time into centimetres, and decide when to warn. Use an Uno R3, not an ESP8266, for this 5V sensor.',
 objectives:['Read an ultrasonic echo with a time limit.','Explain the round trip in a distance measurement.','Use a threshold and hysteresis so an alarm does not chatter at its boundary.','Recognise that no echo is unknown, not zero distance.'],
 parts:['Arduino Uno R3 and USB cable.','Standard 5V HC-SR04 module with VCC, TRIG, ECHO and GND. Do not assume an HC-SR04-33 has identical specifications.','One red LED and 330Ω series resistor.','A low-current passive piezo element suitable for direct logic-pin drive. An active buzzer or speaker may require a transistor; do not substitute one without checking current.','Breadboard and jumper wires.'],
 principles:['TRIG requests a burst of sound. ECHO stays HIGH for the round-trip travel time.','At roughly room temperature, distance in cm ≈ echo microseconds × 0.0343 / 2. Divide by two because sound travels to the object and back. Temperature, target angle and surface affect results.','For a 1000µs echo: 1000 × 0.0343 / 2 = 17.15cm. This is an estimate, not precision metrology.','The standard module sheet gives a nominal 2-400cm range and recommends more than 60ms between measurements. This lab rejects readings outside that range and waits 70ms after each attempt.','The alarm enters below 20cm and clears above 25cm. This gap is hysteresis. A timeout or invalid reading switches the outputs off and prints UNKNOWN; it must not be mistaken for a safe distance.'],
 wiring:['Power off first. Uno 5V → HC-SR04 VCC; Uno GND → HC-SR04 GND. Follow printed pin labels, not their left-to-right order.','Uno D7 → TRIG; HC-SR04 ECHO → Uno D8. The 5V echo is suitable for Uno R3 logic, NOT a 3.3V ESP8266/ESP32 pin without level shifting.','Uno D4 → 330Ω resistor → LED anode; LED cathode → GND. Place its leads in separate breadboard rows.','Uno D3 → piezo positive; piezo negative → GND. Use only a low-current passive piezo approved for direct GPIO drive.','USB powers the Uno. This circuit contains no motors. Check for 5V-to-GND shorts before connecting USB.'],
 procedure:['Build and check with USB disconnected. Place a large flat card directly in front of the sensor.','Paste the sketch in Arduino IDE. Select Uno, choose the port and upload. Open Serial Monitor at 9600 baud.','Compare readings at 10cm, 20cm, 30cm and 50cm with a ruler. Record the error; do not tune the alarm from one sample.','Move slowly below 20cm: LED and tone turn on. Move above 25cm: they turn off. Between those values, the prior state remains.','Remove the target or aim away. An invalid reading prints UNKNOWN and disables the alarm. Explain why silence is not evidence that an obstacle is absent.'],
 code:`const byte trigPin = 7, echoPin = 8, ledPin = 4, piezoPin = 3;
bool alarmOn = false;
void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT); digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT); pinMode(ledPin, OUTPUT);
  pinMode(piezoPin, OUTPUT);
}
void loop() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  unsigned long duration = pulseIn(echoPin, HIGH, 30000UL);
  float cm = duration * 0.0343f / 2.0f;
  bool valid = duration != 0 && cm >= 2.0f && cm <= 400.0f;
  if (!valid) {
    alarmOn = false;
    Serial.println("UNKNOWN: no valid echo");
  } else {
    Serial.print(cm, 1); Serial.println(" cm");
    if (cm < 20.0f) alarmOn = true;
    else if (cm > 25.0f) alarmOn = false;
  }
  digitalWrite(ledPin, alarmOn ? HIGH : LOW);
  if (alarmOn) tone(piezoPin, 1000); else noTone(piezoPin);
  delay(70); // Measurement interval exceeds 60ms.
}`,
 expected:['A flat card inside the nominal range produces approximate centimetre readings.','Alarm enters below 20cm and exits above 25cm; invalid readings are labelled UNKNOWN.','Nothing on the website simulates a real echo. Test the uploaded code with the actual sensor.'],
 troubleshooting:['Always UNKNOWN: check TRIG/ECHO labels, common ground, USB power and a flat target beyond 2cm.','Readings jump: soft/angled targets can absorb or deflect sound. Move other ultrasonic sensors away and retest with a flat card.','LED dark: check polarity and resistor path.','Piezo silent or hot: disconnect it; verify passive piezo type and current. Do not replace it with an unpowered loudspeaker.'],
 safety:['Never use this lab alarm for a real vehicle, doorway or human-safety system. It can miss obstacles.','Disconnect power before moving wires. Never connect a 5V echo directly to 3.3V logic.','Keep tone quiet and brief; do not hold a sounding piezo near anyone’s ear.'],
 exercises:['Print inches as well as centimetres using inches = cm / 2.54. Keep your threshold units clear.','Show UNKNOWN with a distinct slow LED pattern. Do not call unknown readings safe.','Compare three readings and design a median filter. What happens if one reading is invalid?'],
 checks:['Why do we divide the travel distance by two?','What does pulseIn return on timeout?','Why are the ON and OFF distances different?','Can an angled soft object give a false clear?','Which board requires level shifting for the standard 5V ECHO?'],
 sources:[{title:'HC-SR04 module sheet via SparkFun',url:'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf'},{title:'Arduino Uno R3',url:'https://docs.arduino.cc/hardware/uno-rev3/'}]
};
export function Chapter7({onBack}:{onBack:()=>void}){return <ProjectChapter lesson={lesson} onBack={onBack}/>;}
