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
import { InputChangeEventDetail } from '@ionic/core';
import imagenFallo from "../images/error_checkbox.svg";
import "../css/Modal.css";

export interface IModalState
{
    [index: string]: any;
    matricula?: string;
    vehiculo?: string;
    cantidadDias?: number;
    fechaAlta?: string;
    fechaRecogida?: number;
    fechaDevolucion?: number;
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
    uriNotaExterior?: string

    isNewRegister: boolean;
    isFirstTime?: boolean;
    hasContract: boolean;
    reservaCompletada: boolean;
    
    

}

export interface IModalErrores {
    [index: string]: any;
    colaborador: boolean;
    claseVehiculo: boolean;
    modeloVehiculo: boolean;
    matricula: boolean;
    flota: boolean;
    precioExterno: boolean;
    textoErrores: string;
}

interface ContainerProps {
    onCloseModal: any;
    onDelete: any;
    onModalDidDismiss: any;
    onSaveData: any;
    onSearchMatriculaAnotherTimeline: any;
    isVisible: boolean;
    tiempoClick: any;
    dataCars: IDataVehiculos[];
    listColaborators: IlistColaborators[];
    listFlotas: IlistFlotas[];
    
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
    clickedModificar?: boolean;
}

export enum ENUM_TIPOS_ESTADO {
    "none" = "none",
    "prereservado" = "prereservado",
    "reservado" = "reservado",
    "prepagado" = "prepagado",
    "alquilado" = "alquilado",
    "length" = 4,
}

