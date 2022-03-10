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

        } = state.dataReserva?.modalState as IModalState;

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

        if (claseVehiculo !== "") 
        {
            modeloVehiculoItem = new Set();
            let modelosUnicos = new Set();
            for (let i = 0; i < props.dataCars.length; i++) {
                const elemento = props.dataCars[i];
                if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() && modelosUnicos.has(elemento.modelo) === false) {
                    modelosUnicos.add(elemento.modelo);
                    modeloVehiculoItem.add(<IonSelectOption key={elemento.modelo.toLowerCase()} value={elemento.modelo}>{elemento.modelo.toUpperCase()}</IonSelectOption>);

                }
            }

        }

        

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
                    {
                        (this.state.errores?.matricula === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Matricula</IonLabel></>
                            :
                            <IonLabel className="">Matricula</IonLabel>
                    }
                    {
                        (this.state.dataReserva?.modalState.isPrereserva === true) ? <IonInput  value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value as string); }} key="matricula" id="matricula" name='matricula' placeholder='Matricula' className="matricula_select texto-alineado-derecha" ></IonInput>
                            :
                            <IonSelect  value={matricula} onIonChange={(evento) => { this.onChangeInputs(this.state, "matricula", evento.detail.value); }} key="matricula" id="matricula" name='matricula' className="matricula_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                {
                                    props.dataCars.map((elemento: IDataVehiculos) => {
                                        if (elemento.clasevehiculo.toLowerCase() === claseVehiculo.toLowerCase() as string &&
                                            elemento.modelo.toLowerCase() === modeloVehiculo.toLowerCase() as string
                                        ) {
                                            return <IonSelectOption key={elemento.matricula} value={elemento.matricula}>{elemento.matricula}</IonSelectOption>;

                                        }
                                        return null;
                                    })
                                }
                            </IonSelect>
                    }

                </IonItem>
                ;


            flotaItem =
                <IonItem>
                    {
                        (this.state.errores?.flota === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Flotas externas</IonLabel></>
                            :
                            <IonLabel className="">Flotas externas</IonLabel>

                    }
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
                    {
                        (this.state.errores?.precioExterno === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textoFallo">Precio externo</IonLabel></>
                            :
                            <IonLabel className="">Precio externo</IonLabel>

                    }
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
        // const { dataReserva } = this.props;
        const itemsGenerados = this.generarItemsRender(this.state, this.props);
        
        return(
            <div>
                <IonContent>
                    <IonGrid className={itemsGenerados.colorCabecera}>
                        <IonRow className=" altura_15 cabecera-arriba">
                            <h2 className='margen-cabecera-arriba'>{itemsGenerados.tituloReserva}</h2>
                            <span>Fecha alta: {itemsGenerados.fechaAltaTexto}</span>
                            <IonInput name='fechaalta' value={itemsGenerados.fechaAlta} hidden={true} ></IonInput>
                            <IonLabel className="textoFallo">{this.state.errores?.textoErrores}</IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12'>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonList className="ancho_100">
                                <IonItem>
                                    <IonLabel className="">Fecha Entrega</IonLabel>
                                    <IonLabel className="">
                                        <IonDatetime  value={itemsGenerados.textoFechaRecogida} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar" />
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Cantidad de dias</IonLabel>
                                    <IonSelect  value={itemsGenerados.cantidadDias} key="cantidaddias" id="cantidaddias" name='cantidaddias' className="cantidaddias_select" okText="Confirmado" cancelText="Cancelar"  >
                                        {
                                            listadoDias.map((elemento: number) => {
                                                return <IonSelectOption key={elemento} value={elemento}>{elemento}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className="">Fecha Devolucion</IonLabel>
                                    <IonInput  className="texto-alineado-derecha" name='fechaDevolucion' readonly={true} value={itemsGenerados.textoFechaDevolucion} autocomplete="off" inputmode="text" placeholder='Fecha Devolucion' />
                                </IonItem>
                                {itemsGenerados.horaEntregaItem}
                                {itemsGenerados.lugarEntregaItem}
                                <IonItem>
                                    {
                                        (this.state.errores?.colaborador === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Colaborador</IonLabel></>
                                            :
                                            <IonLabel className="">Colaborador</IonLabel>

                                    }
                                    <IonSelect  value={itemsGenerados.colaborador} onIonChange={(evento) => { this.onChangeInputs(this.state, "colaborador", evento.detail.value as string); }} key="colaboradores" id="colaboradores" name='colaboradores' className="colaboradores_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                    {
                                        this.props.listColaborators?.map((elemento: IlistColaborators) => {
                                            return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                                        })
                                    }
                                    </IonSelect>
                                </IonItem>
                                <IonItem>
                                    {
                                        (this.state.errores?.claseVehiculo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Clase</IonLabel></>
                                            :
                                            <IonLabel className="">Clase</IonLabel>
                                    }
                                    <IonSelect  value={itemsGenerados.claseVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "claseVehiculo", evento.detail.value as string); }} key="clase" id="clase" name='clase' className="clase_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {
                                            this.props.listadoClaseVehiculos?.map((elemento: string) => {
                                                return <IonSelectOption key={elemento.toLowerCase()} value={elemento.toLowerCase()}>{elemento.toUpperCase()}</IonSelectOption>;
                                            })
                                        }
                                    </IonSelect>
                                </IonItem>



                                <IonItem>
                                    {
                                        (this.state.errores?.modeloVehiculo === true) ? <><IonImg src={imagenFallo}></IonImg><IonLabel className="textofallo">Modelo Vehiculo</IonLabel></>
                                            :
                                            <IonLabel className="">Modelo Vehiculo</IonLabel>
                                    }
                                    <IonSelect  value={itemsGenerados.modeloVehiculo} onIonChange={(evento) => { this.onChangeInputs(this.state, "modeloVehiculo", evento.detail.value); }} key="vehiculos" id="vehiculos" name='vehiculos' className="vehiculos_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                                        {itemsGenerados.modeloVehiculoItem}
                                    </IonSelect>
                                </IonItem>
                                {itemsGenerados.matriculaItem}
                                {itemsGenerados.flotaItem}
                                {itemsGenerados.numeroReservaItem}
                                {itemsGenerados.precioVuelacarItem}
                                {itemsGenerados.notaReservaItem}
                                {itemsGenerados.precioExternoItem}
                                {itemsGenerados.extrasItem}
                                {itemsGenerados.estadoItem}
                            </IonList>

                        </IonRow>
                        
                    </IonGrid>
                </IonContent>
            </div>
        );
    }

}