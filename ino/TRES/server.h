// /*
//  * Copyright (c) 2023 riyuzenn <riyuzenn@gmail.com>
//  * See the license file for more info
//  *
//  * This program is free software: you can redistribute it and/or modify
//  * it under the terms of the GNU General Public License as published by
//  * the Free Software Foundation, either version 3 of the License, or
//  * (at your option) any later version.
//  *
//  * This program is distributed in the hope that it will be useful,
//  * but WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  * GNU General Public License for more details.
//  * 
//  * You should have received a copy of the GNU General Public License
//  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
// */

// #ifndef _SERVER_H
// #define _SERVER_H

// #include <BLEServer.h>

// #define SERVICE_UUID  "5e701e83-b88c-4622-888f-12fd72bb1837"
// #define MESSAGE_UUID  "c6f3bc87-c04e-4b7c-a846-6f3e87213b61"
// #define BOX_UUID      "2bdada9f-2a73-4faf-8745-21b0375fb934"


// class TresBLE {
//     public:
//         char* service_uuid;
//         char* message_uuid;
//         char* box_uuid;

//         TresBLE();
//         void init();
//         void start();
//         void sendLocNotif();
//         void clearMessage();

//     private:
//         BLEServer *server;
//         BLEService *service;
        
// };

// class CharacteristicsCallbacks : public BLECharacteristicCallbacks {
//     void onWrite(BLECharacteristic *_char);

// };
// class ServerCallbacks : public BLEServerCallbacks {
//     void onConnect(BLEServer *pServer);
//     void onDisconnect(BLEServer *pServer);
// };

// #endif