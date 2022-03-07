import { IonButton, IonDatetime, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption } from "@ionic/react";
import { Component } from "react";
import { IDataVehiculos } from "../datos/vehiculosGeneral";


interface ContainerProps {
    onClickedGenerateContract: any;
    dataReservasVuelaCar: any;
    dataReservasExterior: any;
    
}
export interface ContainerState {
    "matricula": string;
    "fechaRecogida": Date;
}


export class IngresarContrato extends Component<ContainerProps, ContainerState>
{

    items: any = [];

    constructor(props: any)
    {
        super(props);
        
        this.state = {"matricula": "", "fechaRecogida": new Date() };

    }

    render()
    {

        let { matricula, fechaRecogida } = this.state;
        let textoFechaRecogida = fechaRecogida.toISOString();
        
        // <IonListHeader> SUBALQUILERES </IonListHeader>
        const { dataReservasVuelaCar, dataReservasExterior } = this.props;

        return (

            <div className="grid-cabecera">
                        
                <div className="top30 grid-lateral ">
                    <IonListHeader> ALQUILERES </IonListHeader>
                    <div className="borde-solido">
                        <IonContent>
                            <IonList>
                                {
                                    dataReservasVuelaCar.map( (item: any, index: any) =>{
                                        return item;
                                    })
                                }
                            </IonList>
                        </IonContent>

                    </div>
                    <IonListHeader> SUB-ALQUILERES </IonListHeader>
                    <div className="borde-solido">
                        <IonContent>
                            <IonList>
                                {
                                    dataReservasExterior.map((item: any, index: any) => {
                                        return item;
                                    })
                                }
                            </IonList>
                            </IonContent>
                            {/* <IonInfiniteScroll threshold="200px" disabled={false} onIonInfinite={this.loadData}>
                                <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..." >
                                </IonInfiniteScrollContent>
                            </IonInfiniteScroll> */}

                    </div>




                </div>
                <div className="contenido">
                    CABECERA
                </div>
            

            </div>
        );

    }
    
    
}
