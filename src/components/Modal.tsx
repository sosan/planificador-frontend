import { IonBackdrop, IonButton, IonCol, IonGrid, IonItem, IonList, IonModal, IonRow } from '@ionic/react';
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
                        <IonRow>
                            <IonCol size="8">
                                <p>This is modal content</p>
                            </IonCol>
                            <IonCol >
                                <IonButton onClick={() => {this.state.onCloseModal(); } }>Cerrar Modal</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonList className="ancho_100">
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