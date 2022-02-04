import { Component } from 'react';
import { IonButton,
    IonCol,
    IonContent,
    IonDatetime,
    IonGrid,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonRow,
    IonSelect,
    IonSelectOption 
} from '@ionic/react';
// import { Virtuoso } from 'react-virtuoso';
import { IlistColaborators }  from "../datos/listadoColaboradores";
import { IDataVehiculos, DEFAULT_TEXT_MATRICULA, IListadoPrereserva } from "../datos/vehiculosGeneral";
import { IlistFlotas } from "../datos/listadoFlotas";
import "../css/Modal.css";
import { InputChangeEventDetail } from '@ionic/core';
import imagenFallo from "../images/error_checkbox.svg";

export interface IModalState
{
    [index: string]: any;
    matricula?: string;
    vehiculo?: string;
    cantidadDias?: number;
    fechaAlta?: string;
    fechaRecogida?: Date;
    fechaDevolucion?: Date;
    modeloVehiculo?: string;
    claseVehiculo?: string;
    showItem?: boolean;
    colaborador?: string;
    flota?: string;
    estado?: string;
    id?: number;
    group?: number;
    notareserva?: string;
    isPrereserva: boolean;
    textoFechaDevolucionVisible?: boolean;
    horaentrega?: string;
    lugarentrega?: string;
    preciovuelacar?: number;
    precioexterno?: number;
    extras?: string;

    isNewRegister: boolean;
    isFirstTime?: boolean;
    

}

export interface IModalErrores {
    colaboradorFallo: boolean;
    claseVehiculoFallo: boolean;
    modeloVehiculoFallo: boolean;
    matriculoFallo: boolean;
    flotaFallo: boolean;
    precioExternoFallo: boolean;
    textoErrores: string;
}

interface ContainerProps {
    onCloseModal: any;
    onModalDidDismiss: any;
    onSaveData: any;
    onSearchMatriculaAnotherTimeline: any;
    isVisible: boolean;
    dataCars: IDataVehiculos[];
    listColaborators: IlistColaborators[];
    listFlotas: IlistFlotas[];
    tiempoClick: any;
    
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];
    isDoubleclickItem: boolean;
    modalState: IModalState;
    isFirstTime: boolean;
    errores: IModalErrores;
    externalPropItemsReservasVuelaCar: IListadoPrereserva[];
    externalPropsItemsReservasExternal: IListadoPrereserva[];
    externalPropsItemsPrereservas: IListadoPrereserva[];

}
export type ContainerState = {
    isVisible?: boolean;
    tiempoClick?: any;
    modalState: IModalState;
    isDoubleclickItem: boolean;
    isFirstTime: boolean;
    modalReservasVisible: boolean;
    errores: IModalErrores;
}

export enum ENUM_TIPOS_ESTADO {
    "none" = "none",
    "prereservado" = "prereservado",
    "reservado" = "reservado",
    "prepagado" = "prepagado",
    "alquilado" = "alquilado",
    "length" = 4,
}

let listadoDias: number[] = [];
for (let i = 1; i < 366; i++)
{
    listadoDias.push(i);
}


export class ModalDialog extends Component<ContainerProps, ContainerState>
{

    customDatetime: any ;
    
    defaultState: ContainerState = {
        "isVisible": false,
        "modalState": {
            "textoFechaDevolucionVisible": false,
            "cantidadDias": 3,
            "showItem": false,
            "notareserva": "",
            "modeloVehiculo": "",
            "claseVehiculo": "",
            "estado": "prereservado",
            "colaborador": "",
            "flota": "",
            "id": undefined,
            "group": undefined,
            "isNewRegister": false,
            "isPrereserva": false,
        },
        "errores": {
            "colaboradorFallo": false,
            "claseVehiculoFallo": false,
            "flotaFallo": false,
            "matriculoFallo": false,
            "modeloVehiculoFallo": false,
            "precioExternoFallo": false,
            "textoErrores": "",

        },
        "isDoubleclickItem": false,
        "modalReservasVisible": false,
        "isFirstTime": false,

    };

