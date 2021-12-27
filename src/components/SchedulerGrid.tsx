import React from 'react';
import TimelineWrapper, { ENUM_TIPOS_EVENTOS } from "./TimelineWrapper";
import { IDataCoches, datosCoches, items } from "../datos/coches";
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



export class SchedulerContainer extends React.Component<ContainerProps, ContainerState>
{

    defaultTimeStart: any;
    defaultTimeEnd: any;

    constructor(props: any) {
        super(props);
        this.state = {
            borrado: false
        };

        const defaultTimeStart = moment()
            .startOf("day")
            .add(-10, "day")
            .toDate();
        const defaultTimeEnd = moment()
            .startOf("day")
            .add(10, "day")
            .toDate();

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

    convertCarsToHTML(cars: IDataCoches[]) {

        let htmlSectionCars = `
            <select id="vehiculoSeleccionado" name="vehiculoSeleccionado" class="carseleccionado">
            <option  value="ninguno" selected>Elegir coche</option>
        `;

        for (let i = 0; i < cars.length; i++) {

            htmlSectionCars += `
                <option  value="${cars[i].vehiculo}">${cars[i].descripcion}</option>
            `;

        }

        htmlSectionCars += "</select> ";

        return htmlSectionCars;

    }

    render() {

        const carsConvertedHtml = this.convertCarsToHTML(datosCoches);
        const htmlTemplate = this.replaceTemplates(htmlLightBoxTemplatePreserva, carsConvertedHtml, "#seccionCoches#");
        const groups = [
            {
                id: 1, 
                title: 'group 1',
                rightTitle: 'title in the right sidebar',
                height: 50,
                bgColor: "#cccccc"
            },
            {
                id: 2,
                title: 'group 2',
                rightTitle: 'title in the right sidebar',
                height: 50,
            }
        ];

        

        return (
            <>
                {
                    (this.state.borrado === true) ? null :
                        <TimelineWrapper
                            groups={groups}
                            items={items}
                            // defaultTimeStart={moment().add(-25, 'day').valueOf()}
                            // defaultTimeEnd={moment().add(25, 'day').valueOf()}
                            
                            defaultTimeStart={this.defaultTimeStart }
                            defaultTimeEnd={this.defaultTimeEnd}
                            // visibleTimeStart={moment().add(-5, 'day').valueOf()}
                            // visibleTimeEnd={moment().add(5, 'day').valueOf()}
                        />
                }

            </>
        );
    }


}
