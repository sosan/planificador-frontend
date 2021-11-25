import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonContent,
    IonButton,
    IonImg,


} from '@ionic/react';



import * as categoriasManager from "./Categorias";


// declare var scheduler: any;

const DashboardContainer: any = () => {

    const clicked = async () => {
        console.log("clicked")

    };

// https://dhtmlx.com/blog/use-dhtmlx-scheduler-component-react-js-library-demo/

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

    const listadoPlaning = GetListCategories(categoriasManager.categoriasPlaning);
    const listadoContratos = GetListCategories(categoriasManager.categoriasContratos);
    const listadoFacturacion = GetListCategories(categoriasManager.categoriasFacturacion);
    // const listadoInformes = GetListCategories(categoriasManager.categoriasInformes);
    // const listadoMultas = GetListCategories(categoriasManager.categoriasMultas);

    

   

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


export default DashboardContainer;