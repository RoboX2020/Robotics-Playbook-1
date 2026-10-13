from pathlib import Path
import subprocess,tempfile
root=Path(__file__).resolve().parents[1]
def test(n,pre,post):
 sketch=(root/f'public/sketches/chapter{n}/chapter{n}.ino').read_text()
 sketch='\n'.join(l for l in sketch.splitlines() if not l.startswith('#include'))
 with tempfile.TemporaryDirectory() as d:
  p=Path(d);(p/'test.cpp').write_text(pre+'\n'+sketch+'\n'+post)
  subprocess.run(['g++','-std=c++17','-I.',str(p/'test.cpp'),'-o',str(p/'test')],check=True)
  subprocess.run([str(p/'test')],check=True)
 print(f'Chapter{n} actual sketch logic assertions passed')
base='''#include <cassert>
#include <iostream>
using byte=unsigned char;
const int HIGH=1,LOW=0,OUTPUT=1,INPUT=0,INPUT_PULLUP=2,A0=14,A1=15;
unsigned long clockMs=0; int readDigital=1,readAnalog=154; int outputs[30]={};
unsigned long millis(){return clockMs;} void delay(int n){clockMs+=n;}
void pinMode(int,int){} void digitalWrite(int p,int v){outputs[p]=v;} void analogWrite(int p,int v){outputs[p]=v;}
int digitalRead(int){return readDigital;} int analogRead(int){return readAnalog;}
struct SerialType{void begin(int){} template<class T>void print(T){} template<class T>void print(T,int){} template<class T>void println(T){}} Serial;
struct Servo{int angle=0;void attach(int){}void write(int n){angle=n;}};
template<class T> T constrain(T x,T a,T b){return x<a?a:x>b?b:x;}
'''
test(2,base,'''int main(){setup(); readDigital=LOW;loop();assert(gateServo.angle==openAngle);readDigital=HIGH;loop();assert(gateServo.angle==closedAngle);}''')
car=base+'''const int D0=16,D1=5,D2=4,D5=14,D6=12,D7=13,WL_CONNECTED=3,WIFI_STA=1;
struct WiFiType{int state=WL_CONNECTED;void mode(int){}void begin(char*,char*){}int status(){return state;}} WiFi;
struct BlynkType{bool online=true;bool connected(){return online;}void config(const char*){}void connect(int){}void run(){}template<class T>void virtualWrite(int,T){}} Blynk;
struct Param{int value=0;int asInt(){return value;}}param;
void analogWriteRange(int){}
#define BLYNK_WRITE(v) void write_##v()
#define BLYNK_CONNECTED() void connected_callback()
const int V0=0,V1=1,V2=2;
'''
test(3,car,'''int main(){setup();clockMs=100;param.value=100;write_V2();param.value=90;write_V1();loop();assert(outputs[ENA]==100&&outputs[IN1]==HIGH&&outputs[IN2]==LOW);param.value=70;write_V1();loop();assert(outputs[ENA]==0);param.value=10;write_V0();loop();assert(outputs[IN2]==HIGH&&outputs[IN3]==HIGH);clockMs+=501;loop();assert(outputs[ENA]==0);param.value=90;write_V1();WiFi.state=0;loop();assert(outputs[ENA]==0&&!haveCommand);WiFi.state=WL_CONNECTED;connected_callback();assert(Speed==0&&x==50&&y==50&&!haveCommand);std::cout<<"forward, boundary, turn, timeout, WiFi loss, reconnect tested\\n";}''')
test(11,base,'''int main(){setup();readAnalog=180;loop();assert(fanOn);readAnalog=159;loop();assert(fanOn);readAnalog=154;loop();assert(!fanOn);readAnalog=1023;loop();assert(fanOn);}''')
