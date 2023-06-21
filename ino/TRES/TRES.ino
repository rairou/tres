

// // // For some reason, I don't know why ESP 32 can not identify header files within
// // // the subdirectory. I don't want to spent much time debugging, PRs are open.
// // // It would be nice and cleaner if all the header / cpp files where store at tres/ subdir.


// // // #define SERVICE_UUID  "5e701e83-b88c-4622-888f-12fd72bb1837"
// // // #define MESSAGE_UUID  "c6f3bc87-c04e-4b7c-a846-6f3e87213b61"
// // // #define BOX_UUID      "2bdada9f-2a73-4faf-8745-21b0375fb934"


// // #include "btn.h"
// // #include "pin.h"
// // #include "globals.h"
// // #include "led.h"
// // // #include "gsm.h"
// // // #include "server.h"
// // #include <BLEDevice.h>
// // #include <BLEServer.h>
// // #include <BLEUtils.h>
// // #include <BLE2902.h>


// // int s = 0;

// // // TresBLE server;
// // button btn(BTN_PIN);
// // RGBLed led(RED_PIN, GREEN_PIN, BLUE_PIN);

// // #define service_uuid  "5e701e83-b88c-4622-888f-12fd72bb1837"
// // #define message_uuid  "c6f3bc87-c04e-4b7c-a846-6f3e87213b61"
// // #define box_uuid      "2bdada9f-2a73-4faf-8745-21b0375fb934"

// // BLEServer *server;
// // BLEService *service;
// // BLEAdvertising *ad;
// // BLECharacteristic *message_characteristic;
// // BLECharacteristic *box_characteristic;




// // class CharacteristicsCallbacks : public BLECharacteristicCallbacks {
// //     void onWrite(BLECharacteristic *pChar) {
// //        Serial.print("New Value: ");
// //         Serial.println(pChar->getValue().c_str());
       
    
// //       if (pChar == box_characteristic) {
// //           Serial.println("BOX");
// //       }
// //     };

// // };
// // class ServerCallbacks : public BLEServerCallbacks {
// //     void onConnect(BLEServer *pServer) {
// //       Serial.println("Connected");
// //       state = connected;
// //     };
// //     void onDisconnect(BLEServer *pServer) {
// //       Serial.println("Disconnected");
// //       state = disconnected;
// //       pServer->getAdvertising()->start();
// //     };
// // };

// // void setupAdvertisementData() {
// //   ad = server->getAdvertising();
// //   BLEAdvertisementData adData;
// //   ad->setAdvertisementData(adData);
// //   ad->start();
// // }

// // void setupBLEServer() {
// //   state = idle;
// //   BLEDevice::init("TRES");
// //   server = BLEDevice::createServer();
// //   server->setCallbacks(new ServerCallbacks());
// // }

// // void setupService() {
// //   service = server->createService(service_uuid);
// //   delay(100);

// //   message_characteristic = service->createCharacteristic(
// //         message_uuid,
// //         BLECharacteristic::PROPERTY_READ |
// //           BLECharacteristic::PROPERTY_WRITE |
// //           BLECharacteristic::PROPERTY_NOTIFY |
// //           BLECharacteristic::PROPERTY_INDICATE
// //   );
  

// //   message_characteristic->setCallbacks(new CharacteristicsCallbacks());
// //   message_characteristic->addDescriptor(new BLE2902());

  
// //   box_characteristic = service->createCharacteristic(
// //         box_uuid,
// //         BLECharacteristic::PROPERTY_READ |
// //           BLECharacteristic::PROPERTY_WRITE |
// //           BLECharacteristic::PROPERTY_NOTIFY |
// //           BLECharacteristic::PROPERTY_INDICATE
// //     );
  
// //   box_characteristic->setCallbacks(new CharacteristicsCallbacks());
// //   box_characteristic->addDescriptor(new BLE2902());
  
// //   Serial.println("BLE Service started. Listening for connections");
// //   service->start();
// // }

// // void notifyLocation() {
// //   message_characteristic->setValue("location");
// //   message_characteristic->notify();
// // }

// // void setup() {
// //   Serial.begin(9600);
// //   setupPins();
// //   pinMode(2, OUTPUT);
  

// //   setupBLEServer();
// //   setupService();
// //   setupAdvertisementData();

// //   // server.init();
// //   // server.start();
// // }


// // void loop() {
// //   btn.update();
  
// //   if (btn.isPressed(3)) {
// //     s = !s;
// //     Serial.println("SOS");
// //     digitalWrite(2, s);
    
// //   } 

  
// //   switch (state) {
// //     case send:
// //       // send sms
      
// //       break;
// //     case connected:
// //       led.connected(2000);
// //       state = none;
// //       notifyLocation();
// //       break;
// //     case disconnected:
// //       led.error(2000);
// //       // led.connected(200);
// //       state = none;
// //       break;

// //     case idle:
// //       led.success(500);
// //       state = none;
// //       break;
// //     case error:
// //       led.error(1500);
// //       state = none;
// //       break;
// //     case sent:
// //       led.success(2000);
// //       state = none;
// //       break;
// //   }

// // }

// #include "pin.h"
// #include "btn.h"
// #include "globals.h"
// #include "led.h"
// #include <BLEDevice.h>
// #include <BLEServer.h>
// #include <BLEUtils.h>
// #include <BLE2902.h>


// button btn(BTN_PIN);
// RGBLed led(RED_PIN, GREEN_PIN, BLUE_PIN);

