export const motorParts=['Arduino Uno R3, USB cable and USB power bank.','L298N module with documented power wiring, two motors/chassis/caster, protected motor pack and fuse/switch approved for motor voltage and stall current.','Two 10kΩ resistors for enable pull-downs, jumpers and the specified sensors.'];
export const motorWiring=['Power off. Use only the Uno, not the NodeMCU from chapter 3. Uno D5→ENA, D6→ENB, D7→IN1, D8→IN2, D9→IN3, D10→IN4. Remove ENA/ENB jumpers; add 10kΩ from each enable to GND.','OUT1/OUT2→left motor; OUT3/OUT4→right motor. Approved motor pack + via switch/fuse→driver VS; pack -→driver GND. USB bank→Uno USB. Uno GND→driver GND.','Driver needs 5V logic power: use the module’s documented regulator within its range, or a separate regulated 5V logic supply with its regulator jumper removed. Do not join driver 5V to Uno 5V.'];
export const motorSafety=['Lift wheels for first tests. Keep physical power switch within reach and turn off before repositioning or rewiring.','Never assemble loose Li-ion cells. Use a protected instructor-approved pack/charger and fuse. Stop on stalled motors, hot wires, excessive driver heat or battery swelling.','L298 voltage drop and module heat matter. Check actual stall current and supply ratings; do not treat a headline current rating as a safe continuous module current.','This is a tabletop-class learning robot, not a fault-tolerant or human-safety system. Keep away from stairs, table edges, pets and people.'];
export const motorCode=`const byte ENA=5, ENB=6, IN1=7, IN2=8, IN3=9, IN4=10;
const bool RUN_MOTORS=false, TEST_FORWARD=false;
const int driveSpeed=90;
void drive(int left, int right) {
  analogWrite(ENA,0); analogWrite(ENB,0);
  digitalWrite(IN1,left>0?HIGH:LOW); digitalWrite(IN2,left<0?HIGH:LOW);
  digitalWrite(IN3,right>0?HIGH:LOW); digitalWrite(IN4,right<0?HIGH:LOW);
  analogWrite(ENA,left==0?0:driveSpeed); analogWrite(ENB,right==0?0:driveSpeed);
}
void setupMotors(){
  pinMode(ENA,OUTPUT);pinMode(ENB,OUTPUT);
  pinMode(IN1,OUTPUT);pinMode(IN2,OUTPUT);pinMode(IN3,OUTPUT);pinMode(IN4,OUTPUT);
  drive(0,0);
}`;
