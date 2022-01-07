import moment from "moment";
import {LISTADO_IMAGENES_COCHES} from "./imagenescoches"

export const items = [
    {
        id: 1,
        group: 1,
        title: 'item 1',
        start_time: moment().hour(0).minute(0),
        end_time: moment().hour(23).minute(58),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        
        itemProps: {
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'altura-items',
            style: {
                background: 'fuchsia',
            }
        }   

    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start_time: moment().hour(0).minute(0),
        end_time: moment().hour(23).minute(59),
        // canMove: true,
        // canResize: true,
        // canChangeGroup: true,
    },
    
]

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
    {
        "_id": "606651cbf59ae674f6c47279",
        "vehiculo": "suzukyBurgman125",
        "descripcion": "Suzuky Burgman 125",
        "clasevehiculo": "motos2",
        "modelo": "125",
        "pax": 2,
        "puertas": 0,
        "conbustible": "95 oct",
        "transmision": "A",
        "topCase": 1,
        "aireacondicionado": false,
        "franquicia": 150,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.suzukyBurgman125,
        "altImage": ""

        
    }, 
    {
        "_id": "606651cbf59ae674f6c4727a",
        "vehiculo": "citroenC1open",
        "descripcion": "Citröen C1 Open",
        "clasevehiculo": "openAutomatic",
        "modelo": "C1",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "4127JVH",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.citroenC1open,
        "altImage": ""
    }, 
    {
        "_id": "606651cbf59ae674f6c4727b",
        "vehiculo": "toyotaAygoOpen",
        "descripcion": "Toyota Aygo Open",
        "clasevehiculo": "openAutomatic",
        "modelo": "CAM",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.toyotaAygoOpen,
        "altImage": ""
    },
    {
        "_id": "606651cbf59ae674f6c4727c",
        "vehiculo": "peugeot108",
        "descripcion": "Peugeot 108",
        "clasevehiculo": "basico",
        "modelo": "108",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "9494JKK",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.peugeot108,
        "altImage": ""
    },
    {
        "_id": "606651cbfs9ae674f6c4727d",
        "vehiculo": "toyotaAygo",
        "descripcion": "Toyota Aygo",
        "clasevehiculo": "basico",
        "modelo": "CAM",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "6090KNM",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.toyotaAygo,
        "altImage": ""

    },
    {
        "_id": "606T651cbf59ae674f6c4727d",
        "vehiculo": "toyotaAygo",
        "descripcion": "Toyota Aygo",
        "clasevehiculo": "basico",
        "modelo": "CAM",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "1171KNP",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.toyotaAygo,
        "altImage": ""

    },
    {
        "_id": "606651cbf5mae674f6c4727d",
        "vehiculo": "toyotaAygo",
        "descripcion": "Toyota Aygo",
        "clasevehiculo": "basico",
        "modelo": "CAM",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "8042KNR",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.toyotaAygo,
        "altImage": ""

    },
    {
        "_id": "606651cbf59ae674f6c4727e",
        "vehiculo": "peugeot807",
        "descripcion": "Peugeot 807",
        "clasevehiculo": "7pax",
        "modelo": "807",
        "pax": 7,
        "puertas": 4,
        "conbustible": "diesel",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "0536HVR",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.peugeot807,
        "altImage": ""
    },
    {
        "_id": "606651cbf59ae674f6c4727f",
        "vehiculo": "citroenC1",
        "descripcion": "Citröen C1",
        "clasevehiculo": "basico",
        "modelo": "C1",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.citroenC1,
        "altImage": ""
    },
    {
        "_id": "606651cbf59ae674f6c47280",
        "vehiculo": "piaggioLiberty125",
        "descripcion": "Piaggio Liberty 125",
        "clasevehiculo": "motos1",
        "modelo": "125",
        "pax": 2,
        "puertas": 0,
        "conbustible": "95 oct",
        "transmision": "A",
        "topCase": 1,
        "aireacondicionado": false,
        "franquicia": 150,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.piaggioLiberty125,
        "altImage": ""
    },
    {
        "_id": "606651cbf59ae674f6c47281",
        "vehiculo": "citroenC3",
        "descripcion": "Citröen C3",
        "clasevehiculo": "5pax",
        "modelo": "C3",
        "pax": 5,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.citroenC3,
        "altImage": ""
    },
    {
        "_id": "606651cbf59ae674f6c47282",
        "vehiculo": "citroenC1Automatic",
        "descripcion": "Citröen C1 Auto",
        "clasevehiculo": "openAutomatic",
        "modelo": "C1",
        "pax": 4,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "A",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.citroenC1Automatic,
        "altImage": ""
    },
    {
        "_id":  "60da00ceaa9590bf3e752794",
        "vehiculo": "peugeot208",
        "descripcion": "Peugeot 208",
        "clasevehiculo": "5pax",
        "modelo": "208",
        "pax": 5,
        "puertas": 4,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "",
        "precio": 100,
        "srcImage": LISTADO_IMAGENES_COCHES.peugeot208,
        "altImage": ""
    },
    {
        "_id": "60da00ceaa9590bf3e752796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "4350DYF",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da00ceaa9590bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "4387DYF",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01ceaa9590bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "4448DYF",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01ceaa9w590bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "4491DYF",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac951f0bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "4001DYV",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01amac9510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "2306DYY",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aelc9510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "8941DZR",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da0a1aeac9510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "8958DZR",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01baeac9510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "3910DZW",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac9q510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "9712FCG",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "6a0da01aeac9510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "0013FCH",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac951o0bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "0147FCH",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac951b0bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "1482FCT",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60dqa01aeac9510bf3ek732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "1749FCT",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac9s510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "1900FCT",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac9a510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "6659FDN",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60daa01aeac9510bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "6767FDN",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac9510bnf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "6854FDN",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac9510bf3ek732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "3810FFM",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac9510bf3ei732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "5054DTV",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },
    {
        "_id": "60da01aeac951t0bf3e732796",
        "vehiculo": "peugeot107",
        "descripcion": "Peugeot 107",
        "clasevehiculo": "5pax",
        "modelo": "107",
        "pax": 5,
        "puertas": 2,
        "conbustible": "95 oct",
        "transmision": "M",
        "topCase": 0,
        "aireacondicionado": true,
        "franquicia": 0,
        "entregado": false,
        "devuelto": false,
        "matricula": "5101DTV",
        "precio": 100,
        "srcImage": "", //LISTADO_IMAGENES_COCHES.peugeot107,
        "altImage": ""
    },

]