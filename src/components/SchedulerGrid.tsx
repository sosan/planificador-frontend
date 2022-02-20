import React, { Component } from 'react';
import { IonButton } from '@ionic/react';
import TimelineWrapper from "./TimelineWrapper";
import { IListadoPrereserva, IDataVehiculos, dataCars, ORDEN_LISTADO_MODELO_VEHICULOS, DEFAULT_TEXT_MATRICULA } from "../datos/vehiculosGeneral";
import { listadoColaboradores, ENUM_LISTADO_COLABORADORES } from "../datos/listadoColaboradores";
import { listFlotas } from "../datos/listadoFlotas";
import { ModalDialog, ContainerState as IContainerModalState, IModalState, IModalErrores, ENUM_TIPOS_ESTADO } from "./Modal";
import { dataSchedulerGrid } from '../datos/DataSchedulerGrid';

import "../css/Scheduler.css";
import "../css/variables.css";

const DRAG_SNAP = 60 * 60 * 24 * 1000;

interface ContainerProps {
    name: string;
}
type ContainerState = {
    // borrado: boolean;
    modalReservasVisible: boolean;
    isDoubleclickItem: boolean;
    modalState?: IModalState;
    tiempoClick?: any;
    isFirstTime: boolean;
    errores: IModalErrores;

}

// let listadoPrereservas: IListadoPrereserva[] = [
//     {
//         id: 0,
//         group: 0,
//         title: ' ',
//         start_time: new Date(new Date().setHours(0, 0, 0)),
//         end_time: new Date(new Date().setHours(23, 59, 59)),
//         canMove: false,
//         canResize: false,
//         canChangeGroup: false,
//         modalState: {
//             fechaAlta: "asdasd",
//             notareserva: "asdasd",
//             matricula: "asdasd",
//             modeloVehiculo: "asdasd",
//             claseVehiculo: "asdasd",
//             cantidadDias: 0,
//             colaborador: "asdasd",
//             flota: "asda",
//             isPrereserva: false,
//             estado: "asd",
//             isNewRegister: false,
//         },
//         itemProps: {
//             className: 'altura-items-inicio',
//         }

//     },

// ];


export type typeGroup =
{
    id: number,
    title: string,
    clasevehiculo: string,
    vehiculo: string,
    modelo: string,
    matricula: string;
    flota?: string;
    srcImage?: any,
    rightTitle?: string,
    height?: number,
    width?: number,
    bgColor?: string,
    stackItems?: boolean,

};


export class SchedulerContainer extends Component<ContainerProps, ContainerState>
{



    // groupsReservaVuelaCar: typeGroup[];
    // groupsReservaExterior: typeGroup[];
    // groupsPreReserva: typeGroup[];
    // listadoClaseVehiculos: string[];
    // listadoModelosVehiculos: string[];
    // itemsReservasVuelaCar: IListadoPrereserva[];
    // itemsReservasExterior: IListadoPrereserva[];
    // itemsPreReservas: IListadoPrereserva[];

    defaultState: ContainerState = {
        modalReservasVisible: false,
        isDoubleclickItem: false,
        isFirstTime: false,
        errores: {
            "claseVehiculo": false,
            "colaborador": false,
            "flota": false,
            "matricula": false,
            "modeloVehiculo": false,
            "precioExterno": false,
            "textoErrores": "",
        },
        modalState: {
            isNewRegister: false,
            isPrereserva: false,
            showItem: false,
            cantidadDias: 3,
            textoFechaDevolucionVisible: false,
            estado: ENUM_TIPOS_ESTADO.prereservado as string,

        }
    }

