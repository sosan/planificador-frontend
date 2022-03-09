import { Component } from "react";
import { IListadoPrereserva } from "../datos/vehiculosGeneral";

interface ContainerState
{
    dataReserva: any;
}

interface ContainerProps
{
    dataReserva: any;
}

export class ContenidoModalDerecha extends Component<ContainerState, ContainerProps>
{

    constructor(props: any)
    {
        super(props);

    }

    render()
    {

        
        return(
            <>
            </>
        );
    }

}