import React, { Component, useState  } from 'react';
import moment from "moment";
import TimelineWrapper, { ENUM_TIPOS_EVENTOS } from "./TimelineWrapper";
import { IListadoPrereserva, IDataCoches, dataCars, items, ORDEN_LISTADO_CLASE_COCHES } from "../datos/coches";
import { listColaborators } from "../datos/listadoColaboradores";
import { listFlotas } from "../datos/listadoFlotas";
import { ModalDialog, ContainerState as IContainerModalState } from "./Modal";

import "../css/Timeline.css";

const DRAG_SNAP = 60 * 60 * 24 * 1000;

interface ContainerProps {
    name: string;
}
type ContainerState = {
    borrado: boolean;
    modalReservasVisible: boolean;
    tiempoClick?: any;
    fechaAlta?: string;
    fechaRecogida?: Date,
    fechaDevolucion?: Date,
    matricula?: string;
    vehiculo?: string;
    cantidadDias: number;
    dataCarsVisible: boolean;
    textoFechaDevolucionVisible: boolean;
    notaReserva?: string;
    modeloVehiculo?: string;
    claseVehiculo?: string;
    colaborador?: string;
    flota?: string;
    estado?: string;
    showItem: boolean;

}



enum ENUM_TIPOS_STATUS {
    "none" = "none",
    "preservado"= "prereservado",
    "reservado" = "reservado",
    "prepagado" = "prepagado",
    "100pagado" = "100pagado",
    "length" = 4,
}

// export interface IDataEventos {
//     "start_date": string,
//     "end_date": string,
//     "text": string,
//     "id": number,
//     "numeronotas": string,
//     "garaje": string,
//     "personChoosed": string,
//     "numero_dias": number,
//     "color": string,
//     "textColor": string,
//     "fechaentrada": string,
//     "status": ENUM_TIPOS_STATUS,
//     "vehiculoSeleccionado"?: IDataCoches

// };



// 

// let dataEventos: IDataEventos[] = [
//     {
//         start_date: '2021-11-17 6:00',
//         end_date: '2021-11-18 8:00',
//         text: 'Event 1',
//         id: 1,
//         numeronotas: "222",
//         garaje: "",
//         personChoosed: "gianni",
//         numero_dias: 3,
//         color: "#0288D1",
//         textColor: "white",
//         fechaentrada: "",
//         status: ENUM_TIPOS_STATUS.prepagado,
//         vehiculoSeleccionado: undefined
//     },

// ];



let listadoPrereservas: IListadoPrereserva[] = [
    {
        id: 1,
        group: 1,
        fechaAlta: "asdasd",
        title: 'item 1',
        start_time: new Date(new Date().setHours(0, 0, 0)),
        end_time: new Date(new Date().setHours(23, 59, 59)),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        notaReserva: "asdasd",
        matricula: "asdasd",
        modeloVehiculo: "asdasd",
        claseVehiculo: "asdasd",
        cantidadDias: 0,
        colaborador: "asdasd",
        flota: "asda",
        estado: "asd",
        itemProps: {
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'altura-items',
            style: {
                background: '#3796f3',
            }
        }

    },
    {
        id: 2,
        fechaAlta: "asdasd",
        group: 2,
        title: 'item 2',
        start_time: new Date(new Date().setHours(0, 0, 0)),
        end_time: new Date(new Date().setHours(23, 59, 59)),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        notaReserva: "asdasd",
        matricula: "asdasd",
        modeloVehiculo: "asdasd",
        claseVehiculo: "asdasd",
        cantidadDias: 0,
        colaborador: "asdasd",
        flota: "asda",
        estado: "asd",
        itemProps: {
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'altura-items',
            style: {
                background: '#3796f3',
            }
        }
        
    },



];


type typeGroup =
{
    id: number, 
    title: string,
    clasevehiculo: string,
    vehiculo: string,
    modelo: string,
    matricula: string;
    srcImage?: any,
    rightTitle?: string,
    height?: number,
    width?: number,
    bgColor?: string,
    stackItems?: boolean,

}


