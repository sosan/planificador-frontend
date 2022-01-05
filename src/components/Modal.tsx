import { IonBackdrop, IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import React, { Component, useState } from 'react';
import "../css/Modal.css";
import { IlistColaborators }  from "../datos/listadoColaboradores";
import { IDataCoches } from "../datos/coches";
import { IlistFlotas } from "../datos/listadoFlotas";

interface ContainerProps {
    isVisible: boolean;
    onCloseModal: any;
    onModalDidDismiss: any;
    dataCars: IDataCoches[];
    listColaborators: IlistColaborators[];
    listFlotas: IlistFlotas[];
}
type ContainerState = {
    isVisible: boolean;
    // onCloseModal: any;
}



export class ModalDialog extends Component<ContainerProps, ContainerState>
{

    htmlSelectionCars: any;

    constructor(props: any)
    {
        super(props);
        this.state = {
            "isVisible": this.props.isVisible,
            // "onCloseModal": this.props.onCloseModal,
        };

        console.log("dentro de ==> despues estado isvisible" + this.state.isVisible);

        
        // this.htmlSelectionCars: any;
        for (let i = 0; i < this.props.dataCars.length; i++) {

            // console.log("i=" + i + this.props.dataCars[i].vehiculo);
            // this.htmlSelectionCars += 
            //     <IonSelectOption value={this.props.dataCars[i].vehiculo}>${this.props.dataCars[i].descripcion}</IonSelectOption>
            // ;
            // console.log("htmlselc=" +  JSON.stringify(this.htmlSelectionCars));

        }


    }

    componentDidMount()
    {
        // this.setState( {
        //     "isVisible": this.props.isVisible,
        // });
    }

   

    componentDidUpdate()
    {

        // console.log("this.state.isvisible" + this.state.isVisible);
    }

    

    render() {
        
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
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonButton className="boton_ligthbox boton_menos_lightbox" fill='solid' size='large' shape="round"  color="#ffffff">-</IonButton>
                                    <IonInput className="input_numero_dias" name='numerodias' value={3} type='number' min='1' max='99999' autocomplete="off"  />
                                    <IonButton className="boton_ligthbox boton_mas_lightbox" fill='solid' size='large' shape="round" color="#ffffff">+</IonButton>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Estado</IonLabel>
                                    <IonSelect id="status" name='status' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        <IonSelectOption value={"reservado"} >Reservado</IonSelectOption>
                                        <IonSelectOption value={"prepagado"}>Prepagado</IonSelectOption>
                                        <IonSelectOption value={"100pagado"}>100% Pagado</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Vehiculos</IonLabel>
                                    <IonSelect id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.dataCars.map( (elemento: any) => {
                                                return <IonSelectOption key={elemento.vehiculo} value={elemento.vehiculo}>{elemento.descripcion}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Colaboradores</IonLabel>
                                    <IonSelect id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
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