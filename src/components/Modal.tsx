import { IonBackdrop, IonButton, IonModal } from '@ionic/react';
import React, { Component, useState } from 'react';

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
                    cssClass='my-custom-class'
                >
                    <p>This is modal content</p>
                    <IonButton onClick={() => {this.state.onCloseModal(); } }>Cerrar Modal</IonButton>
                </IonModal>
            </>
            
        );

    }

}