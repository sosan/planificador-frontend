
export interface IlistColaborators {
    "id": string;
    "descripcion": string;
    "color": string;

};

export enum ENUM_LISTADO_COLABORADORES {
    "none" = "none",
    "gianni" = "gianni",
    "sven" = "sven",
    "llull" = "llull",
    "llull1" = "llull1",
    "thomas" = "thomas",
    "belmi" = "belmi",
    "lupe" = "lupe",
    "dido" = "dido",
    "campa" = "campa",
    "fs" = "fs",
    "v" = "v",
    "length" = 10,
}

export let listadoColaboradores: IlistColaborators[] = [
    
    {
        "id": "gianni",
        "descripcion": "Gianni",
        "color": "#c9dcff"
    },
    {
        "id": "sven",
        "descripcion": "Sven",
        "color": "#38ff3f"
    },
    {
        "id": "llull",
        "descripcion": "Llull",
        "color": "#abf739"
    },
    {
        "id": "llull1",
        "descripcion": "Llull1",
        "color": "#ffc738"
    },
    {
        "id": "thomas",
        "descripcion": "Thomas",
        "color": "#c5a9ff"
    },
    {
        "id": "belmi",
        "descripcion": "Belmi",
        "color": "#c8c8c8"
    },
    {
        "id": "lupe",
        "descripcion": "Lupe",
        "color": "#c8c8c8"
    },
    {
        "id": "dido",
        "descripcion": "Dido",
        "color": "#c8c8c8"
    },
    {
        "id": "RentCarmallorca.es",
        "descripcion": "RentCarMallorca.es",
        "color": "#c9dcff"
    },
    {
        "id": "campa",
        "descripcion": "Campa",
        "color": "#B0ED66"
    },
    {
        "id": "fs",
        "descripcion": "Fuera de servicio",
        "color": "#effcf8"
    },
    {
        "id": "v",
        "descripcion": "VuelaCar",
        "color": "#efccf8"
    },
];


export const setColaboradores = async (_colaboradores: any[]) => 
{
    listadoColaboradores = _colaboradores;
}