    constructor(props: any) {
        super(props);

        this.state = this.defaultState;

        // let groupsData = this.createGroupForCars(dataCars);

        // this.groupsReservaVuelaCar = groupsData.groupCreated;
        // this.listadoClaseVehiculos = groupsData.arrayListadoClasesVehiculos;
        // this.listadoModelosVehiculos = groupsData.arrayListadoModelosVehiculos;

        // this.groupsPreReserva = [
        //     {
        //         "id": 0,
        //         "matricula": " ",
        //         "title": " ",
        //         "vehiculo": " ",
        //         "clasevehiculo": " ",
        //         "modelo": " ",
        //         "bgColor": "#3796f3",
        //         "height": 2,
        //     },

        // ];

        // this.groupsReservaExterior = [
        //     {
        //         "id": 0,
        //         "matricula": " ",
        //         "title": " ",
        //         "vehiculo": " ",
        //         "clasevehiculo": " ",
        //         "modelo": " ",
        //         "bgColor": "#3796f3",
        //         "height": 2,
        //     },

        // ];

        // this.itemsPreReservas = [{
        //     id: 0,
        //     group: 0,
        //     title: ' ',
        //     start_time: new Date(new Date().setHours(0, 0, 0)),
        //     end_time: new Date(new Date().setHours(23, 59, 59)),
        //     canMove: true,
        //     canResize: true,
        //     canChangeGroup: true,
        //     modalState: {
        //         fechaAlta: "asdasd",
        //         notareserva: "asdasd",
        //         matricula: "asdasd",
        //         modeloVehiculo: "asdasd",
        //         claseVehiculo: "asdasd",
        //         cantidadDias: 0,
        //         colaborador: "asdasd",
        //         flota: "asda",
        //         isPrereserva: false,
        //         estado: "asd",
        //         isNewRegister: false,
        //     },
        //     itemProps: {
        //         className: 'altura-items-inicio',
        //     }

        // },];

        // this.itemsReservasVuelaCar = [
        //     {
        //         id: 1,
        //         group: 1,
        //         title: 'item 1',
        //         modalState: {
        //             fechaAlta: new Date().toISOString(),
        //             notareserva: "itemsdsdf",
        //             matricula: "",
        //             modeloVehiculo: "",
        //             claseVehiculo: "",
        //             cantidadDias: 3,
        //             colaborador: "",
        //             flota: "",
        //             estado: "reservado",
        //             isPrereserva: false,
        //             isNewRegister: false,

        //         },

        //         start_time: new Date(),
        //         end_time: new Date(),
        //         canMove: true,
        //         canResize: true,
        //         canChangeGroup: true,

        //         itemProps: {
        //             'data-custom-attribute': 'Random content',
        //             'aria-hidden': true,
        //             onDoubleClick: () => { console.log('You clicked double!') },
        //             className: 'altura-items',
        //             style: {
        //                 background: 'fuchsia',
        //             }
        //         }

        //     },

        // ];

        // this.itemsReservasVuelaCar[0].start_time.setHours(0, 0, 0);
        // this.itemsReservasVuelaCar[0].end_time.setHours(23, 59, 59);

        // this.itemsReservasExterior = [];
        // this.itemsReservasExterior.push(this.itemsReservasVuelaCar[0]);

    }

    onCloseModal = () => {

        this.setState({ "modalReservasVisible": false, });


    }

    onDelete = (estado: string, flota: string, id: number) => {
        
        console.log("sjfsldf");

        
        switch(estado)
        {
            case ENUM_TIPOS_ESTADO.prereservado:
                dataSchedulerGrid.deletePrereservadoById(id);

                
            
            break;
            case ENUM_TIPOS_ESTADO.reservado:
                if (flota === "v")
                {
                    dataSchedulerGrid.deleteReservadoVuelacarById(id);
                }
                else
                {
                    dataSchedulerGrid.deleteReservadoExteriorById(id);
                }
            break;
        }
        


    }

    onModalDidDismiss = async () => {

        this.setState({ "modalReservasVisible": false, });


    }


    onDoubleClickedTimelinePreReservas = async (groupId: any, time: any, evento: any) => {

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const _state = this.getNewElementPrereserva();
        this.anadirPreReserva(_state);
    }




    onDoubleClickedTimelineReservas = async (groupId: any, time: any, evento: any) => {
        console.log("clickedado desde grupo=" + groupId + " time=" + time + " evento=" + evento);

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const _state = this.getNewElementReservaVuelacar();
        this.anadirPreReserva(_state);

    }

    // async searchByID(_id: number, grupos: typeGroup[]) {

    //     let matricula = "", vehiculo = "";

    //     for (let i = 0; i < this.groupsReservaVuelaCar.length; i++) {
    //         if (this.groupsReservaVuelaCar[i].id === _id) {
    //             matricula = this.groupsReservaVuelaCar[i].matricula;
    //             vehiculo = this.groupsReservaVuelaCar[i].title;
    //             break;
    //         }
    //     }

    //     return [matricula, vehiculo];

    // }

    componentWillUnmount() {
    }




    getNewElementPrereserva() {

        const _startTime = new Date();
        const tempStarTime = new Date(_startTime);
        const _endTime = new Date(tempStarTime.setDate(_startTime.getDate() + 2));

        _startTime.setHours(0, 0, 0);
        _endTime.setHours(23, 59, 59);

        let newState: ContainerState = {
            "modalState": {
                "showItem": false,
                "textoFechaDevolucionVisible": false,
                "id": dataSchedulerGrid.getLengthItemsPreReservas() + 1, // listadoPrereservas.length + 1,
                "group": dataSchedulerGrid.getLengthGroupsPreReserva(), //.groupsPreReserva.length,
                "claseVehiculo": "",
                "colaborador": "",
                "fechaRecogida": _startTime,
                "fechaDevolucion": _endTime,
                "fechaAlta": undefined,
                "modeloVehiculo": "",
                "notareserva": "",
                "vehiculo": "",
                "cantidadDias": 3,
                "matricula": DEFAULT_TEXT_MATRICULA,
                "flota": "",
                "estado": ENUM_TIPOS_ESTADO.prereservado as string,
                "isNewRegister": true,
                "isPrereserva": true,

            },
            "modalReservasVisible": false,
            "tiempoClick": new Date().getTime(),
            "isDoubleclickItem": false,
            "isFirstTime": false,
            "errores": { ...this.defaultState.errores }

        };

        return newState;

    }

