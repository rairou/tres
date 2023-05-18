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

TresBLE::TresBLE(
    char* _service_uuid,
    char* _message_uuid, 
    char* _box_uuid
) {
    service_uuid = _service_uuid;
    message_uuid = _message_uuid;
    box_uuid = _box_uuid;
}

// default constructor
TresBLE::TresBLE() {
    service_uuid = SERVICE_UUID;
    message_uuid = MESSAGE_UUID;
    box_uuid = BOX_UUID;
}
