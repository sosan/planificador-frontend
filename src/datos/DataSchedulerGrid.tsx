import { ContainerState, IModalErrores } from "../components/Modal";
import { HEIGHT_ITEM_RESERVA_AND_GROUP, typeGroup } from "../components/SchedulerGrid";
import { IListadoPrereserva, IDataVehiculos, ORDEN_LISTADO_MODELO_VEHICULOS, setOrdenListadoModeloVehiculos, setDataCars } from "./vehiculosGeneral";
import { repoStorage } from "../interfaces/logicStorage";
import { listadoColaboradores, setColaboradores } from "./listadoColaboradores";
import { listFlotas, setListadoFlotas } from "../datos/listadoFlotas";
export class DataSchedulerGrid
{

    groupsReservaVuelaCar: typeGroup[] = [];
    groupsReservaExterior: typeGroup[] = [];
    groupsPreReserva: typeGroup[] = [];
    listadoClaseVehiculos: string[] = [];
    listadoModelosVehiculos: string[] = [];
    itemsReservasVuelaCar: IListadoPrereserva[] = [];
    itemsReservasExterior: IListadoPrereserva[] = [];
    itemsPreReservas: IListadoPrereserva[] = [];
    DEBUG = true;

    testing: string = "";
    isReady: boolean = false;

    // constructor(dataCarsProps: any)
    // {
    //     this.setupDb(dataCarsProps);
    // }

    getIsReady(): boolean
    {
        return this.isReady;
    }

    setIsReady(value: boolean)
    {
        this.isReady = value;
    }

    
    async setupDb(dataCarsProps: any)
    {
        this.setIsReady(false);
        
        const cantidadKeys = await repoStorage.getLengthGroupReservasVuelaCar();
        // console.log("cantidadKeys=" + cantidadKeys);
        if (cantidadKeys === 0)
        {
            await this.generateDB(dataCarsProps);
        }
        else
        {
            await this.readFromDB();
        }
        this.setIsReady(true);
        
    }
    
    async generateDB(dataCarsProps: any)
    {

        let groupsData = await this.createGroupForCars(dataCarsProps);
        this.groupsReservaVuelaCar = groupsData.groupCreated;
        this.listadoClaseVehiculos = groupsData.arrayListadoClasesVehiculos;
        this.listadoModelosVehiculos = groupsData.arrayListadoModelosVehiculos;

        await repoStorage.initGroupsItems();
        await repoStorage.initListados(
            listadoColaboradores,
            listFlotas,
        );

    }

    async readFromDB()
    {

        const ordenListadoCoches = await repoStorage.getOrdenListadoModeloVehiculos();
        await setOrdenListadoModeloVehiculos(ordenListadoCoches);

        const dataCarsTemp = await repoStorage.getDataCars();
        await setDataCars(dataCarsTemp);

        this.groupsReservaVuelaCar = await repoStorage.getGroupsReservaVuelaCar();
        this.groupsReservaExterior = await repoStorage.getGroupsReservaExterior();
        this.groupsPreReserva = await repoStorage.getGroupsPreReserva();

        this.listadoClaseVehiculos = await repoStorage.getlistadoClasesVehiculos();
        this.listadoModelosVehiculos = await repoStorage.getlistadoModelosVehiculos();

        const listadoColaboradores = await repoStorage.getListadoColaboradores();
        await setColaboradores(listadoColaboradores);

        const listadoFlotas = await repoStorage.getListadoFlotas();
        await setListadoFlotas(listadoFlotas);

        this.itemsPreReservas = await repoStorage.getItemsPreReservas();
        this.itemsReservasVuelaCar = await repoStorage.getItemsReservasVuelaCar();
        this.itemsReservasExterior = await repoStorage.getItemsReservasExterior();


        console.log("conversion")


    }