    getNewElementReservaVuelacar() {

        const _startTime = new Date();
        const tempStarTime = new Date(_startTime);
        const _endTime = new Date(tempStarTime.setDate(_startTime.getDate() + 2));

        _startTime.setHours(0, 0, 0);
        _endTime.setHours(23, 59, 59);

        let newState: ContainerState = {
            "modalState": {
                "showItem": true,
                "textoFechaDevolucionVisible": false,
                "id": dataSchedulerGrid.getLengthItemsReservasVuelaCar() + 1, // this.itemsReservasVuelaCar.length + 1,
                "group": dataSchedulerGrid.getLengthGroupsReservaVuelaCar(), //this.groupsReservaVuelaCar.length,
                "claseVehiculo": "",
                "colaborador": ENUM_LISTADO_COLABORADORES.v as string,
                "fechaRecogida": _startTime,
                "fechaDevolucion": _endTime,
                "fechaAlta": undefined,
                "modeloVehiculo": "",
                "notareserva": "",
                "vehiculo": "",
                "cantidadDias": 3,
                "matricula": DEFAULT_TEXT_MATRICULA,
                "flota": "v",
                "estado": ENUM_TIPOS_ESTADO.reservado as string,
                "isNewRegister": true,
                "isPrereserva": false,

            },
            "modalReservasVisible": false,
            "tiempoClick": new Date().getTime(),
            "isFirstTime": false,
            "isDoubleclickItem": false,
            "errores": { ...this.defaultState.errores }

        };

        return newState;


    }

    anadirPreReserva = (newState: ContainerState) => {

        this.setState(newState, () => {
            this.setState(
                {
                    "modalReservasVisible": true,
                    "errores": { ...this.defaultState.errores },
                });
        });

    };


    onPreReservasDoubleClickedOverItem = async (state: IListadoPrereserva) => {
        // console.log("onclicked over item state=" + JSON.stringify(state));


        //recoger los datos
        let stateToSend: ContainerState = {
            "isDoubleclickItem": true,
            "modalReservasVisible": false,
            "isFirstTime": true,
            "errores": { ...this.defaultState.errores }
        };

        stateToSend.modalState = { ...state.modalState };

        stateToSend.modalState.showItem = true;
        stateToSend.modalState.isNewRegister = false;
        stateToSend.modalState.textoFechaDevolucionVisible = true;
        this.setState(stateToSend, () => {
            this.setState({ "modalReservasVisible": true, "isFirstTime": false });
            console.log(this.state)
        });

    }

    onReservasDoubleClickedOverItem = async (state: IListadoPrereserva) => {
        // console.log("onclicked over item state=" + JSON.stringify(state));

        //recoger los datos
        //recoger los datos
        let stateToSend: ContainerState = {
            "isDoubleclickItem": true,
            "modalReservasVisible": false,
            "isFirstTime": true,
            "errores": { ...this.defaultState.errores }
        };

        stateToSend.modalState = { ...state.modalState };

        stateToSend.modalState.showItem = false;
        stateToSend.modalState.isNewRegister = false;
        stateToSend.modalState.textoFechaDevolucionVisible = true;
        this.setState(stateToSend, () => {
            this.setState({ "modalReservasVisible": true, "isFirstTime": false });
            console.log(this.state)
        });

    }

    deleteDuplicatedReservas(grupo: typeGroup[], listado: IListadoPrereserva[], state: IContainerModalState) {
        let [existGroup, positiongroup] = this.searchDuplicatedGroupMatricula(grupo, state.modalState.matricula as string);
        let [existListado, positionListado] = this.searchDuplicatedListadoMatricula(listado, state.modalState.matricula as string);

        if (existGroup === true && existListado === true) {
            listado.splice(positionListado as number, 1);

            const existenMasElementos = this.searchExistListByGroupId(listado, state.modalState.group as number);
            // para borrar el grupo no tiene que haber ningun item con el id del grupo
            if (existenMasElementos === false) {
                [existGroup, positiongroup] = this.searchExistGroupById(grupo, state.modalState.group as number);
                if (existGroup === true) {
                    grupo.splice(positiongroup as number, 1);
                }
            }

        }

        return { grupo, listado }

    }


