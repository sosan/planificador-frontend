import { ContainerState, IModalErrores } from "../components/Modal";
import { typeGroup } from "../components/SchedulerGrid";
import { IListadoPrereserva, IDataVehiculos, ORDEN_LISTADO_MODELO_VEHICULOS } from "./vehiculosGeneral";
import { repoStorage } from "../interfaces/logicStorage";
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
        console.log("cantidadKeys=" + cantidadKeys);
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

        this.groupsPreReserva = [
            {
                "id": 0,
                "matricula": " ",
                "title": " ",
                "vehiculo": " ",
                "clasevehiculo": " ",
                "modelo": " ",
                "bgColor": "#3796f3",
                "height": 2,
            },
    
        ];
    
        this.groupsReservaExterior = [
            {
                "id": 0,
                "matricula": " ",
                "title": " ",
                "vehiculo": " ",
                "clasevehiculo": " ",
                "modelo": " ",
                "bgColor": "#3796f3",
                "height": 2,
            },
    
        ];
    
        this.itemsPreReservas = [{
            id: 0,
            group: 0,
            title: ' ',
            start_time: new Date(new Date().setHours(0, 0, 0)).getTime(),
            end_time: new Date(new Date().setHours(23, 59, 59)).getTime(),
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            modalState: {
                fechaAlta: "asdasd",
                notareserva: "asdasd",
                matricula: "asdasd",
                modeloVehiculo: "asdasd",
                claseVehiculo: "asdasd",
                cantidadDias: 0,
                colaborador: "asdasd",
                flota: "asda",
                isPrereserva: false,
                estado: "asd",
                isNewRegister: false,
            },
            itemProps: {
                className: 'altura-items-inicio',
            }
    
        },];
    
        this.itemsReservasVuelaCar = [
            {
                id: 0,
                group: 0,
                title: 'item 1',
                modalState: {
                    fechaAlta: new Date().toISOString(),
                    notareserva: "itemsdsdf",
                    matricula: "",
                    modeloVehiculo: "",
                    claseVehiculo: "",
                    cantidadDias: 3,
                    colaborador: "",
                    flota: "",
                    estado: "reservado",
                    isPrereserva: false,
                    isNewRegister: false,
    
                },
    
                start_time: new Date().getTime(),
                end_time: new Date().getTime(),
                canMove: false,
                canResize: false,
                canChangeGroup: false,
    
                itemProps: {
                    'data-custom-attribute': 'Random content',
                    'aria-hidden': true,
                    onDoubleClick: () => { console.log('You clicked double!');  },
                    className: 'altura-items',
                    style: {
                        background: 'fuchsia',
                    }
                }
    
            },
    
        ];
    
        const startTime = new Date(this.itemsReservasVuelaCar[0].start_time).setHours(0, 0, 0);
        const endTime = new Date(this.itemsReservasVuelaCar[0].end_time).setHours(23, 59, 59);

        this.itemsReservasVuelaCar[0].start_time = new Date(startTime).getTime();
        this.itemsReservasVuelaCar[0].end_time = new Date(endTime).getTime();
        this.itemsReservasExterior.push(this.itemsReservasVuelaCar[0]);

        await repoStorage.insertGroupsPreReserva(this.groupsPreReserva);
        await repoStorage.insertGroupsReservaExterior(this.groupsReservaExterior);

        await repoStorage.insertItemsPreReservas(this.itemsPreReservas);
        await repoStorage.insertItemsReservaVuelaCar(this.itemsReservasVuelaCar);
        await repoStorage.insertItemsReservasExterior(this.itemsReservasExterior);

    }

    async readFromDB()
    {

        this.groupsReservaVuelaCar = await repoStorage.getGroupsReservaVuelaCar();
        this.groupsReservaExterior = await repoStorage.getGroupsReservaExterior();
        this.groupsPreReserva = await repoStorage.getGroupsPreReserva();

        this.listadoClaseVehiculos = await repoStorage.getlistadoClasesVehiculos();
        this.listadoModelosVehiculos = await repoStorage.getlistadoModelosVehiculos();

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
                "height": 50,
                "stackItems": true,
                "flota": "v",
                "matricula": `${cars[i].matricula}`
            };
            groupCreated.push(elementTemp);

        }


        groupCreated = this.orderGroupCars(groupCreated, ORDEN_LISTADO_MODELO_VEHICULOS);
        
        const arrayListadoClasesVehiculos = Array.from(listadoClasesVehiculos);
        const arrayListadoModelosVehiculos = Array.from(listadoModelosVehiculos);
        
        await repoStorage.insertGroupsReservaVuelaCar(groupCreated);
        await repoStorage.insertlistadoClasesVehiculos(arrayListadoClasesVehiculos);
        await repoStorage.insertlistadoModelosVehiculos(arrayListadoModelosVehiculos);

        // console.log("Modelos vehiculos" + JSON.stringify(arrayListadoModelosVehiculos));
        // console.log("Clases vehiculos" + JSON.stringify(arrayListadoClasesVehiculos));
        return { groupCreated, arrayListadoClasesVehiculos, arrayListadoModelosVehiculos };
    }
    

    orderGroupCars(cars: typeGroup[], ordenListadoCoches: string[]) {
        let groupOrdered: typeGroup[] = [];
        for (let i = 0; i < ordenListadoCoches.length; i++) {

            for (let j = 0; j < cars.length; j++) {

                if (cars[j].modelo === ordenListadoCoches[i]) {
                    groupOrdered.push(cars[j]);

                }

            }
        }

        return groupOrdered;
    }

    
    getLengthItemsReservasVuelaCar() {
        return this.itemsReservasVuelaCar.length;
    }

    getLengthItemsReservasExterior() {
        return this.itemsReservasExterior.length;
    }

    getLengthItemsPreReservas() {
        return this.itemsPreReservas.length;
    }

    getLengthGroupsReservaVuelaCar() {
        return this.groupsReservaVuelaCar.length;
    }

    getLengthGroupsReservaExterior() {
        return this.groupsReservaExterior.length;
    }

    getLengthGroupsPreReserva() {
        return this.groupsPreReserva.length;
    }

    fillGroupReservaVuelaCar(matricula: string, modelo: any, claseVehiculo: string, flota: string, position: number) {

        this.groupsReservaVuelaCar[position].matricula = matricula;
        this.groupsReservaVuelaCar[position].modelo = modelo;
        this.groupsReservaVuelaCar[position].clasevehiculo = claseVehiculo;
        this.groupsReservaVuelaCar[position].flota = flota;

    }

    fillItemsReservasVuelaCar(elementoReserva: IListadoPrereserva, position: number) {
        
        this.itemsReservasVuelaCar[position] = elementoReserva;

    }


    fillItemsReservasExterior(elementoReserva: IListadoPrereserva, position: number) {

        this.itemsReservasExterior[position] = elementoReserva;
    }


    fillGroupReservaExterior(matricula: string, modelo: string, claseVehiculo: string, flota: string, position: number) {
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

    insertNewElementGrupoReserva(nuevoGrupoReserva: typeGroup) {
        this.groupsReservaVuelaCar.push(nuevoGrupoReserva);
    }


    insertNewElementReservasVuelaCar(elementoReserva: IListadoPrereserva) {
        this.itemsReservasVuelaCar.push(elementoReserva);
    }

    insertNewElementReservasExterior(elementoReserva: IListadoPrereserva) {
        this.itemsReservasExterior.push(elementoReserva);
    }
    insertNewElementGrupoExterior(nuevoGrupoReserva: typeGroup) {
        this.groupsReservaExterior.push(nuevoGrupoReserva);
    }

    updateReservaExterior(elementoReserva: IListadoPrereserva, position: number) {
        this.itemsReservasExterior[position as number] = elementoReserva;
    }
    updateGroupReservaExterior(state: ContainerState, position: number) {
        this.groupsReservaExterior[position as number].matricula = state.modalState.matricula as string;
        this.groupsReservaExterior[position as number].modelo = state.modalState.modeloVehiculo as string;
        this.groupsReservaExterior[position as number].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsReservaExterior[position as number].flota = state.modalState.flota as string;
    }
    updateReservaVuelaCar(positionListado: number, elementoReserva: IListadoPrereserva) {
        this.itemsReservasVuelaCar[positionListado as number] = elementoReserva;
    }

    updateGroupReservaVuelaCar(state: ContainerState, position: number) {
        this.groupsReservaVuelaCar[position as number].matricula = state.modalState.matricula as string;
        this.groupsReservaVuelaCar[position as number].modelo = state.modalState.modeloVehiculo as string;
        this.groupsReservaVuelaCar[position as number].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsReservaVuelaCar[position as number].flota = state.modalState.flota as string;
    }
    
    reemplacePrereservas(listadoE: IListadoPrereserva[]) {
        this.itemsPreReservas = [...listadoE];
    }

    reemaplceReservasExterior(listadoE: IListadoPrereserva[]) {
        this.itemsReservasExterior = [...listadoE];
    }
    reemplaceGroupReservaExterior(grupoE: typeGroup[]) {
        this.groupsReservaExterior = [...grupoE];
    }
    reemplaceReservasVuelaCar(listadoV: IListadoPrereserva[]) {
        this.itemsReservasVuelaCar = [...listadoV];
    }
    reemplaceAllGroupReservaVuelaCar(grupoV: typeGroup[]) {
        this.groupsReservaVuelaCar = [...grupoV];
    }


    updateGroupPrereserva(state: ContainerState, position: number) {
        this.groupsPreReserva[position].matricula = state.modalState.matricula as string;
        this.groupsPreReserva[position].modelo = state.modalState.modeloVehiculo as string;
        this.groupsPreReserva[position].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsPreReserva[position].flota = state.modalState.flota as string;
    }
    removeAtItemsPrereserva(position: number) {
        this.itemsPreReservas.splice(position as number, 1);
    }
    removeAtGroupsPrereserva(position: number) {
        this.groupsPreReserva.splice(position, 1);
    }


    insertNewElementGrupoPreReserva(state: ContainerState): typeGroup {
        const grupo: typeGroup = {
            "id": state.modalState.group as number,
            "title": "title",
            "matricula": state.modalState.matricula as string,
            "vehiculo": "vehiculo",
            "clasevehiculo": state.modalState.claseVehiculo as string,
            "modelo": state.modalState.modeloVehiculo as string,
            "flota": state.modalState.flota as string,
            "height": 50,
            "srcImage": "",
            "rightTitle": "",
            "stackItems": true,

        };
        this.groupsPreReserva.push(grupo);
        return grupo;
    }

    searchGroupByMatricula(grupo: typeGroup[], matricula: string): [boolean, number] {
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



    searchExistGroupById(grupo: typeGroup[], _id: number): [boolean, number] {
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


    searchDuplicatedGroupMatricula(grupo: typeGroup[], matricula: string): [boolean, number] {
        let position = -1;
        for (let i = 0; i < grupo.length; i++) {
            if (grupo[i].matricula.toLowerCase() === matricula.toLowerCase()) {
                position = i;
                return [true, position];
            }
        }
        return [false, position];
    }


    deletePrereservadoById(_id: number)
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

    deleteGroupPrereservaById(grupo: number)
    {
        for (let i = 0; i < this.groupsPreReserva.length; i++)
        {
            if (this.groupsPreReserva[i].id === grupo)
            {
                this.groupsPreReserva.splice(i, 1);
            }
        }

    }

    deleteReservadoVuelacarById(_id: number) {

        for (let i = 0; i < this.itemsReservasVuelaCar.length; i++) {
            if (this.itemsReservasVuelaCar[i].id === _id) {
                console.log("borrado _id=" + _id);
                this.itemsReservasVuelaCar.splice(i, 1);
                break;
            }

        }

    }

    deleteReservadoExteriorById(_id: number) {

        for (let i = 0; i < this.itemsReservasExterior.length; i++) {
            if (this.itemsReservasExterior[i].id === _id) {
                console.log("borrado _id=" + _id);
                this.itemsReservasExterior.splice(i, 1);
                break;
            }

        }

    }

    getNewIdFromLastIDGroupPreserva()
    {
        const ultimaPosicion = this.groupsPreReserva.length - 1;
        let itemId = this.groupsPreReserva[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }

    getNewIdFromLastIDPreserva()
    {
        const ultimaPosicion = this.itemsPreReservas.length - 1;
        let itemId = this.itemsPreReservas[ultimaPosicion].id;
        itemId += 1;
        return itemId; 

    }


    getNewIdFromLastIDReservaVuelaCar()
    {

        const ultimaPosicion = this.itemsReservasVuelaCar.length - 1;
        let itemId = this.itemsReservasVuelaCar[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }

    getNewIdFromLastIDGroupReservaVuelaCar()
    {
        const ultimaPosicion = this.groupsReservaVuelaCar.length - 1;
        let itemId = this.groupsReservaVuelaCar[ultimaPosicion].id;
        itemId += 1;
        return itemId;

    }


}


// export let dataSchedulerGrid = new DataSchedulerGrid();

// dataSchedulerGrid.setupDb(dataCars);
// console.log("asignado")

// this.#instancePromise = (async () => {
//     const response = await fetch('./base64.wasm');
//     if (!response.ok) throw Error('...');
//     const arrayBuffer = await response.arrayBuffer();
//     return WebAssembly.instantiate(arrayBuffer);
// })();

