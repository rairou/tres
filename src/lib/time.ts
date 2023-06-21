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

export enum Data {
    Today,
    ThisWeek,
    LastWeek,
    MoreThanAWeek
}

export function getTime(timestamp: number, mins: number) {
    return timestamp + minsToMs(mins);
}

export function daysToMs(day: number) {
    return day * 24 * 60 * 60 * 1000;
}

export function minsToMs(min: number) {
    return min * 60 * 1000;
}

export function compareDate(timestamp: number) {
    const prev = new Date(timestamp);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - prev.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


    if (days === 1) return Data.Today
    if (days < 7) return Data.ThisWeek;
    else if (days  >= 7 && days <= 14) return Data.LastWeek;
    else return Data.MoreThanAWeek
}