    async createGroupForCars(cars: IDataVehiculos[]) {
        let groupCreated: typeGroup[] = [];
        let listadoModelosVehiculos: Set<string> = new Set<string>();
        let listadoClasesVehiculos: Set<string> = new Set<string>();

        for (let i = 0; i < cars.length; i++) 
        {
            listadoClasesVehiculos.add(cars[i].clasevehiculo);
            listadoModelosVehiculos.add(cars[i].modelo);
            const elementTemp = {
                "id": i,
                "title": `${cars[i].descripcion}`,
                "clasevehiculo": `${cars[i].clasevehiculo}`,
                "vehiculo": `${cars[i].vehiculo}`,
                "modelo": `${cars[i].modelo}`,
                "srcImage": "",
                "rightTitle": "",
                "height": HEIGHT_ITEM_RESERVA_AND_GROUP,
                "stackItems": true,
                "flota": "v",
                "matricula": `${cars[i].matricula}`
            };
            groupCreated.push(elementTemp);

        }

        
        groupCreated = await this.orderGroupCars(groupCreated, ORDEN_LISTADO_MODELO_VEHICULOS);
        
        const arrayListadoClasesVehiculos = Array.from(listadoClasesVehiculos);
        const arrayListadoModelosVehiculos = Array.from(listadoModelosVehiculos);
        
        await repoStorage.insertGroupsReservaVuelaCar(groupCreated);
        await repoStorage.insertlistadoClasesVehiculos(arrayListadoClasesVehiculos);
        await repoStorage.insertlistadoModelosVehiculos(arrayListadoModelosVehiculos);
        await repoStorage.insertOrdenListadoModeloVehiculos(ORDEN_LISTADO_MODELO_VEHICULOS);

        await repoStorage.insertDataCars(cars);

        // console.log("Modelos vehiculos" + JSON.stringify(arrayListadoModelosVehiculos));
        // console.log("Clases vehiculos" + JSON.stringify(arrayListadoClasesVehiculos));
        return { groupCreated, arrayListadoClasesVehiculos, arrayListadoModelosVehiculos };
    }
    

    async orderGroupCars(cars: typeGroup[], ordenListadoCoches: any[]) {
        let groupOrdered: typeGroup[] = [];

        for (let i = 0; i < ordenListadoCoches.length; i++)
        {
            
            const vehiculo = ordenListadoCoches[i]["vehiculo"];
            
            for (let j = 0; j < cars.length; j++) {
    
                if (cars[j].vehiculo.toLowerCase() === vehiculo.toLowerCase())
                {
                    groupOrdered.push(cars[j]);
                    const ultimaPos = groupOrdered.length - 1;
                    groupOrdered[ultimaPos].id = ultimaPos;
                }
    
            }
            
        }

        return groupOrdered;
    }

    
    async getLengthItemsReservasVuelaCar() {
        return this.itemsReservasVuelaCar.length;
    }

    async getLengthItemsReservasExterior() {
        return this.itemsReservasExterior.length;
    }

    async getLengthItemsPreReservas() {
        return this.itemsPreReservas.length;
    }

    async getLengthGroupsReservaVuelaCar() {
        return this.groupsReservaVuelaCar.length;
    }

    async getLengthGroupsReservaExterior() {
        return this.groupsReservaExterior.length;
    }

    async getLengthGroupsPreReserva() {
        return this.groupsPreReserva.length;
    }

    async fillGroupReservaVuelaCar(matricula: string, modelo: any, claseVehiculo: string, flota: string, position: number) {

        this.groupsReservaVuelaCar[position].matricula = matricula;
        this.groupsReservaVuelaCar[position].modelo = modelo;
        this.groupsReservaVuelaCar[position].clasevehiculo = claseVehiculo;
        this.groupsReservaVuelaCar[position].flota = flota;

    }

    async fillItemsReservasVuelaCar(elementoReserva: IListadoPrereserva, position: number) {
        
        this.itemsReservasVuelaCar[position] = elementoReserva;

    }


    async fillItemsReservasExterior(elementoReserva: IListadoPrereserva, position: number) {

        this.itemsReservasExterior[position] = elementoReserva;
    }


