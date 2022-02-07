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

export const ORDEN_LISTADO_MODELO_VEHICULOS = [
    "Citroen C1",
    "Peugeot 107",
    "Peugeot 108",
    "Toyota Aygo",
    "Citroen C1 Automatic",
    "Citroen C1 Open",
    "Toyota Aygo Open",
    "Citroen C3",
    "Peugeout 208",
    "Peugeout 807",
    "Piaggio Liberty",
    "Piaggio Medley",
    "Suzuky Burgman",
    "Yamaha Majesty",
    "Yamaha Tricity"

];


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
