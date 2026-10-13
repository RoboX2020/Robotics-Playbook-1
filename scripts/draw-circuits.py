from pathlib import Path
from xml.sax.saxutils import escape as e
out=[];y=0

def text(x,z,s,size=15):out.append(f'<text x="{x}" y="{z}" font-size="{size}">{e(s)}</text>')
def line(x,z,a,b):out.append(f'<path d="M{x},{z} L{a},{b}" fill="none" stroke="#171717" stroke-width="2"/>')
def dot(x,z):out.append(f'<circle cx="{x}" cy="{z}" r="3" fill="#171717"/>')
def ground(x,z):
 line(x,z,x,z+8)
 for j,w in enumerate([12,8,3]):line(x-w,z+8+j*5,x+w,z+8+j*5)
def resistor(x,z,label):
 line(x,z,x+8,z);out.append(f'<path d="M{x+8},{z} l5,-7 7,14 7,-14 7,14 7,-14 7,14 5,-7" fill="none" stroke="#171717" stroke-width="2"/>');line(x+53,z,x+65,z);text(x,z-14,label,14)
def panel(title,h):
 global y
 out.append(f'<rect x="3" y="{y}" width="274" height="{h}" rx="8" fill="white" stroke="#111" stroke-width="2"/>');text(12,y+26,title,17);z=y;y+=h+14;return z

def led(pin,R):
 z=panel('LED + series resistor',152);text(12,z+58,pin);line(65,z+54,92,z+54);resistor(92,z+54,R);line(157,z+54,174,z+54)
 out.append(f'<path d="M174,{z+43} L174,{z+65} L194,{z+54} Z M194,{z+42} V{z+66}" fill="none" stroke="#111" stroke-width="2"/>');line(194,z+54,228,z+54);line(228,z+54,228,z+96);ground(228,z+96);out.append(f'<path d="M180,{z+37} l10,-12 m-5,0 h5 v5 M190,{z+37} l10,-12 m-5,0 h5 v5" fill="none" stroke="#111" stroke-width="1.5"/>');text(14,z+125,'Anode to bar; bar = cathode',13);text(14,z+145,'LED emits light (arrows outward)',12)
def button(pin):
 z=panel('Normally-open button',126);text(12,z+58,pin);line(63,z+54,112,z+54);dot(112,z+54);dot(165,z+54);line(114,z+50,157,z+30);line(165,z+54,232,z+54);ground(232,z+54);text(12,z+107,'INPUT_PULLUP; press = LOW',14)
def box(title,rows):
 z=panel(title,50+len(rows)*40)
 for i,(a,b) in enumerate(rows):
  k=z+53+i*40;text(12,k,a,14);line(112,k-5,148,k-5);dot(148,k-5);text(158,k,b,14)
def servo(pin='D9',name='Servo'):
 box(name,[('Uno '+pin,'Signal'),('External +','V+'),('External -','GND')]);power(True)
def power(servo=False):
 box('Power / common ground',[('USB bank','USB socket'),('Controller GND','Supply -')]);z=panel('Power separation',93);text(12,z+50,'External + powers load ONLY',14);text(12,z+74,'Do not join it to controller 5V.',14)
def sensor(title,pins):box(title,pins)
def ldr(channel,title):
 z=panel(title,208);text(14,z+54,'Uno 5V');line(140,z+44,140,z+64);out.append(f'<rect x="131" y="{z+64}" width="18" height="37" fill="none" stroke="#111" stroke-width="2"/>');text(164,z+88,'LDR',14);text(26,z+86,'light ↘',14);line(140,z+101,140,z+122);dot(140,z+122);line(140,z+122,224,z+122);text(220,z+113,channel,14);line(140,z+122,140,z+140);out.append(f'<rect x="131" y="{z+140}" width="18" height="32" fill="none" stroke="#111" stroke-width="2"/>');text(164,z+162,'10kΩ',14);ground(140,z+172)
def motor(n):
 rows=[('D7' if n==3 else 'D5','ENA'),('D0' if n==3 else 'D6','ENB'),('D1' if n==3 else 'D7','IN1'),('D2' if n==3 else 'D8','IN2'),('D5' if n==3 else 'D9','IN3'),('D6' if n==3 else 'D10','IN4')];box('L298N input terminals',rows)
 for en in ['ENA','ENB']:
  z=panel(en+' pull-down',90);text(12,z+58,en,14);line(50,z+54,75,z+54);resistor(75,z+54,'10kΩ');line(140,z+54,230,z+54);ground(230,z+54)
 z=panel('Two motor outputs',180)
 for i,(a,b) in enumerate([('OUT1','OUT2'),('OUT3','OUT4')]):
  k=z+60+i*72;text(12,k,a,14);text(199,k,b,14);line(64,k-5,111,k-5);out.append(f'<circle cx="136" cy="{k-5}" r="25" fill="none" stroke="#111" stroke-width="2"/>');text(129,k+1,'M',16);line(161,k-5,193,k-5)
 box('Driver power',[('Pack +','Fuse/switch'),('Fuse/switch','VS'),('Pack -','GND'),('Controller GND','GND')]);z=panel('Driver logic / jumpers',136);text(12,z+51,'Remove ENA/ENB jumpers.',14);text(12,z+76,'5V logic: exact module guide.',14);text(12,z+100,'Use its regulator OR separate',14);text(12,z+122,'5V supply; never both.',14);power()
