import { initialize } from '@ionic/core';
import { Storage, Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export class Database
{
    storage: Storage | null = null;
    db: Storage | null = null;
    
    constructor()
    {
        this.initDb();
    }
    
    async initDb()
    {
        if (this.storage !== null)
        {
            return;
        }

        this.storage = new Storage(
        {
            name: "dietario.db",
            driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],
            version: 2,
            storeName: "basedatos",
            dbKey: "keyyyyyyy",
            // size?: number;
            // description?: string,
            // driverOrder?: Driver[],
            

        });

        this.storage.defineDriver(CordovaSQLiteDriver);

        await this.storage.create();

    }

    async setData(key: string, value: string)
    {

        let valueJson = JSON.stringify(value);
        try {
            
            const res = await this.storage?.set(key, valueJson);
            console.log(res);
        }
        catch (err) 
        {
            console.log(`Error setting ${key}: ${valueJson}`);
            console.log(err);
            return false;
        }

    }

    async removeKey(key: string)
    {
        try
        {
            await this.storage?.remove(key);

        }
        catch(error)
        {
            console.log("error" + error);
        }

    }


    async getKey(key: string)
    {
        try {
            const keyVal = await this.storage?.get(key);
            // console.log('Key is', keyVal);
            return keyVal;
        
        } catch (err) {
            console.log(`Error getting key ${key}`);
            console.log(err);
            return null;
        }
    }

    async lengthDb()
    {
        try
        {
            let cantidadKeys: number | undefined = await this.storage?.length();
            if (cantidadKeys === undefined)
            {
                cantidadKeys = 0;
            }
            return cantidadKeys;

        }
        catch(err)
        {
            console.log(`Error len`);
            console.log(err);
            return 0;
        }
    }

}

export let ionicDb = new Database();