import {ProjectChapter,type Lesson} from './ProjectChapter';
import {motorParts,motorWiring,motorSafety,motorCode} from './motorLesson';
export const lesson:Lesson={number:8,title:'Follow the Trail!',intro:'Reuse the chassis with an Uno and two downward digital reflectance sensors. Your first autonomous robot uses a four-state decision table, not WiFi or Bluetooth.',objectives:['Calibrate sensor polarity.','Translate four input states to wheel commands.','Recognise a lost line.'],parts:[...motorParts,'Two 5V digital line-reflectance sensors labelled VCC/GND/OUT, matte black tape and pale floor. A forward obstacle sensor is not automatically interchangeable.'],principles:['Mount sensors facing down with both over black when centred. Choose stripe width and spacing accordingly. A narrow line between sensors needs a different algorithm.','Both black→forward. Left only→left pivot. Right only→right pivot. Neither→stop.','Infrared reflectance depends on height, surface and lighting. Measure each sensor’s black-state value; do not assume LOW.','This simple algorithm handles broad gentle curves, not intersections or fast sharp corners.'],wiring:[...motorWiring,'Left OUT→D2; right OUT→D4. Both VCC→Uno 5V and both GND→GND. Verify printed pin labels and module voltage.'],procedure:['With motor power OFF, upload RUN_MOTORS=false and open Serial Monitor at 9600. Record each raw input on black and white; set leftBlackState/rightBlackState separately.','Raise wheels. Set RUN_MOTORS=true and TEST_FORWARD=true, upload and enable motor power. Both wheels must spin forward. Power off before swapping a reversed motor’s OUT wires.','Power off; set TEST_FORWARD=false and upload. With wheels lifted test both black, left only, right only and neither: forward, left, right, stop.','Only after those checks, run slowly on a wide stripe. Lost line must stop. Power off before repositioning.'],code:motorCode+`
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
}`,expected:['Calibration defaults keep motors off.','After polarity/direction checks, the robot steers toward the remaining black sensor and stops when neither sees black.'],troubleshooting:['Stops when centred: widen the stripe so both sensors see black.','Follows white: invert the measured black state for each sensor.','Turns away: check left/right sensor placement and motor forward polarity.','Resets or barely moves: inspect stall current, supply voltage, common ground and driver heat.'],safety:[...motorSafety,'Disconnected sensors can imitate valid states. This circuit does not detect every fault.'],exercises:['Write all four state combinations before testing.','Compare low PWM values and wheel drift.','Add a lost-line LED on a safe free pin.'],checks:['Why do sensors face down?','Why does this table need a broad stripe?','What happens when neither sees black?','How do you verify motor direction without a runaway?'],sources:[{title:'Pololu reflectance calibration principles, not generic module pinout',url:'https://www.pololu.com/docs/0j19/all'},{title:'ST L298 limits',url:'https://www.st.com/resource/en/datasheet/cd00000240.pdf'}]};
export function Chapter8({onBack}:{onBack:()=>void}){return <ProjectChapter lesson={lesson} onBack={onBack}/>;}
