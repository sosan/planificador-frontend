import React, { Component, useState } from 'react';
import { IonButton,
    IonButtons,
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
import { IDataCoches } from "../datos/coches";
import { IlistFlotas } from "../datos/listadoFlotas";
import "../css/Modal.css";
import { InputChangeEventDetail } from '@ionic/core';

interface ContainerProps {
    isVisible: boolean;
    onCloseModal: any;
    onModalDidDismiss: any;
    dataCars: IDataCoches[];
    listColaborators: IlistColaborators[];
    listFlotas: IlistFlotas[];
    tiempoClick: any;
    matricula?: string;
    vehiculo?: string;
    cantidadDias: number;
    dataCarsVisible: boolean;
    textoFechaDevolucionVisible: boolean;

}
type ContainerState = {
    isVisible: boolean;
    tiempoClick?: any;
    cantidadDias: number;
    textoFechaDevolucionVisible: boolean;
}



export class ModalDialog extends Component<ContainerProps, ContainerState>
{

    customDatetime: any ;

    constructor(props: any)
    {
        super(props);
        this.state = {
            "isVisible": this.props.isVisible,
            "cantidadDias": this.props.cantidadDias || 3,
            "textoFechaDevolucionVisible": this.props.textoFechaDevolucionVisible
            
            
        };
        // this.customDatetime = useRef();
    }

    componentDidMount()
    {

        console.log("modal montado=" + this.state.tiempoClick  );
    }

   

    componentDidUpdate()
    {
        console.log("modal updated=" + this.props.tiempoClick );
        
    }
    
    static getDerivedStateFromProps(newProps: ContainerProps, newState: ContainerState) {
        
        if (newProps.isVisible === false)
        {
            return { "cantidadDias": 3 };

        }
        return { "cantidadDias": newState.cantidadDias };

    }


    restarDias()
    {

        let cantidadDias = this.state.cantidadDias;
        cantidadDias--;
        if (cantidadDias < 1)
        {
            cantidadDias = 1;
        }
        
        this.setState({"cantidadDias": cantidadDias });
    }

    sumarDias()
    {
        let cantidadDias = this.state.cantidadDias;
        cantidadDias++;
        this.setState({ "cantidadDias": cantidadDias });
        
    }

    elegirFechaRecogida(evento: CustomEvent<InputChangeEventDetail>)
    {
        // const dias = new Date(evento.detail.value.toString() as string );
        this.setState({"cantidadDias": 3, "textoFechaDevolucionVisible": true })
    }

    cambiarDias(evento: CustomEvent<InputChangeEventDetail>)
    {
        // console.log("eee=" + JSON.stringify(evento) + " detalle=" + evento.detail.value);
        const dias = parseInt( evento.detail.value as string) ;
        this.setState({ "cantidadDias": dias, "textoFechaDevolucionVisible": true });
    }

    confirm()
    {
        if (this.customDatetime === undefined) return;

        this.customDatetime.confirm();
    }

    reset()
    {
        if (this.customDatetime === undefined) return;

        this.customDatetime.reset();
    };

    render() {

        const fechaRecogida = new Date(this.props.tiempoClick);
        const textoFechaRecogida = `${fechaRecogida.getDate().toString().padStart(2, "00")}-${(fechaRecogida.getMonth() + 1).toString().padStart(2, "00")}-${fechaRecogida.getFullYear()}`;
        
        const fechaAhora = new Date();
        const textoFechaMinutos = `${fechaAhora.getDate().toString().padStart(2, "00")}-${(fechaAhora.getMonth() + 1).toString().padStart(2, "00")}-${fechaAhora.getFullYear()} ${fechaAhora.getHours().toString().padStart(2, "00")}:${fechaAhora.getMinutes().toString().padStart(2, "00")}`;

        const fechaDevolucion = new Date( fechaRecogida.setDate(fechaRecogida.getDate() + (this.state.cantidadDias - 1) ));
        let textoFechaDevolucion = "";
        if (this.props.textoFechaDevolucionVisible === true)
        {
            textoFechaDevolucion = `${fechaDevolucion.getDate().toString().padStart(2, "00")}-${(fechaDevolucion.getMonth() + 1).toString().padStart(2, "00")}-${fechaDevolucion.getFullYear()}`;;
        }


        return(
            <>
                <IonModal 
                    onWillDismiss={  async () => {this.props.onModalDidDismiss()} } 
                    isOpen={this.props.isVisible}
                >
                    <IonGrid className="grid_cabecera">
                        <IonRow className="centradovertical">
                            <IonCol size="8">
                                <h1>Rellenar Reserva</h1>
                                <span>Fecha alta: {textoFechaMinutos}</span>
                            </IonCol>
                            <IonCol >
                                <IonButton onClick={() => {this.props.onCloseModal(); } }>Cerrar Modal</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonList className="ancho_100">
                                <IonItem>
                                    <IonLabel position='floating' className="">Nota de reserva</IonLabel>
                                    <IonInput name='notareserva'></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Matricula</IonLabel>
                                    <IonLabel className="">{this.props.matricula}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Vehiculo</IonLabel>
                                    {
                                        (this.props.dataCarsVisible === false) ? <IonLabel className="">{this.props.vehiculo}</IonLabel> :
                                            <IonSelect key="vehiculos" id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                {
                                                    this.props.dataCars.map((elemento: any) => {
                                                        return <IonSelectOption key={elemento._id} value={elemento.vehiculo}>{elemento.descripcion}</IonSelectOption>;
                                                    })
                                                }
                                            </IonSelect>
                                            
                                    }
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Recogida</IonLabel>
                                    <IonLabel className="">
                                        {
                                            (this.props.dataCarsVisible === false) ? textoFechaRecogida :
                                                <IonDatetime ref={this.customDatetime}
                                                onIonChange={ (evento) => { this.elegirFechaRecogida(evento) }} 
                                                displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034">
                                                    <div slot="title">Elegir fecha recogida</div>
                                                    {/* <IonButtons slot="buttons">
                                                        <IonButton onClick={() => this.confirm()}>Good to go!</IonButton>
                                                        <IonButton onClick={() => this.reset()}>Reset</IonButton>
                                                    </IonButtons> */}
                                                </IonDatetime>

                                            
                                        }
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonButton onClick={() => { this.restarDias(); }} className="boton_ligthbox boton_menos_lightbox" fill='solid' size='large' shape="round"  color="#ffffff">-</IonButton>
                                    <IonInput onIonChange={(evento) => { this.cambiarDias(evento) }} className="input_numero_dias" name='numerodias' value={this.state.cantidadDias} type='number' min='1' max='99999' autocomplete="off" inputmode="numeric" />
                                    <IonButton onClick={() => { this.sumarDias(); }} className="boton_ligthbox boton_mas_lightbox" fill='solid' size='large' shape="round" color="#ffffff">+</IonButton>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Devolucion</IonLabel>
                                    <IonLabel className="">{textoFechaDevolucion}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Estado</IonLabel>
                                    <IonSelect id="status" name='status' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        <IonSelectOption value={"reservado"} >Reservado</IonSelectOption>
                                        <IonSelectOption value={"prepagado"}>Prepagado</IonSelectOption>
                                        <IonSelectOption value={"100pagado"}>100% Pagado</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                {/* <IonItem>
                                    <IonLabel className="">Vehiculos</IonLabel>
                                    <IonSelect key="vehiculos" id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.dataCars.map( (elemento: any) => {
                                                return <IonSelectOption key={elemento._id} value={elemento.vehiculo}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem> */}
                                <IonItem>
                                    <IonLabel className="">Colaboradores</IonLabel>
                                    <IonSelect key="colaboradores" id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listColaborators.map((elemento: IlistColaborators) => {
                                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Flotas externas</IonLabel>
                                    <IonSelect id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listFlotas.map((elemento: IlistFlotas) => {
                                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonRow>
                        <IonRow className="centradovertical">
                            <IonCol size="6">
                                <IonButton onClick={() => { this.props.onCloseModal(); }}>Cerrar Modal</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton onClick={() => { ; }}>Guardar Datos</IonButton>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonModal>
            </>
            
        );

    }

}