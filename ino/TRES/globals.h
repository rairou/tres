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

// global variable for indicator
#ifndef _GLOBALS_H
#define _GLOBALS_H

// server state
typedef enum  {
    none,
    connected,
    disconnected,
    received,
    idle,
    send, // notification to send message
    sent, // sms message sent
    error, // error handling
} state_t;

extern state_t state;
extern char* location; 

#endif