    onSaveData = (state: IContainerModalState, _idModal: number, groupId: number, isDoubleClicked: boolean) => {

        //TODO: comprobar si existe o no, si no existe crear
        // si existe actualizar los datos

        switch (state.modalState.estado) {
            case ENUM_TIPOS_ESTADO.prereservado:
                this.saveDataPrereserva(state, isDoubleClicked);
                break;

            case ENUM_TIPOS_ESTADO.reservado:
                this.saveDateReserva(state, isDoubleClicked);
                break;

            case ENUM_TIPOS_ESTADO.prepagado:
                break;

            case ENUM_TIPOS_ESTADO.alquilado:
                this.saveDateReserva(state, isDoubleClicked);
                break;
        }

    };

    getSelectedGroup(state: IContainerModalState) {
        let grupoSeleccionado: typeGroup[] = [...dataSchedulerGrid.groupsReservaVuelaCar];;
        let listadoSeleccionado: IListadoPrereserva[] = [...dataSchedulerGrid.itemsReservasVuelaCar];

        let nuevoGrupoReserva: typeGroup = {
            "id": dataSchedulerGrid.getLengthGroupsReservaVuelaCar(), // this.groupsReservaVuelaCar.length,
            "title": "title",
            "matricula": state.modalState.matricula as string,
            "vehiculo": "vehiculo",
            "clasevehiculo": state.modalState.claseVehiculo as string,
            "modelo": state.modalState.modeloVehiculo as string,
            "flota": state.modalState.flota as string,
            "height": 50,
            "srcImage": "",
            "rightTitle": "",
            "stackItems": true,

        };

        if (state.modalState.flota !== "v") {
            grupoSeleccionado = [...dataSchedulerGrid.groupsReservaExterior];
            listadoSeleccionado = [...dataSchedulerGrid.itemsReservasExterior];
            nuevoGrupoReserva = {
                "id": dataSchedulerGrid.getLengthGroupsReservaExterior(), //this.groupsReservaExterior.length,
                "title": "title",
                "matricula": state.modalState.matricula as string,
                "vehiculo": "vehiculo",
                "clasevehiculo": state.modalState.claseVehiculo as string,
                "modelo": state.modalState.modeloVehiculo as string,
                "flota": state.modalState.flota as string,
                "height": 50,
                "srcImage": "",
                "rightTitle": "",
                "stackItems": true,
            }
        }

        return { grupoSeleccionado, listadoSeleccionado, nuevoGrupoReserva }
    }

    saveDateReserva(state: IContainerModalState, isDoubleClicked: boolean) {

        const { grupoSeleccionado, listadoSeleccionado, nuevoGrupoReserva } = this.getSelectedGroup(state);
        let [existGroup, positiongroups] = this.searchExistGroupById(grupoSeleccionado, state.modalState.group as number);
        let [existListado, positionListado] = this.searchExistListById(listadoSeleccionado, state.modalState.id as number);


        if (existGroup === false) {

            if (state.modalState.flota === "v") {

                // quedado aqui
                // actualizar el registro
                console.log("queaddo aqui linea 603 SchedulerGrid.tsx");
                
                const [exist, groupId ] = dataSchedulerGrid.searchGroupByMatricula(grupoSeleccionado, state.modalState.matricula as string);

                if (exist === true)
                {

                    // dataSchedulerGrid.insertNewElementGrupoReserva(nuevoGrupoReserva);
                    // positiongroups = 0;
                    const elementoReserva = this.generateNewElementReservas(state.modalState, groupId, state.modalState.id as number ); //state.modalState.id as number); //state.modalState.group as number);
                    dataSchedulerGrid.insertNewElementReservasVuelaCar(elementoReserva);
                }

                
            }
            else {
                dataSchedulerGrid.insertNewElementGrupoExterior(nuevoGrupoReserva);
                
                positiongroups = 0;
                const elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number); //state.modalState.group as number);
                dataSchedulerGrid.insertNewElementReservasExterior(elementoReserva);
                
            }

        }
        else {
            if (state.modalState.flota === "v") {
                dataSchedulerGrid.updateGroupReservaVuelaCar(state, positiongroups);
                let elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number);
                dataSchedulerGrid.updateReservaVuelaCar(positionListado as number, elementoReserva);
                
            }
            else {

                dataSchedulerGrid.updateGroupReservaExterior(state, positiongroups as number);
                let elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number);
                