export class SchedulerContainer extends Component<ContainerProps, ContainerState>
{
    groupsReserva: typeGroup[];
    groupsPreReserva: typeGroup[];
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];

    constructor(props: any) {
        super(props);

        this.state = {
            borrado: false,
            modalReservasVisible: false,
            showItem: false,
            cantidadDias: 3,
            dataCarsVisible: false,
            textoFechaDevolucionVisible: false,
        };
        
        let groupsData = this.createGroupForCars(dataCars);

        this.groupsReserva = groupsData.groupCreated;
        this.listadoClaseVehiculos = groupsData.arrayListadoClasesVehiculos; 
        this.listadoModelosVehiculos = groupsData.arrayListadoModelosVehiculos;
        
        this.groupsPreReserva = [

            {
                "id": 1,
                "matricula": "state.matricula as string",
                "title": "title",
                "vehiculo": "vehiculo",
                "clasevehiculo": "state.claseVehiculo",
                "modelo": "state.modeloVehiculo",
                "bgColor": "#3796f3",
                "height": 50,
            },
            {
                "id": 2,
                "matricula": "state.matricula as string",
                "title": "title",
                "vehiculo": "vehiculo",
                "clasevehiculo": "state.claseVehiculo",
                "modelo": "state.modeloVehiculo",
                "bgColor": "#3796f3",
                "height": 50,
            }
        ];

    }


    onDoubleClickedTimeline = async (groupId: any, time: any, evento: any) => {
        console.log("clickedado desde grupo=" + groupId + " time=" + time + " evento=" + evento );

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const [matricula, vehiculo] = await this.searchByID(groupId, this.groupsReserva);
        this.setState(
        { 
            "modalReservasVisible": true,
            "tiempoClick": time,
            "matricula": matricula,
            "vehiculo": vehiculo,
            "cantidadDias": 3,
            "dataCarsVisible": false,
            "textoFechaDevolucionVisible": true
        });

    }

    async searchByID(_id: number, grupos: typeGroup[])
    {

        let matricula = "", vehiculo = "";

        for (let i = 0; i < this.groupsReserva.length; i++)
        {
            if (this.groupsReserva[i].id === _id)
            {
                matricula = this.groupsReserva[i].matricula;
                vehiculo = this.groupsReserva[i].title;
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
        let listadoModelosVehiculos: Set<string> = new Set<string>();
        let listadoClasesVehiculos: Set<string> = new Set<string>();
        
        for (let i = 0; i < cars.length; i++)
        {
            listadoClasesVehiculos.add(cars[i].clasevehiculo);
            listadoModelosVehiculos.add(cars[i].modelo);
            groupCreated.push(
            {
                "id": i,
                "title": `${cars[i].descripcion}`,
                "clasevehiculo": `${cars[i].clasevehiculo}`,
                "vehiculo": `${cars[i].vehiculo}`,
                "modelo": `${cars[i].modelo}`,
                "srcImage": "",
                "rightTitle": "",
                "height": 50,
                "stackItems": true,
                "matricula": `${cars[i].matricula}`
            });
            
        }

        
        groupCreated = this.orderGroupCars(groupCreated, ORDEN_LISTADO_CLASE_COCHES);
        const arrayListadoClasesVehiculos = Array.from(listadoClasesVehiculos);
        const arrayListadoModelosVehiculos = Array.from(listadoModelosVehiculos);
        
        console.log("Modelos vehiculos" + JSON.stringify(arrayListadoModelosVehiculos));
        console.log("Clases vehiculos" + JSON.stringify(arrayListadoClasesVehiculos));
        return { groupCreated, arrayListadoClasesVehiculos, arrayListadoModelosVehiculos } ;
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
        
        this.setState({"modalReservasVisible": false, "cantidadDias": 3});

    }

    onModalDidDismiss = async () => {
        
        this.setState({ "modalReservasVisible": false, "cantidadDias": 3 });
    }

    anadirPreReserva = () => {
        this.setState({ 
            "modalReservasVisible": true, 
            "cantidadDias": 3,
            "tiempoClick": new Date().getTime(),
            "matricula": "No asignada",
            "dataCarsVisible": true,
            "textoFechaDevolucionVisible": false,
            
        });
        // console.log("anadir textoFechaDevolucionVisible=" + this.state.textoFechaDevolucionVisible);
    };
 
    onDoubleClickedOverItem = async (state: IListadoPrereserva ) =>
    {
        console.log("onclicked over item state=" + JSON.stringify(state));
        this.setState({
            "dataCarsVisible": true,
            "showItem": true,
            "modalReservasVisible": true,
            "fechaAlta": state.fechaAlta,
            "fechaRecogida": state.start_time,
            "fechaDevolucion": state.end_time,
            "matricula": state.matricula,
            "vehiculo": state.claseVehiculo,
            "cantidadDias": state.cantidadDias,
            "textoFechaDevolucionVisible": true,
            "notaReserva": state.notaReserva,
            "modeloVehiculo": state.modeloVehiculo,
            "claseVehiculo": state.claseVehiculo,
            "colaborador": state.colaborador,
            "flota": state.flota,
            "estado": state.flota,
            
        });

        /**
 {
"id": 3,
"group": 3,
"fechaAlta": "Mon Jan 10 2022 21:29:06 GMT+0100 (hora estándar de Europa central)",
"start_time": "2022-01-09T23:00:00.000Z",
"end_time": "2022-01-12T22:59:59.000Z",
"canMove": true,
"canResize": true,
"canChangeGroup": true,
"title": "No asignada",
"notaReserva": "",
"matricula": "No asignada",
"modeloVehiculo": "cam",
"claseVehiculo": "openautomatic",
"cantidadDias": 3,
"colaborador": "thomas",
"flota": "",
"estado": "",
"itemProps": {}
}
         */


    }

    onSaveData = async (state: IContainerModalState) =>
    {

        //TODO: realizar comprobaciones de si todos los campos estan rellenados
        /// ....
        if (state.modeloVehiculo === "" || state.claseVehiculo === "") return;

        //TODO: comprobar si existe o no, si no existe crear
        // si existe actualizar los datos

        let [exist, positiongroupsPreReserva] = await this.searchGroupExist(this.groupsPreReserva, state.matricula as string);

        if (exist === false)
        {
            this.groupsPreReserva.push(
            {
                "id": this.groupsPreReserva.length + 1,
                "matricula": state.matricula as string,
                "title": "title",
                "vehiculo": "vehiculo",
                "clasevehiculo": state.claseVehiculo as string,
                "modelo": state.modeloVehiculo as string,
                "bgColor": "#FF00FF",
                "height": 50,
    
            });

            positiongroupsPreReserva = this.groupsPreReserva.length;

        }

        console.log("state=" + JSON.stringify(state));

        const startTime = new Date(state.fechaRecogida as Date);
        const endTime = new Date(state.fechaDevolucion as Date);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);

        if (state.matricula === "" || 
            state.matricula === undefined || 
            state.fechaRecogida?.toString() === "" ||
            state.fechaDevolucion?.toString() === ""
        )
        {
            state.matricula = "No asignada";
        }

        const elementoPrereservas: IListadoPrereserva = {
            id: listadoPrereservas.length + 1,
            group: positiongroupsPreReserva as number,
            fechaAlta: new Date().toString(),
            start_time: startTime,
            end_time: endTime,
            canMove: true,
            canResize: true,
            canChangeGroup: true,
            title: state.matricula as string,
            notaReserva: state.notareserva,
            matricula: state.matricula as string,
            modeloVehiculo: state.modeloVehiculo as string,
            claseVehiculo: state.claseVehiculo as string,
            cantidadDias: state.cantidadDias,
            colaborador: state.colaborador as string,
            flota: state.flota as string,
            estado: state.estado as string,
            
        };

        elementoPrereservas["itemProps"] = {
            onDoubleClick: () => { this.onDoubleClickedOverItem(elementoPrereservas) },
        }

        if (exist === false)
        {

            listadoPrereservas.push(elementoPrereservas);
        }
        else
        {
            listadoPrereservas[positiongroupsPreReserva as number] = elementoPrereservas;
        }



        // console.log("listadoPrereservas=" + JSON.stringify(listadoPrereservas));
        this.setState({ "modalReservasVisible": false, "cantidadDias": 3 });

        // console.log("groupsPreserva=" + JSON.stringify(this.groupsPreReserva));

    };

    async searchGroupExist(grupoPrereservas: typeGroup[], matricula: string)
    {
        let exist = false;
        let position = -1;
        for (let i = 0; i < grupoPrereservas.length; i++)
        {

            if (grupoPrereservas[i].matricula === matricula)
            {
                exist = true;
                position = i;
                return [exist, position];
            }
        }

        return [exist, position];

    }

    render() {
        console.log("render groupsPreserva=" + JSON.stringify(this.groupsPreReserva));
        const t = [...this.groupsPreReserva];

        return (
            <>
                <TimelineWrapper 
                    anadirBotonPreservar={true}
                    groups={t}
                    items={listadoPrereservas}
                    onClickAnadirPreReserva={this.anadirPreReserva}
                    
                />
                
                <TimelineWrapper
                    anadirBotonPreservar={false}
                    marginTop={50}
                    groups={this.groupsReserva}
                    items={items}
                    onDoubleClicked={this.onDoubleClickedTimeline}
                />
                <ModalDialog 
                    isVisible={this.state.modalReservasVisible}
                    showItem={this.state.showItem}
                    textoFechaDevolucionVisible={this.state.textoFechaDevolucionVisible}
                    tiempoClick={this.state.tiempoClick}
                    fechaAlta={this.state.fechaAlta as string}
                    notaReserva={this.state.notaReserva as string}
                    fechaRecogida={this.state.fechaRecogida}
                    fechaDevolucion={this.state.fechaDevolucion}
                    modeloVehiculo={this.state.modeloVehiculo}
                    claseVehiculo={this.state.claseVehiculo}
                    colaborador={this.state.colaborador}
                    flota={this.state.flota}
                    estado={this.state.estado}
                    cantidadDias={this.state.cantidadDias}
                    matricula={this.state.matricula}
                    vehiculo={this.state.vehiculo}
                    listadoClaseVehiculos={this.listadoClaseVehiculos}
                    listadoModelosVehiculos={this.listadoModelosVehiculos}
                    dataCarsVisible={this.state.dataCarsVisible}
                    dataCars={dataCars}
                    listColaborators={listColaborators}
                    listFlotas={listFlotas}
                    onCloseModal={ this.onCloseModal } 
                    onModalDidDismiss={this.onModalDidDismiss }
                    onSaveData={this.onSaveData}
                />
                
            </>
        );
    }


}
