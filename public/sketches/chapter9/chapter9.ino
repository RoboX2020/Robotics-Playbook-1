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
const byte trigPin=2,echoPin=4;
bool clearPath=false;byte clearCount=0;
void setup(){Serial.begin(9600);setupMotors();pinMode(trigPin,OUTPUT);digitalWrite(trigPin,LOW);pinMode(echoPin,INPUT);}
void loop(){
 digitalWrite(trigPin,LOW);delayMicroseconds(2);digitalWrite(trigPin,HIGH);delayMicroseconds(10);digitalWrite(trigPin,LOW);
 unsigned long us=pulseIn(echoPin,HIGH,30000UL);
 float cm=us*0.0343f/2.0f;bool valid=us!=0&&cm>=2&&cm<=400;
 if(!valid||cm<25){clearPath=false;clearCount=0;}
 else if(cm>35){if(clearCount<3)clearCount++;if(clearCount>=3)clearPath=true;}
 else clearCount=0;
 if(valid){Serial.print(cm);Serial.println(" cm");}else Serial.println("UNKNOWN - STOP");
 if(!RUN_MOTORS)drive(0,0);
 else if(TEST_FORWARD)drive(1,1); // Wheels-up direction test only; bypasses sensor.
 else if(clearPath)drive(1,1);else drive(0,0);
 delay(70);
}