                dataSchedulerGrid.updateReservaExterior(elementoReserva, positionListado as number);
                

            }

        }


        // llevarnoslo al class
        let { grupo: grupoV, listado: listadoV } = this.deleteDuplicatedReservas(dataSchedulerGrid.groupsPreReserva, dataSchedulerGrid.itemsPreReservas, state);  //listadoPrereservas, state);
        dataSchedulerGrid.reemplaceGroupReservaExterior(grupoV);
        dataSchedulerGrid.reemplacePrereservas(listadoV);
        // dataSchedulerGrid.groupsPreReserva = [...grupoV];
        // dataSchedulerGrid.itemsPreReservas = [...listadoV];

        this.setState({ "modalReservasVisible": false });

        return true;

    }


    saveDataPrereserva(state: IContainerModalState, isDoubleClicked: boolean) {

        let [existGroupPrereserva, positiongroupsPreReserva] = this.searchExistGroupById(dataSchedulerGrid.groupsPreReserva, state.modalState.group as number);
        let [existListadoPrereserva, positionListadoPreReserva] = this.searchExistListById(dataSchedulerGrid.itemsPreReservas, state.modalState.id as number);

        if (existGroupPrereserva === false) {
            dataSchedulerGrid.insertNewElementGrupoPreReserva(state);
            positiongroupsPreReserva = dataSchedulerGrid.getLengthGroupsPreReserva() - 1; // this.groupsPreReserva.length - 1;
            // state.modalState.id = _idModal;

        }
        else {

            // el vehiculo tiene un grupo, toca actualizar datos 
            // si la matricula no tiene el texto por defecto DEFAULT_TEXT_MATRICULA
            const anteriorEstado = state.modalState.estado;
            if (isDoubleClicked === true && state.modalState.flota !== "") 
            {
                state.modalState.estado = ENUM_TIPOS_ESTADO.reservado;

            }

            if (state.modalState.matricula !== DEFAULT_TEXT_MATRICULA
                && state.modalState.estado !== ENUM_TIPOS_ESTADO.prereservado)
            {

                /// buscar si hay duplicados de matriculas en las reservas
                // const isDuplicated = this.searchDuplicatedMatricula(this.groupsPreReserva, state.modalState.matricula);
                // if (isDuplicated === true)
                // {
                //     return;
                // }

                let elementoGrupo: typeGroup;

                switch (state.modalState?.estado) {
                    case ENUM_TIPOS_ESTADO.prereservado:
                        break;

                    case ENUM_TIPOS_ESTADO.reservado:

                        // this.groupsReservaVuelaCar.push(elementoGrupo);
                        elementoGrupo = dataSchedulerGrid.groupsPreReserva[positiongroupsPreReserva as number];
                        if (state.modalState.flota === "v")
                        {
                            elementoGrupo["id"] = dataSchedulerGrid.getLengthGroupsReservaVuelaCar(); //.groupsReservaVuelaCar.length;
                            elementoGrupo["matricula"] = state.modalState.matricula as string;
                            dataSchedulerGrid.insertNewElementGrupoReserva(elementoGrupo);
                            const elementoReserva = this.generateNewElementReservas(state.modalState, elementoGrupo["id"], elementoGrupo["id"]);
                            dataSchedulerGrid.insertNewElementReservasVuelaCar(elementoReserva);

                        }
                        else
                        {
                            
                            elementoGrupo["id"] = dataSchedulerGrid.getLengthGroupsReservaExterior(); //.groupsReservaVuelaCar.length;
                            elementoGrupo["matricula"] = state.modalState.matricula as string;
                            dataSchedulerGrid.insertNewElementGrupoExterior(elementoGrupo);
                            const elementoReserva = this.generateNewElementReservas(state.modalState, elementoGrupo["id"], elementoGrupo["id"]);
                            dataSchedulerGrid.insertNewElementReservasExterior(elementoReserva);
                        }

                        if (anteriorEstado !== state.modalState.estado)
                        {

                            dataSchedulerGrid.removeAtItemsPrereserva(positionListadoPreReserva as number);
                            // busqueda en los groups por si queda algun elemento en el grupo
                            // en el caso de que no haya ningun elemento borramos el grupo
                            let [existe, position] = this.searchExistListByMatriculaAndGroup(
                                dataSchedulerGrid.itemsPreReservas, 
                                state.modalState.matricula as string,
                                state.modalState.group as number
                            );
                            if (existe === false)
                            {
                                dataSchedulerGrid.removeAtGroupsPrereserva(positiongroupsPreReserva as number);
                                
                            }
                        
                        }

                    break;

                    case ENUM_TIPOS_ESTADO.prepagado:
                        break;

                    case ENUM_TIPOS_ESTADO.alquilado:
                        break;
                }

                this.setState({ "modalReservasVisible": false });

                return true;

            }
            else {
                dataSchedulerGrid.updateGroupPrereserva(state ,positiongroupsPreReserva as number);
            }

        }

        const startTime = new Date(state.modalState.fechaRecogida as Date);
        const endTime = new Date(state.modalState.fechaDevolucion as Date);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);

        // encapsular dentor de un objeto
        let elementoPrereservas: IListadoPrereserva = {
            id: state.modalState.id as number,
            group: state.modalState.group as number,
            // fechaAlta: new Date().toISOString(),
            start_time: startTime,
            end_time: endTime,
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            title: state.modalState.colaborador as string,
            modalState: state.modalState

        };

        elementoPrereservas["itemProps"] = {
            onDoubleClick: () => { this.onPreReservasDoubleClickedOverItem(elementoPrereservas) },
            className: 'altura-items color-prereserva ',
            // style: {
            //     background: 'blue',
            // }
        }

        if (existGroupPrereserva === false) {
            dataSchedulerGrid.itemsPreReservas.push(elementoPrereservas);
        }
        else {

            dataSchedulerGrid.itemsPreReservas[positionListadoPreReserva as number] = elementoPrereservas;
        }

        let { grupo: grupoV, listado: listadoV } = this.deleteDuplicatedReservas(dataSchedulerGrid.groupsReservaVuelaCar, dataSchedulerGrid.itemsReservasVuelaCar, state);
        dataSchedulerGrid.reemplaceAllGroupReservaVuelaCar(grupoV);
        dataSchedulerGrid.reemplaceReservasVuelaCar(listadoV);

        let { grupo: grupoE, listado: listadoE } = this.deleteDuplicatedReservas(dataSchedulerGrid.groupsReservaExterior, dataSchedulerGrid.itemsReservasExterior, state);
        
        dataSchedulerGrid.reemplaceGroupReservaExterior(grupoE);
        dataSchedulerGrid.reemaplceReservasExterior(listadoE);

        
        

        this.setState({ "modalReservasVisible": false });
        return true;

    }
    searchExistListByMatriculaAndGroup(listado: IListadoPrereserva[], matricula: string, grupo: number): [boolean, number] {
        
        let posicion = -1;
        let found = false;
        for (let i = 0; i < listado.length; i++) {
            if (
                (listado[i].modalState.matricula?.toLowerCase() === matricula.toLowerCase()) &&
                (listado[i].modalState.group === grupo)
            )
            {
                posicion = i;
                found = true;
                return [found, posicion];
            }
        }
        return [found, posicion];


    }


    generateNewElementReservas(currentState: IModalState, idGrupo: number, idReserva: number) {

        const startTime = new Date(currentState.fechaRecogida as Date);
        const endTime = new Date(currentState.fechaDevolucion as Date);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);

        const colaboradorDescripcion = this.getDescripcionListadoColaboradores(currentState.colaborador as string);

        let elementoReservas: IListadoPrereserva = {
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            start_time: startTime,
            end_time: endTime,
            group: idGrupo as number,
            id: idReserva as number,
            title: colaboradorDescripcion, //currentState.colaborador as string,
            modalState: currentState,
        };

        elementoReservas["itemProps"] = {
            onDoubleClick: () => { this.onReservasDoubleClickedOverItem(elementoReservas) },
            className: 'altura-items color-reserva color-black',
            // style: {
            //     background: 'yellow',
            // }
        }

        return elementoReservas;

    }


    getDescripcionListadoColaboradores(_id: string) {

        let colaboradorDescripcion = "";
        for (let i = 0; i < listadoColaboradores.length; i++) {
            if (listadoColaboradores[i].id.toLowerCase() === _id.toLowerCase()) {
                colaboradorDescripcion = listadoColaboradores[i].descripcion;
                break;
            }
        }
        if (colaboradorDescripcion === "") {
            colaboradorDescripcion = "VuelaCar";
        }

        return colaboradorDescripcion;
    }

    searchExistGroupById(grupo: typeGroup[], _id: number): [boolean, number] {
        let exist = false;
        let position = -1;

        for (let i = 0; i < grupo.length; i++) {

            if (grupo[i].id === _id) {
                exist = true;
                position = i;

                return [exist, position];
            }
        }

        return [exist, position];

    }

    

    searchExistListById(listado: IListadoPrereserva[], _id: number) {
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


    searchExistListByGroupId(listado: IListadoPrereserva[], grupoId: number) {

        for (let i = 0; i < listado.length; i++) {
            if (listado[i].group === grupoId) {
                return true;
            }

        }

        return false;
    }

    searchExistListByMatricula(listado: IListadoPrereserva[], matricula: string): [boolean, number] {

        let posicion = -1;
        let found = false;
        for (let i = 0; i < listado.length; i++) {
            if (listado[i].modalState.matricula?.toLowerCase() === matricula.toLowerCase()) {
                posicion = i;
                found = true;
                return [found, posicion];
            }
        }
        return [found, posicion];
    }

    searchDuplicatedGroupMatricula(grupo: typeGroup[], matricula: string): [boolean, number] {
        let position = -1;
        for (let i = 0; i < grupo.length; i++) {
            if (grupo[i].matricula.toLowerCase() === matricula.toLowerCase()) {
                position = i;
                return [true, position];
            }
        }
        return [false, position];
    }


    searchDuplicatedListadoMatricula(listado: IListadoPrereserva[], matricula: string): [boolean, number] {
        let position = -1;
        for (let i = 0; i < listado.length; i++) {
            if (listado[i].modalState.matricula?.toLowerCase() === matricula.toLowerCase()) {
                position = i;
                return [true, position];
            }
        }
        return [false, position];
    }





    onSearchMatriculaAnotherTimeline(
        state: ContainerState,
        externalPropItemsReservasVuelaCar: IListadoPrereserva[],
        externalPropsItemsReservasExternal: IListadoPrereserva[],
        externalPropsItemsPrereservas: IListadoPrereserva[]
    ) 
    {

        if (state.modalState?.isNewRegister === true) {
            return false;
        }

        let foundMatricula = false;

        if (state.modalState?.matricula === "") {
            return false;
        }

        // this pierde el foco al ir a this.searchMatriculaInTime
        if (state.modalState?.estado === ENUM_TIPOS_ESTADO.prereservado) 
        {

            let listado = externalPropItemsReservasVuelaCar;
            if (state.modalState.flota !== "v") {
                listado = externalPropsItemsReservasExternal;
            }

            const matricula = state.modalState?.matricula as string;
            const startTime = state.modalState?.fechaRecogida as Date;
            const endTime = state.modalState?.fechaDevolucion as Date;

            for (let i = 0; i < listado.length; i++) {
                if (listado[i].modalState.matricula?.toLowerCase() === matricula.toLowerCase()) {

                    const fechaRecogida = listado[i].modalState?.fechaRecogida as Date;
                    const fechaDevolucion = listado[i].modalState?.fechaDevolucion as Date;
                    if ((
                        fechaRecogida.getDate() >= startTime.getDate() &&
                        fechaRecogida.getMonth() >= startTime.getMonth() &&
                        fechaRecogida.getFullYear() >= startTime.getFullYear()
                    ) ||
                        (
                            fechaDevolucion.getDate() <= endTime.getDate() &&
                            fechaDevolucion.getMonth() <= endTime.getMonth() &&
                            fechaDevolucion.getFullYear() <= endTime.getFullYear()
                        )
                    ) {
                        foundMatricula = true;
                        break;
                    }

                }
            }



        }
        else if (state.modalState?.estado === ENUM_TIPOS_ESTADO.reservado) {

            let listado = externalPropItemsReservasVuelaCar;
            if (state.modalState.flota !== "v") {
                listado = externalPropsItemsReservasExternal;
            }

            let matricula = state.modalState?.matricula as string;
            let startTime = state.modalState?.fechaRecogida as Date;
            let endTime = state.modalState?.fechaDevolucion as Date;

            for (let i = 0; i < listado.length; i++) {
                if (listado[i].modalState.matricula?.toLowerCase() === matricula.toLowerCase()) {

                    const fechaRecogida = listado[i].modalState?.fechaRecogida as Date;
                    const fechaDevolucion = listado[i].modalState?.fechaDevolucion as Date;
                    if ((
                        fechaRecogida.getDate() >= startTime.getDate() &&
                        fechaRecogida.getMonth() >= startTime.getMonth() &&
                        fechaRecogida.getFullYear() >= startTime.getFullYear()
                    ) ||
                        (
                            fechaDevolucion.getDate() <= endTime.getDate() &&
                            fechaDevolucion.getMonth() <= endTime.getMonth() &&
                            fechaDevolucion.getFullYear() <= endTime.getFullYear()
                        )
                    ) {
                        foundMatricula = true;
                        break;
                    }

                }
            }

        }

        return foundMatricula;

    }

    searchMatriculaInTime(listado: IListadoPrereserva[], matricula: string, startTime: Date, endTime: Date) {

        let foundMatricula = false;
        for (let i = 0; i < listado.length; i++) {
            if (listado[i].modalState.matricula?.toLowerCase() === matricula.toLowerCase()) {

                const fechaRecogida = listado[i].modalState?.fechaRecogida as Date;
                const fechaDevolucion = listado[i].modalState?.fechaDevolucion as Date;
                if (fechaRecogida >= startTime || fechaDevolucion <= endTime) {
                    foundMatricula = true;
                    break;
                }

            }
        }

        return foundMatricula;

    }

    // searchGroupsByFilter = (groups: typeGroup[], items: IListadoPrereserva[], subalquileres: boolean) => {
    //     let groupsFiltered = [];
    //     let itemsFiltered = [];

    //     for (let i = 0; i < groups.length; i++) {

    //         if (subalquileres === true) {
    //             if (groups[i].flota?.toLowerCase() !== "v") {
    //                 groupsFiltered.push(groups[i]);
    //             }

    //         }
    //         else {
    //             if (groups[i].flota?.toLowerCase() === "v") {
    //                 groupsFiltered.push(groups[i]);
    //             }
    //         }

    //     }

    //     for (let i = 0; i < items.length; i++) {

    //         if (subalquileres === true) {
    //             if (items[i].modalState.flota?.toLowerCase() !== "v") {
    //                 itemsFiltered.push(items[i]);
    //             }

    //         }
    //         else {
    //             if (items[i].modalState.flota?.toLowerCase() === "v") {
    //                 itemsFiltered.push(items[i]);
    //             }
    //         }

    //     }

    //     return { groupsFiltered, itemsFiltered };

    // }

    render() {

        // console.log("this.state.id=" + this.state.modalState.id);
        const grupoPrereserva = [...dataSchedulerGrid.groupsPreReserva];
        let keyPrereserva = `prereserva_${Math.random()}`;
        let keySubAlquileres = `subalquileres_${Math.random()}`;
        let keyReserva = `reserva_${Math.random()}`;

        return (
            <>
                <div className="fila_botones_scheduler">
                    <IonButton onClick={() => {
                        const _state = this.getNewElementPrereserva();
                        this.anadirPreReserva(_state);
                    }
                    } className='boton_prereserva' fill='solid' color="#ffffff">Prereserva</IonButton>
                    <IonButton onClick={() => {
                        const _state = this.getNewElementReservaVuelacar();
                        this.anadirPreReserva(_state);
                    }
                    } className="boton_reserva_vuelacar" fill='solid' color="#ffffff">Reserva Vuelacar</IonButton>
                    <IonButton href='/page/Dashboard' className="boton-volver" fill='solid' color="#ffffff">Volver</IonButton>
                </div>
                <div className='fila_timelines'>
                    <h3 className='titulo-reservas-timeline'>RESERVAS</h3>
                    <TimelineWrapper
                        marginTop={0}
                        key={keyReserva}
                        anadirBotonPreservar={false}
                        groups={dataSchedulerGrid.groupsReservaVuelaCar}
                        items={dataSchedulerGrid.itemsReservasVuelaCar}
                        subalquileres={false}
                        onDoubleClicked={this.onDoubleClickedTimelineReservas}
                    />
                    <h3 className='titulo-subalquileres-timeline'>SUBALQUILERES</h3>
                    <TimelineWrapper
                        marginTop={0}
                        key={keySubAlquileres}
                        anadirBotonPreservar={false}
                        groups={dataSchedulerGrid.groupsReservaExterior}
                        items={dataSchedulerGrid.itemsReservasExterior}
                        subalquileres={true}
                    // onClickAnadirPreReserva={this.anadirPreReserva}
                    />
                    <h3 className='titulo-prereservas-timeline'>PRERESERVAS</h3>
                    <TimelineWrapper
                        marginTop={0}
                        key={keyPrereserva}
                        anadirBotonPreservar={false}
                        groups={grupoPrereserva}
                        items={dataSchedulerGrid.itemsPreReservas} //{listadoPrereservas}
                        subalquileres={false}
                        onDoubleClicked={this.onDoubleClickedTimelinePreReservas}
                    // onClickAnadirPreReserva={this.anadirPreReserva}

                    />

                    <ModalDialog
                        isVisible={this.state.modalReservasVisible}
                        modalState={this.state.modalState as IModalState}
                        onSearchMatriculaAnotherTimeline={this.onSearchMatriculaAnotherTimeline}
                        externalPropItemsReservasVuelaCar={dataSchedulerGrid.itemsReservasVuelaCar}
                        externalPropsItemsReservasExternal={dataSchedulerGrid.itemsReservasExterior}
                        externalPropsItemsPrereservas={dataSchedulerGrid.itemsPreReservas} //{listadoPrereservas}
                        errores={this.state.errores}
                        isDoubleclickItem={this.state.isDoubleclickItem}
                        isFirstTime={this.state.modalState?.isFirstTime as boolean}
                        tiempoClick={this.state.tiempoClick}
                        listadoClaseVehiculos={dataSchedulerGrid.listadoClaseVehiculos}
                        listadoModelosVehiculos={dataSchedulerGrid.listadoModelosVehiculos}
                        dataCars={dataCars}
                        listColaborators={listadoColaboradores}
                        listFlotas={listFlotas}
                        onCloseModal={this.onCloseModal}
                        onModalDidDismiss={this.onModalDidDismiss}
                        onSaveData={this.onSaveData}
                        onDelete={this.onDelete}

                    />
                </div>
            </>
        );
    }



}
