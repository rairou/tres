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

import base64 from "react-native-base64";

export const sleep = (time: number): Promise<void> => 
    new Promise((resolve) => setTimeout(() => resolve(), time));


export const encode = (s: string | null | undefined): string => {
    if (!s) return "";
    return base64.encode(s);
}

export const decode = (s: string | null | undefined) : string => {
    if (!s) return "";
    return base64.decode(s);
}

