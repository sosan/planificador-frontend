import { typeGroup } from "../components/SchedulerGrid";
import { ionicDb } from "../database/IonicStorage";
import { IListadoPrereserva, } from "../datos/vehiculosGeneral";
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

    async generalGetItemsGroups(keyTexto: string)
    {
        let lenTexto = await ionicDb.getKey(`length_${keyTexto}`);
        const len = await this.convertNumber(lenTexto);
        let listado = [];
        let counter = 0;
        while (listado.length < len)
        {
            const key = `${keyTexto}${counter.toString()}`;
            const value = await ionicDb.getKey(key);
            counter++;
            if (value === null) continue;
            const content = JSON.parse(value);
            const deserializeContent = this.deserialize(content);
            listado.push(deserializeContent);

        }

        return listado;
    }

    async getItemsPreReservas() {
        const listado = await this.generalGetItemsGroups(this.KEY_PREFIX_ITEMSPRERESERVAS);
        return listado;
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

        await ionicDb.setData(`length_${this.KEY_PREFIX_GROUPS_RESERVA_VUELACAR}`, grupo.length.toString() );

        for (let i = 0; i < grupo.length; i++)
        {
            const key = `${this.KEY_PREFIX_GROUPS_RESERVA_VUELACAR}${grupo[i].id}`;
            const serializedContent = serialize(grupo[i], { isJSON: true });
            await ionicDb.setData(key, serializedContent);

        }

    }


    async insertlistadoClasesVehiculos(arrayListadoClasesVehiculos: string[])
    {
        await ionicDb.setData(this.KEY_LISTADO_CLASES_VEHICULOS, arrayListadoClasesVehiculos.toString());

    }

    async getlistadoClasesVehiculos() {
        let texto: string = await ionicDb.getKey(this.KEY_LISTADO_CLASES_VEHICULOS );
        texto = texto.replaceAll("\"", "");
        const listado = texto.split(",");
        return listado;
    }

    async insertlistadoModelosVehiculos(arrayListadoModelosVehiculos: string[])
    {
        await ionicDb.setData(this.KEY_LISTADO_MODELOS_VEHICULOS, arrayListadoModelosVehiculos.toString());
    }

    async getlistadoModelosVehiculos() {
        
        let texto: string = await ionicDb.getKey(this.KEY_LISTADO_MODELOS_VEHICULOS);
        texto = texto.replaceAll("\"", "");
        const listado = texto.split(",");
        return listado;
    }


    async insertGroupsPreReserva(grupo: typeGroup[]) {
        console.log("sdfkjsdf")
        await ionicDb.setData("length_groupsPreReserva", grupo.length.toString());

        for (let i = 0; i < grupo.length; i++)
        {
            const key = `${this.KEY_PREFIX_GROUPS_PRE_RESERVA}${grupo[i].id}`;
            const serializedContent = serialize(grupo[i], { isJSON: true });
            await ionicDb.setData(key, serializedContent );

        }

    }



    async insertGroupsReservaExterior(grupo: typeGroup[]) {

        await ionicDb.setData("length_groupsReservaExterior", grupo.length.toString());

        for (let i = 0; i < grupo.length; i++) {
            const key = `${this.KEY_PREFIX_GROUPS_RESERVA_EXTERIOR}${grupo[i].id}`;
            const serializedContent = serialize(grupo[i], { isJSON: true });
            await ionicDb.setData(key, serializedContent);

        }

    }

    async insertItemsPreReservas(listado: IListadoPrereserva[]) {

        await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMSPRERESERVAS}`, listado.length.toString());

        for (let i = 0; i < listado.length; i++) {
            const key = `${this.KEY_PREFIX_ITEMSPRERESERVAS}${listado[i].id}`;
            const serializedContent = serialize(listado[i], { isJSON: false });
            await ionicDb.setData(key, serializedContent);

        }

    }


    async insertItemsReservaVuelaCar(listado: IListadoPrereserva[]) {

        await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}`, listado.length.toString());

        for (let i = 0; i < listado.length; i++) {
            const key = `${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}${listado[i].id}`;
            const serializedContent = serialize(listado[i], { isJSON: false });
            await ionicDb.setData(key, serializedContent);

        }

    }



    async insertItemsReservasExterior(listado: IListadoPrereserva[]) {
        await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}`, listado.length.toString());

        for (let i = 0; i < listado.length; i++) {
            const key = `${this.KEY_PREFIX_ITEMS_RESERVA_EXTERIOR}${listado[i].id}`;
            const serializedContent = serialize(listado[i], { isJSON: false });
            await ionicDb.setData(key, serializedContent);

        }

    }


    async insertNewElementReservasVuelaCar(elemento: IListadoPrereserva)
    {
        console.log("insertNewElementReservasVuelaCar");

        const lenTexto = await ionicDb.getKey(`length_${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}`);
        let len = await this.convertNumber(lenTexto);
        len += 1;

        await ionicDb.setData(`length_${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}`, len.toString());
        const serializedContent = serialize(elemento, { isJSON: false });
        const key = `${this.KEY_PREFIX_ITEMS_RESERVA_VUELACAR}${elemento.id}`;
        await ionicDb.setData(key, serializedContent);

    }

    async insertNewElementReservasExterior(elementoReserva: IListadoPrereserva) {
        console.log("insertNewElementReservasVuelaCar");
    }


    updateReservaExterior(arg0: number, elementoReserva: IListadoPrereserva) {
        throw new Error('Method not implemented.');
    }
    updateReservaVuelaCar(arg0: number, elementoReserva: IListadoPrereserva) {
        throw new Error('Method not implemented.');
    }


}

export let repoStorage = new InterfaceStorage();