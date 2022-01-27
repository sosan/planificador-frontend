import React, { Component  } from 'react';
// import moment from "moment";
import TimelineWrapper from "./TimelineWrapper";
import { IListadoPrereserva, IDataCoches, dataCars, ORDEN_LISTADO_CLASE_COCHES, DEFAULT_TEXT_MATRICULA } from "../datos/coches";
import { listadoColaboradores, ENUM_LISTADO_COLABORADORES } from "../datos/listadoColaboradores";
import { listFlotas } from "../datos/listadoFlotas";
import { ModalDialog, ContainerState as IContainerModalState, IModalState, ENUM_TIPOS_ESTADO } from "./Modal";

// import "../css/TimelineCustom.css";
import "../css/Scheduler.css";

import "../css/variables.css";

import { IonButton } from '@ionic/react';

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
    // dataCarsVisible: boolean;
    
    
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
        modalState: {
            notareserva: "asdasd",
            matricula: "asdasd",
            modeloVehiculo: "asdasd",
            claseVehiculo: "asdasd",
            cantidadDias: 0,
            colaborador: "asdasd",
            flota: "asda",
            isPrereserva: false,
            estado: "asd",
            isNewRegister: false,


        },
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
    flota?: string;
    srcImage?: any,
    rightTitle?: string,
    height?: number,
    width?: number,
    bgColor?: string,
    stackItems?: boolean,

}


