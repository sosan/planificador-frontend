import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonButton,
    IonImg,


} from '@ionic/react';
import * as categoriasManager from "../datos/listadoCategorias";


const DashboardContainer: any = () => {

    // const clicked = async () => {
    //     console.log("clicked")

    // };

    const GetListCategories = (categorias: categoriasManager.IItemCategoria[]) => {

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

        return listadoCategorias;
    };

    const listadoDashboard = GetListCategories(categoriasManager.categoriasDashboard);

    return (
        <>
            <IonContent>
                <div className='centrado'>{listadoDashboard}</div>
            </IonContent>
        </>    
        
    );


};


export default DashboardContainer;