    constructor(props: any)
    {
        super(props);
        this.state = {
            "isVisible": false,
            "modalState": {
                "textoFechaDevolucionVisible": this.defaultState.modalState.textoFechaDevolucionVisible,
                "cantidadDias": this.defaultState.modalState.cantidadDias,
                "showItem": this.defaultState.modalState.showItem,
                "notareserva": this.defaultState.modalState.notareserva,
                "modeloVehiculo": this.defaultState.modalState.modeloVehiculo,
                "claseVehiculo": this.defaultState.modalState.claseVehiculo,
                "fechaDevolucion": this.defaultState.modalState.fechaDevolucion,
                "fechaRecogida": this.defaultState.modalState.fechaRecogida,
                "estado": this.defaultState.modalState.estado,
                "colaborador": this.defaultState.modalState.colaborador,
                "flota": this.defaultState.modalState.flota,
                "id": this.defaultState.modalState.id,
                "group": this.defaultState.modalState.group,
                "isPrereserva": this.defaultState.modalState.isPrereserva,
                "isNewRegister": false,

            },
            "errores":
            {
                "colaboradorFallo": false,
                "claseVehiculoFallo": false,
                "flotaFallo": false,
                "precioExternoFallo": false,
                "matriculoFallo": false,
                "modeloVehiculoFallo": false,
                "textoErrores": "",

            },
            "isDoubleclickItem": false,
            "modalReservasVisible": false,
            "isFirstTime": false,
        };

        

    }

    componentDidMount()
    {

        console.log("modal montado=");
    }

   

    componentDidUpdate()
    {
        console.log("modal updated" );
        
    }


    restarDias()
    {

        let _cantidadDias = this.state.modalState.cantidadDias as number;
        _cantidadDias--;
        if (_cantidadDias < 1)
        {
            _cantidadDias = 1;
        }

        let estado: ContainerState = this.state;
        estado["modalState"]["cantidadDias"] = _cantidadDias;
        this.setState({ ...estado });
        
        // this.setState({ "modalState": { "cantidadDias": _cantidadDias }} );
    }

    sumarDias()
    {
        let _cantidadDias = this.state.modalState.cantidadDias as number;
        _cantidadDias++;
        
        let estado: ContainerState = this.state;
        estado["modalState"]["cantidadDias"] = _cantidadDias;
        this.setState({ ...estado });
        // this.setState({"modalState": { "cantidadDias": _cantidadDias } });
        
    }

    elegirFechaRecogida(evento: CustomEvent<InputChangeEventDetail>)
    {
        const fechaRecogida = new Date(evento.detail.value as string);
        const fechaRecogidaTemp = new Date(fechaRecogida);
        const fechaDevolucion = new Date(fechaRecogidaTemp.setDate(fechaRecogidaTemp.getDate() + (this.state.modalState.cantidadDias as number - 1)));

        let estadoActual: IModalState = this.state.modalState;
        estadoActual["cantidadDias"] = 3;
        estadoActual["textoFechaDevolucionVisible"] = true;
        estadoActual["fechaRecogida"] = fechaRecogida;
        estadoActual["fechaDevolucion"] = fechaDevolucion;

        this.setState({ "modalState": { ...estadoActual }});

    }

    elegirHoraRecogida(evento: CustomEvent<InputChangeEventDetail>)
    {

        let estadoActual: IModalState = this.state.modalState;
        estadoActual["horaentrega"] = evento.detail.value as string;
        this.setState({ "modalState": { ...estadoActual } });

    }

    onChangeInputNumeroDias(evento: CustomEvent<InputChangeEventDetail>)
    {
        const dias = parseInt( evento.detail.value as string) ;
        const fechaRecogida = new Date(this.state.modalState.fechaRecogida as Date);
        const fechaRecogidaTemp = new Date(fechaRecogida);
        const fechaDevolucion = new Date(fechaRecogidaTemp.setDate(fechaRecogidaTemp.getDate() + (dias - 1)));

        let estado: ContainerState = this.state;
        estado["modalState"]["cantidadDias"] = dias;
        estado["modalState"]["textoFechaDevolucionVisible"] = true;
        estado["modalState"]["fechaRecogida"] = fechaRecogida;
        estado["modalState"]["fechaDevolucion"] = fechaDevolucion;

        this.setState({ ...estado });
        
    }

