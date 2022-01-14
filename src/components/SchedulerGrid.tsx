import React, { Component  } from 'react';
// import moment from "moment";
import TimelineWrapper from "./TimelineWrapper";
import { IListadoPrereserva, IDataCoches, dataCars, items, ORDEN_LISTADO_CLASE_COCHES } from "../datos/coches";
import { listColaborators } from "../datos/listadoColaboradores";
import { listFlotas } from "../datos/listadoFlotas";
import { ModalDialog, ContainerState as IContainerModalState, IModalState, ENUM_TIPOS_ESTADO } from "./Modal";

import "../css/Timeline.css";

const DRAG_SNAP = 60 * 60 * 24 * 1000;

interface ContainerProps {
    name: string;
}
type ContainerState = {
    borrado: boolean;
    modalReservasVisible: boolean;
    isDoubleclickItem: boolean;
    modalState: IModalState;
    tiempoClick?: any;
    dataCarsVisible: boolean;
    // id?: number;
    // fechaAlta?: string;
    // fechaRecogida?: Date,
    // fechaDevolucion?: Date,
    // matricula?: string;
    // vehiculo?: string;
    // cantidadDias: number;
    // textoFechaDevolucionVisible: boolean;
    // notaReserva?: string;
    // modeloVehiculo?: string;
    // claseVehiculo?: string;
    // colaborador?: string;
    // flota?: string;
    // estado?: string;
    // group?: number;
    // showItem: boolean;
    // start_time?: Date,
    // end_time?: Date,

    

}






