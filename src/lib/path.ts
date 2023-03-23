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


// This library is used to handle all fs-related functions

import { Dirs, FileSystem } from "react-native-file-access";
import { Platform } from "react-native";

/// Get the database folder, create if not exist.
export function getDbFolder() {
    let dbPath: string;
    if (Platform.OS === "android") {
        dbPath = Dirs.DatabaseDir + '/tres/';
    } else {
        dbPath = Dirs.DocumentDir + '/tres/db';
    }

    if (!FileSystem.exists(dbPath)) {
        FileSystem.mkdir(dbPath)
    }

    return dbPath
}