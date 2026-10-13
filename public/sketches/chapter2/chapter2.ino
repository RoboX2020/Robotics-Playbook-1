#include <Servo.h>
const byte Servopin = 9;
const byte Sensorpin = 2;
const byte objectDetectedState = LOW; // Test your module; use HIGH if inverted.
const int closedAngle = 20; // Calibrate with the horn detached first.
const int openAngle = 90;
Servo gateServo;
void setup() {
  Serial.begin(9600);
  pinMode(Sensorpin, INPUT);
  gateServo.attach(Servopin);
  gateServo.write(closedAngle);
}
void loop() {
  bool detected = digitalRead(Sensorpin) == objectDetectedState;
  Serial.println(detected ? "object" : "clear");
  gateServo.write(detected ? openAngle : closedAngle);
  delay(50); // Sample interval, not a one-second open timer.
}
