import React, { ReactElement } from 'react';
import SchedulerWrapper from './SchedulerWrapper';
import { ENUM_TIPOS_EVENTOS } from "./SchedulerWrapper";



interface ContainerProps {
    name: string;
}

const data = [
    { start_date: '2021-11-17 6:00', end_date: '2021-11-18 8:00', text: 'Event 1', id: 1, personChoosed: "persona1", numero_dias: 3, color: "#0288D1", textColor: "white" },
    { start_date: '2021-11-18 10:00', end_date: '2021-11-19 18:00', text: 'Event 2', id: 2, personChoosed: "persona2", numero_dias: 1, color: "#FF5722", textColor: "white"  }
];


export const SchedulerContainer: React.FC<ContainerProps> = ({ name }) => {
    
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
                onDataUpdated={logDataUpdate }
                onClick={ clickeado }
            />
        </>
    );
    
    

};