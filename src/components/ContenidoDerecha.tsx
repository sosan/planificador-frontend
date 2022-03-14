import { IonContent, IonGrid, IonRow, IonInput, IonLabel, IonCol, IonList, IonItem, IonDatetime, IonSelect, IonSelectOption, IonImg, IonButton, IonThumbnail } from "@ionic/react";
import { Component } from "react";
import { IlistColaborators } from "../datos/listadoColaboradores";
import { IlistFlotas } from "../datos/listadoFlotas";
import { IDataVehiculos, IListadoPrereserva } from "../datos/vehiculosGeneral";
import { IModalState } from "./Modal";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera';
// import { ImagePicker } from "@awesome-cordova-plugins/image-picker";
import { Chooser } from "@awesome-cordova-plugins/chooser";
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';
import { File } from "@awesome-cordova-plugins/file";
import { FilePath } from "@awesome-cordova-plugins/file-path";
import imagenFallo from "../images/error_checkbox.svg";
import { InputChangeEventDetail } from '@ionic/core';
import { listadoDias} from "../components/Modal";



import "../css/Modal.css";
import { ContainerSelector } from "./ContainerSelector";

interface ContainerState
{
    dataReserva: IListadoPrereserva | null;
    errores?: IModalErrores;
    dummy?: boolean;
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

    txtUriNotaExterior: string = "cdvfile://localhost/content/com.android.providers.media.documents/document/image:582";
    txtUriDocumento: string = "";

    constructor(props: any)
    {
        super(props);
        this.txtUriNotaExterior = "cdvfile://localhost/content/com.android.providers.media.documents/document/image:582";
        this.txtUriDocumento = "";
    }

