// import moment from "moment";
import { IModalState } from "../components/Modal";
import {LISTADO_IMAGENES_COCHES} from "./imagenescoches";
import { suzukis } from "./suzukiburgman";
import { piaggios } from "./piaggio";
import { yamaha } from "./yamaha";
import { peugeot } from "./peugeot";
import { citroen }  from "./citroen";
import { toyota } from "./toyota";


export const DEFAULT_TEXT_MATRICULA = "";

export interface IListadoPrereserva {
    id: number;
    group: number;
    // fechaAlta: string;
    start_time: number, //Date,
    end_time: number, //Date,
    canMove: boolean,
    canResize: boolean,
    canChangeGroup: boolean,
    title: string;
    modalState: IModalState;
    itemProps?: any;

};

export let ORDEN_LISTADO_MODELO_VEHICULOS = [
    { "descripcion": "Citroen C1", "vehiculo": "citroenC1" },
    { "descripcion": "Peugeot 108", "vehiculo": "peugeot108"},
    { "descripcion": "Toyota Aygo", "vehiculo": "toyotaAygo"},
    { "descripcion": "Citroen C1 Auto.", "vehiculo": "citroenC1Automatic"},
    { "descripcion": "Citroen C1 Open", "vehiculo": "citroenC1open"},
    { "descripcion": "Toyota Aygo Open", "vehiculo": "toyotaAygoOpen"},
    { "descripcion": "Citroen C3", "vehiculo": "citroenC3"},
    { "descripcion": "Peugeout 208", "vehiculo": "peugeout208"},
    { "descripcion": "Peugeout 807","vehiculo": "peugeout807"},
    { "descripcion": "Piaggio Liberty", "vehiculo": "piaggioLiberty125"},
    { "descripcion": "Piaggio Medley", "vehiculo": "piaggiomedley"},
    { "descripcion": "Suzuky Burgman", "vehiculo": "suzukyBurgman125"},
    { "descripcion": "Yamaha Majesty", "vehiculo": "yamahamajesty"},
    { "descripcion": "Yamaha Tricity","vehiculo":  "yamahatricity}"}

];


export const setOrdenListadoModeloVehiculos = async (_orden:any) =>
{
    ORDEN_LISTADO_MODELO_VEHICULOS = _orden;

}



export interface IDataVehiculos {
    "_id": string;
    "matricula": string;
    "precio": number;
    "vehiculo": string;
    "descripcion": string;
    "clasevehiculo": string;
    "modelo": string;
    "pax": number;
    "puertas": number;
    "conbustible": string;
    "transmision": string;
    "topCase": number;
    "aireacondicionado": boolean;
    "franquicia": number;
    "entregado": boolean;
    "devuelto": boolean;
    "srcImage": any;
    "altImage": string;

};


export const dataCars: IDataVehiculos[] = [
    ...citroen,
    ...peugeot,
    ...toyota,
    ...piaggios,
    ...suzukis,
    ...yamaha,

];
