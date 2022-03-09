import { IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from "@ionic/react";
import { Component, } from "react";

interface ContainerState
{

}

interface ContainerProps
{

}


export class FlotaManager extends Component<ContainerProps, ContainerState>
{

    constructor(props: any)
    {
        super(props)
    }

    render() {
        return(
            <div>
                <div id="row" key="insertar-vehiculo" style={{ width: "200px" }}>
                    <IonCard href="/insertar-vehiculo" className="" type="button" >
                        <IonImg src="" />
                        <IonCardHeader>
                            <IonCardTitle className="tituloCard">INSERTAR VEHICULO</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="tituloCard">
                            Dar de alta vehiculos
                            <IonButton className="">Siguiente &gt;</IonButton>
                        </IonCardContent>

                    </IonCard>

                    <div id="row" key="borrar-vehiculo" style={{ width: "200px" }}>
                        <IonCard href="/borrar-vehiculo" className="" type="button" >
                            <IonImg src="" />
                            <IonCardHeader>
                                <IonCardTitle className="tituloCard">DAR DE BAJA VEHICULO</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className="tituloCard">
                                Dar de baja los vehiculos
                                <IonButton className="">Siguiente &gt;</IonButton>
                            </IonCardContent>

                        </IonCard>

                    </div>

                    <div id="row" key="borrar-vehiculo" style={{ width: "200px" }}>
                        <IonCard href="/reordenar-clasificacion" className="" type="button" >
                            <IonImg src="" />
                            <IonCardHeader>
                                <IonCardTitle className="tituloCard">REORDENAR CLASIFICACION VEHICULOS</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className="tituloCard">
                                Reordenar clasificacion de los vehiculos en el planning
                                <IonButton className="">Siguiente &gt;</IonButton>
                            </IonCardContent>

                        </IonCard>

                    </div>
                </div>
            </div>
        );
    }

}