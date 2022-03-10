import { IonContent, IonGrid, IonRow, IonInput, IonLabel, IonCol, IonList, IonItem, IonDatetime, IonSelect, IonSelectOption, IonImg, IonButton } from "@ionic/react";
import { Component } from "react";
import { IlistColaborators } from "../datos/listadoColaboradores";
import { IlistFlotas } from "../datos/listadoFlotas";
import { IDataVehiculos, IListadoPrereserva } from "../datos/vehiculosGeneral";
import { IModalState } from "./Modal";
import imagenFallo from "../images/error_checkbox.svg";
import { InputChangeEventDetail } from '@ionic/core';
import { listadoDias} from "../components/Modal";

interface ContainerState
{
    dataReserva: IListadoPrereserva | null;
    errores?: IModalErrores;
}

interface ContainerProps
{
    dataReserva: IListadoPrereserva | null;
    errores?: IModalErrores;

    dataCars: IDataVehiculos[];
    listColaborators: IlistColaborators[] | null;
    listFlotas: IlistFlotas[] | null;

    listadoClaseVehiculos: string[] | null;
    listadoModelosVehiculos: string[] | null;

}

interface IModalErrores {
    [index: string]: any;
    colaborador: boolean;
    claseVehiculo: boolean;
    modeloVehiculo: boolean;
    matricula: boolean;
    flota: boolean;
    precioExterno: boolean;
    textoErrores: string;
}

export class ContenidoModalDerecha extends Component<ContainerProps, ContainerState >
{

    async componentDidMount()
    {

    }

    onChangeInputs(currentState: ContainerState, key: string, value: string) {
        if (value === undefined) return;

        const estado: ContainerState = currentState;
        // if (key === "claseVehiculo") {
        //     estado["modalState"]["modeloVehiculo"] = "";
        // }

        // estado["errores"][key] = false;
        // estado["modalState"][key] = value as string;
        this.setState({ ...estado });

    }

    elegirHoraRecogida(evento: CustomEvent<InputChangeEventDetail>) {

        let estadoActual: IModalState = this.state.dataReserva?.modalState as IModalState;
        estadoActual["horaentrega"] = evento.detail.value as string;
        // this.setState({ "modalState": { ...estadoActual } });

    }