    async fillGroupReservaExterior(matricula: string, modelo: string, claseVehiculo: string, flota: string, position: number) {
        this.groupsReservaExterior[position].matricula = matricula;
        this.groupsReservaExterior[position].modelo = modelo;
        this.groupsReservaExterior[position].clasevehiculo = claseVehiculo;
        this.groupsReservaExterior[position].flota = flota;
    }

    async searchByID(_id: number, grupos: typeGroup[]) {

        let matricula = "", vehiculo = "";

        for (let i = 0; i < this.groupsReservaVuelaCar.length; i++) {
            if (this.groupsReservaVuelaCar[i].id === _id) {
                matricula = this.groupsReservaVuelaCar[i].matricula;
                vehiculo = this.groupsReservaVuelaCar[i].title;
                break;
            }
        }

        return [matricula, vehiculo];

    }


    async searchReservaVuelaCarByID(_id: number)
    {
        for (let i = 0; i < this.itemsReservasVuelaCar.length; i++) {
            if (this.itemsReservasVuelaCar[i].id === _id) {
                return this.itemsReservasVuelaCar[i];
            }

        }


    }

    notAsyncSearchReservaVuelaCarByID(_id: number)
    {
        for (let i = 0; i < this.itemsReservasVuelaCar.length; i++) {
            if (this.itemsReservasVuelaCar[i].id === _id) {
                return this.itemsReservasVuelaCar[i];
            }

        }

    }

    async searchPreReservaByID(_id: number) {
        for (let i = 0; i < this.itemsPreReservas.length; i++) {
            if (this.itemsPreReservas[i].id === _id) {
                return this.itemsPreReservas[i];
            }

        }


    }

    async searchReservaExteriorByID(_id: number) {
        for (let i = 0; i < this.itemsReservasExterior.length; i++) {
            if (this.itemsReservasExterior[i].id === _id) {
                return this.itemsReservasExterior[i];
            }

        }


    }

    async insertNewElementGrupoReserva(nuevoGrupoReserva: typeGroup) {
        this.groupsReservaVuelaCar.push(nuevoGrupoReserva);
    }


    async insertNewElementReservasVuelaCar(elementoReserva: IListadoPrereserva) {
        this.itemsReservasVuelaCar.push(elementoReserva);
    }

    async insertNewElementPreReserva(elementoReserva: IListadoPrereserva) {
        this.itemsPreReservas.push(elementoReserva);
    }

    async insertNewElementReservasExterior(elementoReserva: IListadoPrereserva) {
        this.itemsReservasExterior.push(elementoReserva);
    }
    async insertNewElementGrupoExterior(nuevoGrupoReserva: typeGroup) {
        this.groupsReservaExterior.push(nuevoGrupoReserva);
    }

    async updateReservaExterior(elementoReserva: IListadoPrereserva, position: number) {
        this.itemsReservasExterior[position as number] = elementoReserva;
    }
    async updateGroupReservaExterior(state: ContainerState, position: number) {
        this.groupsReservaExterior[position as number].matricula = state.modalState.matricula as string;
        this.groupsReservaExterior[position as number].modelo = state.modalState.modeloVehiculo as string;
        this.groupsReservaExterior[position as number].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsReservaExterior[position as number].flota = state.modalState.flota as string;
    }
    async updateReservaVuelaCar(positionListado: number, elementoReserva: IListadoPrereserva) {

        for (let i = 0; i < this.itemsReservasVuelaCar.length; i++)
        {
            if (this.itemsReservasVuelaCar[i].id === elementoReserva.id)
            {
                this.itemsReservasVuelaCar[i] = elementoReserva;
                return i;

            }
        }

        return -1;

    }

    async updatePreReserva(positionListado: number, elementoReserva: IListadoPrereserva) {

        for (let i = 0; i < this.itemsPreReservas.length; i++) {
            if (this.itemsPreReservas[i].id === elementoReserva.id) {
                this.itemsPreReservas[i] = elementoReserva;
                return i;

            }
        }

        return -1;

    }

