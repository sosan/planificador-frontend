import { typeGroup } from "../components/SchedulerGrid";
import { ionicDb } from "../database/IonicStorage";
import { IListadoPrereserva, } from "../datos/vehiculosGeneral";
import { ContainerState as IContainerModalState } from "../components/Modal";

const serialize = require('serialize-javascript');


class InterfaceStorage
{

    KEY_LISTADO_CLASES_VEHICULOS = "listadoClasesVehiculos";
    KEY_LISTADO_MODELOS_VEHICULOS = "listadoModelosVehiculos";
    KEY_PREFIX_GROUPS_RESERVA_VUELACAR = "groupsReservaVuelaCar";
    KEY_PREFIX_GROUPS_PRE_RESERVA = "groupsPreReserva";
    KEY_PREFIX_GROUPS_RESERVA_EXTERIOR = "groupsReservaExterior";

    KEY_PREFIX_ITEMSPRERESERVAS = "itemsPreReservas";
    KEY_PREFIX_ITEMS_RESERVA_VUELACAR = "itemsReservaVuelaCar";
    KEY_PREFIX_ITEMS_RESERVA_EXTERIOR = "itemsReservasExterior";

    async getItemsReservasExterior() {
        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR);
        return listado;
    }
    async getItemsReservasVuelaCar() {

        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR);
        return listado;

    }
    
    async getItemsPreReservas() {
        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_ITEMSPRERESERVAS);
        return listado;
    }

    async generalGetItemsGroups(keyTexto: string)
    {
        
        let listado = [];
        try {

            // const currentYear = new Date().getFullYear();
            let lenTexto = await ionicDb.getKey(`length_${keyTexto}`);
            const len = await this.convertNumber(lenTexto);
            let counter = 0;
            while (listado.length < len)
            {
                
                const key = `${keyTexto}${counter.toString()}`;
                const value = await ionicDb.getKey(key);
                counter++;
                if (value === null) 
                {
                    if (counter > 100)
                    {
                        break;
                    }
                    continue;
                }
                const content = JSON.parse(value);
                const deserializeContent = this.deserialize(content);
                listado.push(deserializeContent);
    
            }
    
            return listado;

        }
        catch (error) {
            console.log("error" + error)
            return listado;
        }

    }



    async convertNumber(texto: string) {
        const len: number = Number.parseInt(texto.split("\"")[1]);
        return len;
    }

    deserialize(serializedJavascript: any) {
        return eval('(' + serializedJavascript + ')');
    }

    async getGroupsReservaVuelaCar() {

        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_GROUPS_RESERVA_VUELACAR);
        return listado;

    }

    async getGroupsPreReserva()
    {

        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_GROUPS_PRE_RESERVA);
        return listado;
    }



    async getGroupsReservaExterior()
    {
        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_GROUPS_RESERVA_EXTERIOR);
        return listado;

    }


    async getLengthGroupReservasVuelaCar()
    {
        const len: number = await ionicDb.lengthDb();
        return len;

    }

    async insertGroupsReservaVuelaCar(grupo: typeGroup[])
    {

        try {

            await ionicDb.setData(`length_${this.KEY_PREFIX_GROUPS_RESERVA_VUELACAR}`, grupo.length.toString() );
    
            for (let i = 0; i < grupo.length; i++)
            {
                const key = `${this.KEY_PREFIX_GROUPS_RESERVA_VUELACAR}${grupo[i].id}`;
                const serializedContent = serialize(grupo[i], { isJSON: true });
                await ionicDb.setData(key, serializedContent);
    
            }

        }
        catch (error) {
            console.log("error" + error)
            return;
        }


    }


    async insertlistadoClasesVehiculos(arrayListadoClasesVehiculos: string[])
    {
        try {
            await ionicDb.setData(this.KEY_LISTADO_CLASES_VEHICULOS, arrayListadoClasesVehiculos.toString());


        }
        catch (error) {
            console.log("error" + error)
            return;
        }


    }

    async getlistadoClasesVehiculos() {

        let listado: string[] = [];
        try {

            let texto: string = await ionicDb.getKey(this.KEY_LISTADO_CLASES_VEHICULOS );
            texto = texto.replaceAll("\"", "");
            listado = texto.split(",");
            return listado;

        }
        catch (error) {
            console.log("error" + error)
            return listado;
        }

    }

    async insertlistadoModelosVehiculos(arrayListadoModelosVehiculos: string[])
    {
        await ionicDb.setData(this.KEY_LISTADO_MODELOS_VEHICULOS, arrayListadoModelosVehiculos.toString());
    }

    async getlistadoModelosVehiculos() {
        
        let listado: string[] = [];
        try {

            let texto: string = await ionicDb.getKey(this.KEY_LISTADO_MODELOS_VEHICULOS);
            texto = texto.replaceAll("\"", "");
            listado = texto.split(",");
            return listado;

        }
        catch (error) {
            console.log("error"+ error + error)
            return listado;
        }

    }


    async insertGroupsPreReserva(grupo: typeGroup[]) {
        console.log("sdfkjsdf")

        try {

            await ionicDb.setData("length_groupsPreReserva", grupo.length.toString());
    
            for (let i = 0; i < grupo.length; i++)
            {
                const key = `${this.KEY_PREFIX_GROUPS_PRE_RESERVA}${grupo[i].id}`;
                const serializedContent = serialize(grupo[i], { isJSON: true });
                await ionicDb.setData(key, serializedContent );
    
            }

        }
        catch (error) {
            console.log("error" + error)
            return;
        }


    }



    async insertGroupsReservaExterior(grupo: typeGroup[]) {

        try {

            await ionicDb.setData("length_groupsReservaExterior", grupo.length.toString());
    
            for (let i = 0; i < grupo.length; i++) {
                const key = `${this.KEY_PREFIX_GROUPS_RESERVA_EXTERIOR}${grupo[i].id}`;
                const serializedContent = serialize(grupo[i], { isJSON: true });
                await ionicDb.setData(key, serializedContent);
    
            }

        }
        catch (error) {
            console.log("error" + error)
            return;
        }


    }

    async insertGeneralReserva(reserva: IListadoPrereserva, keySuffix: string)
    {

        try {

            const lenTexto = await ionicDb.getKey(`length_${keySuffix}`);
            let len = await this.convertNumber(lenTexto);
            len += 1;

            await ionicDb.setData(`length_${keySuffix}`, len.toString());

            const key = `${keySuffix}${reserva.id}`;
            const serializedContent = serialize(reserva, { isJSON: false });
            await ionicDb.setData(key, serializedContent);

        }
        catch(error)
        {
            console.log("error" + error);
            return;
        }
    }


    async insertPreReserva(reserva: IListadoPrereserva)
    {

        try {

            const key = `${this.KEY_PREFIX_ITEMSPRERESERVAS }`;
            await this.insertGeneralReserva(reserva, key);
        }
        catch (error) {
            console.log("error" + error)
            return;
        }

    }

    async insertReservaVuelaCar(reserva: IListadoPrereserva) {

        try {

            const key = `${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}`;
            await this.insertGeneralReserva(reserva, key);
        }
        catch (error) {
            console.log("error" + error)
            return;
        }

    }

    async insertReservaExterior(reserva: IListadoPrereserva) {

        try {

            const key = `${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}`;
            await this.insertGeneralReserva(reserva, key);
        }
        catch (error) {
            console.log("error" + error)
            return;
        }

    }
    
    async insertItemsPreReservas(listado: IListadoPrereserva[]) {

        try {

            await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMSPRERESERVAS}`, listado.length.toString());
    
            for (let i = 0; i < listado.length; i++) {
                const key = `${this.KEY_PREFIX_ITEMSPRERESERVAS}${listado[i].id}`;
                const serializedContent = serialize(listado[i], { isJSON: false });
                await ionicDb.setData(key, serializedContent);
    
            }

        }
        catch (error) {
            console.log("error" + error)
            return;
        }


    }


    async initGroupsItems()
    {
    
        await ionicDb.setData(`length_${this.KEY_PREFIX_GROUPS_PRE_RESERVA }`, "0");
        await ionicDb.setData(`length_${this.KEY_PREFIX_GROUPS_RESERVA_EXTERIOR}`, "0");
        await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMSPRERESERVAS}`, "0");
        await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}`, "0");

    }


    async insertItemsReservaVuelaCar(listado: IListadoPrereserva[]) {


        try {

            await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}`, listado.length.toString());
    
            for (let i = 0; i < listado.length; i++) {
                const key = `${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}${listado[i].id}`;
                const serializedContent = serialize(listado[i], { isJSON: false });
                await ionicDb.setData(key, serializedContent);
    
            }

        }
        catch (error) {
            console.log("error" + error)
            return;
        }


    }



    async insertItemsReservasExterior(listado: IListadoPrereserva[]) {
        
        try
        {

            await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}`, listado.length.toString());
    
            for (let i = 0; i < listado.length; i++) {
                const key = `${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}${listado[i].id}`;
                const serializedContent = serialize(listado[i], { isJSON: false });
                await ionicDb.setData(key, serializedContent);
    
            }

        }
        catch(error)
        {
            console.log("error" + error)
            return;
        }
    
        

    }




    async updateReservaExterior(position: number, elemento: IListadoPrereserva) {
        
        try
        {
            const serializedContent = serialize(elemento, { isJSON: false });
            const key = `${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}${elemento.id}`;
            await ionicDb.setData(key, serializedContent);

        }
        catch(error)
        {
            console.log("error=" + error);
            return;
        }


    }

    async updatePreReserva(elemento: IListadoPrereserva) {

        try {
            const serializedContent = serialize(elemento, { isJSON: false });
            const key = `${this.KEY_PREFIX_ITEMSPRERESERVAS}${elemento.id}`;
            await ionicDb.setData(key, serializedContent);

        }
        catch (error) {
            console.log("error=" + error);
            return;
        }


    }


    async updateReservaVuelaCar(position: number, elemento: IListadoPrereserva) {
        try
        {
            const serializedContent = serialize(elemento, { isJSON: false });
            const key = `${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}${elemento.id}`;
            await ionicDb.setData(key, serializedContent);
        }
        catch(error)
        {
            console.log("error=" + error);
            return;
        }
    }


    async insertGroupPreReserva(grupo: typeGroup)
    {

        try
        {

            const key = `${this.KEY_PREFIX_GROUPS_PRE_RESERVA}`;
            await this.insertGeneralGroups(grupo, key);

        }
        catch(error)
        {
            console.log("error"+ error);
            return;
        }
    }

    async insertGroupReservaVuelaCar(grupo: typeGroup)
    {

        try {

            const key = `${this.KEY_PREFIX_GROUPS_RESERVA_VUELACAR}`;
            await this.insertGeneralGroups(grupo, key);

        }
        catch (error) {
            console.log("error" + error);
            return;
        }

    }

    async insertGroupExterior(grupo: typeGroup)
    {

        try
        {

            const key = `${this.KEY_PREFIX_GROUPS_RESERVA_EXTERIOR}`;
            await this.insertGeneralGroups(grupo, key);

        }
        catch(error)
        {
            console.log("error" + error);
            return;
        }

    }

    async insertGeneralGroups(grupo: typeGroup, keyPreffix: string)
    {

        try {
            const lenTexto = await ionicDb.getKey(`length_${keyPreffix}`);
            let len = await this.convertNumber(lenTexto);
            len += 1;

            await ionicDb.setData(`length_${keyPreffix}`, len.toString());
            const serializedContent = serialize(grupo, { isJSON: true });
            const key = `${keyPreffix}${grupo.id}`;
            await ionicDb.setData(key, serializedContent);

        }
        catch (error) {
            console.log("error=" + error);
            return;
        }


    }

    async removeAtGroupPreReserva(_id: number)
    {
        const lenTexto = await ionicDb.getKey(`length_${this.KEY_PREFIX_GROUPS_PRE_RESERVA}`);
        let len = await this.convertNumber(lenTexto);
        len -= 1;

        await ionicDb.setData(`length_${this.KEY_PREFIX_GROUPS_PRE_RESERVA}`, len.toString());

        const key = `${this.KEY_PREFIX_GROUPS_PRE_RESERVA}${_id}`;
        await ionicDb.removeKey(key);
        

    }


    async removeItemPrereserva(_id: number)
    {
        const key = this.KEY_PREFIX_ITEMSPRERESERVAS;
        await this.removeItemReservasGeneral(_id, key);


    }


    async removeItemReservaVuelaCar(_id:number)
    {
        try{

            const key = this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR;
            await this.removeItemReservasGeneral(_id, key);
        }
        catch(error)
        {
            console.log("error " + error);
        }


    }
    async removeItemReservaExterior(_id: number)
    {
        try
        {

            const key = this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR;
            await this.removeItemReservasGeneral(_id, key);
        }
        catch(error)
        {
            console.log("error" + error);
        }

    }

    async removeItemReservasGeneral(_id: number, keyPreffix: string)
    {
        try
        {

            const lenTexto = await ionicDb.getKey(`length_${keyPreffix}`);
            let len = await this.convertNumber(lenTexto);
            len -= 1;
    
            await ionicDb.setData(`length_${keyPreffix}`, len.toString());
    
            const key = `${keyPreffix}${_id}`;
            await ionicDb.removeKey(key);
        }
        catch(error)
        {
            console.log("error" + error);
        }
        

    }




}

export let repoStorage = new InterfaceStorage();