// BLEServer* pServer = NULL;
// BLECharacteristic* message = NULL;

// bool deviceConnected = false;
// bool oldDeviceConnected = false;

// int s = 0;

// #define NAME "TRES Debug"
// #define SERVICE_UUID  "5e701e83-b88c-4622-888f-12fd72bb1837"
// #define MESSAGE_UUID      "c6f3bc87-c04e-4b7c-a846-6f3e87213b61"

// class ServerCallbacks: public BLEServerCallbacks {
//     void onConnect(BLEServer* pServer) {
//       deviceConnected = true;
//       state = connected;
//     };

//     void onDisconnect(BLEServer* pServer) {
//       deviceConnected = false;
//       state = disconnected;
//     }
// };

// class CharacteristicsCallbacks : public BLECharacteristicCallbacks {
//     void onWrite(BLECharacteristic *pChar) {

//         Serial.print("MSG: ");
//         Serial.println(pChar->getValue().c_str());
      
//     };

// };

// void notify() {
//   message->setValue("location");
//   message->notify();
// }

// void heartbeat() {
//   message->setValue("heartbeat");
//   message->notify();
// }

// void setup() {
//   Serial.begin(9600);

//   // Create the BLE Device
//   BLEDevice::init(NAME);

//   // Create the BLE Server
//   pServer = BLEDevice::createServer();
//   pServer->setCallbacks(new ServerCallbacks());

//   // Create the BLE Service
//   BLEService *pService = pServer->createService(SERVICE_UUID);

//   // Create a BLE Characteristic
//   message = pService->createCharacteristic(
//                       MESSAGE_UUID,
//                       BLECharacteristic::PROPERTY_READ   |
//                       BLECharacteristic::PROPERTY_WRITE  |
//                       BLECharacteristic::PROPERTY_NOTIFY |
//                       BLECharacteristic::PROPERTY_INDICATE
//                     );

//   message->addDescriptor(new BLE2902());
//   message->setCallbacks(new CharacteristicsCallbacks());

//   message->setValue("none");

//   // Start the service
//   pService->start();

//   // Start advertising
//   BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
//   pAdvertising->addServiceUUID(SERVICE_UUID);
//   pAdvertising->setScanResponse(false);
//   pAdvertising->setMinPreferred(0x0);  // set value to 0x00 to not advertise this parameter
//   BLEDevice::startAdvertising();
//   Serial.println("Waiting a client connection to notify...");
// }

// void loop() {
//     btn.update();

//     // disconnecting
//     if (!deviceConnected && oldDeviceConnected) {
//         delay(500); // give the bluetooth stack the chance to get things ready
//         pServer->startAdvertising(); // restart advertising
//         Serial.println("start advertising");
//         oldDeviceConnected = deviceConnected;
//     }
//     // connecting
//     if (deviceConnected && !oldDeviceConnected) {
//         // do stuff here on connecting
//         oldDeviceConnected = deviceConnected;
//     }

  

  
//   if (btn.isPressed(3)) {
//     s = !s;
//     Serial.println("SOS");
//     digitalWrite(2, s);
//     notify();
    
//   } 

//   switch (state) {
//     case send:
//       // send sms
      
//       break;
//     case connected:
//       led.connected(2000);
//       state = none;
//       heartbeat();
//       break;
//     case disconnected:
//       led.error(2000);
//       // led.connected(200);
//       state = none;
//       break;

//     case idle:
//       led.success(500);
//       state = none;
//       break;
//     case error:
//       led.error(1500);
//       state = none;
//       break;
//     case sent:
//       led.success(2000);
//       state = none;
//       break;
//   }


// }

#include "btn.h"
#include "led.h"
#include "pin.h"
#include "globals.h"
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer* pServer = NULL;
BLECharacteristic* message = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint32_t value = 0;

button btn(BTN_PIN);
RGBLed led(RED_PIN, GREEN_PIN, BLUE_PIN);

#define NAME "TRES"
#define SERVICE_UUID        "40afc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "bcb5483e-36e1-4688-b7f5-ea07361b26a8"



class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      state = connected;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      state = disconnected;
    }
};



void setup() {
  Serial.begin(9600);
  pinMode(BTN_PIN, INPUT);
  // Create the BLE Device
  BLEDevice::init(NAME);

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  message = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );


  message->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(false);
  pAdvertising->setMinPreferred(0x0);  // set value to 0x00 to not advertise this parameter
  BLEDevice::startAdvertising();
  Serial.println("Server setup successfully, listening for connection...");
}

void notify() {
  message->setValue("location");
  message->notify();
}

void heartbeat() {
  message->setValue("heartbeat");
  message->notify();
}

void clear() {
  message->setValue("");
  message->notify();
}

void loop() {
  btn.update();

   switch (state) {
    case send:
      // send sms
      
      break;
    case connected:
      led.connected(2000);
      state = none;
      // heartbeat();
      break;
    case disconnected:
      led.error(2000);
      // led.connected(200);
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

  
  if (deviceConnected) {
    // heartbeat();
    // delay(1000);
    // clear();
    if (btn.isPressed(3)) {
      Serial.println("SOS");
      notify();
      delay(500);
      clear();
    } 

  }

 

    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500); // give the bluetooth stack the chance to get things ready
        pServer->startAdvertising(); // restart advertising
        Serial.println("start advertising");
        oldDeviceConnected = deviceConnected;
    }
    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        // do stuff here on connecting
        oldDeviceConnected = deviceConnected;
    }

}