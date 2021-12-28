import React from 'react';
import TimelineWrapper, { ENUM_TIPOS_EVENTOS } from "./TimelineWrapper";
import { IDataCoches, dataCars, items, ORDEN_LISTADO_CLASE_COCHES } from "../datos/coches";
import { htmlLightBoxTemplatePreserva } from "../componentsHtml/renderLightBox";

import moment from 'moment';
import "react-calendar-timeline/lib/Timeline.css";
import "../css/Timeline.css";




interface ContainerProps {
    name: string;
}
type ContainerState = {
    borrado: boolean;
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
    modelo: string,
    rightTitle?: string,
    height?: number,
    width?: number,
    bgColor?: string,
    stackItems?: boolean,

}


export class SchedulerContainer extends React.Component<ContainerProps, ContainerState>
{
    groups: typeGroup[];
    
    constructor(props: any) {
        super(props);
        this.state = {
            borrado: false
        };
        
        this.groups = this.createGroupForCars(dataCars);

    }

    logDataUpdate = (textEv: string, ev: any, id: any) => {

    }



    componentWillUnmount() {
        // console.log("desmontado");
        // this.setState({ borrado: true });
    }


    replaceTemplates(template: any, newTextReplace: any, idToReplace: string) {

        const htmlTemplate = template.replace(new RegExp(idToReplace), newTextReplace);
        return htmlTemplate;

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
                "modelo": `${cars[i].modelo}`,
                "rightTitle": "",
                "height": 50,
                "stackItems": true,
            });
            
        }

        groupCreated = this.orderGroupCars(groupCreated, ORDEN_LISTADO_CLASE_COCHES);
        return groupCreated;
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

    render() {

        return (
            <>
                {
                    (this.state.borrado === true) ? null :
                        <TimelineWrapper
                            groups={this.groups}
                            items={items}
                            // visibleTimeStart={this.defaultTimeStart}
                            // visibleTimeEnd={this.defaultTimeEnd}
                        />
                }

            </>
        );
    }


}