export class SchedulerContainer extends Component<ContainerProps, ContainerState>
{
    groupsReservaVuelaCar: typeGroup[];
    groupsReservaExterior: typeGroup[];
    groupsPreReserva: typeGroup[];
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];
    itemsReservasVuelaCar: IListadoPrereserva[];
    itemsReservasExterior: IListadoPrereserva[];
    // TIPOS_ESTADO: ENUM_TIPOS_ESTADO;


    defaultState: ContainerState = {
        modalReservasVisible: false,
        isDoubleclickItem: false,
        isFirstTime: false,
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
        
        let groupsData = this.createGroupForCars(dataCars);

        this.groupsReservaVuelaCar = groupsData.groupCreated;
        this.listadoClaseVehiculos = groupsData.arrayListadoClasesVehiculos; 
        this.listadoModelosVehiculos = groupsData.arrayListadoModelosVehiculos;
        
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

        this.groupsReservaExterior = [
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

        this.itemsReservasVuelaCar = [
            {
                id: 1,
                group: 1,
                title: 'item 1',
                fechaAlta: new Date().toISOString(),
                modalState: {
                    notareserva: "itemsdsdf",
                    matricula: "",
                    modeloVehiculo: "",
                    claseVehiculo: "",
                    cantidadDias: 3,
                    colaborador: "",
                    flota: "",
                    estado: "reservado",
                    isPrereserva: false,
                    isNewRegister: false,

                },

                start_time: new Date(),
                end_time: new Date(),
                canMove: true,
                canResize: true,
                canChangeGroup: true,
                
                itemProps: {
                    'data-custom-attribute': 'Random content',
                    'aria-hidden': true,
                    onDoubleClick: () => { console.log('You clicked double!') },
                    className: 'altura-items',
                    style: {
                        background: 'fuchsia',
                    }
                }

            },

        ];

        this.itemsReservasVuelaCar[0].start_time.setHours(0, 0, 0);
        this.itemsReservasVuelaCar[0].end_time.setHours(23, 59, 59);
        
        this.itemsReservasExterior = [];
        this.itemsReservasExterior.push(this.itemsReservasVuelaCar[0]);

    }

    onCloseModal = () => {

        this.setState({"modalReservasVisible": false, });
      

    }

    onModalDidDismiss = async () => {
        
        this.setState({ "modalReservasVisible": false, });
        
        
    }


    onDoubleClickedTimeline = async (groupId: any, time: any, evento: any) => {
        console.log("clickedado desde grupo=" + groupId + " time=" + time + " evento=" + evento );

        if (time + DRAG_SNAP < new Date().getTime()) return;

        const [matricula, vehiculo] = await this.searchByID(groupId, this.groupsReservaVuelaCar);
        this.setState(
        { 
            "modalReservasVisible": true,
            "tiempoClick": time,
            "modalState": {
                "matricula": matricula,
                "vehiculo": vehiculo,
                "cantidadDias": 3,
                "textoFechaDevolucionVisible": true,
                "isPrereserva": false,
                "isNewRegister": false,
                
            },
            
        });

    }

    async searchByID(_id: number, grupos: typeGroup[])
    {

        let matricula = "", vehiculo = "";

        for (let i = 0; i < this.groupsReservaVuelaCar.length; i++)
        {
            if (this.groupsReservaVuelaCar[i].id === _id)
            {
                matricula = this.groupsReservaVuelaCar[i].matricula;
                vehiculo = this.groupsReservaVuelaCar[i].title;
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
                "flota": "v",
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

    getNewElementPrereserva()
    {

        const _startTime = new Date();
        const tempStarTime = new Date(_startTime);
        const _endTime = new Date(tempStarTime.setDate(_startTime.getDate() + 2));

        _startTime.setHours(0, 0, 0);
        _endTime.setHours(23, 59, 59);

        let newState: ContainerState = {
            "modalState": {
                "showItem": false,
                "textoFechaDevolucionVisible": false,
                "id": listadoPrereservas.length + 1,
                "group": this.groupsPreReserva.length,
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
            
        };

        return newState;

    }

    getNewElementReservaVuelacar()
    {

        const _startTime = new Date();
        const tempStarTime = new Date(_startTime);
        const _endTime = new Date(tempStarTime.setDate(_startTime.getDate() + 2));

        _startTime.setHours(0, 0, 0);
        _endTime.setHours(23, 59, 59);

        let newState: ContainerState = {
            "modalState": {
                "showItem": true,
                "textoFechaDevolucionVisible": false,
                "id": this.itemsReservasVuelaCar.length + 1,
                "group": this.groupsReservaVuelaCar.length,
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
            
        };

        return newState;

    
    }

    anadirPreReserva = (newState: ContainerState) => {

        this.setState(newState, () => {
            this.setState(
                {
                    "modalReservasVisible": true,
                    // "modalState":
                    // {
                    //     "isNewRegister": false,
                    //     "isPrereserva": false,
                    // }
                });
        });

    };

   

    onPreReservasDoubleClickedOverItem = async (state: IListadoPrereserva ) =>
    {
        // console.log("onclicked over item state=" + JSON.stringify(state));
        

        //recoger los datos
        let stateToSend: ContainerState = {
            "isDoubleclickItem": true,
            "modalReservasVisible": false,
            "isFirstTime": true,
        };

        stateToSend.modalState = {...state.modalState};

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
        };

        stateToSend.modalState = { ...state.modalState };

        stateToSend.modalState.showItem = false;
        stateToSend.modalState.isNewRegister = false;
        stateToSend.modalState.textoFechaDevolucionVisible = true;
        this.setState(stateToSend, () => {
            this.setState({ "modalReservasVisible": true, "isFirstTime": false });
            console.log(this.state)
        });

        // this.setState({
            
        //     "modalState": {
        //         "showItem": true,
        //         "textoFechaDevolucionVisible": true,
        //         "id": state.id,
        //         "group": state.group,
        //         "fechaAlta": state.fechaAlta,
        //         "fechaRecogida": state.start_time,
        //         "fechaDevolucion": state.end_time,
        //         "matricula": state.matricula,
        //         "vehiculo": state.claseVehiculo,
        //         "cantidadDias": state.cantidadDias,
        //         "notareserva": state.notareserva,
        //         "modeloVehiculo": state.modeloVehiculo,
        //         "claseVehiculo": state.claseVehiculo,
        //         "colaborador": state.colaborador,
        //         "flota": state.flota,
        //         "estado": state.estado,
        //         "isPrereserva": state.isPrereserva,
        //         "isNewRegister": false,
        //     },
        //     // "modalReservasVisible": true,
        //     "isDoubleclickItem": true,

        // }, () => {
        //     this.setState({ "modalReservasVisible": true, });
        //     console.log(this.state)
        // });


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
            state.modalState.matricula = DEFAULT_TEXT_MATRICULA;
        }

        if (state.modalState.estado === "" || state.modalState.estado === undefined)
        {
            state.modalState.estado = ENUM_TIPOS_ESTADO.prereservado; //"prereservado";
        }

        switch (state.modalState.estado) {
            case ENUM_TIPOS_ESTADO.prereservado:
                this.saveDataPrereserva(state);
            break;

            case ENUM_TIPOS_ESTADO.reservado:
                this.saveDateReserva(state);
            break;

            case ENUM_TIPOS_ESTADO.prepagado:
                break;

            case ENUM_TIPOS_ESTADO['100pagado']:
                break;
        }


        // if (state.modalState.isPrereserva === true)
        // {
        //     this.saveDataPrereserva(state);
        // }
        // else
        // {
        //     this.saveDateReserva(state);
        // }
        

    };

    saveDateReserva(state: IContainerModalState)
    {

        if (state.modalState.matricula === DEFAULT_TEXT_MATRICULA && state.modalState.estado === ENUM_TIPOS_ESTADO.prereservado)
        {
            return;
        }

        /// buscar si hay duplicados de matriculas en las reservas
        // const isDuplicated = this.searchDuplicatedMatricula(this.groupsPreReserva, state.modalState.matricula);
        // if (isDuplicated === true)
        // {
        //     return;
        // }

        let grupoSeleccionado: typeGroup[] = [...this.groupsReservaVuelaCar];;
        let listadoSeleccionado: IListadoPrereserva[] = [...this.itemsReservasVuelaCar];

        let nuevoGrupoReserva: typeGroup = {
            "id": this.groupsReservaVuelaCar.length, //state.modalState.group as number,
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

        if (state.modalState.flota !== "v")
        {
            grupoSeleccionado = [...this.groupsReservaExterior];
            listadoSeleccionado = [...this.itemsReservasExterior];
            nuevoGrupoReserva = {
                "id": this.groupsReservaExterior.length,
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
        
                
        // if (existGroup === false)
        // if (state.isDoubleclickItem === false)
        let [existGroup, positiongroups] = this.searchGroupExist(grupoSeleccionado, state.modalState.group as number);
        let [existListado, positionListado] = this.searchExistListadoPreservas(listadoSeleccionado, state.modalState.id as number);
        

        if (existGroup === false)
        {

            if (state.modalState.flota === "v")
            {
                this.groupsReservaVuelaCar.unshift(nuevoGrupoReserva);
                positiongroups = 0;
                const elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number); //state.modalState.group as number);
                this.itemsReservasVuelaCar.push(elementoReserva);
            }
            else
            {
                this.groupsReservaExterior.unshift(nuevoGrupoReserva);
                positiongroups = 0;
                const elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number); //state.modalState.group as number);
                this.itemsReservasExterior.push(elementoReserva);
            }

        }
        else
        {
            if (state.modalState.flota === "v")
            {
                this.groupsReservaVuelaCar[positiongroups as number].matricula = state.modalState.matricula as string;
                this.groupsReservaVuelaCar[positiongroups as number].modelo = state.modalState.modelo as string;
                this.groupsReservaVuelaCar[positiongroups as number].clasevehiculo = state.modalState.claseVehiculo as string;
                this.groupsReservaVuelaCar[positiongroups as number].flota = state.modalState.flota as string;
                
                let elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number);
                this.itemsReservasVuelaCar[positionListado as number] = elementoReserva;
            }
            else
            {
                this.groupsReservaExterior[positiongroups as number].matricula = state.modalState.matricula as string;
                this.groupsReservaExterior[positiongroups as number].modelo = state.modalState.modelo as string;
                this.groupsReservaExterior[positiongroups as number].clasevehiculo = state.modalState.claseVehiculo as string;
                this.groupsReservaExterior[positiongroups as number].flota = state.modalState.flota as string;

                let elementoReserva = this.generateNewElementReservas(state.modalState, state.modalState.group as number, state.modalState.id as number);
                this.itemsReservasExterior[positionListado as number] = elementoReserva;

            }

        }

        // this.groupsPreReserva.splice(positiongroupsPreReserva as number, 1);
        // listadoPrereservas.splice(positionListadoPreReserva as number, 1);

        this.setState({ "modalReservasVisible": false });

        return true;

    }


    saveDataPrereserva(state: IContainerModalState, )
    {

        let [existGroupPrereserva, positiongroupsPreReserva] = this.searchGroupExist(this.groupsPreReserva, state.modalState.group as number);
        let [existListadoPrereserva, positionListadoPreReserva] = this.searchExistListadoPreservas(listadoPrereservas, state.modalState.id as number);

        if (existGroupPrereserva === false) {
            this.groupsPreReserva.push(
                {
                    "id": state.modalState.group as number,
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

                });

            positiongroupsPreReserva = this.groupsPreReserva.length - 1;
            // state.modalState.id = _idModal;


        }
        else {

            // el vehiculo tiene un grupo, toca actualizar datos 
            // si la matricula no tiene el texto por defecto DEFAULT_TEXT_MATRICULA
            // 
            
            if (state.modalState.matricula !== DEFAULT_TEXT_MATRICULA
                && state.modalState.estado !== ENUM_TIPOS_ESTADO.prereservado ) 
            {

                /// buscar si hay duplicados de matriculas en las reservas
                // const isDuplicated = this.searchDuplicatedMatricula(this.groupsPreReserva, state.modalState.matricula);
                // if (isDuplicated === true)
                // {
                //     return;
                // }

                let elementoGrupo: typeGroup;

                switch (this.state.modalState?.estado) {
                    // case ENUM_TIPOS_ESTADO.prereservado:
                    //     this.groupsPreReserva[positiongroupsPreReserva as number].matricula = state.modalState.matricula as string;
                    //     this.groupsPreReserva[positiongroupsPreReserva as number].modelo = state.modalState.modelo as string;
                    //     this.groupsPreReserva[positiongroupsPreReserva as number].clasevehiculo = state.modalState.claseVehiculo as string;
                    //     this.groupsPreReserva[positiongroupsPreReserva as number].flota = state.modalState.flota as string;

                    // break;
                        
                    case ENUM_TIPOS_ESTADO.reservado:
                        elementoGrupo = this.groupsPreReserva[positiongroupsPreReserva as number];
                        elementoGrupo["id"] = this.groupsReservaVuelaCar.length;
                        elementoGrupo["matricula"] = state.modalState.matricula as string;
                        this.groupsReservaVuelaCar.unshift(elementoGrupo); // delante
                        
                        const elementoReserva = this.generateNewElementReservas(state.modalState, elementoGrupo["id"], elementoGrupo["id"]);
                        this.itemsReservasVuelaCar.push(elementoReserva);
        
                        this.groupsPreReserva.splice(positiongroupsPreReserva as number, 1);
                        listadoPrereservas.splice(positionListadoPreReserva as number, 1);
                    break;

                    case ENUM_TIPOS_ESTADO.prepagado:
                        break;

                    case ENUM_TIPOS_ESTADO['100pagado']:
                        break;
                }

                this.setState({ "modalReservasVisible": false });

                return true;

            }
            else 
            {
                this.groupsPreReserva[positiongroupsPreReserva as number].matricula = state.modalState.matricula as string;
                this.groupsPreReserva[positiongroupsPreReserva as number].modelo = state.modalState.modelo as string;
                this.groupsPreReserva[positiongroupsPreReserva as number].clasevehiculo = state.modalState.claseVehiculo as string;
                this.groupsPreReserva[positiongroupsPreReserva as number].flota = state.modalState.flota as string;
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
            fechaAlta: new Date().toISOString(),
            start_time: startTime,
            end_time: endTime,
            canMove: true,
            canResize: true,
            canChangeGroup: true,
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
            listadoPrereservas.push(elementoPrereservas);
        }
        else {
            listadoPrereservas[positionListadoPreReserva as number] = elementoPrereservas;
        }

        this.setState({ "modalReservasVisible": false });
        return true;
        //TEST: comprobar si --- funciona

    }


    generateNewElementReservas(currentState: IModalState, idGrupo: number, idReserva: number)
    {

        const startTime = new Date(currentState.fechaRecogida as Date);
        const endTime = new Date(currentState.fechaDevolucion as Date);

        startTime.setHours(0, 0, 0);
        endTime.setHours(23, 59, 59);

        const colaboradorDescripcion = this.getDescripcionListadoColaboradores(currentState.colaborador as string);

        let elementoReservas: IListadoPrereserva = {
            canMove: true,
            canResize: true,
            canChangeGroup: true,            
            start_time: startTime,
            end_time: endTime,
            group: idGrupo as number,
            id: idReserva as number,
            fechaAlta: new Date().toISOString(),
            title: colaboradorDescripcion, //currentState.colaborador as string,
            modalState: currentState,

            // notareserva: currentState.notareserva as string,
            // matricula: currentState.matricula as string,
            // modeloVehiculo: currentState.modeloVehiculo as string,
            // claseVehiculo: currentState.claseVehiculo as string,
            // cantidadDias: currentState.cantidadDias as number,
            // colaborador: currentState.colaborador as string,
            // flota: currentState.flota as string,
            // isPrereserva: currentState.isPrereserva,
            // estado: currentState.estado as string,
            // sdfsdfsdf
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


    getDescripcionListadoColaboradores(_id: string)
    {

        let colaboradorDescripcion = "";
        for (let i = 0; i < listadoColaboradores.length; i++) {
            if (listadoColaboradores[i].id === _id) {
                colaboradorDescripcion = listadoColaboradores[i].descripcion;
                break;
            }
        }
        if (colaboradorDescripcion === "")
        {
            colaboradorDescripcion = "VuelaCar";
        }

        return colaboradorDescripcion;
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


    searchDuplicatedMatricula(listado: typeGroup[], _id: string)
    {
        for (let i = 0; i < listado.length; i++)
        {
            if (listado[i].matricula === _id)
            {
                return true;
            }
        }
        return false;
    }

    searchGroupsByFilter = (groups: typeGroup[], items: IListadoPrereserva[], subalquileres: boolean) => {
        let groupsFiltered = [];
        let itemsFiltered = [];

        for (let i = 0; i < groups.length; i++) {

            if (subalquileres === true) {
                if (groups[i].flota !== "v") {
                    groupsFiltered.push(groups[i]);
                }

            }
            else {
                if (groups[i].flota === "v") {
                    groupsFiltered.push(groups[i]);
                }
            }

        }

        for (let i = 0; i < items.length; i++) {

            if (subalquileres === true) {
                if (items[i].modalState.flota !== "v") {
                    itemsFiltered.push(items[i]);
                }

            }
            else {
                if (items[i].modalState.flota === "v") {
                    itemsFiltered.push(items[i]);
                }
            }

        }

        return { groupsFiltered, itemsFiltered };

    }   

    render() {
        
        // console.log("this.state.id=" + this.state.modalState.id);
        const grupoPrereserva = [...this.groupsPreReserva];
        
        let subalquileres = true;
        let { 
            groupsFiltered: groupsFilteredSubAlquileres, 
            itemsFiltered: itemsFilteredSubAlquileres 
        } = this.searchGroupsByFilter(this.groupsReservaVuelaCar, this.itemsReservasVuelaCar, subalquileres);
        
        subalquileres = false;
        let {
            groupsFiltered: groupsFilteredAlquileres,
            itemsFiltered: itemsFilteredAlquileres
        } = this.searchGroupsByFilter(this.groupsReservaVuelaCar, this.itemsReservasVuelaCar, subalquileres);

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
                </div>
                <div className='fila_timelines'>
                    <h3 className='titulo-reservas-timeline'>RESERVAS</h3>
                    <TimelineWrapper
                        marginTop={0}
                        key={keyReserva}
                        anadirBotonPreservar={false}
                        groups={groupsFilteredAlquileres}
                        items={itemsFilteredAlquileres}
                        subalquileres={false}
                        onDoubleClicked={this.onDoubleClickedTimeline}
                    />
                    <h3 className='titulo-subalquileres-timeline'>SUBALQUILERES</h3>
                    <TimelineWrapper
                        marginTop={0}
                        key={keySubAlquileres}
                        anadirBotonPreservar={false}
                        groups={groupsFilteredSubAlquileres}
                        items={itemsFilteredSubAlquileres}
                        subalquileres={true}
                        // onClickAnadirPreReserva={this.anadirPreReserva}
                    />
                    <h3 className='titulo-prereservas-timeline'>PRERESERVAS</h3>
                    <TimelineWrapper 
                        marginTop={0}
                        key={keyPrereserva}
                        anadirBotonPreservar={false}
                        groups={grupoPrereserva}
                        items={listadoPrereservas}
                        subalquileres={false}
                        // onClickAnadirPreReserva={this.anadirPreReserva}
                        
                    />

                    <ModalDialog 
                        isVisible={this.state.modalReservasVisible}
                        modalState={this.state.modalState as IModalState}
                        isDoubleclickItem={this.state.isDoubleclickItem}
                        isFirstTime={this.state.modalState?.isFirstTime as boolean}
                        tiempoClick={this.state.tiempoClick}
                        listadoClaseVehiculos={this.listadoClaseVehiculos}
                        listadoModelosVehiculos={this.listadoModelosVehiculos}
                        dataCars={dataCars}
                        listColaborators={listadoColaboradores}
                        listFlotas={listFlotas}
                        onCloseModal={ this.onCloseModal } 
                        onModalDidDismiss={this.onModalDidDismiss }
                        onSaveData={this.onSaveData}
                        
                    />
                </div>
            </>
        );
    }


}