    async componentDidMount()
    {
        this.txtUriNotaExterior = "cdvfile://localhost/content/com.android.providers.media.documents/document/image:582";
        this.txtUriDocumento = "";
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

    elegirHoraRecogida(evento: CustomEvent) {

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
            extras,
            uriNotaExterior

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
        let imagenNotaExteriorItem = null;

        let modeloVehiculoItem = null;

            horaEntregaItem =
                <div>
                    <IonLabel className="">Hora de entrega</IonLabel>
                    <IonDatetime  value={horaentrega} hourValues="8,9,10,11,12,13,14,15,16,17,18,19,20" minuteValues="0,30" onIonChange={(evento) => { this.elegirHoraRecogida(evento); }} displayFormat='HH:mm' hour-cycle="h23" first-day-of-week={1} cancelText="Cancelar" doneText="Confirmar" placeholder='Hora de entrega' ></IonDatetime>
                </div>
                ;

            lugarEntregaItem =
                <div className=''>
                    <IonLabel className="">Lugar de entrega</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='lugarentrega' value={lugarentrega} onIonChange={(evento) => { this.onChangeInputs(this.state, "lugarentrega", evento.detail.value as string); }} placeholder="Lugar de entrega"></IonInput>
                </div>
                ;


            matriculaItem =
                <div>
                    <IonLabel className="">Matricula</IonLabel>
                    <IonInput className="texto-alineado-derecha" name='matricula' value={matricula} onIonChange={(evento) => { this.onChangeInputs(props, "matricula", evento.detail.value as string); }} placeholder="Matricula"></IonInput>
                </div>
                ;


            flotaItem =
                <div>
                    <IonLabel className="">Flotas externas</IonLabel>
                    <IonSelect  value={flota} onIonChange={(evento) => { this.onChangeInputs(this.state, "flota", evento.detail.value as string); }} id="flotas" name='flotas' className="flotas_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        {
                            props.listFlotas?.map((elemento: IlistFlotas) => {
                                return <IonSelectOption key={elemento.id} value={elemento.id}>{elemento.descripcion}</IonSelectOption>;
                            })
                        }
                    </IonSelect>
                </div>
                ;

            numeroReservaItem =
                <div>
                    <IonLabel className="">Numero Reserva</IonLabel>
                    <IonLabel className="">XXXXXXX</IonLabel>
                </div>
                ;

            precioVuelacarItem =
                <div>
                    <IonLabel className="">Precio Vuelacar</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='preciovuelacar' value={preciovuelacar} onIonChange={(evento) => { this.onChangeInputs(this.state, "preciovuelacar", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric" placeholder='Precio Vuelacar' ></IonInput>
                </div>
                ;

            notaReservaItem =
                <div>
                    <IonLabel className="">Nº Reserva externo</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='notareserva' value={notareserva} onIonChange={(evento) => { this.onChangeInputs(this.state, "notareserva", evento.detail.value as string); }} placeholder="Nº Reserva externo"></IonInput>
                </div>
                ;

            precioExternoItem =
                <div>
                    <IonLabel className="">Precio externo</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='precioexterno' value={precioexterno} onIonChange={(evento) => { this.onChangeInputs(this.state, "precioexterno", evento.detail.value as string); }} type='number' min='1' max='100000000' autocomplete="off" inputmode="numeric" placeholder='Precio externo'></IonInput>
                </div>
                ;

            extrasItem =
                <div>
                    <IonLabel className="">Extras</IonLabel>
                    <IonInput  className="texto-alineado-derecha" name='extras' value={extras} onIonChange={(evento) => { this.onChangeInputs(this.state, "extras", evento.detail.value as string); }} placeholder="Extras" ></IonInput>
                </div>
                ;

            
            if (uriNotaExterior === undefined)
            {
                uriNotaExterior = this.txtUriNotaExterior;
                
            }

            imagenNotaExteriorItem = 
                <IonThumbnail className="thumbnail-contratos">
                    <IonImg src={uriNotaExterior} />
                    {/* <img src={uriNotaExterior} alt="" width="200" /> */}
                </IonThumbnail>
            ;

            console.log("uriNotaExterior" + uriNotaExterior);
            console.log("this.txtUriNotaExterior" + this.txtUriNotaExterior);

            estadoItem =
                <div>
                    <IonLabel className="">Estado</IonLabel>
                    <IonSelect  value={estado} onIonChange={(evento) => { this.onChangeInputs(this.state, "estado", evento.detail.value as string); }} id="estado" name='estado' className="status_select" okText="Confirmado" cancelText="Cancelar" placeholder="Seleccionar Uno" >
                        <IonSelectOption value="prereservado" >Pre-Reservado</IonSelectOption>
                        <IonSelectOption value="reservado" >Reservado</IonSelectOption>
                        <IonSelectOption value="prepagado">Prepagado</IonSelectOption>
                        <IonSelectOption value="100pagado">100% Pagado</IonSelectOption>
                    </IonSelect>
                </div>
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
            uriNotaExterior,

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
            botonGuardarItem,
            imagenNotaExteriorItem

        }

    }

    async showNotaExteriorOpener()
    {
        console.log("abierto");

        try
        {
            
            const checkExteranlStorage = await AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
            if (checkExteranlStorage.hasPermission === false)
            {
                let hasPermission = false;
                while (hasPermission === false)
                {
                    const requestPermision = await AndroidPermissions.requestPermissions([AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE])
                    if (requestPermision.hasPermission === true)
                    {
                        hasPermission = true;

                    }

                }

            }

            // const options = this.setOptions();
            // const photo = await Camera.getPicture(options);
            // console.log("photo=" + JSON.stringify(photo));

            // Line 1 - Msg: t?.uri = content://com.android.providers.media.documents/document/image%3A582
            // Line 1 - Msg: uri URL = { "isFile": true, "isDirectory": false, "name": "image:582", "fullPath": "/com.android.providers.media.documents/document/image:582", "filesystem": "<FileSystem: content>", "nativeURL": "content://com.android.providers.media.documents/document/image%3A582" }
            // Line 1 - Msg: uri.toURL()=content://com.android.providers.media.documents/document/image%3A582
            // Line 1 - Msg: uri.toInternalURL()=cdvfile://localhost/content/com.android.providers.media.documents/document/image:582
            // Line 1 - Msg: uri.nativeURL=content://com.android.providers.media.documents/document/image%3A582
            // /sdcard/Download/2064537.jpeg

            const t = await Chooser.getFile("image/*");
            console.log("t?.uri" + t?.uri);

            const y = await FilePath.resolveNativePath(t?.uri as string);
            console.log("Y=" + y);

            //  file:///storage/emulated/0/Download/2064537.jpeg
            const directory = y.split("/")
            // const m = await File.getFile(y);



            // let uri = await File.resolveLocalFilesystemUrl(t?.uri as string);
            
            // console.log("uri URL=" + JSON.stringify(uri));
            // console.log("uri.toURL()=" + uri.toURL() );
            // console.log("uri.toInternalURL()=" + uri.toInternalURL());
            // console.log("uri.nativeURL=" + uri.nativeURL);

            this.txtUriNotaExterior = y;

            this.setState({
                "dummy": false
            })

        }
        catch(e)
        {
            console.log('Error=' + JSON.stringify(e));
        }


            

    }

    componentWillUnmount()
    {
        this.txtUriNotaExterior = "";
        this.txtUriDocumento = "";
    }

    render()
    {
        const itemsGenerados = this.generarItemsRender(this.state, this.props);
        
        return(
            
            <IonContent className="color-contenido">
                <div className=" altura-cabecera cabecera-arriba color-contenido">
                    <h2 className='margen-cabecera-arriba'>{itemsGenerados.tituloReserva}</h2>
                </div>
                <IonList className="grid-contenido-derecha-modal color-contenido">
                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                    <span>Fecha reserva: {itemsGenerados.fechaAltaTexto}</span>
                    <IonInput name='fechaalta' value={this.props.dataReserva?.modalState.fechaAlta} hidden={true} ></IonInput>

                </div>
                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                    <IonLabel className="">Nº contrato</IonLabel>
                </div>
                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                    <div>
                        <IonLabel className="">Fecha entrega</IonLabel>
                        <IonLabel className="">
                            <IonDatetime  value={itemsGenerados.textoFechaRecogida} displayFormat='DD-MM-YYYY' hour-cycle="h23" first-day-of-week={1} yearValues="2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034" cancelText="Cancelar" doneText="Confirmar" />
                        </IonLabel>
                    </div>
                    {itemsGenerados.horaEntregaItem}
                    {itemsGenerados.lugarEntregaItem}
                </div>
                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                    <div>
                        <IonLabel className="">Fecha devolucion</IonLabel>
                        <IonInput  className="texto-alineado-derecha" name='fechaDevolucion' readonly={true} value={itemsGenerados.textoFechaDevolucion} autocomplete="off" inputmode="text" placeholder='Fecha Devolucion' />
                    </div>
                    {itemsGenerados.lugarEntregaItem}
                    {itemsGenerados.horaEntregaItem}
                </div>
                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                    <div>
                        <IonLabel className="">Colaborador</IonLabel>
                        <IonLabel className="">{itemsGenerados.colaborador}</IonLabel>
                    </div>
                    {itemsGenerados.numeroReservaItem}
                    <div>
                        <IonLabel className="">Nº dias</IonLabel>
                        <IonLabel className="">{itemsGenerados.cantidadDias}</IonLabel>
                    </div>
                    <div>
                        <IonLabel className="">Clase</IonLabel>
                        <IonLabel className="">{itemsGenerados.claseVehiculo}</IonLabel>
                    </div>
                    <div>
                        
                        <IonLabel className="">Modelo vehiculo</IonLabel>
                        <IonLabel className="">{itemsGenerados.modeloVehiculo}</IonLabel>
                        
                    </div>
                    {itemsGenerados.matriculaItem}
                    {itemsGenerados.extrasItem}
                    

                </div>
                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                    {itemsGenerados.flotaItem}
                    {itemsGenerados.notaReservaItem}
                    {itemsGenerados.precioVuelacarItem}
                    {itemsGenerados.precioExternoItem}
                    <div>
                        <IonLabel className="">Pago efectivo</IonLabel>
                        <IonInput className="texto-alineado-derecha" name='pagoefectivo' value="" autocomplete="off" inputmode="numeric" placeholder='Pago efectivo' />
                    </div>
                    <div>
                        <IonLabel className="">Pago tarjeta</IonLabel>
                        <IonInput className="texto-alineado-derecha" name='pagoefectivo' value="" autocomplete="off" inputmode="numeric" placeholder='Pago tarjeta' />
                    </div>
                </div>

                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                        <IonButton onClick={ () => { this.showNotaExteriorOpener(); } } >
                            SELECCIONAR IMAGEN
                        </IonButton>
                        <IonItem>
                            {itemsGenerados.imagenNotaExteriorItem}
                        </IonItem>
                        <IonButton>
                            SIN IMAGEN
                        </IonButton>
                    </div>

                    <div className="background-modal-contenido-derecha altura-background-modal-contenido-derecha">
                        {/* <IonLabel>{this.txtUriNotaExterior}</IonLabel>
                        <IonLabel>{this.txtUriDocumento}</IonLabel> */}
                    </div>
            </IonList>
            </IonContent>
            
        );
    }

}