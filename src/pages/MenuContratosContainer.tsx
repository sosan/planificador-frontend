import { IonContent, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from "@ionic/react";
import { Component } from "react";
import * as categoriasManager from "../datos/listadoCategorias";
import { ContainerState as IContainerIngresarContrato  } from "../components/IngresarContratoContainer";
import { ModalDialog } from "../components/ModalContratos";

interface ContainerProps {
    
}


interface ContainerState {
    ingresarVisible: boolean;
    modificarVisible: boolean;
    modalVisible: boolean;

}



export class MenuContratos extends Component<ContainerProps, ContainerState>
{


    ENUM_MENU_CONTRATOS = {
        "ingresar": categoriasManager.categoriasContratos[1].url as string,
        "modificar": categoriasManager.categoriasContratos[2].url as string,
    }

    constructor(props: any) {
        super(props);
        this.state = { 
            "modalVisible": false, 
            "ingresarVisible": false, 
            "modificarVisible": false 
        };
        

        
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
        
        this.setState(
        {
            "modalVisible": !this.state.modalVisible,
            "ingresarVisible": _ingresarVisible,
            "modificarVisible": _modificarVisible 
        });

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


    onClickedGenerateContract(state: IContainerIngresarContrato)
    {
        console.log("adsfasdf");
        
    }

    onModalDidDismiss = () => {
        this.setState({ 
            "modalVisible": false,
            "ingresarVisible": false,
            "modificarVisible": false
        });
    }

    render()
    {


        return (
            <>
                <IonButton href='/page/Dashboard' className="boton-ultimo" fill='solid' color="#ffffff">Volver</IonButton>
                <IonContent>
                    <div className='centrado'>{this.listadoCategoria}</div>
                    <ModalDialog 
                        onModalDidDismiss={this.onModalDidDismiss} 
                        isVisible={this.state.modalVisible}
                        ingresarVisible={this.state.ingresarVisible}
                        modificarVisible={this.state.modificarVisible}
                        onClickedGenerateContract={this.onClickedGenerateContract}
                    />
                    
                    
                </IonContent>
            </>
        );

    }
}