    onChangeInputs(currentState: ContainerState, key: string, value: string)
    {
        if (value === undefined) return;

        const estado: ContainerState = currentState;
        if (key === "claseVehiculo")
        {
            estado["modalState"]["modeloVehiculo"] = "";
        }

        estado["modalState"][key] = value as string;
        this.setState({ ...estado });

    }

    


    saveProps(state: ContainerState, _idModal: number, groupId: number, fechaAlta: string)
    {
        
        //TODO: realizar mas comprobaciones de si todos los campos estan rellenados
        /// ....
        // if (state.modalState.modeloVehiculo === "" ||
        //     state.modalState.claseVehiculo === "" ||
        //     state.modalState.fechaRecogida === undefined ||
        //     state.modalState.fechaRecogida.toString() === "Invalid Date" ||
        //     state.modalState.fechaDevolucion?.toString()=== "Invalid Date"

        // ) {
        //     this.textoErrores = "Modelo vehiculo erroneo";
        //     return;
        // }
        
        // if (state.modalState.matricula === "" ||
        //     state.modalState.matricula === undefined ||
        //     state.modalState.fechaRecogida?.toString() === "" ||
        //     state.modalState.fechaDevolucion?.toString() === ""
        // ) {
        //     state.modalState.matricula = DEFAULT_TEXT_MATRICULA;
        // }
        
        // if (state.modalState.estado === "" || state.modalState.estado === undefined) {
        //     state.modalState.estado = ENUM_TIPOS_ESTADO.prereservado;
        // }

        // if (state.modalState.matricula === DEFAULT_TEXT_MATRICULA && state.modalState.estado === ENUM_TIPOS_ESTADO.reservado)
        // {
        //     this.textoErrores = "Cambia matricula";
        //     return;

        // }
        

        // buscar si ya existe la misma matricula en el mismo tiempo
        
        let textoErrores = "";
        let conFallos = false;
        let colaboradorFallo = false, 
            claseVehiculoFallo = false, 
            modeloVehiculoFallo = false,
            matriculoFallo = false,
            precioExternoFallo = false,
            flotaFallo  = false;

        const existMatricula = this.props.onSearchMatriculaAnotherTimeline(
            state,
            this.props.externalPropItemsReservasVuelaCar,
            this.props.externalPropsItemsReservasExternal,
            this.props.externalPropsItemsPrereservas

        );
        if (existMatricula === true)
        {
            conFallos = true;
            textoErrores += "Existe ya la matricula";
            
        }

        switch (this.state.modalState.estado) {
            case ENUM_TIPOS_ESTADO.prereservado:
                if (
                    state.modalState.matricula === "" ||
                    state.modalState.matricula === undefined
                ) {
                    matriculoFallo = true;
                    conFallos = true;
                }

                if (
                    state.modalState.flota === "" ||
                    state.modalState.flota === undefined
                ) {
                    flotaFallo = true;
                    conFallos = true;
                }

                if (state.modalState.precioexterno?.toString() === "")
                {
                    precioExternoFallo = true;
                    conFallos = true;
                }
                break;

            case ENUM_TIPOS_ESTADO.reservado:
                if (
                    state.modalState.colaborador === "" || 
                    state.modalState.colaborador === undefined
                )
                {
                    colaboradorFallo = true;
                    conFallos = true;
                }
                
                if (
                    state.modalState.claseVehiculo === "" ||
                    state.modalState.claseVehiculo === undefined
                ) {
                    claseVehiculoFallo = true;
                    conFallos = true;
                }
                
                if (
                    state.modalState.modeloVehiculo === "" ||
                    state.modalState.modeloVehiculo === undefined
                ) {
                    modeloVehiculoFallo = true;
                    conFallos = true;
                }

                if (
                    state.modalState.matricula === "" ||
                    state.modalState.matricula === undefined
                ) {
                    matriculoFallo = true;
                    conFallos = true;
                }

                if (
                    state.modalState.flota === "" ||
                    state.modalState.flota === undefined
                ) {
                    flotaFallo = true;
                    conFallos = true;
                }

                break;

            case ENUM_TIPOS_ESTADO.prepagado:
                break;


            case ENUM_TIPOS_ESTADO.alquilado:
                break;
        }

        if (conFallos === true)
        {
            this.setState(
            {
                "errores":
                {
                    "colaboradorFallo": colaboradorFallo,
                    "claseVehiculoFallo": claseVehiculoFallo,
                    "flotaFallo": flotaFallo,
                    "matriculoFallo": matriculoFallo,
                    "precioExternoFallo": precioExternoFallo,
                    "modeloVehiculoFallo": modeloVehiculoFallo,
                    "textoErrores": textoErrores

                }
            }
            );
            return;
        }

        if (state.modalState.fechaAlta === undefined || state.modalState.fechaAlta === "") {

            state.modalState.fechaAlta = fechaAlta;
        }

        this.props.onSaveData(state, _idModal, groupId);
        
    }

