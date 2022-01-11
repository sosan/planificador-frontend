import { Component, useState } from 'react';
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
import { IDataCoches } from "../datos/coches";
import { IlistFlotas } from "../datos/listadoFlotas";
import "../css/Modal.css";
import { InputChangeEventDetail } from '@ionic/core';

interface ContainerProps {
    onCloseModal: any;
    onModalDidDismiss: any;
    onSaveData: any;
    isVisible: boolean;
    dataCars: IDataCoches[];
    listColaborators: IlistColaborators[];
    listFlotas: IlistFlotas[];
    tiempoClick: any;
    matricula?: string;
    vehiculo?: string;
    cantidadDias: number;
    dataCarsVisible: boolean;
    textoFechaDevolucionVisible: boolean;
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];
    notaReserva: string;
    showItem: boolean;
    fechaAlta?: string;
    fechaRecogida?: Date;
    fechaDevolucion?: Date;
    modeloVehiculo?: string;
    claseVehiculo?: string;
    colaborador?: string;
    flota?: string;
    estado?: string;


}
export type ContainerState = {
    isVisible?: boolean;
    tiempoClick?: any;
    cantidadDias: number;
    textoFechaDevolucionVisible?: boolean;
    notareserva: string;
    fechaRecogida?: Date;
    fechaDevolucion?: Date;
    matricula?: string;
    modeloVehiculo?: string;
    claseVehiculo?: string;
    estado?: string;
    colaborador?: string;
    flota?: string;
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
            "textoFechaDevolucionVisible": this.props.textoFechaDevolucionVisible,
            "notareserva": this.props.notaReserva,
            "modeloVehiculo": this.props.modeloVehiculo,
            "claseVehiculo": this.props.claseVehiculo,
            "fechaDevolucion": this.props.fechaDevolucion,
            "fechaRecogida": this.props.fechaRecogida,
            "estado": this.props.estado,
            "colaborador": this.props.colaborador,
            "flota": this.props.flota,

        };

        // console.log("this.props.textoFechaDevolucionVisible" + this.props.textoFechaDevolucionVisible);
        // console.log("this.state.textoFechaDevolucionVisible" + this.state.textoFechaDevolucionVisible);

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
        // console.log("elegirfecharecogida textoFechaDevolucionVisible" + this.state.textoFechaDevolucionVisible);
        const fechaRecogida = new Date(evento.detail.value as string);
        const fechaRecogidaTemp = new Date(fechaRecogida);
        const fechaDevolucion = new Date(fechaRecogidaTemp.setDate(fechaRecogidaTemp.getDate() + (this.state.cantidadDias - 1)));

        this.setState(
        { 
            "cantidadDias": 3, 
            "textoFechaDevolucionVisible": true,
            "fechaRecogida": fechaRecogida,
            "fechaDevolucion": fechaDevolucion
        });
    }

    onChangeInputNumeroDias(evento: CustomEvent<InputChangeEventDetail>)
    {
        const dias = parseInt( evento.detail.value as string) ;
        const fechaRecogida = new Date(this.state.fechaRecogida as Date);
        const fechaRecogidaTemp = new Date(fechaRecogida);
        const fechaDevolucion = new Date(fechaRecogidaTemp.setDate(fechaRecogidaTemp.getDate() + (dias - 1)));

        this.setState(
        { 
            "cantidadDias": dias,
            "textoFechaDevolucionVisible": true,
            "fechaRecogida": fechaRecogida,
            "fechaDevolucion": fechaDevolucion,
        });
    }




    render() {

        let fechaAhora, fechaRecogida, notaReserva ;

        if (this.props.showItem === true)
        {
            
            fechaAhora = new Date(this.props.fechaAlta as string);
            fechaRecogida = new Date(this.props.fechaRecogida as Date);
        }
        else
        {
            fechaAhora = new Date();
            fechaRecogida = new Date(this.props.tiempoClick);
            
        }
        
        notaReserva = this.state.notareserva;
        const fechaAlta = `${fechaAhora.getDate().toString().padStart(2, "00")}-${(fechaAhora.getMonth() + 1).toString().padStart(2, "00")}-${fechaAhora.getFullYear()} ${fechaAhora.getHours().toString().padStart(2, "00")}:${fechaAhora.getMinutes().toString().padStart(2, "00")}`;
        const textoFechaRecogida = `${fechaRecogida.getDate().toString().padStart(2, "00")}-${(fechaRecogida.getMonth() + 1).toString().padStart(2, "00")}-${fechaRecogida.getFullYear()}`;

        const fechaDevolucion = new Date( fechaRecogida.setDate(fechaRecogida.getDate() + (this.state.cantidadDias - 1) ));
        let textoFechaDevolucion = "";
        if (this.props.textoFechaDevolucionVisible === true || this.state.textoFechaDevolucionVisible === true)
        {
            textoFechaDevolucion = `${fechaDevolucion.getDate().toString().padStart(2, "00")}-${(fechaDevolucion.getMonth() + 1).toString().padStart(2, "00")}-${fechaDevolucion.getFullYear()}`;
        }

        return(
            <>
                <IonModal onWillDismiss={  async () => {this.props.onModalDidDismiss()} }  isOpen={this.props.isVisible} >
                    <IonGrid className="grid_cabecera">
                        <IonRow className="centradovertical">
                            <IonCol size="8">
                                <h1>Rellenar Reserva</h1>
                                <span>Fecha alta: {fechaAlta}</span>
                            </IonCol>
                            <IonCol >
                                <IonButton onClick={() => {this.props.onCloseModal(); } }>Cerrar Modal</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonList className="ancho_100">
                                <IonItem>
                                    <IonLabel position='floating' className="">Nota de reserva</IonLabel>
                                    <IonInput name='notareserva' value={notaReserva} onIonChange={ (evento) => { this.setState({"notareserva": evento.detail.value as string }); } }></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Matricula</IonLabel>
                                    {
                                        (this.props.showItem === false) ? <IonLabel className="">{this.state.matricula}</IonLabel>
                                        :
                                            <IonSelect value={this.state.matricula} onIonChange={(evento) => { this.setState({ "matricula": evento.detail.value as string }); }} key="matricula" id="matricula" name='matricula' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                {
                                                    this.props.dataCars.map((elemento: IDataCoches) => {
                                                        if (elemento.clasevehiculo.toLowerCase() === this.state.claseVehiculo?.toLowerCase() && 
                                                            elemento.modelo.toLowerCase() === this.state.modeloVehiculo?.toLowerCase()
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
                                        (this.props.dataCarsVisible === false) ? <IonLabel className="">{this.state.modeloVehiculo}</IonLabel> :
                                            <IonSelect value={this.state.modeloVehiculo} onIonChange={(evento) => { this.setState({ "modeloVehiculo": evento.detail.value as string }); }} key="vehiculos" id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
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
                                    <IonSelect value={this.state.claseVehiculo} onIonChange={(evento) => { this.setState({ "claseVehiculo": evento.detail.value as string }); }} key="clase" id="clase" name='clase' className="clase_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
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
                                        {
                                            (this.props.dataCarsVisible === false) ? textoFechaRecogida :
                                                <IonDatetime  onIonChange={(evento) => { this.elegirFechaRecogida(evento) }} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar">
                                                </IonDatetime>

                                            
                                        }
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonButton onClick={() => { this.restarDias(); }} className="boton_ligthbox boton_menos_lightbox" fill='solid' size='large' shape="round"  color="#ffffff">-</IonButton>
                                    <IonInput onIonChange={(evento) => { this.onChangeInputNumeroDias(evento) }} className="input_numero_dias" name='numerodias' value={this.state.cantidadDias} type='number' min='1' max='99999' autocomplete="off" inputmode="numeric" />
                                    <IonButton onClick={() => { this.sumarDias(); }} className="boton_ligthbox boton_mas_lightbox" fill='solid' size='large' shape="round" color="#ffffff">+</IonButton>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Devolucion</IonLabel>
                                    <IonLabel className="">{textoFechaDevolucion}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Colaboradores</IonLabel>
                                    <IonSelect onIonChange={(evento) => { this.setState({ "colaborador": evento.detail.value as string }); }} key="colaboradores" id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listColaborators.map((elemento: IlistColaborators) => {
                                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                
                                <IonItem>
                                    <IonLabel className="">Estado</IonLabel>
                                        {
                                            (this.props.textoFechaDevolucionVisible === false) ? 
                                            <IonSelect onIonChange={(evento) => { this.setState({ "estado": evento.detail.value as string }); }} id="status" name='status' value="prereservado" className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                    <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                                                    <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                                                    <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                                                    <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                                                </IonSelect>
                                            :
                                            <IonSelect onIonChange={(evento) => { this.setState({ "estado": evento.detail.value as string }); }} id="status" name='status' value="" className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                                    <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                                                    <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                                                    <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                                                    <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                                                </IonSelect>
                                            
                                        }
                                </IonItem>
                                {
                                    (this.props.textoFechaDevolucionVisible === false) ? null
                                    :
                                        <IonItem>
                                            <IonLabel className="">Flotas externas</IonLabel>
                                            <IonSelect onIonChange={(evento) => { this.setState({ "flota": evento.detail.value as string }); }}id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
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
                                <IonButton onClick={() => { this.props.onSaveData(this.state); }}>Guardar Datos</IonButton>
                            </IonCol>
                        </IonRow>

                    </IonGrid>
                </IonModal>
            </>
            
        );

    }

}