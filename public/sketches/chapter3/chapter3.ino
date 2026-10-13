// ESP8266 NodeMCU 1.0 + L298N. WiFi/Blynk, NOT Bluetooth.
#define BLYNK_TEMPLATE_ID "YOUR_TEMPLATE_ID"
#define BLYNK_TEMPLATE_NAME "WiFi control car"
#define BLYNK_AUTH_TOKEN "YOUR_DEVICE_AUTH_TOKEN"
#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
const byte ENA = D7, ENB = D0;
const byte IN1 = D1, IN2 = D2, IN3 = D5, IN4 = D6;
char ssid[] = "YOUR_2_4_GHZ_WIFI";
char pass[] = "YOUR_WIFI_PASSWORD";
int x = 50, y = 50, Speed = 0;
unsigned long lastCommand = 0, lastReconnect = 0;
const unsigned long commandTimeout = 500;
bool haveCommand = false;
void stopCar() {
  analogWrite(ENA, 0); analogWrite(ENB, 0);
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}
// Match Simple-mode integer datastreams V0 and V1, each 0..100.
BLYNK_WRITE(V0) { x = constrain(param.asInt(), 0, 100); lastCommand = millis(); haveCommand = true; }
BLYNK_WRITE(V1) { y = constrain(param.asInt(), 0, 100); lastCommand = millis(); haveCommand = true; }
BLYNK_WRITE(V2) { Speed = constrain(param.asInt(), 0, 255); }
BLYNK_CONNECTED() {
  // Never restore old motion on reconnect. Move joystick again to drive.
  x = y = 50; Speed = 0; haveCommand = false; stopCar();
  Blynk.virtualWrite(V0, 50); Blynk.virtualWrite(V1, 50); Blynk.virtualWrite(V2, 0);
}
void setup() {
  Serial.begin(115200);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  analogWriteRange(255); // Consistent with old and new ESP8266 cores.
  stopCar();
  WiFi.mode(WIFI_STA); WiFi.begin(ssid, pass);
  Blynk.config(BLYNK_AUTH_TOKEN);
}
void loop() {
  if (WiFi.status() != WL_CONNECTED || !Blynk.connected()) {
    stopCar(); haveCommand = false;
    if (WiFi.status() == WL_CONNECTED && millis() - lastReconnect >= 5000) {
      lastReconnect = millis(); Blynk.connect(50); // Bounded reconnect, motors off.
    }
    delay(1); return;
  }
  Blynk.run();
  if (!haveCommand || millis() - lastCommand >= commandTimeout || Speed == 0) {
    stopCar(); delay(1); return;
  }
  // Boundaries 30 and 70 are neutral; no stale direction at equality.
  int left = 0, right = 0;
  if (y > 70) { left = 1; right = 1; }
  else if (y < 30) { left = -1; right = -1; }
  else if (x < 30) { left = -1; right = 1; }
  else if (x > 70) { left = 1; right = -1; }
  else { stopCar(); delay(1); return; }
  // Disable bridge before changing direction.
  analogWrite(ENA, 0); analogWrite(ENB, 0);
  digitalWrite(IN1, left > 0 ? HIGH : LOW); digitalWrite(IN2, left < 0 ? HIGH : LOW);
  digitalWrite(IN3, right > 0 ? HIGH : LOW); digitalWrite(IN4, right < 0 ? HIGH : LOW);
  analogWrite(ENA, Speed); analogWrite(ENB, Speed);
  delay(1);
}
