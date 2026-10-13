#include <Servo.h>
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
}
