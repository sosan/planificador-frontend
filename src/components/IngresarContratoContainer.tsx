import { IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Component } from "react";
import { InputChangeEventDetail } from '@ionic/core';
import { IDataVehiculos } from "../datos/vehiculosGeneral";


interface ContainerProps {
    onClickedGenerateContract: any;
    
}
export interface ContainerState {
    "matricula": string;
    "fechaRecogida": Date;
}


export class IngresarContrato extends Component<ContainerProps, ContainerState>
{

    constructor(props: any)
    {
        super(props);
        
        this.state = {"matricula": "", "fechaRecogida": new Date() };

    }

    onChangeInputs(state: ContainerState, matricula: string, value: string)
    {

        this.setState({"matricula": value});

    }

    generarContratoReserva() {
        if (this.state.matricula === "") return;
        this.props.onClickedGenerateContract(this.state);
    }


    elegirFechaRecogida(evento: CustomEvent<InputChangeEventDetail>) {
        const _fechaRecogida = new Date(evento.detail.value as string);
        _fechaRecogida.setHours(0, 0, 0);
        
        this.setState({ "fechaRecogida": _fechaRecogida });

    }

    render()
    {

        let { matricula, fechaRecogida } = this.state;
        let textoFechaRecogida = fechaRecogida.toISOString();
        

        return (
            <>
                <IonList className="ancho_100">
                    <IonItem>
                        <IonLabel>Introducir la matricula</IonLabel>
                        <IonInput name='matricula' value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value as string); }}></IonInput>
                        
                        
                        {/* <IonSelect value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value); }} key="matricula" id="matricula" name='matricula' className="matricula_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                            {
                                this.props.dataCars.map((elemento: IDataCoches) => {
                                    if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() as string &&
                                        elemento.modelo.toLowerCase() === modeloVehiculo.toLowerCase() as string
                                    ) {
                                        return <IonSelectOption key={elemento.matricula} value={elemento.matricula}>{elemento.matricula}</IonSelectOption>;

                                    }
                                    return null;
                                })
                            }
                        </IonSelect> */}
                    </IonItem>
                    <IonItem>
                        <IonLabel>Introducir la fecha de Recogida</IonLabel>
                        <IonDatetime value={textoFechaRecogida} onIonChange={(evento) => { this.elegirFechaRecogida(evento); }} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar">
                        </IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={() => { this.generarContratoReserva();  } }>Generar contrato de la reserva
                        </IonButton>
                    </IonItem>
                </IonList>
                
            </>
        );

    }
    
    
}
