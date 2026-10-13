const byte tempPin=A0,fanPin=6;
const float referenceV=5.00f;
bool fanOn=false;
void setup(){pinMode(fanPin,OUTPUT);digitalWrite(fanPin,LOW);Serial.begin(9600);}
void loop(){
 long total=0;for(byte i=0;i<16;i++){total+=analogRead(tempPin);delay(2);}
 float adc=total/16.0f,volts=adc*referenceV/1023.0f;
 float celsius=(volts-0.5f)*100.0f;
 bool plausible=celsius>=-40.0f&&celsius<=125.0f;
 if(!plausible)fanOn=true;
 else if(celsius>=30.0f)fanOn=true;
 else if(celsius<=27.0f)fanOn=false;
 digitalWrite(fanPin,fanOn?HIGH:LOW);
 if(plausible){Serial.print(celsius,1);Serial.println(" C");}else Serial.println("SENSOR RANGE FAULT - FAN REQUESTED ON");
 delay(200);
}
