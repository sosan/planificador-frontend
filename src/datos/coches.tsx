import moment from "moment";

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



export interface IDataCoches {
    "_id": string,

    "matricula": string,
    "precio": number,

    "vehiculo": string,
    "descripcion": string,
    "clasevehiculo": string,
    "pax": number,
    "puertas": number,
    "conbustible": string,
    "transmision": string,
    "topCase": number,
    "aireacondicionado": boolean,
    "franquicia": number,
    "entregado": boolean,
    "devuelto": boolean,


};

export const datosCoches: IDataCoches[] = [{
    "_id": "606651cbf59ae674f6c47279",
    "vehiculo": "suzukyBurgman125",
    "descripcion": "Suzuky Burgman 125",
    "clasevehiculo": "motos2",
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
    "precio": 100

    
}, {
    "_id": "606651cbf59ae674f6c4727a",
    "vehiculo": "citroenC1open",
    "descripcion": "Citröen C1 Open",
    "clasevehiculo": "openAutomatic",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c4727b",
    "vehiculo": "toyotaAygoOpen",
    "descripcion": "Toyota Aygo Open",
    "clasevehiculo": "openAutomatic",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c4727c",
    "vehiculo": "peugeot108",
    "descripcion": "Peugeot 108",
    "clasevehiculo": "basico",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c4727d",
    "vehiculo": "toyotaAygo",
    "descripcion": "Toyota Aygo",
    "clasevehiculo": "basico",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c4727e",
    "vehiculo": "peugeot807",
    "descripcion": "Peugeot 807",
    "clasevehiculo": "7pax",
    "pax": 7,
    "puertas": 4,
    "conbustible": "diesel",
    "transmision": "M",
    "topCase": 0,
    "aireacondicionado": true,
    "franquicia": 0,
    "entregado": false,
    "devuelto": false,
    "matricula": "",
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c4727f",
    "vehiculo": "citroenC1",
    "descripcion": "Citröen C1",
    "clasevehiculo": "basico",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c47280",
    "vehiculo": "piaggioLiberty125",
    "descripcion": "Piaggio Liberty 125",
    "clasevehiculo": "motos1",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c47281",
    "vehiculo": "citroenC3",
    "descripcion": "Citröen C3",
    "clasevehiculo": "5pax",
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
    "precio": 100
}, {
    "_id": "606651cbf59ae674f6c47282",
    "vehiculo": "citroenC1Automatic",
    "descripcion": "Citröen C1 Auto",
    "clasevehiculo": "openAutomatic",
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
    "precio": 100
}, {
    "_id":  "60da00ceaa9590bf3e752794",
    "vehiculo": "peugeot208",
    "descripcion": "Peugeot 208",
    "clasevehiculo": "5pax",
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
    "precio": 100
}]