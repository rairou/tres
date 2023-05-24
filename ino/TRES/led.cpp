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

#include "led.h"
#include <Arduino.h>

RGBLed::RGBLed(int r, int g, int b) {
    r_pin_ = r;
    g_pin_ = g;
    b_pin_ = b;
    // setup 

    ledcSetup(R_CHANNEL, FREQ, RES);
    ledcSetup(G_CHANNEL, FREQ, RES);
    ledcSetup(B_CHANNEL, FREQ, RES);

    ledcAttachPin(r_pin_, R_CHANNEL);
    ledcAttachPin(g_pin_, G_CHANNEL);
    ledcAttachPin(b_pin_, B_CHANNEL);
}

void RGBLed::setColor(int R, int G, int B) {
    ledcWrite(R_CHANNEL, R);
    ledcWrite(G_CHANNEL, G);
    ledcWrite(B_CHANNEL, B);
}

void RGBLed::error(int d) {
  for (int i = 0; i <= 255; i += 15) {
    this->setColor(i, 0, 0);
    delay(30);
  }

  delay(d);
  
  for (int i = 255; i >= 0; i -= 15) {
    this->setColor(i, 0, 0);
    delay(30);
  }
}

void RGBLed::error() {
  this->error(1000);
}

void RGBLed::warning(int d) {
  for (int i = 0; i <= 255; i += 15) {
    this->setColor(i - 55, i, 0);
    delay(30);
  }

  delay(d);
  
  for (int i = 255; i >= 0; i -= 15) {
    this->setColor(i - 55, i, 0);
    delay(30);
  }
}

void RGBLed::warning() {
  this->warning(1000);
}

void RGBLed::success(int d) {
  for (int i = 0; i <= 255; i += 15) {
    this->setColor(0, i, 0);
    delay(30);
  }

  delay(d);
  
  for (int i = 255; i >= 0; i -= 15) {
    this->setColor(0, i, 0);
    delay(30);
  }
}

void RGBLed::success() {
  this->success(1000);
}

void RGBLed::connected(int d) {
  for (int i = 0; i <= 255; i += 15) {
    this->setColor(0, 0, i);
    delay(30);
  }

  delay(d);
  
  for (int i = 255; i >= 0; i -= 15) {
    this->setColor(0, 0, i);
    delay(30);
  }
}

void RGBLed::connected() {
  this->connected(1000);
}

void RGBLed::clear() {
  this->setColor(0, 0, 0);
}


