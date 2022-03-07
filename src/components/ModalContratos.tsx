
import { IonModal, IonGrid, IonItem, IonLabel, IonButton } from "@ionic/react";
import { Component, } from "react";
import { IngresarContrato } from "./IngresarContratoContainer";
import { ModificarContrato } from "../components/ModificarContratoContainer";
import { ContainerState as IContainerIngresarContrato } from "../components/IngresarContratoContainer";
import "../css/ModalContratos.css";
import { repoStorage } from "../interfaces/logicStorage";
import { IListadoPrereserva } from "../datos/vehiculosGeneral";

interface ContainerProps
{
    onModalDidDismiss: any;
    isVisible: boolean;
    ingresarVisible: boolean;
    modificarVisible: boolean;
    onClickedGenerateContract: any;

}

interface ContainerState
{
    dummy: boolean;
}



export class ModalDialog extends Component<ContainerProps, ContainerState>
{

    reservasVuelaCarFiltrado: any | null = null;
    reservasExteriorFiltrado: any | null = null;

    constructor(props: any)
    {
        super(props);
        this.setState({ "dummy": false });
    }

    // onClickedGenerateContract(state: IContainerIngresarContrato) {
    //     console.log("adsfasdf");

    // }

    async componentDidMount() {
        console.log("schedulergrid montado");
        await this.init();

    }

    async init()
    {
        const itemsReservasVuelaCar = await repoStorage.getItemsReservasVuelaCar();
        const itemsReservasExterior = await repoStorage.getItemsReservasExterior();

        this.reservasVuelaCarFiltrado = await this.filtrarItemsPorTieneContrato(itemsReservasVuelaCar);
        this.reservasExteriorFiltrado = await this.filtrarItemsPorTieneContrato(itemsReservasExterior);

        this.setState({"dummy": false });
    }


    async filtrarItemsPorTieneContrato(reservas: IListadoPrereserva[] )
    {

        let reservasVuelaCarFiltrado: any = [];
        for (let i = 0; i < reservas.length; i++) 
        {
            if (reservas[i].modalState.hasContract === false) 
            {
                const fechaRecogida = new Date(reservas[i].start_time as number);
                const fechaDevolucion = new Date(reservas[i].end_time as number);

                reservasVuelaCarFiltrado.push(
                    <IonButton>
                        <IonItem key={i}>
                            <IonLabel>
                                <h2 className="texto-negro">{reservas[i].modalState.matricula}</h2>
                                <h3 className="texto-negro">{fechaRecogida.getDate()}-{fechaRecogida.getMonth() + 1}-{fechaRecogida.getFullYear()}</h3>
                                <h3 className="texto-negro">{fechaDevolucion.getDate()}-{fechaDevolucion.getMonth() + 1}-{fechaDevolucion.getFullYear()}</h3>
                            </IonLabel>
                        </IonItem>
                    </IonButton>
                );

            }


        }
        return reservasVuelaCarFiltrado;
    }

    render()
    {

        const {ingresarVisible, modificarVisible} = this.props;
        let elementoHtml = <></>
        if (ingresarVisible === true)
        {
            
            elementoHtml = 
            <>
                <IngresarContrato 
                    onClickedGenerateContract={this.props.onClickedGenerateContract }
                    dataReservasVuelaCar={this.reservasVuelaCarFiltrado}
                    dataReservasExterior={this.reservasExteriorFiltrado}
                />
            </>
        }

        if (modificarVisible === true)
        {

            elementoHtml =
                <>
                    <ModificarContrato  />      
                </>
        }

        return(
            <>
                <IonModal isOpen={this.props.isVisible} animated={true}
                    onWillDismiss={async () => { this.props.onModalDidDismiss(); }} 
                >
                    {elementoHtml}
                </IonModal>
            </>
        );
    }

}