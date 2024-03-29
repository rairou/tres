/*
 * Copyright (c) 2023 rairou <rairoudes@gmail.com>
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

export interface SMSData {
    id: string;
    number: string;
}

export interface TresSettings {
    interval: number;
    auto_connect: boolean;
    emergency_numbers: Array<SMSData>
}

export interface TresDoc {
    id: string;
    lat: number;
    long: number;
    timestamp: number;

}

export interface TresCol {
    version: string;
    data: string;
    settings: TresSettings
    last_updated: number;
    _iv: string;
}

export interface Location {
    lat: number | null;
    long: number | null;
}

export interface TransactionData {
    type: 'location' | 'raw' | 'notif';
    message: string;
    data?: Location | {};
    timestamp: number;
}