    async updateGroupReservaVuelaCar(state: ContainerState, position: number) {

        this.groupsReservaVuelaCar[position as number].title = state.modalState.colaborador as string;
        this.groupsReservaVuelaCar[position as number].matricula = state.modalState.matricula as string;
        this.groupsReservaVuelaCar[position as number].modelo = state.modalState.modeloVehiculo as string;
        this.groupsReservaVuelaCar[position as number].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsReservaVuelaCar[position as number].flota = state.modalState.flota as string;
    }
    
    async reemplacePrereservas(listadoE: IListadoPrereserva[]) {
        this.itemsPreReservas = [...listadoE];
    }

    async reemaplceReservasExterior(listadoE: IListadoPrereserva[]) {
        this.itemsReservasExterior = [...listadoE];
    }
    async reemplaceGroupReservaExterior(grupoE: typeGroup[]) {
        this.groupsReservaExterior = [...grupoE];
    }
    async reemplaceReservasVuelaCar(listadoV: IListadoPrereserva[]) {
        this.itemsReservasVuelaCar = [...listadoV];
    }
    async reemplaceAllGroupReservaVuelaCar(grupoV: typeGroup[]) {
        this.groupsReservaVuelaCar = [...grupoV];
    }


    async updateGroupPrereserva(state: ContainerState, position: number) {
        this.groupsPreReserva[position].matricula = state.modalState.matricula as string;
        this.groupsPreReserva[position].modelo = state.modalState.modeloVehiculo as string;
        this.groupsPreReserva[position].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsPreReserva[position].flota = state.modalState.flota as string;
    }
    async removeAtItemsPrereserva(position: number) {
        this.itemsPreReservas.splice(position as number, 1);
    }
    async removeAtGroupsPrereserva(position: number) {
        this.groupsPreReserva.splice(position, 1);
    }

    async removeAtItemsReservaExterior(position: number) {
        this.itemsReservasExterior.splice(position as number, 1);
    }

    async removeAtGroupReservaExterior(position: number)
    {
        this.groupsReservaExterior.splice(position as number, 1);
    }

    async insertNewElementGrupoPreReserva(state: ContainerState) {
        const grupo: typeGroup = {
            "id": state.modalState.group as number,
            "title": "title",
            "matricula": state.modalState.matricula as string,
            "vehiculo": "vehiculo",
            "clasevehiculo": state.modalState.claseVehiculo as string,
            "modelo": state.modalState.modeloVehiculo as string,
            "flota": state.modalState.flota as string,
            "height": HEIGHT_ITEM_RESERVA_AND_GROUP,
            "srcImage": "",
            "rightTitle": "",
            "stackItems": true,

        };
        this.groupsPreReserva.push(grupo);
        return grupo;
    }

    async searchGroupByMatricula(grupo: typeGroup[], matricula: string) {
        let exist = false;
        let grupoId = -1;

        for (let i = 0; i < grupo.length; i++) {
            if (grupo[i].matricula.toLowerCase() === matricula.toLowerCase()) {

                exist = true;
                grupoId = grupo[i].id;
                break;

            }
        }

        return [exist, grupoId];

    }

    async searchGroupByMatriculaReservaVuelaCar(matricula: string)
    {
        let exist = false;
        let grupoId = -1;

        for (let i = 0; i < this.groupsReservaVuelaCar.length; i++) {
            if (this.groupsReservaVuelaCar[i].matricula.toLowerCase() === matricula.toLowerCase()) {

                exist = true;
                grupoId = this.groupsReservaVuelaCar[i].id;
                break;

            }
        }

        return [exist, grupoId];


    }



    async searchExistGroupById(grupo: typeGroup[], _id: number) {
        let exist = false;
        let position = -1;

        for (let i = 0; i < grupo.length; i++) {

            if (grupo[i].id === _id) {
                exist = true;
                position = i;

                return [exist, position];
            }
        }

        return [exist, position];

    }


