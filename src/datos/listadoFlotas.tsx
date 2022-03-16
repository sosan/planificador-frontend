
export interface IlistFlotas {
    "id": string;
    "descripcion": string;
    "color": string;

};

export let listFlotas: IlistFlotas[] = [
    {
        "id": "belmi",
        "descripcion": "Belmi",
        "color": "#c9dcff"
    },
    {
        "id": "sc",
        "descripcion": "Star Car",
        "color": "#38ff3f"
    },
    {
        "id": "v",
        "descripcion": "Vuelacar",
        "color": "#ffc738"
    },
    {
        "id": "rr",
        "descripcion": "Royal Rent",
        "color": "#ffc7a8"
    }

    
];


export const setListadoFlotas = async (_flotas: any) =>
{
    listFlotas = _flotas;

}