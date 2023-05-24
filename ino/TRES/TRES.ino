
// For some reason, I don't know why ESP 32 can not identify header files within
// the subdirectory. I don't want to spent much time debugging, PRs are open.
// It would be nice and cleaner if all the header / cpp files where store at tres/ subdir.


// #define SERVICE_UUID  "5e701e83-b88c-4622-888f-12fd72bb1837"
// #define MESSAGE_UUID  "c6f3bc87-c04e-4b7c-a846-6f3e87213b61"
// #define BOX_UUID      "2bdada9f-2a73-4faf-8745-21b0375fb934"

#include "btn.h"
#include "pin.h"
#include "server.h"
#include "globals.h"
#include "led.h"
#include "gsm.h"

TresGSM sim;
TresBLE server;
button btn(BTN_PIN);
RGBLed led(RED_PIN, GREEN_PIN, BLUE_PIN);


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
    server.sendLocNotif();
    server.clearMessage();
  }
  
  switch (state) {
    case send:
      // send sms
      
      break;
    case connected:
      led.connected(2000);
      state = none;
      break;
    case disconnected:
      led.connected(200);
      led.connected(200);
      state = none;
      break;

    case idle:
      led.success(500);
      state = none;
      break;
    case error:
      led.error(1500);
      state = none;
      break;
    case sent:
      led.success(2000);
      state = none;
      break;
  }

}