    generarItemsRender(state: ContainerState, props: ContainerProps) {

        let {
            id,
            group,
            fechaAlta = undefined,
            fechaRecogida,
            notareserva = "",
            claseVehiculo = "",
            colaborador,
            modeloVehiculo = "",
            cantidadDias = 3,
            horaentrega = "08:00",
            lugarentrega = "",
            matricula,
            flota,
            estado = "prereservado",
            textoFechaDevolucion = "",
            preciovuelacar,
            precioexterno,
            extras

        } = props.dataReserva?.modalState as IModalState;

        let textoFechaRecogida = "";
        let fechaAltaDate = new Date();

        if (fechaAlta === undefined) // creado desde 0
        {
            textoFechaRecogida = "";
            fechaAlta = new Date().toISOString();
        }
        else // leyendo desde datos
        {
            fechaAltaDate = new Date(fechaAlta as string);
        }

        if (fechaRecogida !== undefined) {
            textoFechaRecogida = new Date(fechaRecogida).toISOString();

            const fechaRecogidaTempo = new Date(fechaRecogida);
            const fechaDevolucion = new Date(fechaRecogidaTempo.setDate(fechaRecogidaTempo.getDate() + (cantidadDias as number - 1)));
            textoFechaDevolucion = `${fechaDevolucion.getDate().toString().padStart(2, "00")}-${(fechaDevolucion.getMonth() + 1).toString().padStart(2, "00")}-${fechaDevolucion.getFullYear()}`;

        }

        //
        const fechaAltaTexto = `${fechaAltaDate.getDate().toString().padStart(2, "00")}-${(fechaAltaDate.getMonth() + 1).toString().padStart(2, "00")}-${fechaAltaDate.getFullYear()} ${fechaAltaDate.getHours().toString().padStart(2, "00")}:${fechaAltaDate.getMinutes().toString().padStart(2, "00")}`;
        let tituloReserva = "Rellenar Contrato";
        let colorCabecera = "grid_cabecera grid_cabecera_reserva";

        if (flota === "v") {
            tituloReserva += " VuelaCar";
        }
        else {
            tituloReserva += " Exterior";
        }

        let horaEntregaItem = null;
        let lugarEntregaItem = null;
        let matriculaItem = null;
        let flotaItem = null;
        let numeroReservaItem = null;
        let precioVuelacarItem = null;
        let notaReservaItem = null;
        let precioExternoItem = null;
        let extrasItem = null;
        let estadoItem = null;
        let botonGuardarItem =
            <div className='centrado-horizontal'>
                <IonButton>Guardar Datos</IonButton>
            </div>
            ;

        let modeloVehiculoItem = null;

            horaEntregaItem =
                <IonItem>
                    <IonLabel className="">Hora de entrega</IonLabel>
                    <IonDatetime  value={horaentrega} hourValues="8,9,10,11,12,13,14,15,16,17,18,19,20" minuteValues="0,30" onIonChange={(evento) => { this.elegirHoraRecogida(evento); }} displayFormat='HH:mm' hour-cycle="h23" first-day-of-week={1} cancelText="Cancelar" doneText="Confirmar" placeholder='Hora de entrega' ></IonDatetime>
                </IonItem>
                ;

            lugarEntregaItem =
                <IonItem className=''>
                    <IonLabel className="">Lugar de entrega</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='lugarentrega' value={lugarentrega} onIonChange={(evento) => { this.onChangeInputs(this.state, "lugarentrega", evento.detail.value as string); }} placeholder="Lugar de entrega"></IonInput>
                </IonItem>
                ;


            matriculaItem =
                <IonItem>
                    <IonLabel className="">Matricula</IonLabel>
                    <IonInput className="texto-alineado-derecha" name='matricula' value={matricula} onIonChange={(evento) => { this.onChangeInputs(props, "matricula", evento.detail.value as string); }} placeholder="Matricula"></IonInput>
                </IonItem>
                ;


            flotaItem =
                <IonItem>
                    <IonLabel className="">Flotas externas</IonLabel>
                    <IonSelect  value={flota} onIonChange={(evento) => { this.onChangeInputs(this.state, "flota", evento.detail.value as string); }} id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        {
                            props.listFlotas?.map((elemento: IlistFlotas) => {
                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                            })
                        }
                    </IonSelect>
                </IonItem>
                ;

            numeroReservaItem =
                <IonItem>
                    <IonLabel className="">Numero Reserva</IonLabel>
                    <IonLabel className="">XXXXXXX</IonLabel>
                </IonItem>
                ;

            precioVuelacarItem =
                <IonItem>
                    <IonLabel className="">Precio Vuelacar</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='preciovuelacar' value={preciovuelacar} onIonChange={(evento) => { this.onChangeInputs(this.state, "preciovuelacar", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric" placeholder='Precio Vuelacar' ></IonInput>
                </IonItem>
                ;

            notaReservaItem =
                <IonItem>
                    <IonLabel className="">Nº Reserva externo</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='notareserva' value={notareserva} onIonChange={(evento) => { this.onChangeInputs(this.state, "notareserva", evento.detail.value as string); }} placeholder="Nº Reserva externo"></IonInput>
                </IonItem>
                ;

            precioExternoItem =
                <IonItem>
                    <IonLabel className="">Precio externo</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='precioexterno' value={precioexterno} onIonChange={(evento) => { this.onChangeInputs(this.state, "precioexterno", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric" placeholder='Precio externo'></IonInput>
                </IonItem>
                ;

            extrasItem =
                <IonItem>
                    <IonLabel className="">Extras</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='extras' value={extras} onIonChange={(evento) => { this.onChangeInputs(this.state, "extras", evento.detail.value as string); }} placeholder="Extras" ></IonInput>
                </IonItem>
                ;

            estadoItem =
                <IonItem>
                    <IonLabel className="">Estado</IonLabel>
                    <IonSelect  value={estado} onIonChange={(evento) => { this.onChangeInputs(this.state, "estado", evento.detail.value as string); }} id="estado" name='estado' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                        <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                        <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                        <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                    </IonSelect>
                </IonItem>
                ;

        return {
            id,
            group,
            tituloReserva,
            colorCabecera,
            fechaAltaTexto,
            fechaAlta,
            textoFechaRecogida,
            fechaRecogida,
            notareserva,
            claseVehiculo,
            colaborador,
            modeloVehiculo,
            cantidadDias,
            horaentrega,
            lugarentrega,
            matricula,
            flota,
            estado,
            textoFechaDevolucion,
            preciovuelacar,
            precioexterno,
            extras,

            horaEntregaItem,
            lugarEntregaItem,
            matriculaItem,
            flotaItem,
            numeroReservaItem,
            precioVuelacarItem,
            notaReservaItem,
            precioExternoItem,
            extrasItem,
            estadoItem,
            modeloVehiculoItem,
            botonGuardarItem

        }

    }


    render()
    {
        const itemsGenerados = this.generarItemsRender(this.state, this.props);
        
        return(
                    <div>
                        <div className=" altura_15 cabecera-arriba">
                            <h2 className='margen-cabecera-arriba'>{itemsGenerados.tituloReserva}</h2>
                            <span>Fecha alta: {itemsGenerados.fechaAltaTexto}</span>
                            <IonInput name='fechaalta' value={this.props.dataReserva?.modalState.fechaAlta} hidden={true} ></IonInput>
                        </div>
                        <div>
                            <IonLabel className="">Fecha Entrega</IonLabel>
                            <IonLabel className="">
                                <IonDatetime  value={itemsGenerados.textoFechaRecogida} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar" />
                            </IonLabel>
                        </div>
                        <div>
                            <IonLabel className="">Cantidad de dias</IonLabel>
                            <IonLabel className="">{itemsGenerados.cantidadDias}</IonLabel>
                        </div>
                        <IonItem>
                            <IonLabel className="">Fecha Devolucion</IonLabel>
                            <IonInput  className="texto-alineado-derecha" name='fechaDevolucion' readonly={true} value={itemsGenerados.textoFechaDevolucion} autocomplete="off" inputmode="text" placeholder='Fecha Devolucion' />
                        </IonItem>
                        <IonItem>
                            
                            <IonLabel className="">Colaborador</IonLabel>
                            <IonLabel className="">{itemsGenerados.colaborador}</IonLabel>
                            
                        </IonItem>
                        {itemsGenerados.horaEntregaItem}
                        {itemsGenerados.lugarEntregaItem}
                        <IonItem>
                            <IonLabel className="">Clase</IonLabel>
                            <IonLabel className="">{itemsGenerados.claseVehiculo}</IonLabel>
                        </IonItem>
                        <IonItem>
                            
                            <IonLabel className="">Modelo Vehiculo</IonLabel>
                            <IonLabel className="">{itemsGenerados.modeloVehiculo}</IonLabel>
                            
                        </IonItem>
                        {itemsGenerados.matriculaItem}
                        {itemsGenerados.flotaItem}
                        {itemsGenerados.numeroReservaItem}
                        {itemsGenerados.precioVuelacarItem}
                        {itemsGenerados.notaReservaItem}
                        {itemsGenerados.precioExternoItem}
                        {itemsGenerados.extrasItem}
                        {itemsGenerados.estadoItem}
                    </div>

        );
    }

}