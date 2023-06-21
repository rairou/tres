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

// Credits: milliohm

#include <Arduino.h>
#include "gsm.h"

String _buffer;
int _timeout;


TresGSM::TresGSM() {}

void TresGSM::begin() {
  this->begin(BAUD_RATE);
}
void TresGSM::begin(long baud_rate) {
  Serial2.begin(baud_rate);
    _buffer.reserve(50);
    // Check if registered
    Serial2.println("CREG?");
    if (Serial2.available()) {
        Serial.println(Serial2.readString());
    }
    Serial.print("SIM: ");
    Serial.println(Serial2.readString());
  
}