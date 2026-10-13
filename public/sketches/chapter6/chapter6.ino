const byte buttonPin = 2, ledPin = 8;
enum State { IDLE, WAIT_RELEASE, WAIT_CUE, CUE };
State state = IDLE;
bool rawPrevious = HIGH, stable = HIGH;
unsigned long changedAt = 0, roundAt = 0, waitMs = 0, cueAt = 0;
void setup() {
  pinMode(buttonPin, INPUT_PULLUP); pinMode(ledPin, OUTPUT);
  Serial.begin(9600); randomSeed(analogRead(A0));
  Serial.println("Press then release to start");
}
void loop() {
  unsigned long now = millis();
  bool raw = digitalRead(buttonPin), pressed = false, released = false;
  if (raw != rawPrevious) { changedAt = now; rawPrevious = raw; }
  if (now - changedAt >= 25 && stable != raw) {
    stable = raw; pressed = stable == LOW; released = stable == HIGH;
  }
  if (state == IDLE && pressed) state = WAIT_RELEASE;
  else if (state == WAIT_RELEASE && released) {
    roundAt = now; waitMs = random(1500, 5000); state = WAIT_CUE;
    Serial.println("Wait for the LED");
  } else if (state == WAIT_CUE) {
    if (pressed) { Serial.println("FALSE START. Press to restart"); state = IDLE; }
    else if (now - roundAt >= waitMs) { digitalWrite(ledPin, HIGH); cueAt = now; state = CUE; }
  } else if (state == CUE && pressed) {
    digitalWrite(ledPin, LOW); Serial.print("Reaction incl. debounce: ");
    Serial.print(now - cueAt); Serial.println(" ms. Press to restart"); state = IDLE;
  }
}
