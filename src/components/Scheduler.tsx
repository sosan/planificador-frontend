import React, { ReactElement, useState, useEffect, ReactNode } from 'react';
import {
    useIonViewDidEnter,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonViewWillLeave } from '@ionic/react';
import SchedulerWrapper from './SchedulerWrapper';
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

interface IData
{
    start_date: string, 
    end_date: string,
    text: string,
    id: number,
    numeronotas: string,
    garaje: string,
    personChoosed: string,
    numero_dias: number,
    color: string, 
    textColor: string,
    fechaentrada: string,
    status: ENUM_TIPOS_STATUS
};



const data: IData[] = [
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
        status: ENUM_TIPOS_STATUS.prepagado
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

        console.log("tenemos antes=" + data.length);
        switch (textEv) {
            case ENUM_TIPOS_EVENTOS.create:
                data.push(ev);
                break;

            case ENUM_TIPOS_EVENTOS.update:
                this.updateData(ev);
                break;

            case ENUM_TIPOS_EVENTOS.delete:
                this.deleteData(ev);
                break;

        }

        console.log("tenemos despues=" + data.length);
        console.log("updated =" + JSON.stringify(ev) + " ev.text" + ev.text + " data=" + JSON.stringify(data));
    }

    validateData = (objectToValidate: IData, objectSelected: IData) =>
    {

        // la fecha de entrada mantiene la original
        if (objectSelected.fechaentrada !== "")
        {
            objectToValidate.fechaentrada = objectSelected.fechaentrada;

        }

        return objectToValidate;
    }

    updateData = (ev: IData) => {

        for (let i = 0; i < data.length; i++) {

            if (ev.id === data[i].id) {
                const datosValidados = this.validateData(ev, data[i]) ;
                data[i] = datosValidados;
                break;
            }

        }

    };

    deleteData = async (ev: any) => {

        console.log("data length=" + data.length);
        for (let i = 0; i < data.length; i++) 
        {

            if (ev.id === data[i].id) {
                data.splice(i, 1)
                break;
            }

        }

        console.log("data length=" + data.length);

    };

    clickeado = () => {
        console.log("sdddd");

    };

    
    render()
    {
        return (
            <>
                {
                    (this.state.borrado === true) ? null :
                        <SchedulerWrapper
                            events={data}
                            timeFormatState={true}
                            onDataUpdated={this.logDataUpdate}
                            onClick={this.clickeado}
                        />
                }

            </>
        );
    }

}

export const SchedulerContainer2: React.FC<ContainerProps> = ({ name }) => {
    

    // let deleted = useState(false);
    
    

    useIonViewDidEnter(() => {
        console.log('ionViewDidEnter event fired');
    });

    useIonViewDidLeave(() => {
        console.log('ionViewDidLeave event fired');
    });

    useIonViewWillEnter(() => {
        console.log('ionViewWillEnter event fired');
    });

    useIonViewWillLeave(() => {
        console.log('ionViewWillLeave event fired');
        // deleted = useState(true);
    });


    const logDataUpdate = (textEv: string, ev: any, id: any) => {
        // const text = ev && ev.text ? ` (${ev.text})` : '';
        // const message = `event ${action}: ${id} ${text}`;

        console.log("tenemos antes=" + data.length);
        switch (textEv)
        {
            case ENUM_TIPOS_EVENTOS.create:
                data.push(ev);
            break;

            case ENUM_TIPOS_EVENTOS.update:
                updateData(ev);
            break;
            
            case ENUM_TIPOS_EVENTOS.delete:
                deleteData(ev);
            break;


        }
        
        console.log("tenemos despues=" + data.length);
        console.log("updated =" + JSON.stringify(ev) + " ev.text" + ev.text + " data=" + JSON.stringify(data));
    }

    const updateData = async (ev: any) =>
    {

        for (let i = 0; i < data.length; i++) {

            if (ev.id === data[i].id) {
                data[i] = ev;
                break;
            }

        }

    };
    
    const deleteData = async (ev: any) => {

        console.log("data length=" + data.length);
        for(let i = 0; i < data.length; i++)
        {

            if (ev.id === data[i].id)
            {
                // data.splice(i);
                data.splice(i, 1)
                break;
            }

        }

        console.log("data length=" + data.length);

    };

    const clickeado = () =>
    {
        console.log("sdddd");

    };

    return(
        <>
             
                
                <SchedulerWrapper
                    events={data}
                    timeFormatState={true}
                    onDataUpdated={logDataUpdate}
                    onClick={clickeado}
                />
            
        </>
    );
    
    

};