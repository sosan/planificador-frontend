import { IonContent, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from "@ionic/react";
import { Component } from "react";
import * as categoriasManager from "../datos/listadoCategorias";
import { IngresarContrato } from "../components/IngresarContratoContainer";
import { ModificarContrato } from "../components/ModificarContratoContainer";

interface ContainerProps {
    
}


interface ContainerState {
    ingresarVisible: boolean;
    modificarVisible: boolean;

}



export class MenuContratos extends Component<ContainerProps, ContainerState>
{


    ENUM_MENU_CONTRATOS = {
        "ingresar": categoriasManager.categoriasContratos[1].url as string,
        "modificar": categoriasManager.categoriasContratos[2].url as string,
    }

    constructor(props: any) {
        super(props);
        this.state = { "ingresarVisible": false, "modificarVisible": false };
        

        
    }

    onClickedCard(url: string)
    {

        let _modificarVisible = false;
        let _ingresarVisible = false;
        switch(url)
        {
            case this.ENUM_MENU_CONTRATOS.ingresar:
                _ingresarVisible = true;
            break;
                
            case this.ENUM_MENU_CONTRATOS.modificar:
                _modificarVisible = true;
            break;
                    
            default:
                this.setState({ "ingresarVisible": false, "modificarVisible": false });    
                return;
                    
        }
        
        this.setState({ "ingresarVisible": _ingresarVisible, "modificarVisible": _modificarVisible } );

    }
            
    GetListCategories(categorias: categoriasManager.IItemCategoria[])
    {

        const listado = [];
        for (const index in categorias) {
            const elemento = categorias[index];
            if (elemento.visibleInMenu === false) continue;

            listado.push(
                <div id="row" key={index} style={{ width: "200px" }}>
                    <IonCard onClick={() => { this.onClickedCard(elemento.url as string) }  }  className={`cursorclick noselect ${elemento.colorBackground}`} >
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

        let elementoHtml = <></>;
        if (this.state.ingresarVisible === true)
        {
            elementoHtml = <IngresarContrato />
        }

        if (this.state.modificarVisible === true)
        {
            elementoHtml = <ModificarContrato />
        }

        return (
            <>
                <IonContent>
                    <div className='centrado'>{this.listadoCategoria}</div>
                    {elementoHtml}
                </IonContent>
            </>
        );

    }
}
