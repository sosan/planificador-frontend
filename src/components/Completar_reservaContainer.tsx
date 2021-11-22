import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonButton,
    IonImg,


} from '@ionic/react';
import React from 'react';

import {
    IItemCategoria,
    categoriasContratos,
    categoriasInformes,
    categoriasFacturacion,
    categoriasMultas,
    categoriasPlaning
} from "./Categorias";


const Completar_reservaContainer: React.FC = () => {

    const clicked = async () => {
        console.log("clicked")

    };

    const GetListCategories = (categorias: IItemCategoria[]) => {

        const listadoCategorias = [];
        for (const index in categorias) {
            const elemento = categorias[index];
            // console.log("index=" + index + "listado=" + elemento);

            listadoCategorias.push(
                <div id="row" key={index} style={{ width: "200px" }}>
                    <IonCard className={`cursorclick noselect ${elemento.colorBackground}`} type={"button"} onClick={() => { clicked(); }}>
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

        return listadoCategorias;
    };

    const listadoPlaning = GetListCategories(categoriasPlaning);
    const listadoContratos = GetListCategories(categoriasContratos);
    const listadoFacturacion = GetListCategories(categoriasFacturacion);
    const listadoInformes = GetListCategories(categoriasInformes);
    const listadoMultas = GetListCategories(categoriasMultas);


    return (
        <>
            <IonContent>
                <div className="centrado">{listadoPlaning}</div>
                <div className="centrado">{listadoContratos}</div>
                <div className="centrado">{listadoFacturacion}</div>
            </IonContent>
        </>
    );

    
    
};


export default Completar_reservaContainer;