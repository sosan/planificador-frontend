
import { IonModal, IonButton } from "@ionic/react";
import { Component, } from "react";
import { IngresarContrato } from "./IngresarContratoContainer";
import { ModificarContrato } from "../components/ModificarContratoContainer";
import { repoStorage } from "../interfaces/logicStorage";
import { IListadoPrereserva } from "../datos/vehiculosGeneral";
import { ContenidoModalDerecha } from "../components/ContenidoDerecha";


import "../css/ModalContratos.css";
import { IlistColaborators } from "../datos/listadoColaboradores";
import { IlistFlotas } from "../datos/listadoFlotas";
import { IModalErrores } from "./Modal";
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
    contenidoDerecha: any;
    errores: IModalErrores;
}

enum TIPO_RESERVA
{
    "vuelacar" = "vuelacar",
    "exterior" = "exterior",
}


export class ModalDialogContratos extends Component<ContainerProps, ContainerState>
{
    
    reservasVuelaCarFiltrado: any | null = null;
    reservasExteriorFiltrado: any | null = null;
    contenidoDerecha: any | null = null;
    
    listadoClaseVehiculos: string[] | null = null;
    listadoModelosVehiculos: string[] | null = null;
    listadoColaboradores: IlistColaborators[] | null = null;
    listadoFlotas: IlistFlotas[] | null = null;
    dataCars: any;

    constructor(props: any)
    {
        super(props);
        this.setState({ "dummy": false });
    }

    
    async componentDidMount() {
        console.log("schedulergrid montado");
        await this.init();

    }

    async init()
    {
        const itemsReservasVuelaCar = await repoStorage.getItemsReservasVuelaCar();
        const itemsReservasExterior = await repoStorage.getItemsReservasExterior();

        this.reservasVuelaCarFiltrado = await this.filtrarItemsPorTieneContrato(itemsReservasVuelaCar, "secondary", TIPO_RESERVA.vuelacar);
        this.reservasExteriorFiltrado = await this.filtrarItemsPorTieneContrato(itemsReservasExterior, "warning", TIPO_RESERVA.exterior);

        this.listadoClaseVehiculos = await repoStorage.getlistadoClasesVehiculos();
        this.listadoModelosVehiculos = await repoStorage.getlistadoModelosVehiculos();
        this.listadoColaboradores = await repoStorage.getListadoColaboradores();
        this.listadoFlotas = await repoStorage.getListadoFlotas();

        this.setState({"dummy": false });
    }

    async clickedBoton(_id: number, tipoReserva: string)
    {

        let reservaRaw: IListadoPrereserva | null = null;
        if (tipoReserva === TIPO_RESERVA.vuelacar)
        {
            reservaRaw = await repoStorage.getReservaVuelaCar(_id);

        }

        if (tipoReserva === TIPO_RESERVA.exterior)
        {
            reservaRaw = await repoStorage.getReservaExterior(_id);

        }
        
       

        this.contenidoDerecha = <>
            <ContenidoModalDerecha 
                dataReserva={reservaRaw} 
                listadoClaseVehiculos={this.listadoClaseVehiculos}
                listadoModelosVehiculos={this.listadoModelosVehiculos}
                dataCars={this.dataCars}
                listColaborators={this.listadoColaboradores}
                listFlotas={this.listadoFlotas}
                errores={this.state.errores}
            
            />
        </>;
        this.setState({ "dummy": true });

    }

    async filtrarItemsPorTieneContrato(reservas: IListadoPrereserva[], colorTexto:string, tipoReserva: string )
    {

        let reservasVuelaCarFiltrado: any = [];
        for (let i = 0; i < reservas.length; i++) 
        {
            if (reservas[i].modalState.hasContract === false) 
            {
                const fechaRecogida = new Date(reservas[i].start_time as number);
                const fechaDevolucion = new Date(reservas[i].end_time as number);

                reservasVuelaCarFiltrado.push(
                    
                    <div key={i}>
                        <IonButton expand="block" type="button" onClick={() => { this.clickedBoton(reservas[i].modalState.id as number, tipoReserva); }} className="boton-vuelacarFiltrado" color={colorTexto}>
                            <span className="texto-boton-centrado">
                                <h2 className="texto-negro fuente-boton-modal-contratos">MATRICULA: {reservas[i].modalState.matricula}</h2>
                                <h3 className="texto-negro fuente-boton-modal-contratos">FECHA RECOGIDA: {fechaRecogida.getDate()}-{fechaRecogida.getMonth() + 1}-{fechaRecogida.getFullYear()}</h3>
                                <h3 className="texto-negro fuente-boton-modal-contratos">FECHA DEVOLUCION: {fechaDevolucion.getDate()}-{fechaDevolucion.getMonth() + 1}-{fechaDevolucion.getFullYear()}</h3>

                            </span>
                        </IonButton>
                    </div>
                
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
                    contenidoReserva={this.contenidoDerecha}
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