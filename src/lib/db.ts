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

// simple key value storage from scratch. limitations: manually catch errors.

import { NativeModules } from "react-native";
import { FileSystem } from "react-native-file-access";
import { TresCol, TresDoc } from "../interfaces/data";
import { AesNative, Algorithms } from "./aes";

interface TresDocs extends Array<TresDoc> {};


export async function checkEncryptionKey(path: string, key: string) {
    let db = new tresdb(path, key);
    console.log(await db.getIv());
    return db.validKey();
}

// key value storage with AES encryption
export class tresdb {
    public path: string;
    private encKey: string;
    private iv?: string;
    private algo: Algorithms;

    constructor(path: string, encKey: string, iv?: string, algo?: Algorithms) {
        this.path = path;
        this.encKey = encKey;
        this.algo = algo ? algo : "aes-256-cbc";
        this.iv = iv;


        // init the db if not exist
        FileSystem.exists(this.path).then((value) => {
            console.log(`File existt: ${value}`);
            if (!value) {
                this.init().then((value) => {
                    console.log(`Initialized empty db: ${this.path} | ${value}`)
                }).catch((error) => {
                    console.log(`Failed: ${error}`)
                });
            }
        })
    }

    public async validKey() : Promise<boolean> {
        if (await !FileSystem.exists(this.path))
            return false
            
        let data = await this.read_raw<TresCol>();
        return await this.decrypt_data<TresDocs>(data.data)
            .then((v) => {return true})
            .catch((e) => { return false });
        
    }

    public async getIv() : Promise<string> {
        let raw = await this.read_raw<TresCol>();
        return raw._iv
    }

    private async init() : Promise<TresCol> {
        let data = {} as TresCol;
        data._iv = this.iv ? this.iv : await AesNative.randomKey(16);
        data.data = await this.encrypt_data([], data._iv);
        data.version = "";
        data.last_updated = new Date().toDateString();
        
        
        await FileSystem.writeFile(this.path, JSON.stringify(data)).catch((error) => {
            console.log(`Cannot write to file: ${error}`)
        }).then(() => {
            console.log(`Wrote file ${data}`)
        });

        return data;
    }

    /// Get all the locations
    public async get(): Promise<TresDocs> {
        let raw = await this.read_raw<TresCol>();
        return this.decrypt_data<TresDocs>(raw.data);
    }

    public async insert(doc: TresDoc): Promise<TresDoc> {
        let col = await this.read_raw<TresCol>();
        let raw = await this.get();
        let data = await this.encrypt_data(raw);
        col.data = data;
        
        console.log(`${col}`);
        await this.write_raw(col);
        
        return doc;
    }

    private async getKey() : Promise<string> {
        return AesNative.pbkdf2(this.encKey, 'tres-salt', 5000, 256);
    }

    private async write_raw<T>(data: T): Promise<void> {
        await FileSystem.writeFile(this.path, JSON.stringify(data));
    }

    private async read_raw<T>(): Promise<T> {
        let data : T =  JSON.parse(await FileSystem.readFile(this.path));
        return data;
    }

    private async decrypt_data<T>(data: string): Promise<T> {
        return JSON.parse(
            await AesNative.decrypt(
                data, 
                await this.getKey(), 
                await this.getIv(), 
                this.algo
            )
        );
    }

    private async encrypt_data(data: TresDocs, iv?: string) : Promise<string> {
        let _iv = iv ? iv : await this.getIv();
        return AesNative.encrypt(
            JSON.stringify(data) as string, 
            await this.getKey(), 
            _iv, 
            this.algo
        );
    }
}