    //de props a state
    static getDerivedStateFromProps(newProps: ContainerProps, newState: ContainerState) {

        // console.log("getderived newState.newprops=" + newProps + " newState.state" + newState);
        if (newProps.modalState.isNewRegister === true)
        {
            if (newProps.isVisible === false)
            {
                newState["modalState"] = {...newProps["modalState"]};
                newState["errores"] = {...newProps["errores"]};
                newState["modalState"]["isReseting"] = false;
                newState.modalState.showItem = true;

            }
            
        }

        if (newProps.isDoubleclickItem === true)
        {

            if (newProps.isVisible === false)
            {

                newState["modalState"] = {...newProps["modalState"]};
                newState["errores"] = { ...newProps["errores"] };
                newState.modalState.showItem = true;
            }

        }
            
        return newState;

    }


    render() {

        const itemsGenerados = this.generarItemsRender(this.state, this.props);

        return(
        <>
            
                <IonModal onWillDismiss={async () => { this.props.onModalDidDismiss(); }} isOpen={this.props.isVisible} animated={true}>
                    <IonGrid className={itemsGenerados.colorCabecera}>
                        <IonRow className="centradovertical">
                            <IonCol size="8">
                                <h1>{itemsGenerados.tituloReserva}</h1>
                                <span>Fecha alta: {itemsGenerados.fechaAltaTexto}</span>
                                <IonInput name='fechaalta' value={itemsGenerados.fechaAlta} hidden={true} ></IonInput>
                            </IonCol>
                            <IonCol >
                                <IonButton onClick={() => {
                                    this.saveProps(this.state,
                                        this.props.modalState.id as number,
                                        this.props.modalState.group as number,
                                        itemsGenerados.fechaAlta as string
                                    ); 
                                } }>Guardar Datos</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12'>
                                <IonLabel className="textoFallo">{this.state.errores.textoErrores}</IonLabel>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonList className="ancho_100">
                                <IonItem>
                                    <IonLabel className="">Fecha Entrega</IonLabel>
                                    <IonLabel className="">
                                        <IonDatetime value={itemsGenerados.textoFechaRecogida} onIonChange={(evento) => { this.elegirFechaRecogida(evento); }} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar">
                                        </IonDatetime>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonSelect value={itemsGenerados.cantidadDias} onIonChange={(evento) => { this.onChangeInputNumeroDias(evento); }} key="cantidaddias" id="cantidaddias" name='cantidaddias' className="cantidaddias_select" okText="Confirmado" cancelText="Cancelar"  >
                                        {
                                            listadoDias.map((elemento: number) => {
                                                return <IonSelectOption key={elemento} value={elemento}>{elemento}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Devolucion</IonLabel>
                                    <IonLabel className="">{itemsGenerados.textoFechaDevolucion}</IonLabel>
                                </IonItem>
                                {itemsGenerados.horaEntregaItem}
                                {itemsGenerados.lugarEntregaItem}
                                <IonItem>
                                    <IonLabel className="">Colaborador</IonLabel>
                                    <IonSelect value={itemsGenerados.colaborador} onIonChange={(evento) => { this.onChangeInputs(this.state, "colaborador", evento.detail.value as string); }} key="colaboradores" id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listColaborators.map((elemento: IlistColaborators) => {
                                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                    
                                </IonItem>
                                <IonItem>
                                    {
                                        (this.state.errores.claseVehiculoFallo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Clase</IonLabel></>
                                            :
                                            <IonLabel className="">Clase</IonLabel>
                                    }
                                    <IonSelect value={itemsGenerados.claseVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="clase" id="clase" name='clase' className="clase_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listadoClaseVehiculos.map((elemento: string) => {
                                                return <IonSelectOption key={elemento.toLowerCase()} value={elemento.toLowerCase()}>{elemento.toUpperCase()}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                
                                
                                
                                <IonItem>
                                    {
                                        (this.state.errores.modeloVehiculoFallo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Modelo Vehiculo</IonLabel></>
                                        :
                                        <IonLabel className="">Modelo Vehiculo</IonLabel>
                                    }
                                    <IonSelect value={itemsGenerados.modeloVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value); }} key="vehiculos" id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {itemsGenerados.modeloVehiculoItem}
                                        {/* {
                                           
                                            this.props.dataCars.map((elemento: IDataVehiculos) => {

                                                if (elemento.clasevehiculo === itemsGenerados.claseVehiculo)
                                                {
                                                    return <IonSelectOption key={elemento.matricula.toLowerCase()} value={elemento.modelo}>{elemento.modelo.toUpperCase()}</IonSelectOption>;
                                                }
                                                return null;
                                            })
                                        } */}
                                    </IonSelect>
                                </IonItem>
                                {itemsGenerados.matriculaItem}
                                {itemsGenerados.flotaItem}
                                {itemsGenerados.numeroReservaItem}
                                {itemsGenerados.precioVuelacarItem}
                                {itemsGenerados.notaReservaItem}
                                {itemsGenerados.precioExternoItem}
                                {itemsGenerados.extrasItem}
                                {itemsGenerados.estadoItem}
                            </IonList>
                        
                        </IonRow>
                        <IonRow className="centradovertical">
                            <IonCol size="6">
                                <IonButton onClick={() => { this.props.onCloseModal(); }}>Volver</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton onClick={
                                    () => {
                                        
                                        this.saveProps(this.state,
                                            this.props.modalState.id as number,
                                            this.props.modalState.group as number,
                                            itemsGenerados.fechaAlta as string
                                        ); 
                                    }
                                }>Guardar Datos</IonButton>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonModal>
            
        </> 
            
        );

    }
    generarItemsRender(state: ContainerState, props: ContainerProps ) {
        
        let {
            id,
            group,
            fechaAlta = undefined,
            fechaRecogida,
            notareserva = "",
            claseVehiculo = "",
            colaborador,
            modeloVehiculo = "",
            cantidadDias = 3,
            horaentrega,
            lugarentrega = "",
            matricula = DEFAULT_TEXT_MATRICULA,
            flota,
            estado = "prereservado",
            textoFechaDevolucion = "",
            preciovuelacar,
            precioexterno,
            extras

        } = state.modalState;

        let textoFechaRecogida = "";
        let fechaAltaDate = new Date();

        if (fechaAlta === undefined) // creado desde 0
        {
            textoFechaRecogida = "";
            fechaAlta = new Date().toISOString();
        }
        else // leyendo desde datos
        {
            fechaAltaDate = new Date(fechaAlta as string);
        }

        if (fechaRecogida !== undefined) {
            textoFechaRecogida = fechaRecogida.toISOString();

            const fechaRecogidaTempo = new Date(fechaRecogida);
            const fechaDevolucion = new Date(fechaRecogidaTempo.setDate(fechaRecogidaTempo.getDate() + (this.state.modalState.cantidadDias as number - 1)));
            textoFechaDevolucion = `${fechaDevolucion.getDate().toString().padStart(2, "00")}-${(fechaDevolucion.getMonth() + 1).toString().padStart(2, "00")}-${fechaDevolucion.getFullYear()}`;

        }

        //
        const fechaAltaTexto = `${fechaAltaDate.getDate().toString().padStart(2, "00")}-${(fechaAltaDate.getMonth() + 1).toString().padStart(2, "00")}-${fechaAltaDate.getFullYear()} ${fechaAltaDate.getHours().toString().padStart(2, "00")}:${fechaAltaDate.getMinutes().toString().padStart(2, "00")}`;
        let tituloReserva = "Rellenar Reserva VuelaCar";
        let colorCabecera = "grid_cabecera grid_cabecera_reserva";


        switch (estado) {
            case ENUM_TIPOS_ESTADO.prereservado:
                tituloReserva = "Rellenar Prereserva";
                colorCabecera = "grid_cabecera grid_cabecera_prereserva";
                break;

            case ENUM_TIPOS_ESTADO.reservado:
                break;

            case ENUM_TIPOS_ESTADO.prepagado:
                break;

            case ENUM_TIPOS_ESTADO.alquilado:
                tituloReserva = "Consulta";
                colorCabecera = "grid_cabecera grid_cabecera_alquilado";
                break;
        }

        let horaEntregaItem = null;
        let lugarEntregaItem = null;
        let matriculaItem = null;
        let flotaItem = null;
        let numeroReservaItem = null;
        let precioVuelacarItem = null;
        let notaReservaItem = null;
        let precioExternoItem = null;
        let extrasItem = null;
        let estadoItem = null;
        // state.modalState.isPrereserva
        
        
        let modeloVehiculoItem = null;
        
        if (claseVehiculo !== "")
        {
            modeloVehiculoItem = new Set();
            let modelosUnicos = new Set();
            for (let i = 0; i < this.props.dataCars.length; i++)
            {
                const elemento = this.props.dataCars[i];
                if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() && modelosUnicos.has(elemento.modelo) === false)
                {
                    modelosUnicos.add(elemento.modelo);
                    modeloVehiculoItem.add(<IonSelectOption key={elemento.modelo.toLowerCase()} value={elemento.modelo}>{elemento.modelo.toUpperCase()}</IonSelectOption>);

                }
            }
            
        }
        
        if (estado !== ENUM_TIPOS_ESTADO.prereservado) 
        {
            horaEntregaItem = 
                <IonItem>
                    <IonLabel className="">Hora de entrega</IonLabel>
                    <IonDatetime value={horaentrega} hourValues="8,9,10,11,12,13,14,15,16,17,18,19,20" minuteValues="0,30" onIonChange={(evento) => { this.elegirHoraRecogida(evento); }} displayFormat='HH:mm' hour-cycle="h23" first-day-of-week={1} cancelText="Cancelar" doneText="Confirmar"></IonDatetime>
                </IonItem>
            ;

            lugarEntregaItem = 
                <IonItem>
                    <IonLabel position='floating' className="">Lugar de entrega</IonLabel>
                    <IonInput name='lugarentrega' value={lugarentrega} onIonChange={(evento) => { this.onChangeInputs(this.state, "lugarentrega", evento.detail.value as string); }}></IonInput>
                </IonItem>
            ;
            

            matriculaItem = 
                <IonItem>
                    {
                        (this.state.errores.matriculoFallo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel position='floating' className="textofallo">Matricula</IonLabel></>
                            :
                            <IonLabel position='floating' className="">Matricula</IonLabel>
                    }
                    {
                        (this.state.modalState.isPrereserva === true) ? <IonInput value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value as string); }} key="matricula" id="matricula" name='matricula' className="matricula_select" ></IonInput>
                            :
                            <IonSelect value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value); }} key="matricula" id="matricula" name='matricula' className="matricula_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                {
                                    this.props.dataCars.map((elemento: IDataVehiculos) => {
                                        if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() as string &&
                                            elemento.modelo.toLowerCase() === modeloVehiculo.toLowerCase() as string
                                        ) {
                                            return <IonSelectOption key={elemento.matricula} value={elemento.matricula}>{elemento.matricula}</IonSelectOption>;

                                        }
                                        return null;
                                    })
                                }
                            </IonSelect>
                    }

