
// For some reason I don't know why ESP 32 cannont identify header files within
// the subdirectory. I don't want to spent much time debugging, PRs are open.
// It would be nice and cleaner if all the header / cpp files where store at tres/ subdir.


// #define SERVICE_UUID  "5e701e83-b88c-4622-888f-12fd72bb1837"
// #define MESSAGE_UUID  "c6f3bc87-c04e-4b7c-a846-6f3e87213b61"
// #define BOX_UUID      "2bdada9f-2a73-4faf-8745-21b0375fb934"

#include "btn.h"
#include "pin.h"
#include "server.h"

TresBLE server;
button btn(BTN_PIN);

bool state = false;

void setup() {
  Serial.begin(9600);
  setupPins();
  server.init();
  server.start();
}


void loop() {
  btn.update();

  if (btn.isPressed(3)) {
    Serial.println("SOS");
    state = !state;
    digitalWrite(LED_PIN, state);
    server.sendLocNotif();
    server.clearMessage();
  }

}
