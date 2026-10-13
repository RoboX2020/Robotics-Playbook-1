#include <Servo.h>
Servo gripper;
const byte buttonPin=2;
const int openAngle=20,closedAngle=70; // Calibrate without load.
bool previous=HIGH,stable=HIGH;
unsigned long changedAt=0;
void setup(){pinMode(buttonPin,INPUT_PULLUP);gripper.attach(9);gripper.write(openAngle);}
void loop(){
 unsigned long now=millis();bool raw=digitalRead(buttonPin);
 if(raw!=previous){previous=raw;changedAt=now;}
 if(now-changedAt>=25&&stable!=raw){stable=raw;gripper.write(stable==LOW?closedAngle:openAngle);}
 delay(5);
}
