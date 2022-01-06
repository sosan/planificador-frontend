import React, { Component, useState  } from 'react';
import TimelineWrapper, { ENUM_TIPOS_EVENTOS } from "./TimelineWrapper";
import { IDataCoches, dataCars, items, ORDEN_LISTADO_CLASE_COCHES } from "../datos/coches";
import { listColaborators } from "../datos/listadoColaboradores";
import { listFlotas } from "../datos/listadoFlotas";
import { ModalDialog } from "./Modal";


import "react-calendar-timeline/lib/Timeline.css";
import "../css/Timeline.css";

import imagencitroenC1open from "../images/CitroenC1_open.webp";

const DRAG_SNAP = 60 * 60 * 24 * 1000;

interface ContainerProps {
    name: string;
}
type ContainerState = {
    borrado: boolean;
    modalVisible: boolean;
    tiempoClick?: any;
    matricula?: string;
    vehiculo?: string;
    cantidadDias: number;
}



enum ENUM_TIPOS_STATUS {
    "none" = "none",
    "reservado" = "reservado",
    "prepagado" = "prepagado",
    "100pagado" = "100pagado",
    "length" = 4,
}

export interface IDataEventos {
    "start_date": string,
    "end_date": string,
    "text": string,
    "id": number,
    "numeronotas": string,
    "garaje": string,
    "personChoosed": string,
    "numero_dias": number,
    "color": string,
    "textColor": string,
    "fechaentrada": string,
    "status": ENUM_TIPOS_STATUS,
    "vehiculoSeleccionado"?: IDataCoches

};




const dataEventos: IDataEventos[] = [
    {
        start_date: '2021-11-17 6:00',
        end_date: '2021-11-18 8:00',
        text: 'Event 1',
        id: 1,
        numeronotas: "222",
        garaje: "",
        personChoosed: "gianni",
        numero_dias: 3,
        color: "#0288D1",
        textColor: "white",
        fechaentrada: "",
        status: ENUM_TIPOS_STATUS.prepagado,
        vehiculoSeleccionado: undefined
    },

];

type typeGroup =
{
    id: number, 
    title: string,
    clasevehiculo: string,
    vehiculo: string,
    modelo: string,
    srcImage?: any,
    rightTitle?: string,
    height?: number,
    width?: number,
    bgColor?: string,
    stackItems?: boolean,
    matricula: string;

}


export class SchedulerContainer extends Component<ContainerProps, ContainerState>
{
    groups: typeGroup[];
    
    constructor(props: any) {
        super(props);

        this.state = {
            borrado: false,
            modalVisible: false,
            cantidadDias: 3
            
        };
        
        this.groups = this.createGroupForCars(dataCars);

    }

    onDoubleClicked = async (groupId: any, time: any, evento: any) => {
        console.log("clickedado desde grupo=" + groupId + " time=" + time + " evento=" + evento );

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const [matricula, vehiculo] = await this.searchByID(groupId, this.groups);
        this.setState(
        { 
            "modalVisible": true,
            "tiempoClick": time,
            "matricula": matricula,
            "vehiculo": vehiculo,
            "cantidadDias": 3
        });

    }

    async searchByID(_id: number, grupos: typeGroup[])
    {

        let matricula = "", vehiculo = "";

        for (let i = 0; i < this.groups.length; i++)
        {
            if (this.groups[i].id === _id)
            {
                matricula = this.groups[i].matricula;
                vehiculo = this.groups[i].title;
                break;
            }
        }

        return [matricula, vehiculo];

    }

    componentWillUnmount() {
    }

    createGroupForCars(cars: IDataCoches[] )
    {
        let groupCreated: typeGroup[] = [];

        for (let i = 0; i < cars.length; i++)
        {
            groupCreated.push(
            {
                "id": i,
                "title": `${cars[i].descripcion}`,
                "clasevehiculo": `${cars[i].clasevehiculo}`,
                "vehiculo": `${cars[i].vehiculo}`,
                "modelo": `${cars[i].modelo}`,
                "srcImage": imagencitroenC1open,
                "rightTitle": "",
                "height": 50,
                "stackItems": true,
                "matricula": `${cars[i].matricula}`
            });
            
        }

        groupCreated = this.orderGroupCars(groupCreated, ORDEN_LISTADO_CLASE_COCHES);
        return groupCreated;
    }

    createImagesGroups(cars: typeGroup[], listadoImagenesCoches: any)
    {
        let _group: typeGroup[] = [];

        for (let i = 0; i < cars.length; i++)
        {
            const key = cars[i].vehiculo;

            cars[i].srcImage = listadoImagenesCoches[key]
            _group.push(cars[i]);

        }

        return _group;
    }

    orderGroupCars(cars: typeGroup[], ordenListadoCoches: string[] )
    {
        let groupOrdered: typeGroup[] = [];
        for (let i = 0; i < ordenListadoCoches.length; i++)
        {

            for (let j = 0; j < cars.length; j++)
            {

                if (cars[j].clasevehiculo === ordenListadoCoches[i])
                {
                    groupOrdered.push(cars[j]);
                    
                }

            }
        }

        return groupOrdered;
    }

    onCloseModal = () => {
        
        this.setState({"modalVisible": false, "cantidadDias": 3});

    }

    onModalDidDismiss = async () => {
        
        this.setState({ "modalVisible": false });
    }

    render() {
        
        return (
            <>
                {
                    (this.state.borrado === true) ? null :
                        <TimelineWrapper
                            groups={this.groups}
                            items={items}
                            onDoubleClicked={this.onDoubleClicked}
                            
                    />

                }

                <ModalDialog 
                    isVisible={this.state.modalVisible}
                    tiempoClick={this.state.tiempoClick}
                    cantidadDias={this.state.cantidadDias}
                    matricula={this.state.matricula}
                    vehiculo={this.state.vehiculo}
                    onCloseModal={ this.onCloseModal } 
                    onModalDidDismiss={this.onModalDidDismiss }
                    dataCars={dataCars}
                    listColaborators={listColaborators}
                    listFlotas={listFlotas}
                />

            </>
        );
    }


}
