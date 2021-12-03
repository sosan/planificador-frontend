import React from 'react';
import SchedulerWrapper from './SchedulerWrapper';
import { IDataCoches, datosCoches } from "../datos/coches"
import { htmlLightBoxTemplatePreserva } from "../componentsHtml/renderLightBox";
import { ENUM_TIPOS_EVENTOS } from "./SchedulerWrapper";



interface ContainerProps {
    name: string;
}
type ContainerState = {
    borrado: boolean;
}

enum ENUM_TIPOS_STATUS {
    "none" = "none",
    "reservado" = "reservado" ,
    "prepagado" = "prepagado",
    "100pagado" = "100pagado",
    "length" = 4,
}

interface IDataEventos
{
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
    // { 
    //     start_date: '2021-11-18 10:00', 
    //     end_date: '2021-11-19 18:00', 
    //     text: 'Event 2', 
    //     id: 2, 
    //     numeronotas: "223",
    //     garaje: "",
    //     personChoosed: "gianni", 
    //     numero_dias: 1, 
    //     color: "#FF5722", 
    //     textColor: "white",
    //     fechaentrada: ""
    // }
];



export class SchedulerContainer extends React.Component<ContainerProps, ContainerState>
{

    constructor(props: any)
    {
        super(props);
        this.state = {
            borrado: false
        };

    }

    componentWillUnmount() {
        console.log("desmontado");
        this.setState({ borrado: true });
    }


    logDataUpdate = (textEv: string, ev: any, id: any) => {
        // const text = ev && ev.text ? ` (${ev.text})` : '';
        // const message = `event ${action}: ${id} ${text}`;

        console.log("tenemos antes=" + dataEventos.length);
        switch (textEv) {
            case ENUM_TIPOS_EVENTOS.create:
                dataEventos.push(ev);
                break;

            case ENUM_TIPOS_EVENTOS.update:
                this.updateData(ev);
                break;

            case ENUM_TIPOS_EVENTOS.delete:
                this.deleteData(ev);
                break;

        }

        console.log("tenemos despues=" + dataEventos.length);
        console.log("updated =" + JSON.stringify(ev) + " ev.text" + ev.text + " data=" + JSON.stringify(dataEventos));
    }

    validateData = (objectToValidate: IDataEventos, objectSelected: IDataEventos) =>
    {

        // la fecha de entrada mantiene la original
        if (objectSelected.fechaentrada !== "")
        {
            objectToValidate.fechaentrada = objectSelected.fechaentrada;

        }

        return objectToValidate;
    }

    updateData = (ev: IDataEventos) => {

        for (let i = 0; i < dataEventos.length; i++) {

            if (ev.id === dataEventos[i].id) {
                const datosValidados = this.validateData(ev, dataEventos[i]) ;
                dataEventos[i] = datosValidados;
                break;
            }

        }

    };

    deleteData = async (ev: any) => {

        console.log("data length=" + dataEventos.length);
        for (let i = 0; i < dataEventos.length; i++) 
        {

            if (ev.id === dataEventos[i].id) {
                dataEventos.splice(i, 1)
                break;
            }

        }

        console.log("data length=" + dataEventos.length);

    };

    clickeado = () => {
        console.log("sdddd");

    };


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

    render()
    {

        const carsConvertedHtml = this.convertCarsToHTML(datosCoches);
        const htmlTemplate = this.replaceTemplates(htmlLightBoxTemplatePreserva, carsConvertedHtml, "#seccionCoches#");

        return (
            <>
                {
                    (this.state.borrado === true) ? null :
                        <SchedulerWrapper
                            events={dataEventos}
                            htmlLightBoxTemplate={htmlTemplate}
                            timeFormatState={true}
                            onDataUpdated={this.logDataUpdate}
                            onClick={this.clickeado}
                        />
                }

            </>
        );
    }

}
