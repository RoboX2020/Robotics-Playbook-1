// Setup runs once when you power on the Arduino
void setup() {
  // Tell Pin 13 to act as an OUTPUT (sending electricity out)
  pinMode(13, OUTPUT);
}

// Loop runs over and over forever
void loop() {
  digitalWrite(13, HIGH); // Turn LED ON (HIGH = full voltage)
  delay(1000);            // Wait for 1000 milliseconds (1 full second)
  digitalWrite(13, LOW);  // Turn LED OFF (LOW = 0 voltage)
  delay(1000);            // Wait another second before repeating
}
