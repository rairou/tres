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

import React from "react";


export interface ButtonPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export type ButtonProps = {
  onPress: () => void;
  text: string;
  small?: boolean;
  klass?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  padding?: ButtonPadding;
  background?: string;
  shadow?: boolean
};

export type TabButtonProps = {
  onPress: () => void;
  icon: React.ReactNode;
  active: boolean;
};