                </IonItem>
            ;
            

            flotaItem = 
                <IonItem>
                    {
                        (this.state.errores.flotaFallo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Flotas externas</IonLabel></>
                            :
                            <IonLabel className="">Flotas externas</IonLabel>

                    }
                    <IonSelect value={flota} onIonChange={(evento) => { this.onChangeInputs(this.state, "flota", evento.detail.value as string); }} id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        {
                            this.props.listFlotas.map((elemento: IlistFlotas) => {
                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                            })
                        }
                    </IonSelect>
                </IonItem>
            ;

            

            numeroReservaItem =
                <IonItem>
                    <IonLabel className="">Numero Reserva</IonLabel>
                    <IonLabel className="">XXXXXXXX</IonLabel>
                </IonItem>
            ;

            precioVuelacarItem =
                <IonItem>
                    <IonLabel position='floating' className="">Precio Vuelacar</IonLabel>
                    <IonInput name='preciovuelacar' value={preciovuelacar} onIonChange={(evento) => { this.onChangeInputs(this.state, "preciovuelacar", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric"></IonInput>
                </IonItem>
            ;

            notaReservaItem = 
                <IonItem>
                    <IonLabel position='floating' className="">Nº Reserva externo</IonLabel>
                    <IonInput name='notareserva' value={notareserva} onIonChange={(evento) => { this.onChangeInputs(this.state, "notareserva", evento.detail.value as string); }}></IonInput>
                </IonItem>
            ;

            precioExternoItem = 
                <IonItem>
                    {
                        (this.state.errores.precioExternoFallo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel position='floating' className="textoFallo">Precio externo</IonLabel></>
                            :
                            <IonLabel position='floating' className="">Precio externo</IonLabel>

                    }
                    <IonInput name='precioexterno' value={precioexterno} onIonChange={(evento) => { this.onChangeInputs(this.state, "precioexterno", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric"></IonInput>
                </IonItem>
            ;

            extrasItem = 
                <IonItem>
                    <IonLabel position='floating' className="">Extras</IonLabel>
                    <IonInput name='extras' value={extras} onIonChange={(evento) => { this.onChangeInputs(this.state, "extras", evento.detail.value as string); }}></IonInput>
                </IonItem>
            ;
            
            estadoItem =
                <IonItem>
                    <IonLabel className="">Estado</IonLabel>
                    <IonSelect value={estado} onIonChange={(evento) => { this.onChangeInputs(this.state, "estado", evento.detail.value as string); }} id="estado" name='estado' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                        <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                        <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                        <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                    </IonSelect>
                </IonItem>
            ;

        }


        return { 
            tituloReserva,
            colorCabecera,
            fechaAltaTexto,
            fechaAlta,
            textoFechaRecogida,
            fechaRecogida,
            notareserva,
            claseVehiculo,
            colaborador,
            modeloVehiculo,
            cantidadDias,
            horaentrega,
            lugarentrega,
            matricula,
            flota,
            estado,
            textoFechaDevolucion,
            preciovuelacar,
            precioexterno,
            extras,

            horaEntregaItem,
            lugarEntregaItem,
            matriculaItem,
            flotaItem,
            numeroReservaItem,
            precioVuelacarItem,
            notaReservaItem,
            precioExternoItem,
            extrasItem,
            estadoItem,
            modeloVehiculoItem




        }




    }

}