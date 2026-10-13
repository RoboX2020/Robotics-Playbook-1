const byte trigPin = 7, echoPin = 8, ledPin = 4, piezoPin = 3;
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
}
