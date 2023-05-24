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

#ifndef _LED_H
#define _LED_H

#define RES 8 // 8-bit res. 0-255
#define FREQ 5000
#define R_CHANNEL 0 // Red pin channel
#define G_CHANNEL 1 // Green pin channel
#define B_CHANNEL 2 // Blue pin channel

class RGBLed {
    public:
        RGBLed(int r_pin, int g_pin, int b_pin);
        void setColor(int R, int G, int B);
        void error(int d);
        void error();
        void warning(int d);
        void warning();
        void success(int d);
        void success();
        void connected(int d);
        void connected();
        void clear();

    private:
        int r_pin_;
        int g_pin_;
        int b_pin_;

};

#endif