    async searchDuplicatedGroupMatricula(grupo: typeGroup[], matricula: string) {
        let position = -1;
        for (let i = 0; i < grupo.length; i++) {
            if (grupo[i].matricula.toLowerCase() === matricula.toLowerCase()) {
                position = i;
                return [true, position];
            }
        }
        return [false, position];
    }


    async deletePrereservadoById(_id: number)
    {

        let grupo: number = -1;
        for (let i = 0; i < this.itemsPreReservas.length; i++)
        {
            if (this.itemsPreReservas[i].id === _id )
            {
                console.log("borrado _id=" + _id) ;
                grupo = this.itemsPreReservas[i].group;
                this.itemsPreReservas.splice(i, 1);
                
            }
            
        }
        
        // si no hay mas items dentro del grupo borrar el grupo
        let existenMasItems = false;
        for (let i = 0; i < this.itemsPreReservas.length; i++)
        {
            if (this.itemsPreReservas[i].group as number === grupo )
            {
                existenMasItems = true;
            }
            
        }

        if (existenMasItems === false)
        {
            this.deleteGroupPrereservaById(grupo);
        }

    }

    async deleteGroupPrereservaById(grupo: number)
    {
        for (let i = 0; i < this.groupsPreReserva.length; i++)
        {
            if (this.groupsPreReserva[i].id === grupo)
            {
                this.groupsPreReserva.splice(i, 1);
            }
        }

    }

    async deleteReservadoVuelacarById(_id: number) {

        for (let i = 0; i < this.itemsReservasVuelaCar.length; i++) {
            if (this.itemsReservasVuelaCar[i].id === _id) {
                console.log("borrado _id=" + _id);
                this.itemsReservasVuelaCar.splice(i, 1);
                break;
            }

        }

    }

    async deleteReservadoExteriorById(_id: number) {

        for (let i = 0; i < this.itemsReservasExterior.length; i++) {
            if (this.itemsReservasExterior[i].id === _id) {
                console.log("borrado _id=" + _id);
                this.itemsReservasExterior.splice(i, 1);
                break;
            }

        }

    }

    async getNewIdFromLastIDGroupPreReserva()
    {
        let ultimaPosicion = this.groupsPreReserva.length - 1;
        if (ultimaPosicion < 0)
        {
            return 0;
        }
        let itemId = this.groupsPreReserva[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }

    getNewIdFromLastIDPreReserva()
    {
        let ultimaPosicion = this.itemsPreReservas.length - 1;
        if (ultimaPosicion < 0) {
            return 0;
        }
        let itemId = this.itemsPreReservas[ultimaPosicion].id;
        itemId += 1;
        return itemId; 

    }


    getNewIdFromLastIDReservaVuelaCar()
    {

        let ultimaPosicion = this.itemsReservasVuelaCar.length - 1;
        if (ultimaPosicion < 0) {
            return 0;
        }
        let itemId = this.itemsReservasVuelaCar[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }

    getNewIdFromLastIDReservaExterior() {

        let ultimaPosicion = this.itemsReservasExterior.length - 1;
        if (ultimaPosicion < 0) {
            return 0;
        }
        let itemId = this.itemsReservasExterior[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }

    getNewIdFromLastIDGroupReservaVuelaCar()
    {
        let ultimaPosicion = this.groupsReservaVuelaCar.length - 1;
        if (ultimaPosicion < 0) {
            return 0;
        }
        let itemId = this.groupsReservaVuelaCar[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }

    getNewIdFromLastIDGroupReservaExterior() {
        let ultimaPosicion = this.groupsReservaExterior.length - 1;
        if (ultimaPosicion < 0) {
            return 0;
        }
        let itemId = this.groupsReservaExterior[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }


}

export let dataSchedulerGrid = new DataSchedulerGrid();

// dataSchedulerGrid.setupDb(dataCars);
// console.log("asignado")

// this.#instancePromise = (async () => {
//     const response = await fetch('./base64.wasm');
//     if (!response.ok) throw Error('...');
//     const arrayBuffer = await response.arrayBuffer();
//     return WebAssembly.instantiate(arrayBuffer);
// })();

