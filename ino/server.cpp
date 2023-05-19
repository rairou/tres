/*
 * Copyright (c) 2023 riyuzenn <riyuzenn@gmail.com>
 * See the license file for more info
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

#include "server.h"
#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

BLECharacteristic *message_characteristic;
BLECharacteristic *box_characteristic;

// default constructor
TresBLE::TresBLE() {
    service_uuid = SERVICE_UUID;
    message_uuid = MESSAGE_UUID;
    box_uuid = BOX_UUID;
    
}

void TresBLE::init() {
    
    BLEDevice::init("TRES");
    server = BLEDevice::createServer();
    server->setCallbacks(new ServerCallbacks());

    service = server->createService(service_uuid);
    delay(100);

    message_characteristic = service->createCharacteristic(
        message_uuid,
        BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE |
          BLECharacteristic::PROPERTY_NOTIFY |
          BLECharacteristic::PROPERTY_INDICATE
    );
    
     box_characteristic = service->createCharacteristic(
        box_uuid,
        BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE |
          BLECharacteristic::PROPERTY_NOTIFY |
          BLECharacteristic::PROPERTY_INDICATE
    );

    Serial.println("Device initialized");
    
}

void TresBLE::start(){
    service->start();
    server->getAdvertising()->start();
    message_characteristic->setValue("TRES");
    message_characteristic->setCallbacks(new CharacteristicsCallbacks());

    box_characteristic->setValue("none");
    box_characteristic->setCallbacks(new CharacteristicsCallbacks());

    Serial.println("Listening for connections...");
}

void TresBLE::sendLocNotif() {
  message_characteristic->setValue("location");
  message_characteristic->notify();
}

void TresBLE::clearMessage() {
  message_characteristic->setValue("TRES");
  message_characteristic->notify();
}

void ServerCallbacks::onConnect(BLEServer *pServer) {
    Serial.println("Connected");
}

void ServerCallbacks::onDisconnect(BLEServer *pServer) {
    Serial.println("Disconnected");
}

void CharacteristicsCallbacks::onWrite(BLECharacteristic *pChar) {
    Serial.print("New Value: ");
    Serial.println(pChar->getValue().c_str());
    
    if (pChar == box_characteristic) {
        Serial.println("BOX");
    }
}