#include <Servo.h>
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
}
