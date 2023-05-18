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

import BackgroundService from "react-native-background-actions";
import Geolocation from "@react-native-community/geolocation";

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    locationProvider: 'android'
  });


export const options = {
    taskName: "TRES",
    taskTitle: "TRES Tracker",
    taskDesc: "Realtime track your device",
    taskIcon: {
      name: "ic_launcher",
      type: "mipmap"
    },
    color: "#ff0ff",
    parameters: {
      delay: 1000 
    }
}

export async function start(client: (taskData: any) => Promise<void>) {
    await BackgroundService.start(client, options);
}

export async function stop() {
    await BackgroundService.stop();
}

export function isRunning() {
    return BackgroundService.isRunning()
}

export {
    BackgroundService,
    Geolocation
}