export let listadoDias: number[] = [];
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
            "hasContract": false,
            "reservaCompletada": false,
            
        },
        "errores": {
            "colaborador": false,
            "claseVehiculo": false,
            "flota": false,
            "matricula": false,
            "modeloVehiculo": false,
            "precioExterno": false,
            "textoErrores": "",

        },
        "isDoubleclickItem": false,
        "modalReservasVisible": false,
        "isFirstTime": false,

    };
    matriculaValue: string = "";
    modeloVehiculoValue: string = "";
    claseVehiculoValue: string = "";

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
                "hasContract": this.defaultState.modalState.hasContract,
                "reservaCompletada": this.defaultState.modalState.reservaCompletada,

            },
            "errores":
            {
                "colaborador": false,
                "claseVehiculo": false,
                "flota": false,
                "precioExterno": false,
                "matricula": false,
                "modeloVehiculo": false,
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


    

    elegirFechaRecogida(evento: CustomEvent)
    {
        const fechaRecogida = new Date(evento.detail.value as string);
        const fechaRecogidaTemp = new Date(fechaRecogida);
        const fechaDevolucion = new Date(fechaRecogidaTemp.setDate(fechaRecogidaTemp.getDate() + (this.state.modalState.cantidadDias as number - 1)));

        let estadoActual: IModalState = this.state.modalState;
        estadoActual["cantidadDias"] = 3;
        estadoActual["textoFechaDevolucionVisible"] = true;
        estadoActual["fechaRecogida"] = fechaRecogida.getTime();
        estadoActual["fechaDevolucion"] = fechaDevolucion.getTime();

        this.setState({ "modalState": { ...estadoActual }});

    }

    elegirHoraRecogida(evento: CustomEvent)
    {

        let estadoActual: IModalState = this.state.modalState;
        estadoActual["horaentrega"] = evento.detail.value as string;
        this.setState({ "modalState": { ...estadoActual } });

    }

    onChangeInputNumeroDias(evento: CustomEvent<InputChangeEventDetail>)
    {
        const dias = parseInt( evento.detail.value as string) ;
        const fechaRecogida = new Date(this.state.modalState.fechaRecogida as number);
        const fechaRecogidaTemp = new Date(fechaRecogida);
        const fechaDevolucion = new Date(fechaRecogidaTemp.setDate(fechaRecogidaTemp.getDate() + (dias - 1)));

        let estado: ContainerState = this.state;
        estado["modalState"]["cantidadDias"] = dias;
        estado["modalState"]["textoFechaDevolucionVisible"] = true;
        estado["modalState"]["fechaRecogida"] = fechaRecogida.getTime();
        estado["modalState"]["fechaDevolucion"] = fechaDevolucion.getTime();

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
        
        estado["errores"][key] = false;
        estado["modalState"][key] = value as string;

        if (key === "matricula")
        {
            this.matriculaValue = value;
        }

        if (key === "modeloVehiculo") {
            this.modeloVehiculoValue = value;
        }

        if (key === "claseVehiculo") {
            this.claseVehiculoValue = value;
        }

        this.setState({ ...estado });

    }

    


    saveProps(state: ContainerState, _idModal: number, groupId: number, fechaAlta: string)
    {
        
        // buscar si ya existe la misma matricula en el mismo tiempo
        
        let textoErrores = "";
        let conFallos = false;
        let colaboradorFallo = false, 
            claseVehiculoFallo = false, 
            modeloVehiculoFallo = false,
            matriculoFallo = false,
            precioExternoFallo = false,
            flotaFallo  = false;
        

        let existMatricula = this.props.onSearchMatriculaAnotherTimeline(
                state,
                this.props.externalPropItemsReservasVuelaCar,
                this.props.externalPropsItemsReservasExternal,
                this.props.externalPropsItemsPrereservas
    
        );
        
        if (existMatricula === true)
        {
            conFallos = true;
            textoErrores += "Vehiculo ocupado";
            matriculoFallo = true;
            
        }


        switch (state.modalState.estado) {
            case ENUM_TIPOS_ESTADO.prereservado:
                if (state.modalState.isNewRegister === true)
                {
                    if (state.modalState.colaborador === "")
                    {
                        colaboradorFallo = true;
                        conFallos = true;
                    }

                    if (state.modalState.claseVehiculo === "") {
                        claseVehiculoFallo = true;
                        conFallos = true;
                    }

                    // if (state.modalState.modeloVehiculo === "") {
                    //     modeloVehiculoFallo = true;
                    //     conFallos = true;
                    // }

                }
                else
                {

                    // if (state.modalState.matricula === "" ) {
                    //     matriculoFallo = true;
                    //     conFallos = true;
                    // }
    
                    if (state.modalState.flota === "") {
                        flotaFallo = true;
                        conFallos = true;
                    }
    
                    // if (state.modalState.precioexterno?.toString() === "")
                    // {
                    //     precioExternoFallo = true;
                    //     conFallos = true;
                    // }
                }

                break;

            case ENUM_TIPOS_ESTADO.reservado:
                if (state.modalState.colaborador === "" )
                {
                    colaboradorFallo = true;
                    conFallos = true;
                }
                
                if (state.modalState.claseVehiculo === "" ) {
                    claseVehiculoFallo = true;
                    conFallos = true;
                }
                
                if (state.modalState.modeloVehiculo === "" ) {
                    modeloVehiculoFallo = true;
                    conFallos = true;
                }


                if (state.modalState.flota === "v") {
                    if ( state.modalState.matricula === "" ) {
                        matriculoFallo = true;
                        conFallos = true;
                    }

                }

                if (state.modalState.flota === "" ) {
                    flotaFallo = true;
                    conFallos = true;
                }

                if (state.modalState.flota !== "v")
                {
                    if (this.claseVehiculoValue === "")
                    {
                        claseVehiculoFallo = true;
                        conFallos = true;
                    }
    
                    if (this.modeloVehiculoValue === "")
                    {
                        modeloVehiculoFallo = true;
                        conFallos = true;
                    }
                    
                    if (this.matriculaValue === "") /// nose si es obligarotio en un reserva subalquiler
                    {
                        matriculoFallo = true;
                        conFallos = true;
    
                    }

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
                    "colaborador": colaboradorFallo,
                    "claseVehiculo": claseVehiculoFallo,
                    "flota": flotaFallo,
                    "matricula": matriculoFallo,
                    "precioExterno": precioExternoFallo,
                    "modeloVehiculo": modeloVehiculoFallo,
                    "textoErrores": textoErrores

                }
            }
            );
            return;
        }

        if (state.modalState.fechaAlta === undefined || state.modalState.fechaAlta === "") {

            state.modalState.fechaAlta = fechaAlta;
        }

        this.matriculaValue = "";
        this.modeloVehiculoValue = "";
        this.claseVehiculoValue = "";

        this.props.onSaveData(state, _idModal, groupId, this.props.isDoubleclickItem);
        
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

    async activarModificar()
    {
        console.log("sdfjskdf");

       // this.matriculaHtml.value = "";
        

        this.setState({ "clickedModificar": true });

    }

    onModalDidDismiss()
    {
        this.setState({ "clickedModificar": false });
        this.props.onModalDidDismiss();
    }


    render() {

        const itemsGenerados = this.generarItemsRender(this.state, this.props);
        const isDisabled = this.checkInputsWillBeDisabled(this.state);

        return(
        <>
                <IonModal cssClass="modal-timeline" onWillDismiss={ () => { this.onModalDidDismiss(); }} isOpen={this.props.isVisible} animated={true}>
                <IonContent>
                    <IonGrid className={itemsGenerados.colorCabecera}>
                        <IonRow className=" altura_15 cabecera-arriba">
                            <h2 className='margen-cabecera-arriba-planning'>{itemsGenerados.tituloReserva}</h2>
                            <span>Fecha alta: {itemsGenerados.fechaAltaTexto}</span>
                            <IonInput name='fechaalta' value={itemsGenerados.fechaAlta} hidden={true} ></IonInput>
                            <IonLabel className="textoFallo">{this.state.errores.textoErrores}</IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12'>
                                <div className='centrado-horizontal'>
                                    <IonButton onClick={() => { this.props.onCloseModal(); }}>Volver</IonButton>
                                </div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonList className="ancho_100">
                                <IonItem>
                                    <IonLabel className="">Fecha Entrega</IonLabel>
                                    <IonLabel className="">
                                        <IonDatetime disabled={isDisabled}  value={itemsGenerados.textoFechaRecogida} onIonChange={(evento) => { this.elegirFechaRecogida(evento); }} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar" />
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonSelect disabled={isDisabled}  value={itemsGenerados.cantidadDias} onIonChange={(evento) => { this.onChangeInputNumeroDias(evento); }} key="cantidaddias" id="cantidaddias" name='cantidaddias' className="cantidaddias_select" okText="Confirmado" cancelText="Cancelar"  >
                                        {
                                            listadoDias.map((elemento: number) => {
                                                return <IonSelectOption key={elemento} value={elemento}>{elemento}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Devolucion</IonLabel>
                                    {/* <IonLabel className="">{itemsGenerados.textoFechaDevolucion}</IonLabel> */}
                                    <IonInput disabled={isDisabled} className="texto-alineado-derecha" name='fechaDevolucion' readonly={true} value={itemsGenerados.textoFechaDevolucion} autocomplete="off" inputmode="text" placeholder='Fecha Devolucion' />


                                    
                                </IonItem>
                                {itemsGenerados.horaEntregaItem}
                                {itemsGenerados.lugarEntregaItem}
                                <IonItem>
                                    {
                                        (this.state.errores.colaborador === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Colaborador</IonLabel></>
                                        :
                                        <IonLabel className="">Colaborador</IonLabel>
                                        
                                    }
                                    <IonSelect disabled={isDisabled} value={itemsGenerados.colaborador} onIonChange={(evento) => { this.onChangeInputs(this.state, "colaborador", evento.detail.value as string); }} key="colaboradores" id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listColaborators.map((elemento: IlistColaborators) => {
                                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                    
                                </IonItem>
                                {itemsGenerados.flotaItem}
                                {itemsGenerados.claseVehiculoItem}
                                {itemsGenerados.modeloVehiculoItem}
                                {itemsGenerados.matriculaItem}
                                {itemsGenerados.numeroReservaItem}
                                {itemsGenerados.precioVuelacarItem}
                                {itemsGenerados.notaReservaItem}
                                {itemsGenerados.precioExternoItem}
                                {itemsGenerados.extrasItem}
                                {itemsGenerados.estadoItem}
                            </IonList>
                        
                        </IonRow>
                        <IonRow className="centradobotones">
                            {itemsGenerados.botonModificarItem}
                            {itemsGenerados.botonGuardarItem}
                            
                            <div className='centrado-horizontal boton-eliminar'>
                                {
                                    (this.props.isDoubleclickItem === false) ? null
                                        :
                                        <IonButton onClick={() => { this.props.onDelete(itemsGenerados.estado, itemsGenerados.flota, itemsGenerados.id); }}>Eliminar</IonButton>
                                }
                            </div>
                            
                        </IonRow>

                    </IonGrid>
                </IonContent>
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
            horaentrega = "08:00",
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
            textoFechaRecogida = new Date(fechaRecogida).toISOString();

            const fechaRecogidaTempo = new Date(fechaRecogida);
            const fechaDevolucion = new Date(fechaRecogidaTempo.setDate(fechaRecogidaTempo.getDate() + (this.state.modalState.cantidadDias as number - 1)));
            textoFechaDevolucion = `${fechaDevolucion.getDate().toString().padStart(2, "00")}-${(fechaDevolucion.getMonth() + 1).toString().padStart(2, "00")}-${fechaDevolucion.getFullYear()}`;

        }

        //
        const fechaAltaTexto = `${fechaAltaDate.getDate().toString().padStart(2, "00")}-${(fechaAltaDate.getMonth() + 1).toString().padStart(2, "00")}-${fechaAltaDate.getFullYear()} ${fechaAltaDate.getHours().toString().padStart(2, "00")}:${fechaAltaDate.getMinutes().toString().padStart(2, "00")}`;


        let tituloReserva = "Planning - ";
        let colorCabecera = "grid_cabecera grid_cabecera_reserva";

        if (props.isDoubleclickItem === true)
        {
            tituloReserva += "Consulta ";
        }
        
        if (estado === ENUM_TIPOS_ESTADO.reservado)
        {
            tituloReserva += "Reserva";
        }
        else if (estado === ENUM_TIPOS_ESTADO.prereservado)
        {
            tituloReserva += "Pre-Reserva";
            colorCabecera = "grid_cabecera grid_cabecera_prereserva";
        }
        else if (estado === ENUM_TIPOS_ESTADO.alquilado)
        {
            tituloReserva += "Consulta";
            colorCabecera = "grid_cabecera grid_cabecera_alquilado";
        }


        if (flota === "v")
        {
            tituloReserva += " VuelaCar";
        }
        else
        {
            tituloReserva += " Subalquileres";
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
        let modeloVehiculoItem = null;
        let claseVehiculoItem = null;
        let botonGuardarItem = 
            <div className='centrado-horizontal'>
                <IonButton onClick={
                    () => {

                        this.saveProps(state,
                            props.modalState.id as number,
                            props.modalState.group as number,
                            fechaAlta as string
                        );
                    }
                }>Guardar Datos</IonButton>
            </div>
            ;

        let botonModificarItem = <></>;
        

        const isDisabled = this.checkInputsWillBeDisabled(state);
        let listadoModelosVehiculos = null;


        let seleccionModeloVehiculo = null;
        let listadoClaseVehiculo = null;

        
            if (claseVehiculo !== "") {
                listadoModelosVehiculos = new Set();
                let modelosUnicos = new Set();
                for (let i = 0; i < props.dataCars.length; i++) {
                    const elemento = props.dataCars[i];
                    if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() && modelosUnicos.has(elemento.modelo) === false) {
                        modelosUnicos.add(elemento.modelo);
                        listadoModelosVehiculos.add(<IonSelectOption key={elemento.modelo.toLowerCase()} value={elemento.modelo}>{elemento.modelo.toUpperCase()}</IonSelectOption>);

                    }
                }

            }

        
        
        if (estado === ENUM_TIPOS_ESTADO.prereservado)
        {
            seleccionModeloVehiculo =
                <IonSelect disabled={isDisabled} value={modeloVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value); }} key="vehiculos" id="modeloVehiculo" name='vehiculos' className="vehiculos_select texto-alineado-derecha" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                    {listadoModelosVehiculos}
                </IonSelect>

            listadoClaseVehiculo = <IonSelect disabled={isDisabled} value={claseVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="claseVehiculo" id="claseVehiculo" name='claseVehiculo' className="clase_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                {
                    this.props.listadoClaseVehiculos.map((elemento: string) => {
                        return <IonSelectOption key={elemento.toLowerCase()} value={elemento.toLowerCase()}>{elemento.toUpperCase()}</IonSelectOption>;
                    })
                }
            </IonSelect>

            claseVehiculoItem = <IonItem>
                {
                    (this.state.errores.claseVehiculo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Clase</IonLabel></>
                        :
                        <IonLabel className="">Clase</IonLabel>
                }
                {listadoClaseVehiculo}
            </IonItem>
                ;
            modeloVehiculoItem = <IonItem>
                {
                    (this.state.errores.modeloVehiculo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Modelo Vehiculo</IonLabel></>
                        :
                        <IonLabel className="">Modelo Vehiculo</IonLabel>
                }
                {seleccionModeloVehiculo}
            </IonItem>

        }

        if (
            (props.isDoubleclickItem === true && estado === ENUM_TIPOS_ESTADO.prereservado) ||
            (estado !== ENUM_TIPOS_ESTADO.prereservado)
        )
        {

            horaEntregaItem = 
                <IonItem>
                    <IonLabel className="">Hora de entrega</IonLabel>
                    <IonDatetime disabled={isDisabled} value={horaentrega} hourValues="8,9,10,11,12,13,14,15,16,17,18,19,20" minuteValues="0,30" onIonChange={(evento) => { this.elegirHoraRecogida(evento); }} displayFormat='HH:mm' hour-cycle="h23" first-day-of-week={1} cancelText="Cancelar" doneText="Confirmar" placeholder='Hora de entrega' ></IonDatetime>
                </IonItem>
            ;

            lugarEntregaItem = 
                <IonItem className=''>
                    <IonLabel  className="">Lugar de entrega</IonLabel>
                    <IonInput disabled={isDisabled} className="texto-alineado-derecha" name='lugarentrega' value={lugarentrega} onIonChange={(evento) => { this.onChangeInputs(this.state, "lugarentrega", evento.detail.value as string); }} placeholder="Lugar de entrega"></IonInput>
                </IonItem>
            ;
            
            let inputSelectionMatricula = 
                    <IonSelect disabled={isDisabled} value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value); }} key="matricula" id="matricula" name='matricula' className="matricula_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        {
                            props.dataCars.map((elemento: IDataVehiculos) => {
                                if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() as string &&
                                    elemento.modelo.toLowerCase() === modeloVehiculo.toLowerCase() as string
                                ) {
                                    return <IonSelectOption key={elemento.matricula} value={elemento.matricula}>{elemento.matricula}</IonSelectOption>;

                                }
                                return null;
                            })
                        }
                    </IonSelect>
            ;

            let seleccionModeloVehiculo = null;
            let listadoClaseVehiculo = null;

            if (flota === "v")
            {
                if (claseVehiculo !== "") {
                    listadoModelosVehiculos = new Set();
                    let modelosUnicos = new Set();
                    for (let i = 0; i < props.dataCars.length; i++) {
                        const elemento = props.dataCars[i];
                        if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() && modelosUnicos.has(elemento.modelo) === false) {
                            modelosUnicos.add(elemento.modelo);
                            listadoModelosVehiculos.add(<IonSelectOption key={elemento.modelo.toLowerCase()} value={elemento.modelo}>{elemento.modelo.toUpperCase()}</IonSelectOption>);

                        }
                    }

                }

                seleccionModeloVehiculo = 
                    <IonSelect disabled={isDisabled} value={modeloVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value); }} key="vehiculos" id="modeloVehiculo" name='vehiculos' className="vehiculos_select texto-alineado-derecha" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        {listadoModelosVehiculos}
                    </IonSelect>

                listadoClaseVehiculo = <IonSelect disabled={isDisabled} value={claseVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="claseVehiculo" id="claseVehiculo" name='claseVehiculo' className="clase_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                    {
                        this.props.listadoClaseVehiculos.map((elemento: string) => {
                            return <IonSelectOption key={elemento.toLowerCase()} value={elemento.toLowerCase()}>{elemento.toUpperCase()}</IonSelectOption>;
                        })
                    }
                </IonSelect>


            }
            else
            {
                inputSelectionMatricula = <IonInput disabled={isDisabled} value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value as string); }} key="matricula" id="matricula" name="matricula" placeholder="Matricula" className="matricula_select texto-alineado-derecha" ></IonInput>
                seleccionModeloVehiculo = <IonInput disabled={isDisabled} value={modeloVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value as string); }} key="vehiculos" id="modeloVehiculo" name='vehiculos' className="vehiculos_select texto-alineado-derecha" placeholder="Modelo Vehiculo" ></IonInput>
                listadoClaseVehiculo = <IonInput disabled={isDisabled} value={claseVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="claseVehiculo" id="claseVehiculo" name='clasevehiculo' className="vehiculos_select texto-alineado-derecha" placeholder="Clase Vehiculo" ></IonInput>

            }


            if (this.state.clickedModificar === true)
            {
                if (this.state.modalState.isPrereserva === true)
                {
                    

                }
                else
                {
                    if (state.modalState.flota !== "v")
                    {
                        inputSelectionMatricula = <IonInput disabled={isDisabled} value={this.matriculaValue} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value as string); }} key="matricula" id="matricula" name="matricula" placeholder="Matricula" className="matricula_select texto-alineado-derecha" ></IonInput>
                        seleccionModeloVehiculo = <IonInput disabled={isDisabled} value={this.modeloVehiculoValue} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value as string); }} key="vehiculos_" id="modeloVehiculo" name='vehiculos' className="vehiculos_select texto-alineado-derecha" placeholder="Modelo Vehiculo" ></IonInput>
                        listadoClaseVehiculo = <IonInput disabled={isDisabled} value={this.claseVehiculoValue} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="claseVehiculo_" id="claseVehiculo" name='clasevehiculo_' className="vehiculos_select texto-alineado-derecha" placeholder="Clase Vehiculo" ></IonInput>
                        
                    }
                    else
                    {
                        
                    }
                    
                }

            }
            else
            {
                
            }

            matriculaItem = 
                <IonItem>
                    {
                        (this.state.errores.matricula === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel  className="textofallo">Matricula</IonLabel></>
                            :
                            <IonLabel  className="">Matricula</IonLabel>
                    }
                    {inputSelectionMatricula}

                </IonItem>
            ;

            modeloVehiculoItem = <IonItem>
                {
                    (this.state.errores.modeloVehiculo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Modelo Vehiculo</IonLabel></>
                        :
                        <IonLabel className="">Modelo Vehiculo</IonLabel>
                }
                {seleccionModeloVehiculo}
            </IonItem>
            
            claseVehiculoItem = <IonItem>
                {
                    (this.state.errores.claseVehiculo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Clase</IonLabel></>
                        :
                        <IonLabel className="">Clase</IonLabel>
                }
                {listadoClaseVehiculo}
            </IonItem>
                ;

            flotaItem = 
                <IonItem>
                    {
                        (this.state.errores.flota === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Flotas</IonLabel></>
                            :
                            <IonLabel className="">Flotas</IonLabel>

                    }
                    <IonSelect disabled={isDisabled} value={flota} onIonChange={(evento) => { this.onChangeInputs(this.state, "flota", evento.detail.value as string); }} id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        {
                            props.listFlotas.map((elemento: IlistFlotas) => {
                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                            })
                        }
                    </IonSelect>
                </IonItem>
            ;

            numeroReservaItem =
                <IonItem>
                    <IonLabel className="">Numero Reserva</IonLabel>
                    <IonLabel className="">XXXXXXX</IonLabel>
                </IonItem>
            ;

            precioVuelacarItem =
                <IonItem>
                    <IonLabel  className="">Precio Vuelacar</IonLabel>
                    <IonInput disabled={isDisabled} className="texto-alineado-derecha" name='preciovuelacar' value={preciovuelacar} onIonChange={(evento) => { this.onChangeInputs(this.state, "preciovuelacar", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric" placeholder='Precio Vuelacar' ></IonInput>
                </IonItem>
            ;

            notaReservaItem = 
                <IonItem>
                    <IonLabel  className="">Nº Reserva externo</IonLabel>
                    <IonInput disabled={isDisabled} className="texto-alineado-derecha" name='notareserva' value={notareserva} onIonChange={(evento) => { this.onChangeInputs(this.state, "notareserva", evento.detail.value as string); }} placeholder="Nº Reserva externo"></IonInput>
                </IonItem>
            ;

            precioExternoItem = 
                <IonItem>
                    {
                        (this.state.errores.precioExterno === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel  className="textoFallo">Precio externo</IonLabel></>
                            :
                            <IonLabel  className="">Precio externo</IonLabel>

                    }
                    <IonInput disabled={isDisabled} className="texto-alineado-derecha" name='precioexterno' value={precioexterno} onIonChange={(evento) => { this.onChangeInputs(this.state, "precioexterno", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric" placeholder='Precio externo'></IonInput>
                </IonItem>
            ;

            extrasItem = 
                <IonItem>
                    <IonLabel  className="">Extras</IonLabel>
                    <IonInput disabled={isDisabled}  className="texto-alineado-derecha" name='extras' value={extras} onIonChange={(evento) => { this.onChangeInputs(this.state, "extras", evento.detail.value as string); }} placeholder="Extras" ></IonInput>
                </IonItem>
            ;
            
            estadoItem =
                <IonItem>
                    <IonLabel className="">Estado</IonLabel>
                    <IonSelect disabled={isDisabled} value={estado} onIonChange={(evento) => { this.onChangeInputs(this.state, "estado", evento.detail.value as string); }} id="estado" name='estado' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                        <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                        <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                        <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                    </IonSelect>
                </IonItem>
            ;

            if (props.isDoubleclickItem === true)
            {

                if (estado === ENUM_TIPOS_ESTADO.prereservado)
                {

                }
                else
                {
                    botonModificarItem = <div className='centrado-horizontal'>
                        <IonButton onClick={() => { this.activarModificar(); }} disabled={this.state.clickedModificar}>Modificar</IonButton>
                    </div>
                    ;

                }

            }
            
            if (state.modalState.estado === ENUM_TIPOS_ESTADO.reservado && props.isDoubleclickItem === true && (state.clickedModificar === false || state.clickedModificar === undefined))
            {
                botonGuardarItem = <></>;
            }

        }

        

        if (estado === ENUM_TIPOS_ESTADO.reservado && (flota === "v") && (state.clickedModificar === false || state.clickedModificar === undefined))
        {

            flotaItem = null;
            precioExternoItem = null;
            notaReservaItem = null;

            
        }



        return {
            id,
            group,
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
            modeloVehiculoItem,
            claseVehiculoItem,
            botonGuardarItem,
            botonModificarItem

        }

    }


    checkInputsWillBeDisabled(state: ContainerState)
    {

        let isDisabled = false;
        // if (this.props.isDoubleclickItem === true )
        // {
        //     isDisabled = true;
        // }

        if (state.modalState.reservaCompletada === true) {
            isDisabled = true;
        }

        if (state.clickedModificar === true) {
            isDisabled = false;
        }

        return isDisabled;

    }

}