import { IonContent, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from "@ionic/react";
import { Component } from "react";
import * as categoriasManager from "../datos/listadoCategorias";

interface ContainerProps {
    
}
type ContainerState = {

}


export class MenuContratos extends Component<ContainerProps, ContainerState>
{

    GetListCategories(categorias: categoriasManager.IItemCategoria[])
    {

        const listado = [];
        for (const index in categorias) {
            const elemento = categorias[index];
            if (elemento.visibleInMenu === false) continue;

            listado.push(
                <div id="row" key={index} style={{ width: "200px" }}>
                    <IonCard href={elemento.url} className={`cursorclick noselect ${elemento.colorBackground}`} type={"button"} >
                        <IonImg src={elemento.image} />
                        <IonCardHeader>
                            <IonCardTitle className="tituloCard">{elemento.cardTitle}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="tituloCard">
                            {elemento.cardContent}
                            <IonButton className={`${elemento.colorBoton}`}>Siguiente &gt;</IonButton>
                        </IonCardContent>

                    </IonCard>

                </div>
            );

        }

        return listado;
    };

    listadoCategoria = this.GetListCategories(categoriasManager.categoriasContratos);


    render()
    {
        return (
            <>
                <IonContent>
                    <div className='centrado'>{this.listadoCategoria}</div>
                </IonContent>
            </>
        );

    }
}
