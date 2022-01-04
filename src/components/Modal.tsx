import { IonBackdrop, IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow } from '@ionic/react';
import React, { Component, useState } from 'react';
import "../css/Modal.css";

interface ContainerProps {
    isVisible: boolean;
    onCloseModal: any;
    onModalDidDismiss: any;
}
type ContainerState = {
    isVisible: boolean;
    onCloseModal: any;
}



export class ModalDialog extends Component<ContainerProps, ContainerState>
{

    constructor(props: any)
    {
        super(props);
        this.state = {
            "isVisible": this.props.isVisible,
            "onCloseModal": this.props.onCloseModal,
        };

        console.log("dentro de ==> despues estado isvisible" + this.state.isVisible);
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
                    // cssClass='modal_general'
                >
                    <IonGrid className="grid_cabecera">
                        <IonRow className="centradovertical">
                            <IonCol size="8">
                                <h1>Rellenar Reserva</h1>
                            </IonCol>
                            <IonCol >
                                <IonButton onClick={() => {this.state.onCloseModal(); } }>Cerrar Modal</IonButton>
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
                                    <IonButton className="boton_ligthbox boton_menos_lightbox" fill='solid' size='large' shape="round"  color="#3a7202">-</IonButton>
                                    <IonInput className="input_numero_dias" name='numerodias' value={3} type='number' min='1' max='99999' autocomplete="off"  />
                                    <IonButton className="boton_ligthbox boton_mas_lightbox">+</IonButton>
                                </IonItem>
                                <IonItem>
                                    123
                                </IonItem>
                                <IonItem>
                                    123
                                </IonItem>
                                <IonItem>
                                    123
                                </IonItem>
                                <IonItem>
                                    123
                                </IonItem>
                            </IonList>
                        </IonRow>
                    </IonGrid>
                </IonModal>
            </>
            
        );

    }

}