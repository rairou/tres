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

// simple key value storage from scratch. limitations: manually catch errors.

import { NativeModules } from "react-native";
import { FileSystem } from "react-native-file-access";
import { Location, SMSData, TresCol, TresDoc, TresSettings } from "../interfaces/data";
import { AesNative, Algorithms } from "./aes";


interface TresDocs extends Array<TresDoc> {};

export async function checkEncryptionKey(path: string, key: string) {
    let db = new tresdb(path, key);
    
    return db.validKey();
}

// A badly written key-value storage
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
            // console.log(`File existt: ${value}`);
            if (!value) {
                this.init().then((value) => {
                    // console.log(`Initialized empty db: ${this.path} | ${value}`)
                }).catch((error) => {
                    // console.log(`Failed: ${error}`)
                });
            }
        })
    }

    public async validKey() : Promise<boolean> {
        if (await !FileSystem.exists(this.path))
            return false
            
        let data = await this.read_raw<TresCol>();
        return await this.decrypt_data<TresDocs>(data.data)
            .then((v) => {  return true})
            .catch((e) => { return false });
        
    }

    public async getIv() : Promise<string> {
        if (this.iv) return this.iv;
        let raw = await this.read_raw<TresCol>();
        return  raw._iv;
    }

    private async init() : Promise<TresCol> {
        let data = {} as TresCol;
        data._iv = this.iv ? this.iv : await AesNative.randomKey(16);
        data.data = await this.encrypt_data([], data._iv);
        data.version = "";
        data.settings = {
            interval: 30,
            auto_connect: false,
            emergency_numbers: []
        }
        data.last_updated = new Date().getTime();
        
        
        await FileSystem.writeFile(this.path, JSON.stringify(data)).catch((error) => {
            // console.log(`Cannot write to file: ${error}`)
        }).then(() => {
            // console.log(`Wrote file ${data}`)
        });

        return data;
    }

    /// Get all the locations
    public async get(): Promise<TresDocs> {
        let raw = await this.read_raw<TresCol>();
        // console.log(raw);
        return await this.decrypt_data<TresDocs>(raw.data);
    }

    public async clear(): Promise<void> {
        let raw = await this.read_raw<TresCol>();
        let data = await this.encrypt_data([], await this.getIv());
        raw.data = data;
        await this.write_raw(raw);

    }

    public async insert(doc: TresDoc): Promise<TresDoc> {
        let col = await this.read_raw<TresCol>();
        let raw = await this.get();
        raw.push(doc);
        let data = await this.encrypt_data(raw);
        col.data = data;
        col.last_updated = new Date().getTime();
        await this.write_raw(col);        
        return doc;
    }

    
    public async locationInDb(loc: Location) : Promise<boolean> {
        // let col = await this.read_raw<TresCol>();
        let raw = await this.get();
        let filtered = raw.filter(v => v.lat === loc.lat && v.long === v.long);
        if (filtered.length === 0) return false 

        return true
    }


    public async delete(id: string): Promise<string> {
        let col = await this.read_raw<TresCol>();
        let raw =  await this.get();
        let filtered = raw.filter(v => v.id !== id);
        let data = await this.encrypt_data(filtered);
        col.data = data;

        await this.write_raw(col);
        return id
    }
    
    public async deletefromId(id: string) {
        let col = await this.read_raw<TresCol>();
        let raw = await this.get();
        let filtered = raw.filter(v => v.id !== id);
        let data = await this.encrypt_data(filtered);
        col.data = data;
        await this.write_raw(col);
        return id;
    }


    public async updateSettingsInterval(interval: number): Promise<void> {
        let raw = await this.read_raw<TresCol>();
        raw.settings.interval = interval
        await this.write_raw(raw);
    }
    public async updateSettingsAutoConnect(value: boolean): Promise<void> {
        let raw = await this.read_raw<TresCol>();
        raw.settings.auto_connect = value;
        await this.write_raw(raw);
    }

    public async readSettingsNumber() : Promise<SMSData[]> {
        let raw = await this.read_raw<TresCol>();
        return raw.settings.emergency_numbers;
    }

    public async addSettingsNumber(n: SMSData): Promise<void> {
        let raw = await this.read_raw<TresCol>();
        let num = raw.settings.emergency_numbers;
        const has = num.some(d => d.number === n.number);
        // console.log(`Hello ${num}; ${num.length}`);
        if (num.length === 5) {
            // console.log('Error');
            throw new Error(`Number already exceeded the limit.`)
        }
        if (has) throw new Error(`'${n.number}' already existed in the list.`)
        
        raw.settings.emergency_numbers.push(n);
        await this.write_raw(raw);
        
    }

    public async removeSettingsNumber(n: SMSData): Promise<void> { 
        let raw = await this.read_raw<TresCol>();
        let num =  raw.settings.emergency_numbers;
        const has = num.some(d => d.number === n.number);
        if (!has) throw new Error(`'${n.number}' not found.`);

        raw.settings.emergency_numbers = num.filter(item => {
            return item.number !==  n.number
        })
        await this.write_raw(raw);
    }

    public async clearSettingsNumber() : Promise<void> {
        let raw = await this.read_raw<TresCol>();
        raw.settings.emergency_numbers = [];
        await this.write_raw(raw);
    }

    public async clearSettings(): Promise<void> {
        let raw = await this.read_raw<TresCol>();
        raw.settings = {
            interval: 30, // default value
            auto_connect: false,
            emergency_numbers: []
        }
        await this.write_raw(raw)
    }
    
    public async write_raw<T>(data: T): Promise<void> {
        await FileSystem.writeFile(this.path, JSON.stringify(data));
    }

    public async read_raw<T>(): Promise<T> {
        let data : T =  JSON.parse(await FileSystem.readFile(this.path));
        return data;
    }

    private async getKey() : Promise<string> {
        return AesNative.pbkdf2(this.encKey, 'tres-salt', 5000, 256);
    }

    private async decrypt_data<T>(data: string): Promise<T> {
        // console.log(`Key:  ${await this.getKey()}`)
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