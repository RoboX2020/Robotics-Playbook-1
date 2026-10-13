const byte ENA=5, ENB=6, IN1=7, IN2=8, IN3=9, IN4=10;
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
}
const byte leftSensor=2,rightSensor=4;
const byte leftBlackState=LOW,rightBlackState=LOW;
void setup(){Serial.begin(9600);setupMotors();pinMode(leftSensor,INPUT);pinMode(rightSensor,INPUT);}
void loop(){
 int l=digitalRead(leftSensor),r=digitalRead(rightSensor);
 bool left=l==leftBlackState,right=r==rightBlackState;
 Serial.print(l);Serial.print(' ');Serial.println(r);
 if(!RUN_MOTORS)drive(0,0);
 else if(TEST_FORWARD)drive(1,1);
 else if(left&&right)drive(1,1);
 else if(left)drive(-1,1);
 else if(right)drive(1,-1);
 else drive(0,0);
 delay(20);
}