def fan():
 sensor('TMP36 (BOTTOM VIEW)',[('Uno 5V','1: +VS'),('Uno A0','2: OUT'),('Uno GND','3: GND')]);z=panel('TMP36 bypass capacitor',126);text(12,z+57,'+VS');line(48,z+52,114,z+52);line(114,z+35,114,z+68);line(123,z+35,123,z+68);line(123,z+52,226,z+52);ground(226,z+52);text(84,z+98,'100nF',15)
 z=panel('Low-side fan switch',415);text(14,z+55,'External regulated +5V',15);line(115,z+68,115,z+88);dot(115,z+88);line(115,z+88,219,z+88);line(219,z+88,219,z+141)
 out.append(f'<circle cx="115" cy="{z+125}" r="27" fill="none" stroke="#111" stroke-width="2"/>');text(101,z+130,'Fan',14);line(115,z+152,115,z+176);dot(115,z+176);line(115,z+176,219,z+176);line(219,z+164,219,z+176)
 # Diode points toward positive, cathode bar at upper supply node.
 out.append(f'<path d="M208,{z+141} H230 M219,{z+141} l-10,21 h20 Z" fill="none" stroke="#111" stroke-width="2"/>');text(231,z+142,'K',13);text(231,z+165,'A',13);text(155,z+202,'1N4007 stripe = K',12)
 line(115,z+176,115,z+218);text(128,z+237,'D',13);line(115,z+218,147,z+218);line(147,z+218,147,z+264);line(147,z+264,115,z+264);line(115,z+264,115,z+292);text(128,z+282,'S',13);line(99,z+218,99,z+264);line(53,z+239,99,z+239);text(12,z+242,'Gate',12);text(74,z+232,'G',13);text(164,z+251,'N-MOSFET',12)
 text(12,z+327,'D6 → 220Ω → gate',15);text(12,z+351,'Gate → 10kΩ → source',15);text(12,z+375,'Source = supply - = Uno GND',14);text(12,z+399,'Confirm exact G/D/S pinout.',14);ground(115,z+292);power()
for n in range(1,12):
 out=[];y=14;text(8,31,f'Chapter {n}: circuit schematic',17);text(8,55,'Power OFF before wiring.',15);text(8,79,'Repeated node labels are joined.',14);y=97
 if n==1:led('D13','220Ω')
 if n==2:sensor('IR module terminals',[('Uno 5V','VCC'),('Uno GND','GND'),('Uno D2','OUT')]);servo()
 if n==3:motor(n)
 if n==4:ldr('A0','Left light divider');ldr('A1','Right light divider');servo()
 if n==5:sensor('Joystick terminals',[('Uno 5V','VCC'),('Uno GND','GND'),('Uno A0','VRx'),('Uno A1','VRy')]);box('Two positional servos',[('Uno D9','Pan signal'),('Uno D10','Tilt signal'),('External +','Both V+'),('External -','Both GND')]);power()
 if n==6:button('D2');led('D8','330Ω')
 if n==7:sensor('HC-SR04 (Uno only)',[('Uno 5V','VCC'),('Uno GND','GND'),('Uno D7','TRIG'),('Uno D8','ECHO')]);led('D4','330Ω');sensor('Low-current passive piezo',[('Uno D3','+'),('Uno GND','-')])
 if n==8:sensor('Line sensor terminals',[('Uno 5V','Both VCC'),('Uno GND','Both GND'),('Uno D2','Left OUT'),('Uno D4','Right OUT')]);motor(n)
 if n==9:sensor('HC-SR04 (Uno only)',[('Uno 5V','VCC'),('Uno GND','GND'),('Uno D2','TRIG'),('Uno D4','ECHO')]);motor(n)
 if n==10:button('D2');servo()
 if n==11:fan()
 z=panel('Before applying power',117);text(12,z+51,'Verify module pinout / ratings.',14);text(12,z+76,'USB powers the controller.',14);text(12,z+101,'Follow the chapter safety checks.',13)
 body=''.join(out);Path(f'public/circuits/chapter{n}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 {y}" width="280" height="{y}"><rect width="280" height="{y}" fill="white"/><g font-family="Arial,sans-serif" fill="#111">{body}</g></svg>\n')
