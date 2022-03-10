import React, { Component } from 'react';
// import { DataSchedulerGrid } from '../datos/DataSchedulerGrid';

import { IonButton, IonLoading } from '@ionic/react';
import TimelineWrapper from "./TimelineWrapper";
import { IListadoPrereserva, dataCars, DEFAULT_TEXT_MATRICULA } from "../datos/vehiculosGeneral";
import { listadoColaboradores, ENUM_LISTADO_COLABORADORES } from "../datos/listadoColaboradores";
import { listFlotas } from "../datos/listadoFlotas";
import { ModalDialog, ContainerState as IContainerModalState, IModalState, IModalErrores, ENUM_TIPOS_ESTADO } from "./Modal";

import "../css/Scheduler.css";
import "../css/variables.css";

// import { dataSchedulerGrid } from "../App";
import { DataSchedulerGrid } from '../datos/DataSchedulerGrid';
import { repoStorage } from '../interfaces/logicStorage';


// dataSchedulerGrid.setupDb(dataCars);
// console.log("DEBUG=" + dataSchedulerGrid.DEBUG);



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
    showLoading?: boolean;
    setShowLoading?: boolean;
    dummy?: boolean;
}

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

    defaultState: ContainerState = {
        "modalReservasVisible": false,
        "isDoubleclickItem": false,
        "isFirstTime": false,
        "errores": {
            "claseVehiculo": false,
            "colaborador": false,
            "flota": false,
            "matricula": false,
            "modeloVehiculo": false,
            "precioExterno": false,
            "textoErrores": "",
        },
        "modalState": {
            "isNewRegister": false,
            "isPrereserva": false,
            "showItem": false,
            "cantidadDias": 3,
            "textoFechaDevolucionVisible": false,
            "estado": ENUM_TIPOS_ESTADO.prereservado as string,
            "hasContract": false,
            "reservaCompletada": false,

        },
        "showLoading": true,
        "setShowLoading": true,
    }

    _dataSchedulerGrid: any;

    _visibleTimeStart: number = 0;
    _visibleTimeEnd: number = 0;

    constructor(props: any) {
        super(props);

        this.setDefaultDate();
        this.state = this.defaultState;
    }
    
    setDefaultDate()
    {
        const today = new Date();
        const fivedaysago = new Date(new Date().setDate( today.getDate() - 1));
        const quincedias = new Date(new Date().setDate( today.getDate() + 16 ));
    
        this._visibleTimeStart = fivedaysago.getTime();
        this._visibleTimeEnd = quincedias.getTime();

        this.setState({ "dummy": false });
    }


    async componentDidMount()
    {
        console.log("schedulergrid montado");
        await this.init();

        this.setState({ setShowLoading: false });

    }

    
    async init()
    {
        
        const dataSchedulerGrid = new DataSchedulerGrid();
        await dataSchedulerGrid.setupDb(dataCars);
        console.log("esta ready " + dataSchedulerGrid.getIsReady());
        this._dataSchedulerGrid = dataSchedulerGrid;
    }


    onCloseModal = () => {
        this.setState({ "modalReservasVisible": false, });
    }

    onDelete = async (estado: string, flota: string, id: number) => {
        
        // console.log("sjfsldf");

        
        switch(estado)
        {
            case ENUM_TIPOS_ESTADO.prereservado:
                await this._dataSchedulerGrid.deletePrereservadoById(id);

                
            
            break;
            case ENUM_TIPOS_ESTADO.reservado:
                if (flota === "v")
                {
                    await this._dataSchedulerGrid.deleteReservadoVuelacarById(id);
                    await repoStorage.removeItemReservaVuelaCar(id);
                }
                else
                {
                    await this._dataSchedulerGrid.deleteReservadoExteriorById(id);
                    await repoStorage.removeItemReservaExterior(id);
                }
            break;
        }
        
        this.setState({ "modalReservasVisible": false, });


    }

    onModalDidDismiss = async () => {

        this.setState({ "modalReservasVisible": false, });

    }


    onDoubleClickedTimelinePreReservas = async (groupId: any, time: any, evento: any) => {

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const _state = await this.getNewElementPrereserva();
        this.anadirPreReserva(_state);
    }




    onDoubleClickedTimelineReservas = async (groupId: any, time: any, evento: any) => {
        console.log("clickedado desde grupo=" + groupId + " time=" + time + " evento=" + evento);

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const _state = await this.getNewElementReservaVuelacar();
        this.anadirPreReserva(_state);

    }

    componentWillUnmount() {
    }



    async getNewElementPrereserva() {

        const _startTime = new Date();
        const tempStarTime = new Date(_startTime);
        const _endTime = new Date(tempStarTime.setDate(_startTime.getDate() + 2));

        const startTime = new Date(_startTime.setHours(0, 0, 0)).getTime();
        const endTime = new Date(_endTime.setHours(23, 59, 59)).getTime();

        const idReserva = await this._dataSchedulerGrid.getNewIdFromLastIDPreReserva();
        const idGroup = await this._dataSchedulerGrid.getNewIdFromLastIDGroupPreReserva();

        let newState: ContainerState = {
            "modalState": {
                "showItem": false,
                "textoFechaDevolucionVisible": false,
                "id": idReserva,
                "group": idGroup,
                "claseVehiculo": "",
                "colaborador": "",
                "fechaRecogida": startTime,
                "fechaDevolucion": endTime,
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
                "hasContract": false,
                "reservaCompletada": false,

            },
            "modalReservasVisible": false,
            "tiempoClick": new Date().getTime(),
            "isDoubleclickItem": false,
            "isFirstTime": false,
            "errores": { ...this.defaultState.errores }

        };

        return newState;

    }

    async getNewElementReservaVuelacar() {

        const _startTime = new Date();
        const tempStarTime = new Date(_startTime);
        const _endTime = new Date(tempStarTime.setDate(_startTime.getDate() + 2));

        const startTime = new Date(_startTime.setHours(0, 0, 0)).getTime();
        const endTime = new Date(_endTime.setHours(23, 59, 59)).getTime();

        const idReserva = await this._dataSchedulerGrid.getNewIdFromLastIDReservaVuelaCar();
        const idGroup = await this._dataSchedulerGrid.getNewIdFromLastIDGroupReservaVuelaCar();

        let newState: ContainerState = {
            "modalState": {
                "showItem": true,
                "textoFechaDevolucionVisible": false,
                "id": idReserva,
                "group": idGroup,
                "claseVehiculo": "",
                "colaborador": ENUM_LISTADO_COLABORADORES.v as string,
                "fechaRecogida": startTime,
                "fechaDevolucion": endTime,
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
                "hasContract": false,
                "reservaCompletada": false

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


    onItemDoubleClickReservas = async (itemId: any, e: any, time: any)=>{
        console.log("dobleclick");

        const elemento: IListadoPrereserva = await this._dataSchedulerGrid.searchReservaVuelaCarByID(itemId);

        let stateToSend: ContainerState = {
            "isDoubleclickItem": true,
            "modalReservasVisible": false,
            "isFirstTime": true,
            "errores": { ...this.defaultState.errores }
        };

        stateToSend.modalState = { ...elemento.modalState };

        stateToSend.modalState.showItem = false;
        stateToSend.modalState.isNewRegister = false;
        stateToSend.modalState.textoFechaDevolucionVisible = true;
        this.setState(stateToSend, () => {
            this.setState({ "modalReservasVisible": true, "isFirstTime": false });
            // console.log(this.state);
        });


    }
    

    onItemDoubleClickReservasExterior = async (itemId: any, e: any, time: any) =>
    {
        const elemento: IListadoPrereserva = await this._dataSchedulerGrid.searchReservaExteriorByID(itemId);

        let stateToSend: ContainerState = {
            "isDoubleclickItem": true,
            "modalReservasVisible": false,
            "isFirstTime": true,
            "errores": { ...this.defaultState.errores }
        };

        stateToSend.modalState = { ...elemento.modalState };

        stateToSend.modalState.showItem = true;
        stateToSend.modalState.isNewRegister = false;
        stateToSend.modalState.textoFechaDevolucionVisible = true;
        this.setState(stateToSend, () => {
            this.setState({ "modalReservasVisible": true, "isFirstTime": false });
            // console.log(this.state)
        });

    }


    onItemDoubleClickPreReservas = async (itemId: any, e: any, time: any) =>
    {

        const elemento: IListadoPrereserva = await this._dataSchedulerGrid.searchPreReservaByID(itemId);

        let stateToSend: ContainerState = {
            "isDoubleclickItem": true,
            "modalReservasVisible": false,
            "isFirstTime": true,
            "errores": { ...this.defaultState.errores }
        };

        stateToSend.modalState = { ...elemento.modalState };

        stateToSend.modalState.showItem = true;
        stateToSend.modalState.isNewRegister = false;
        stateToSend.modalState.textoFechaDevolucionVisible = true;
        this.setState(stateToSend, () => {
            this.setState({ "modalReservasVisible": true, "isFirstTime": false });
            // console.log(this.state)
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
        let grupoSeleccionado: typeGroup[] = [...this._dataSchedulerGrid.groupsReservaVuelaCar];
        let listadoSeleccionado: IListadoPrereserva[] = [...this._dataSchedulerGrid.itemsReservasVuelaCar];

        const cantidadGruposReservasVuelaCar = this._dataSchedulerGrid.getNewIdFromLastIDGroupReservaVuelaCar();
        

        let nuevoGrupoReserva: typeGroup = {
            "id": cantidadGruposReservasVuelaCar,
            "title": "title",
            "matricula": state.modalState.matricula as string,
            "vehiculo": "vehiculo",
            "clasevehiculo": state.modalState.claseVehiculo as string,
            "modelo": state.modalState.modeloVehiculo as string,
            "flota": state.modalState.flota as string,
            "height": 15,
            "srcImage": "",
            "rightTitle": "",
            "stackItems": true,

        };

        if (state.modalState.flota !== "v") {
            grupoSeleccionado = [...this._dataSchedulerGrid.groupsReservaExterior];
            listadoSeleccionado = [...this._dataSchedulerGrid.itemsReservasExterior];

            const cantidadGruposReservasExterior: number = this._dataSchedulerGrid.getNewIdFromLastIDGroupReservaExterior();

            nuevoGrupoReserva = {
                "id": cantidadGruposReservasExterior,
                "title": "title",
                "matricula": state.modalState.matricula as string,
                "vehiculo": "vehiculo",
                "clasevehiculo": state.modalState.claseVehiculo as string,
                "modelo": state.modalState.modeloVehiculo as string,
                "flota": state.modalState.flota as string,
                "height": 15,
                "srcImage": "",
                "rightTitle": "",
                "stackItems": true,
            }
        }

        return { grupoSeleccionado, listadoSeleccionado, nuevoGrupoReserva }
    }

    async saveDateReserva(state: IContainerModalState, isDoubleClicked: boolean)
    {

        const { grupoSeleccionado, listadoSeleccionado, nuevoGrupoReserva } = this.getSelectedGroup(state);
        let [existGroup, positiongroups] = this.searchExistGroupByMatricula(grupoSeleccionado, state.modalState.matricula as string);
        let [existListado, positionListado] = this.searchExistListByMatricula(listadoSeleccionado, state.modalState.matricula as string);

        // let [existGroup, positiongroups] = this.searchExistGroupById(grupoSeleccionado, state.modalState.group as number);
        // let [existListado, positionListado] = this.searchExistListById(listadoSeleccionado, state.modalState.id as number);

        if (existGroup === false)
        {

            if (state.modalState.flota === "v")
            {
                
                const [exist, groupId ] = await this._dataSchedulerGrid.searchGroupByMatricula(grupoSeleccionado, state.modalState.matricula as string);

                if (exist === true)
                {
                    const elementoReserva = this.generateNewElementReservas(
                        state.modalState, 
                        groupId, 
                        state.modalState.id as number 
                    );
                    await this._dataSchedulerGrid.insertNewElementReservasVuelaCar(elementoReserva);
                    await repoStorage.insertReservaVuelaCar(elementoReserva);

                }

            }
            else
            {

                const lastIdGroup: number = grupoSeleccionado[positiongroups].id;
                const lastIdModalReserva: number = state.modalState.id as number;

                await this._dataSchedulerGrid.insertNewElementGrupoExterior(nuevoGrupoReserva);
                
                
                const elementoReserva = this.generateNewElementReservas(
                    state.modalState,
                    state.modalState.group as number, 
                    state.modalState.id as number
                );
                await this._dataSchedulerGrid.insertNewElementReservasExterior(elementoReserva);
                await repoStorage.insertReservaExterior(elementoReserva);

                //borrar el anterior grupo y elemento
                
                await this._dataSchedulerGrid.removeAtItemsReservaExterior(positionListado as number);
                
                await repoStorage.removeItemReservaExterior(lastIdModalReserva as number);
                // busqueda en los groups por si queda algun elemento en el grupo
                // en el caso de que no haya ningun elemento borramos el grupo
                let [existe, position] = this.searchExistListByMatriculaAndGroup(
                    this._dataSchedulerGrid.itemsReservasExterior,
                    state.modalState.matricula as string,
                    state.modalState.group as number
                );
                if (existe === false) {
                    await this._dataSchedulerGrid.removeAtGroupReservaExterior(positiongroups as number);
                    await repoStorage.removeAtGroupReservaExterior(lastIdGroup);
                }


            }

        }
        else
        {

            if (state.modalState.reservaCompletada === true)
            {
                if (state.modalState.flota === "v") 
                {
                    await this._dataSchedulerGrid.updateGroupReservaVuelaCar(state, positiongroups);
                    let elementoReserva = this.generateNewElementReservas(
                        state.modalState,
                        positiongroups,
                        state.modalState.id as number
                    );
                    if (elementoReserva.modalState.reservaCompletada === false)
                    {
                        elementoReserva.modalState.reservaCompletada = true;
                    }
                    await this._dataSchedulerGrid.updateReservaVuelaCar(positionListado as number, elementoReserva);
                    await repoStorage.updateReservaVuelaCar(positionListado as number, elementoReserva);
    
                }
                else
                {
    
                    await this._dataSchedulerGrid.updateGroupReservaExterior(
                        state, 
                        state.modalState.group as number
                    );
                    let elementoReserva = this.generateNewElementReservas(
                        state.modalState,
                        state.modalState.group as number,
                        state.modalState.id as number
                    );
                    if (elementoReserva.modalState.reservaCompletada === false) {
                        elementoReserva.modalState.reservaCompletada = true;
                    }
                    
                    await this._dataSchedulerGrid.updateReservaExterior(elementoReserva, positionListado as number);
                    await repoStorage.updateReservaExterior(positionListado as number, elementoReserva);
    
                }

            }
            else
            {

                if (state.modalState.flota === "v") {
                    
                    let elementoReserva = this.generateNewElementReservas(
                        state.modalState,
                        positiongroups,
                        state.modalState.id as number
                    );
                    if (elementoReserva.modalState.reservaCompletada === false) {
                        elementoReserva.modalState.reservaCompletada = true;
                    }

                    await this._dataSchedulerGrid.insertNewElementReservasVuelaCar(elementoReserva);
                    await repoStorage.insertReservaVuelaCar(elementoReserva);

                }
                else {

                    let elementoReserva = this.generateNewElementReservas(
                        state.modalState,
                        positiongroups,
                        state.modalState.id as number
                    );
                    if (elementoReserva.modalState.reservaCompletada === false) {
                        elementoReserva.modalState.reservaCompletada = true;
                    }

                    await this._dataSchedulerGrid.insertNewElementReservasExterior(elementoReserva);
                    await repoStorage.insertReservaExterior(elementoReserva);

                }

            }


        }


        // llevarnoslo al class
        // realizar limpieza en el db
        // let { grupo: grupoV, listado: listadoV } = this.deleteDuplicatedReservas(await this._dataSchedulerGrid.groupsPreReserva, await this._dataSchedulerGrid.itemsPreReservas, state);  //listadoPrereservas, state);
        // await this._dataSchedulerGrid.reemplaceGroupReservaExterior(grupoV);
        // await this._dataSchedulerGrid.reemplacePrereservas(listadoV);

        this.setState({ "modalReservasVisible": false });

        return true;

    }


    async saveDataPrereserva(state: IContainerModalState, isDoubleClicked: boolean) {

        // let [existGroupPrereserva, positiongroupsPreReserva] = this.searchExistGroupByMatricula(this._dataSchedulerGrid.groupsPreReserva, state.modalState.matricula as string);
        // let [existListadoPrereserva, positionListadoPreReserva] = this.searchExistListByMatricula(this._dataSchedulerGrid.itemsPreReservas, state.modalState.matricula as string);

        let [existGroupPrereserva, positiongroupsPreReserva] = this.searchExistGroupById(this._dataSchedulerGrid.groupsPreReserva, state.modalState.group as number);
        let [existListadoPrereserva, positionListadoPreReserva] = this.searchExistListById(this._dataSchedulerGrid.itemsPreReservas, state.modalState.id as number);

        if (existGroupPrereserva === false) {
                        
            const grupoTransformado: typeGroup = await this._dataSchedulerGrid.insertNewElementGrupoPreReserva(state);
            await repoStorage.insertGroupPreReserva(grupoTransformado);

        }
        else 
        {

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
                        elementoGrupo = this._dataSchedulerGrid.groupsPreReserva[positiongroupsPreReserva as number];
                        const lastIdGroup: number = elementoGrupo.id;
                        const lastIdModalReserva: number = state.modalState.id as number;

                        if (state.modalState.flota === "v")
                        {
                            const cantidadGruposReservasVuelaCar = await this._dataSchedulerGrid.getNewIdFromLastIDGroupReservaVuelaCar(); //.groupsReservaVuelaCar.length;
                            elementoGrupo["id"] = cantidadGruposReservasVuelaCar;
                            elementoGrupo["matricula"] = state.modalState.matricula as string;

                            await this._dataSchedulerGrid.insertNewElementGrupoReserva(elementoGrupo);
                            
                            const cantidadReservasVuelaCar: number = await this._dataSchedulerGrid.getNewIdFromLastIDReservaVuelaCar();


                            const elementoReserva = this.generateNewElementReservas(
                                state.modalState, 
                                cantidadGruposReservasVuelaCar, 
                                cantidadReservasVuelaCar
                            );
                            if (elementoReserva.modalState.reservaCompletada === false) {
                                elementoReserva.modalState.reservaCompletada = true;
                            }
                            await this._dataSchedulerGrid.insertNewElementReservasVuelaCar(elementoReserva);

                            await repoStorage.insertGroupReservaVuelaCar(elementoGrupo);
                            await repoStorage.insertReservaVuelaCar(elementoReserva);

                        }
                        else
                        {
                            //modificamos el gurpo
                            const cantidadGruposReservasExterior = await this._dataSchedulerGrid.getNewIdFromLastIDGroupReservaExterior(); //.groupsReservaVuelaCar.length;
                            elementoGrupo["id"] = cantidadGruposReservasExterior;
                            elementoGrupo["matricula"] = state.modalState.matricula as string;
                            // insertamos el nuevo grupo
                            await this._dataSchedulerGrid.insertNewElementGrupoExterior(elementoGrupo);

                            //obtener cantidad de reservas exteriores
                            const cantidadReservasExterior: number = await this._dataSchedulerGrid.getNewIdFromLastIDReservaExterior();

                            // generamos la reserva con los datos nuevos
                            const elementoReserva = this.generateNewElementReservas(
                                state.modalState,
                                cantidadGruposReservasExterior,
                                cantidadReservasExterior
                            );

                            if(elementoReserva.modalState.reservaCompletada === false)
                            {
                                elementoReserva.modalState.reservaCompletada = true;
                            }
                            // insertamos la nueva reserva en exterior
                            await this._dataSchedulerGrid.insertNewElementReservasExterior(elementoReserva);

                            await repoStorage.insertGroupExterior(elementoGrupo);
                            await repoStorage.insertReservaExterior(elementoReserva);

                        }

                        if (anteriorEstado !== state.modalState.estado)
                        {

                            await this._dataSchedulerGrid.removeAtItemsPrereserva(positionListadoPreReserva as number);

                            await repoStorage.removeItemPrereserva(lastIdModalReserva as number);
                            // busqueda en los groups por si queda algun elemento en el grupo
                            // en el caso de que no haya ningun elemento borramos el grupo
                            let [existe, position] = this.searchExistListByMatriculaAndGroup(
                                this._dataSchedulerGrid.itemsPreReservas, 
                                state.modalState.matricula as string,
                                state.modalState.group as number
                            );
                            if (existe === false)
                            {
                                await this._dataSchedulerGrid.removeAtGroupsPrereserva(positiongroupsPreReserva as number);
                                await repoStorage.removeAtGroupPreReserva(lastIdGroup);
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
                await this._dataSchedulerGrid.updateGroupPrereserva(state ,positiongroupsPreReserva as number);
            }

        }

        let startTime = new Date(state.modalState.fechaRecogida as number);
        let endTime = new Date(state.modalState.fechaDevolucion as number);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);

        // encapsular dentor de un objeto
        let elementoPrereservas: IListadoPrereserva = {
            "id": state.modalState.id as number,
            "group": state.modalState.group as number,
            "start_time": startTime.getTime(),
            "end_time": endTime.getTime(),
            "canMove": false,
            "canResize": false,
            "canChangeGroup": false,
            "title": `${state.modalState.colaborador as string} id=${state.modalState.id} group=${state.modalState.group}`,
            "itemProps": {
                "className": 'altura-items color-prereserva ',
            },
            "modalState": state.modalState

        };

        if (existGroupPrereserva === false) {
            // this._dataSchedulerGrid.itemsPreReservas.push(elementoPrereservas);
            await this._dataSchedulerGrid.insertNewElementPreReserva(elementoPrereservas);
            await repoStorage.insertPreReserva(elementoPrereservas);
        }
        else {

            //[positionListadoPreReserva as number] = elementoPrereservas;
            await this._dataSchedulerGrid.updatePreReserva(positionListadoPreReserva, elementoPrereservas); 
            await repoStorage.updatePreReserva( elementoPrereservas);
        }


        // realizar limpieza en la db?
        // let { grupo: grupoV, listado: listadoV } = this.deleteDuplicatedReservas(this._dataSchedulerGrid.groupsReservaVuelaCar, this._dataSchedulerGrid.itemsReservasVuelaCar, state);
        // this._dataSchedulerGrid.reemplaceAllGroupReservaVuelaCar(grupoV);
        // this._dataSchedulerGrid.reemplaceReservasVuelaCar(listadoV);

        // let { grupo: grupoE, listado: listadoE } = this.deleteDuplicatedReservas(this._dataSchedulerGrid.groupsReservaExterior, this._dataSchedulerGrid.itemsReservasExterior, state);
        
        // this._dataSchedulerGrid.reemplaceGroupReservaExterior(grupoE);
        // this._dataSchedulerGrid.reemaplceReservasExterior(listadoE);

        this.setState({ "modalReservasVisible": false });
        return true;

    }
    searchExistListByMatriculaAndGroup(listado: IListadoPrereserva[], matricula: string, grupo: number): [boolean, number] {
        
        let posicion = -1;
        let found = false;
        const matriculaTrimmed: string = this.generateTrimmedMatricula(matricula);
        for (let i = 0; i < listado.length; i++)
        {

            const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(listado[i].modalState.matricula as string);

            if (
                (matriculaModalStateTrimmed === matriculaTrimmed) &&
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

        const startTime = new Date(currentState.fechaRecogida as number);
        const endTime = new Date(currentState.fechaDevolucion as number);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);

        const colaboradorDescripcion = this.getDescripcionListadoColaboradores(currentState.colaborador as string);

        currentState.group = idGrupo;
        currentState.id = idReserva;

        let elementoReservas: IListadoPrereserva = {
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            start_time: startTime.getTime(),
            end_time: endTime.getTime(),
            group: idGrupo as number,
            id: idReserva as number,
            title: colaboradorDescripcion,
            modalState: currentState,
        };

        elementoReservas["itemProps"] = {
            className: 'altura-items color-reserva color-black',
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

    searchExistGroupByMatricula(grupo: typeGroup[], matricula: string): [boolean, number] {
        let exist = false;
        let position = -1;

        const matriculaTrimmed: string = this.generateTrimmedMatricula(matricula);
        for (let i = 0; i < grupo.length; i++)
        {

            const matriculaModalStateTrimmed = this.generateTrimmedMatricula(grupo[i].matricula as string);

            if (matriculaModalStateTrimmed === matriculaTrimmed) {
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
        const matriculaTrimmed: string = this.generateTrimmedMatricula(matricula);
        for (let i = 0; i < listado.length; i++) 
        {

            const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(listado[i].modalState.matricula as string);

            if (matriculaModalStateTrimmed === matriculaTrimmed) {
                posicion = i;
                found = true;
                return [found, posicion];
            }
        }
        return [found, posicion];
    }

    searchDuplicatedGroupMatricula(grupo: typeGroup[], matricula: string): [boolean, number] {
        let position = -1;
        const matriculaTrimmed: string = this.generateTrimmedMatricula(matricula);
        for (let i = 0; i < grupo.length; i++) {
            const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(grupo[i].matricula as string);
            if (matriculaModalStateTrimmed === matriculaTrimmed) {
                position = i;
                return [true, position];
            }
        }
        return [false, position];
    }


    searchDuplicatedListadoMatricula(listado: IListadoPrereserva[], matricula: string): [boolean, number] {
        let position = -1;
        const matriculaTrimmed: string = this.generateTrimmedMatricula(matricula);
        for (let i = 0; i < listado.length; i++) {
            const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(listado[i].modalState.matricula as string);
            if (matriculaModalStateTrimmed === matriculaTrimmed) {
                position = i;
                return [true, position];
            }
        }
        return [false, position];
    }





    onSearchMatriculaAnotherTimeline = (
        state: ContainerState,
        itemsReservasVuelaCar: IListadoPrereserva[],
        itemsReservasExternal: IListadoPrereserva[],
        externalPropsItemsPrereservas: IListadoPrereserva[]
    ) =>
    {

        // if (state.modalState?.isNewRegister === true) {
        //     return false;
        // }

        let foundMatricula = false;

        if (state.modalState?.matricula === "") {
            return false;
        }

        // this pierde el foco al ir a this.searchMatriculaInTime
        if (state.modalState?.estado === ENUM_TIPOS_ESTADO.prereservado) 
        {

            let listado = itemsReservasVuelaCar;
            if (state.modalState.flota !== "v") {
                listado = itemsReservasExternal;
            }

            // const matricula = state.modalState?.matricula as string;
            const startTime = new Date(state.modalState?.fechaRecogida as number);
            const endTime = new Date(state.modalState?.fechaDevolucion as number);
            
            const matriculaTrimmed: string = this.generateTrimmedMatricula(state.modalState?.matricula as string);

            for (let i = 0; i < listado.length; i++) {
                const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(listado[i].modalState.matricula as string);
                if (matriculaModalStateTrimmed === matriculaTrimmed) {

                    const fechaRecogida = new Date(listado[i].modalState?.fechaRecogida as number);
                    const fechaDevolucion = new Date(listado[i].modalState?.fechaDevolucion as number);
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

            let listado = itemsReservasVuelaCar;
            if (state.modalState.flota !== "v") {
                listado = itemsReservasExternal;
            }

            // let matricula = state.modalState?.matricula as string;
            const matriculaTrimmed: string = this.generateTrimmedMatricula(state.modalState?.matricula as string);
            let startTime = new Date(state.modalState?.fechaRecogida as number);
            let endTime = new Date(state.modalState?.fechaDevolucion as number);

            for (let i = 0; i < listado.length; i++) {
                const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(listado[i].modalState.matricula as string);
                if (matriculaModalStateTrimmed === matriculaTrimmed) {

                    const fechaRecogida = new Date(listado[i].modalState?.fechaRecogida as number);
                    const fechaDevolucion = new Date(listado[i].modalState?.fechaDevolucion as number);
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
        const matriculaTrimmed: string = this.generateTrimmedMatricula(matricula as string);
        for (let i = 0; i < listado.length; i++) 
        {
            const matriculaModalStateTrimmed: string = this.generateTrimmedMatricula(listado[i].modalState.matricula as string);
            if (matriculaModalStateTrimmed === matriculaTrimmed) {

                const fechaRecogida = new Date(listado[i].modalState?.fechaRecogida as number);
                const fechaDevolucion = new Date(listado[i].modalState?.fechaDevolucion as number);
                if (fechaRecogida >= startTime || fechaDevolucion <= endTime) {
                    foundMatricula = true;
                    break;
                }

            }
        }

        return foundMatricula;

    }

    generateTrimmedMatricula(matricula: string) {
        let matriculaTrimmed = "";

        matriculaTrimmed = matricula?.trim().toLowerCase().split(" ").join();

        return matriculaTrimmed;
    }

    render() {
        
        // const { showLoading } = this.state;
        if (this._dataSchedulerGrid === undefined)
        {
            return <></>;
        }
        if (this._dataSchedulerGrid.groupsReservaVuelaCar.length === 0)
        {
            return <></>;
        }

        let keyPrereserva = `prereserva_${Math.random()}`;
        let keySubAlquileres = `subalquileres_${Math.random()}`;
        let keyReserva = `reserva_${Math.random()}`;
        const { 
            groupsReservaVuelaCar,
            groupsReservaExterior,
            groupsPreReserva,
            itemsReservasVuelaCar,
            itemsReservasExterior,
            itemsPreReservas,
            listadoClaseVehiculos,
            listadoModelosVehiculos
        } = this._dataSchedulerGrid;

        return (
            <>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={ this.state.showLoading as boolean}
                    onDidDismiss={() => { this.setState({ setShowLoading: false }); }}
                    message={'Cargando...'}
                    duration={5000}
                />
                <div className="fila_botones_scheduler boton-primero">
                    <IonButton onClick={ async () => {
                        const _state = await this.getNewElementPrereserva();
                        this.anadirPreReserva(_state);
                    }
                    } className='boton_prereserva' fill='solid' color="#ffffff">Prereserva</IonButton>
                    <IonButton onClick={ async () => {
                        const _state = await this.getNewElementReservaVuelacar();
                        this.anadirPreReserva(_state);
                    }
                    } className="boton_reserva_vuelacar" fill='solid' color="#ffffff">Reserva Vuelacar</IonButton>
                    
                    <IonButton onClick={() => {
                        this.setDefaultDate();
                    }
                    } className="boton_reserva_vuelacar" fill='solid' color="#ffffff">HOY</IonButton>

                    <IonButton href='/page/Dashboard' className="boton-ultimo" fill='solid' color="#ffffff">Volver</IonButton>
                </div>
                <div className='fila_timelines'>
                    <h3 className='titulo-reservas-timeline'>RESERVAS</h3>
                    <TimelineWrapper
                        marginTop={0}
                        marginBottom={30}
                        key={keyReserva}
                        anadirBotonPreservar={false}
                        groups={groupsReservaVuelaCar}
                        items={itemsReservasVuelaCar}
                        subalquileres={false}
                        onDoubleClicked={this.onDoubleClickedTimelineReservas}
                        onItemDoubleClick={this.onItemDoubleClickReservas}
                        stickyHeader={true}
                        visibleTimeStartProp={this._visibleTimeStart}
                        visibleTimeEndProp={this._visibleTimeEnd}

                    />
                    <h3 className='titulo-subalquileres-timeline'>SUBALQUILERES</h3>
                    <TimelineWrapper
                        marginTop={0}
                        marginBottom={30}
                        key={keySubAlquileres}
                        anadirBotonPreservar={false}
                        groups={groupsReservaExterior}
                        items={itemsReservasExterior}
                        subalquileres={true}
                        onItemDoubleClick={this.onItemDoubleClickReservasExterior}
                        visibleTimeStartProp={this._visibleTimeStart}
                        visibleTimeEndProp={this._visibleTimeEnd}
                    
                    />
                    <h3 className='titulo-prereservas-timeline'>PRERESERVAS</h3>
                    <TimelineWrapper
                        marginTop={0}
                        marginBottom={50}
                        key={keyPrereserva}
                        anadirBotonPreservar={false}
                        groups={groupsPreReserva}
                        items={itemsPreReservas} //{listadoPrereservas}
                        subalquileres={false}
                        onDoubleClicked={this.onDoubleClickedTimelinePreReservas}
                        onItemDoubleClick={this.onItemDoubleClickPreReservas}
                        visibleTimeStartProp={this._visibleTimeStart}
                        visibleTimeEndProp={this._visibleTimeEnd}
                    
                        
                    />

                    <ModalDialog
                        isVisible={this.state.modalReservasVisible}
                        modalState={this.state.modalState as IModalState}
                        onSearchMatriculaAnotherTimeline={this.onSearchMatriculaAnotherTimeline}
                        externalPropItemsReservasVuelaCar={itemsReservasVuelaCar}
                        externalPropsItemsReservasExternal={itemsReservasExterior}
                        externalPropsItemsPrereservas={itemsPreReservas} //{listadoPrereservas}
                        errores={this.state.errores}
                        isDoubleclickItem={this.state.isDoubleclickItem}
                        isFirstTime={this.state.modalState?.isFirstTime as boolean}
                        tiempoClick={this.state.tiempoClick}
                        listadoClaseVehiculos={listadoClaseVehiculos}
                        listadoModelosVehiculos={listadoModelosVehiculos}
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
