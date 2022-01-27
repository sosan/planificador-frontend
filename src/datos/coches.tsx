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
    start_time: Date,
    end_time: Date, //moment.Moment,
    canMove: boolean,
    canResize: boolean,
    canChangeGroup: boolean,
    title: string;
    modalState: IModalState;
    itemProps?: any;

};

export const ORDEN_LISTADO_CLASE_COCHES = [
    "basico",
    "openAutomatic",
    "5pax",
    "7pax",
    "motos1",
    "motos2",

];


export interface IDataCoches {
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


export const dataCars: IDataCoches[] = [
    ...suzukis,
    ...piaggios,
    ...yamaha,
    ...peugeot,
    ...citroen,
    ...toyota,

]