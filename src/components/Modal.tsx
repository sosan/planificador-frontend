import { Component } from 'react';
import { IonButton,
    IonCol,
    IonDatetime,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonRow,
    IonSelect,
    IonSelectOption 
} from '@ionic/react';

import { IlistColaborators }  from "../datos/listadoColaboradores";
import { IDataCoches, DEFAULT_TEXT_MATRICULA } from "../datos/coches";
import { IlistFlotas } from "../datos/listadoFlotas";
import "../css/Modal.css";
import { InputChangeEventDetail } from '@ionic/core';

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
    textoFechaDevolucionVisible?: boolean;

    isNewRegister: boolean;
    

}

interface ContainerProps {
    onCloseModal: any;
    onModalDidDismiss: any;
    onSaveData: any;
    isVisible: boolean;
    dataCars: IDataCoches[];
    listColaborators: IlistColaborators[];
    listFlotas: IlistFlotas[];
    tiempoClick: any;
    dataCarsVisible: boolean;
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];
    isDoubleclickItem: boolean;
    modalState: IModalState;

}
export type ContainerState = {
    isVisible?: boolean;
    tiempoClick?: any;
    modalState: IModalState;
    isDoubleclickItem: boolean;
    modalReservasVisible: boolean;
    
}

export enum ENUM_TIPOS_ESTADO {
    "none" = "none",
    "prereservado" = "prereservado",
    "reservado" = "reservado",
    "prepagado" = "prepagado",
    "100pagado" = "100pagado",
    "length" = 4,
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

        },
        "isDoubleclickItem": false,
        "modalReservasVisible": false,
        

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
                "isNewRegister": false,

            },
            "isDoubleclickItem": false,
            "modalReservasVisible": false,
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
        // this.setState({ "modalState":
        // { 
        //     "cantidadDias": dias,
        //     "textoFechaDevolucionVisible": true,
        //     "fechaRecogida": fechaRecogida,
        //     "fechaDevolucion": fechaDevolucion,
        // }});
    }

    onChangeInputs(currentState: ContainerState, key: string, value: string)
    {
        const estado: ContainerState = currentState;
        estado["modalState"][key] = value as string;
        this.setState({ ...estado });

    }


    saveProps(state: ContainerState, _idModal: number, groupId: number, valoresFormulario: any)
    {
        
        //TODO: realizar mas comprobaciones de si todos los campos estan rellenados
        /// ....
        if (state.modalState.modeloVehiculo === "" ||
            state.modalState.claseVehiculo === "" ||
            state.modalState.fechaRecogida === undefined ||
            state.modalState.fechaRecogida.toString() === "Invalid Date" ||
            state.modalState.fechaDevolucion?.toString()=== "Invalid Date"

        ) {
            return;
        }

        if (state.modalState.matricula === DEFAULT_TEXT_MATRICULA && state.modalState.estado === ENUM_TIPOS_ESTADO.reservado)
        {
            return;

        }
        // quizas valoresFormulario podemos borrarlo
        const isSaved = this.props.onSaveData(state, _idModal, groupId, valoresFormulario);
        
    }

    //de props a state
    static getDerivedStateFromProps(newProps: ContainerProps, newState: ContainerState) {

        // console.log("getderived newState.newprops=" + newProps + " newState.state" + newState);
        if (newProps.modalState.isNewRegister === true)
        {
            newState["modalState"] = {...newProps["modalState"]};
            newState["modalState"]["isReseting"] = false;
            newState.modalState.isNewRegister = false;
        }

        if (newProps.isDoubleclickItem === true)
        {
            // if (newState.modalState.fechaAlta === undefined) /// primera ronda
            if (newState.modalState.isNewRegister === true) /// primera ronda
            {
                newState["modalState"] = {...newProps["modalState"]};
                newState["isDoubleclickItem"] = false;
                newState.modalState.isNewRegister = false;
    
            }
        }
            
        return newState;

    }


    render() {

        // if (this.state.modalState.isReseting === true) return;

        let {
            id,
            group,
            fechaAlta = undefined,
            fechaRecogida,
            notaReserva = "",
            claseVehiculo = "",
            colaborador,
            modeloVehiculo = "",
            cantidadDias = 3,
            matricula = "No asignada",
            flota,
            estado = "prereservado",
            textoFechaDevolucion = ""

        } = this.state.modalState;
        
        let textoFechaRecogida = "";
        let fechaAltaDate = new Date();
    
        if (fechaAlta === undefined ) // creado desde 0
        {
            textoFechaRecogida = "";
            if (fechaRecogida !== undefined)
            {
                textoFechaRecogida = fechaRecogida.toISOString();

                const fechaRecogidaTempo = new Date(fechaRecogida );
                const fechaDevolucion = new Date(fechaRecogidaTempo.setDate(fechaRecogidaTempo.getDate() + (this.state.modalState.cantidadDias as number - 1)));
                textoFechaDevolucion = `${fechaDevolucion.getDate().toString().padStart(2, "00")}-${(fechaDevolucion.getMonth() + 1).toString().padStart(2, "00")}-${fechaDevolucion.getFullYear()}`;

            }
        }
        else // leyendo desde datos
        {
            // if (fechaAlta !== "")
            // {
                fechaAltaDate = new Date(fechaAlta as string);

            // }
        }
    

        const fechaAltaTexto = `${fechaAltaDate.getDate().toString().padStart(2, "00")}-${(fechaAltaDate.getMonth() + 1).toString().padStart(2, "00")}-${fechaAltaDate.getFullYear()} ${fechaAltaDate.getHours().toString().padStart(2, "00")}:${fechaAltaDate.getMinutes().toString().padStart(2, "00")}`;
        
        return(
            <>
                <IonModal onWillDismiss={async () => { this.props.onModalDidDismiss(); } }  isOpen={this.props.isVisible} >
                    <IonGrid className="grid_cabecera">
                        <IonRow className="centradovertical">
                            <IonCol size="8">
                                <h1>Rellenar Reserva</h1>
                                <span>Fecha alta: {fechaAltaTexto}</span>
                                
                            </IonCol>
                            <IonCol >
                                <IonButton onClick={() => { this.props.onCloseModal();  } }>Cerrar Modal</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonList className="ancho_100">
                                <IonItem>
                                    <IonLabel position='floating' className="">Nota de reserva</IonLabel>
                                    <IonInput name='notareserva' value={notaReserva} onIonChange={(evento) => { this.onChangeInputs(this.state, "notareserva", evento.detail.value as string); } }></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Matricula</IonLabel>
                                    {
                                        ((this.props.modalState.showItem === false || this.props.modalState.showItem === undefined)) ? <IonLabel className="">{this.state.modalState.matricula}</IonLabel>
                                        :
                                            <IonSelect value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value); }} key="matricula" id="matricula" name='matricula' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                {
                                                    this.props.dataCars.map((elemento: IDataCoches) => {
                                                        if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() as string && 
                                                            elemento.modelo.toLowerCase() === modeloVehiculo.toLowerCase() as string
                                                        )
                                                        {
                                                            return <IonSelectOption key={elemento.matricula} value={elemento.matricula}>{elemento.matricula}</IonSelectOption>;

                                                        }
                                                        return null;
                                                    })
                                                }
                                            </IonSelect>
                                    }
                                    
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Modelo Vehiculo</IonLabel>
                                    {
                                        (this.props.dataCarsVisible === false) ? <IonLabel className="">{modeloVehiculo}</IonLabel> :
                                            <IonSelect value={modeloVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value); }} key="vehiculos" id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                {
                                                    this.props.listadoModelosVehiculos.map((elemento: string) => {
                                                        return <IonSelectOption key={elemento.toLowerCase()} value={elemento.toLowerCase()}>{elemento}</IonSelectOption>;
                                                    })
                                                }
                                            </IonSelect>
                                            
                                    }
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Clase</IonLabel>
                                    <IonSelect value={claseVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="clase" id="clase" name='clase' className="clase_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listadoClaseVehiculos.map((elemento: string) => {
                                                return <IonSelectOption key={elemento.toLowerCase()} value={elemento.toLowerCase()}>{elemento}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Entrega</IonLabel>
                                    <IonLabel className="">
                                        <IonDatetime value={textoFechaRecogida} onIonChange={(evento) => { this.elegirFechaRecogida(evento); }} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar">
                                        </IonDatetime>
                                        {/* {
                                            (showtextoFechas === false)  
                                            // (this.props.dataCarsVisible === false) ? textoFechaRecogida :
                                        } */}
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonButton onClick={() => { this.restarDias(); }} className="boton_ligthbox boton_menos_lightbox" fill='solid' size='large' shape="round"  color="#ffffff">-</IonButton>
                                    <IonInput  onIonChange={(evento) => { this.onChangeInputNumeroDias(evento) }} className="input_numero_dias" name='numerodias' value={cantidadDias} type='number' min='1' max='99999' autocomplete="off" inputmode="numeric" />
                                    <IonButton onClick={() => { this.sumarDias(); }} className="boton_ligthbox boton_mas_lightbox" fill='solid' size='large' shape="round" color="#ffffff">+</IonButton>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Devolucion</IonLabel>
                                    <IonLabel className="">{textoFechaDevolucion}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Colaboradores</IonLabel>
                                    <IonSelect value={colaborador} onIonChange={(evento) => { this.onChangeInputs(this.state, "colaborador", evento.detail.value as string); }} key="colaboradores" id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listColaborators.map((elemento: IlistColaborators) => {
                                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                
                                <IonItem>
                                    <IonLabel className="">Estado</IonLabel>
                                    <IonSelect value={estado} onIonChange={(evento) => { this.onChangeInputs(this.state, "estado", evento.detail.value as string); }} id="estado" name='estado' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                                        <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                                        <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                                        <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                {
                                    (this.props.modalState.textoFechaDevolucionVisible === false) ? null
                                    :
                                        <IonItem>
                                            <IonLabel className="">Flotas externas</IonLabel>
                                            <IonSelect value={flota} onIonChange={(evento) => { this.onChangeInputs(this.state, "flota", evento.detail.value as string); }} id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                {
                                                    this.props.listFlotas.map((elemento: IlistFlotas) => {
                                                        return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                                    })
                                                }
                                            </IonSelect>
                                        </IonItem>

                                }
                            </IonList>
                        </IonRow>
                        <IonRow className="centradovertical">
                            <IonCol size="6">
                                <IonButton onClick={() => { this.props.onCloseModal(); }}>Cerrar Modal</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton onClick={
                                    () => {
                                        const valoresFormulario = {
                                            fechaRecogida,
                                            notaReserva,
                                            claseVehiculo,
                                            colaborador,
                                            modeloVehiculo,
                                            cantidadDias,
                                            matricula,
                                            flota,
                                            estado,
                                        };
                                        this.saveProps(this.state,
                                            this.props.modalState.id as number,
                                            this.props.modalState.group as number,
                                            valoresFormulario
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

}