let listadoPrereservas: IListadoPrereserva[] = [
    {
        id: 0,
        group: 0,
        fechaAlta: "asdasd",
        title: ' ',
        start_time: new Date(new Date().setHours(0, 0, 0)),
        end_time: new Date(new Date().setHours(23, 59, 59)),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        notareserva: "asdasd",
        matricula: "asdasd",
        modeloVehiculo: "asdasd",
        claseVehiculo: "asdasd",
        cantidadDias: 0,
        colaborador: "asdasd",
        flota: "asda",
        estado: "asd",
        itemProps: {
            className: 'altura-items-inicio',
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
    // TIPOS_ESTADO: ENUM_TIPOS_ESTADO;


    defaultState: ContainerState = {
        borrado: false,
        modalReservasVisible: false,
        dataCarsVisible: false,
        isDoubleclickItem: false,
        modalState: {
            showItem: false,
            cantidadDias: 3,
            textoFechaDevolucionVisible: false,
            estado: ENUM_TIPOS_ESTADO.prereservado as string,
            
        }
    }

    constructor(props: any) {
        super(props);

        this.state = this.defaultState;
        
        let groupsData = this.createGroupForCars(dataCars);

        this.groupsReserva = groupsData.groupCreated;
        this.listadoClaseVehiculos = groupsData.arrayListadoClasesVehiculos; 
        this.listadoModelosVehiculos = groupsData.arrayListadoModelosVehiculos;
        // this.TIPOS_ESTADO = ENUM_TIPOS_ESTADO.preservado;
        
        
        this.groupsPreReserva = [

            {
                "id": 0,
                "matricula": " ",
                "title": " ",
                "vehiculo": " ",
                "clasevehiculo": " ",
                "modelo": " ",
                "bgColor": "#3796f3",
                "height": 2,
            },
            
        ];

    }

    onCloseModal = () => {

        this.setState({"modalReservasVisible": false, });
        // this.setState({ "modalState": { "cantidadDias": 3 } }, () => {
        // });

    }

    onModalDidDismiss = async () => {
        
        this.setState({ "modalReservasVisible": false, });
        // this.setState({ "modalState": { "cantidadDias": 3 } }, () => {
        // });
        
    }


    onDoubleClickedTimeline = async (groupId: any, time: any, evento: any) => {
        console.log("clickedado desde grupo=" + groupId + " time=" + time + " evento=" + evento );

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const [matricula, vehiculo] = await this.searchByID(groupId, this.groupsReserva);
        this.setState(
        { 
            "modalReservasVisible": true,
            "tiempoClick": time,
            "modalState": {
                "matricula": matricula,
                "vehiculo": vehiculo,
                "cantidadDias": 3,
                "textoFechaDevolucionVisible": true
                
            },
            "dataCarsVisible": false,
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

   

    anadirPreReserva = () => {
        this.setState({
            
            "modalState": {
                "showItem": false,
                "textoFechaDevolucionVisible": false,
                "id": listadoPrereservas.length + 1,
                "group": this.groupsPreReserva.length + 1,
                "claseVehiculo": "",
                "colaborador": "",
                "fechaDevolucion": new Date(),
                "fechaRecogida": new Date(),
                "fechaAlta": "",
                "modeloVehiculo": "",
                "notareserva": "",
                "vehiculo": "",
                "cantidadDias": 3,
                "matricula": "No asignada",
                "flota": "",
                "estado": "prereservado", //ENUM_TIPOS_ESTADO.prereservado as string,

            },
            "tiempoClick": new Date().getTime(),
            "dataCarsVisible": true,
            "isDoubleclickItem": false,
            
        }, () => {
            this.setState({ "modalReservasVisible": true,  });
            // "modalState": { "textoFechaDevolucionVisible": false} 
            console.log(this.state)
        });
        // console.log("this.state.modalState" + this.state.modalState);
        console.log("this.state.modalState" + this.state.modalState);
    };

    onDoubleClickedOverItem = async (state: IListadoPrereserva ) =>
    {
        // console.log("onclicked over item state=" + JSON.stringify(state));

        //recoger los datos

        this.setState({
            "dataCarsVisible": true,
            "modalState": {
                "showItem": true,
                "textoFechaDevolucionVisible": true,
                "id": state.id,
                "group": state.group,
                "fechaAlta": state.fechaAlta,
                "fechaRecogida": state.start_time,
                "fechaDevolucion": state.end_time,
                "matricula": state.matricula,
                "vehiculo": state.claseVehiculo,
                "cantidadDias": state.cantidadDias,
                "notareserva": state.notareserva,
                "modeloVehiculo": state.modeloVehiculo,
                "claseVehiculo": state.claseVehiculo,
                "colaborador": state.colaborador,
                "flota": state.flota,
                "estado": state.estado,

            },
            // "modalReservasVisible": true,
            "isDoubleclickItem": true,
            
        }, () => {
            this.setState({ "modalReservasVisible": true, });
            console.log(this.state)
        });


    }

    onSaveData = (state: IContainerModalState, _idModal: number, groupId: number) =>
    {

        //TODO: comprobar si existe o no, si no existe crear
        // si existe actualizar los datos
        

        if (state.modalState.matricula === "" ||
            state.modalState.matricula === undefined ||
            state.modalState.fechaRecogida?.toString() === "" ||
            state.modalState.fechaDevolucion?.toString() === ""
        ) 
        {
            state.modalState.matricula = "No asignada";
        }

        if (state.modalState.estado === "" || state.modalState.estado === undefined)
        {
            state.modalState.estado = "prereservado";
        }

        let [existGroupPrereserva, positiongroupsPreReserva] = this.searchGroupExist(this.groupsPreReserva, state.modalState.id as number);
        let [existListadoPrereserva, positionListadoPreReserva] = this.searchExistListadoPreservas(listadoPrereservas, state.modalState.id as number);
        
        if (existGroupPrereserva === false)
        {
            this.groupsPreReserva.push(
            {
                "id": groupId,
                "matricula": state.modalState.matricula,
                "title": "title",
                "vehiculo": "vehiculo",
                "clasevehiculo": state.modalState.claseVehiculo as string,
                "modelo": state.modalState.modeloVehiculo as string,
                // "bgColor": "#FF00FF",
                "height": 50,
    
            });
            // _id = state.id; //listadoPrereservas.length + 1;
            positiongroupsPreReserva = this.groupsPreReserva.length - 1;
            state.modalState.id = _idModal;

            
        }
        else
        {
            if (state.modalState.id === undefined) {
                state.modalState.id = _idModal;
            }

            this.groupsPreReserva[positiongroupsPreReserva as number].matricula = state.modalState.matricula as string;
            
        }

        const startTime = new Date(state.modalState.fechaRecogida as Date);
        const endTime = new Date(state.modalState.fechaDevolucion as Date);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);
        
        // encapsular dentor de un objeto
        let elementoPrereservas: IListadoPrereserva = {
            id: _idModal as number,
            group: groupId,
            fechaAlta: new Date().toString(),
            start_time: startTime,
            end_time: endTime,
            canMove: true,
            canResize: true,
            canChangeGroup: true,
            title: state.modalState.matricula as string,
            notareserva: state.modalState.notareserva as string,
            matricula: state.modalState.matricula as string,
            modeloVehiculo: state.modalState.modeloVehiculo as string,
            claseVehiculo: state.modalState.claseVehiculo as string,
            cantidadDias: state.modalState.cantidadDias as number,
            colaborador: state.modalState.colaborador as string,
            flota: state.modalState.flota as string,
            estado: state.modalState.estado as string,
            
            
        };

        elementoPrereservas["itemProps"] = {
            onDoubleClick: () => { this.onDoubleClickedOverItem(elementoPrereservas) },
            className: 'altura-items',
            style: {
                background: 'blue',
            }
        }

        if (existGroupPrereserva === false)
        {
            listadoPrereservas.push(elementoPrereservas);
        }
        else
        {
            listadoPrereservas[positionListadoPreReserva as number] = elementoPrereservas;
        }
        
        this.setState({"modalReservasVisible": false});
        return true;
        //TEST: comprobar si --- funciona
        // const estado = this.changeState(this.state, elementoPrereservas);
        // this.setState({...estado});
        // this.setState(
        // { 
        //     "modalReservasVisible": false,
        //     "modalState": {
        //         "id": elementoPrereservas.id,
        //         "group": elementoPrereservas.group,
        //         "fechaAlta": elementoPrereservas.fechaAlta,
        //         "fechaRecogida": elementoPrereservas.start_time,
        //         "fechaDevolucion": elementoPrereservas.end_time,
        //         "notareserva": elementoPrereservas.notareserva,
        //         "matricula": elementoPrereservas.matricula,
        //         "modeloVehiculo": elementoPrereservas.modeloVehiculo as string,
        //         "claseVehiculo": elementoPrereservas.claseVehiculo as string,
        //         "cantidadDias": elementoPrereservas.cantidadDias,
        //         "colaborador": elementoPrereservas.colaborador as string,
        //         "flota": elementoPrereservas.flota as string,
        //         "estado": elementoPrereservas.estado as string,

        //     },
        //     "isDoubleclickItem": false,
            
        // });

        
        // console.log("listadoPrereservas=" + JSON.stringify(listadoPrereservas));
        // console.log("groupsPreserva=" + JSON.stringify(this.groupsPreReserva));

    };

    //Mejorarlo for
    changeState(state: ContainerState, elementoPrereservas: IListadoPrereserva)
    {

        state["modalReservasVisible"] = false;
        state["isDoubleclickItem"] = false;
        state["modalState"]["id"] = elementoPrereservas.id;
        state["modalState"]["group"] = elementoPrereservas.group;
        state["modalState"]["fechaAlta"] = elementoPrereservas.fechaAlta;
        state["modalState"]["fechaRecogida"] = elementoPrereservas.start_time;
        state["modalState"]["fechaDevolucion"] = elementoPrereservas.end_time;
        state["modalState"]["notareserva"] = elementoPrereservas.notareserva;
        state["modalState"]["matricula"] = elementoPrereservas.matricula;
        state["modalState"]["modeloVehiculo"] = elementoPrereservas.modeloVehiculo as string;
        state["modalState"]["claseVehiculo"] = elementoPrereservas.claseVehiculo as string;
        state["modalState"]["cantidadDias"] = elementoPrereservas.cantidadDias;
        state["modalState"]["colaborador"] = elementoPrereservas.colaborador as string;
        state["modalState"]["flota"] = elementoPrereservas.flota as string;
        state["modalState"]["estado"] = elementoPrereservas.estado as string;

        return state;
        // this.setState(
        //     {
        //         "modalReservasVisible": false,
        //         "modalState": {
        //             "id": elementoPrereservas.id,
        //             "group": elementoPrereservas.group,
        //             "fechaAlta": elementoPrereservas.fechaAlta,
        //             "fechaRecogida": elementoPrereservas.start_time,
        //             "fechaDevolucion": elementoPrereservas.end_time,
        //             "notareserva": elementoPrereservas.notareserva,
        //             "matricula": elementoPrereservas.matricula,
        //             "modeloVehiculo": elementoPrereservas.modeloVehiculo as string,
        //             "claseVehiculo": elementoPrereservas.claseVehiculo as string,
        //             "cantidadDias": elementoPrereservas.cantidadDias,
        //             "colaborador": elementoPrereservas.colaborador as string,
        //             "flota": elementoPrereservas.flota as string,
        //             "estado": elementoPrereservas.estado as string,

        //         },
        //         "isDoubleclickItem": false,

        //     });


        // return state;
    }


    searchGroupExist(grupoPrereservas: typeGroup[], _id: number)
    {
        let exist = false;
        let position = -1;
        
        for (let i = 0; i < grupoPrereservas.length; i++)
        {

            if (grupoPrereservas[i].id === _id)
            {
                exist = true;
                position = i;

                return [exist, position];
            }
        }

        return [exist, position];

    }

    searchExistListadoPreservas(listado: IListadoPrereserva[], _id: number) {
        let exist = false;
        let position = -1;
        let group = -1;
        for (let i = 0; i < listado.length; i++) {

            if (listado[i].id === _id) {
                exist = true;
                position = i;
                group = listado[i].group;
                return [exist, position, group];
            }
        }

        return [exist, position, group];

    }

    render() {
        
        // console.log("this.state.id=" + this.state.modalState.id);
        const grupoPrereserva = [...this.groupsPreReserva];

        return (
            <>
                <TimelineWrapper 
                    anadirBotonPreservar={true}
                    groups={grupoPrereserva}
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
                    modalState={this.state.modalState}
                    isDoubleclickItem={this.state.isDoubleclickItem}
                    tiempoClick={this.state.tiempoClick}
                    listadoClaseVehiculos={this.listadoClaseVehiculos}
                    listadoModelosVehiculos={this.listadoModelosVehiculos}
                    dataCarsVisible={this.state.dataCarsVisible}
                    dataCars={dataCars}
                    listColaborators={listColaborators}
                    listFlotas={listFlotas}
                    onCloseModal={ this.onCloseModal } 
                    onModalDidDismiss={this.onModalDidDismiss }
                    onSaveData={this.onSaveData}
                    // showItem={this.state.showItem}
                    // textoFechaDevolucionVisible={this.state.textoFechaDevolucionVisible}
                    // id={this.state.id}
                    // group={this.state.group}
                    // fechaAlta={this.state.fechaAlta as string}
                    // notaReserva={this.state.notaReserva as string}
                    // fechaRecogida={this.state.fechaRecogida}
                    // fechaDevolucion={this.state.fechaDevolucion}
                    // modeloVehiculo={this.state.modeloVehiculo}
                    // claseVehiculo={this.state.claseVehiculo}
                    // colaborador={this.state.colaborador}
                    // flota={this.state.flota}
                    // estado={this.state.estado}
                    // cantidadDias={this.state.cantidadDias}
                    // matricula={this.state.matricula}
                    // vehiculo={this.state.vehiculo}
                />
                
            </>
        );
    }


}
