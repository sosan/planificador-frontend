import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonButton,
    IonImg,
    IonRoute


} from '@ionic/react';
import { Component,  } from 'react';
import { ContainerState } from '../components/Modal';
import * as categoriasManager from "../datos/listadoCategorias";

interface ContainerProps
{

}

export default class DashboardContainer extends Component<ContainerProps, ContainerState>
{

    listadoDashboard = this.GetListCategories(categoriasManager.categoriasDashboard);

    GetListCategories (categorias: categoriasManager.IItemCategoria[])
    {
    
        const listadoCategorias = [];
        for (const index in categorias) 
        {
            const elemento = categorias[index];
            // console.log("index=" + index + "listado=" + elemento);
    
            listadoCategorias.push(
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

        // listadoCategorias.push(
        //     <div id="row" key="flota-manager" style={{ width: "200px" }}>
        //         <IonCard href="/flota-manager" className="" type="button" >
        //             <IonImg src="" />
        //             <IonCardHeader>
        //                 <IonCardTitle className="tituloCard">FLOTA MANAGER</IonCardTitle>
        //             </IonCardHeader>
        //             <IonCardContent className="tituloCard">
        //                 Dar de Alta y Baja los vehiculos
        //                 <IonButton className="">Siguiente &gt;</IonButton>
        //             </IonCardContent>

        //         </IonCard>

        //     </div>

        // );



    
        return listadoCategorias;
    };
    
    
    
    render() {
        return (
            <>
                <IonContent>
                    <div className='centrado'>
                        {this.listadoDashboard}
                    </div>
                </IonContent>
            </>    
            
        );
        
    }


}