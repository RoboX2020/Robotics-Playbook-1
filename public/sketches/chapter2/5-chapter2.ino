#include <Servo.h>
const byte Servopin = 9;   // Servo signal wire -> digital pin 9
const byte Sensorpin = 2;  // IR sensor OUT -> digital pin 2
const byte objectDetectedState = LOW; // Most IR modules output LOW when object detected. Change LOW to HIGH if yours works backwards.
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
