import { recordingSharp } from "ionicons/icons";
import { ContainerState, IModalErrores } from "../components/Modal";
import { typeGroup } from "../components/SchedulerGrid";
import { IListadoPrereserva, IDataVehiculos, dataCars, ORDEN_LISTADO_MODELO_VEHICULOS, DEFAULT_TEXT_MATRICULA } from "./vehiculosGeneral";

class DataSchedulerGrid
{
    
    

    groupsReservaVuelaCar: typeGroup[];
    groupsReservaExterior: typeGroup[];
    groupsPreReserva: typeGroup[];
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];
    itemsReservasVuelaCar: IListadoPrereserva[] = [];
    itemsReservasExterior: IListadoPrereserva[] = [];
    itemsPreReservas: IListadoPrereserva[] = [];

    testing: string = "";

    

    constructor(dataCarsProps: any)
    {
        
        let groupsData = this.createGroupForCars(dataCarsProps);

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
            start_time: new Date(new Date().setHours(0, 0, 0)),
            end_time: new Date(new Date().setHours(23, 59, 59)),
            canMove: true,
            canResize: true,
            canChangeGroup: true,
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
                id: 1,
                group: 1,
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

                start_time: new Date(),
                end_time: new Date(),
                canMove: true,
                canResize: true,
                canChangeGroup: true,

                itemProps: {
                    'data-custom-attribute': 'Random content',
                    'aria-hidden': true,
                    onDoubleClick: () => { console.log('You clicked double!') },
                    className: 'altura-items',
                    style: {
                        background: 'fuchsia',
                    }
                }

            },

        ];

        this.itemsReservasVuelaCar[0].start_time.setHours(0, 0, 0);
        this.itemsReservasVuelaCar[0].end_time.setHours(23, 59, 59);
        this.itemsReservasExterior.push(this.itemsReservasVuelaCar[0]);


        
    }

    createGroupForCars(cars: IDataVehiculos[]) {
        let groupCreated: typeGroup[] = [];
        let listadoModelosVehiculos: Set<string> = new Set<string>();
        let listadoClasesVehiculos: Set<string> = new Set<string>();

        for (let i = 0; i < cars.length; i++) {
            listadoClasesVehiculos.add(cars[i].clasevehiculo);
            listadoModelosVehiculos.add(cars[i].modelo);
            groupCreated.push(
                {
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
                });

        }


        groupCreated = this.orderGroupCars(groupCreated, ORDEN_LISTADO_MODELO_VEHICULOS);
        const arrayListadoClasesVehiculos = Array.from(listadoClasesVehiculos);
        const arrayListadoModelosVehiculos = Array.from(listadoModelosVehiculos);

        console.log("Modelos vehiculos" + JSON.stringify(arrayListadoModelosVehiculos));
        console.log("Clases vehiculos" + JSON.stringify(arrayListadoClasesVehiculos));
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
        this.groupsReservaExterior[position as number].modelo = state.modalState.modelo as string;
        this.groupsReservaExterior[position as number].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsReservaExterior[position as number].flota = state.modalState.flota as string;
    }
    updateReservaVuelaCar(positionListado: number, elementoReserva: IListadoPrereserva) {
        this.itemsReservasVuelaCar[positionListado as number] = elementoReserva;
    }

    updateGroupReservaVuelaCar(state: ContainerState, position: number) {
        this.groupsReservaVuelaCar[position as number].matricula = state.modalState.matricula as string;
        this.groupsReservaVuelaCar[position as number].modelo = state.modalState.modelo as string;
        this.groupsReservaVuelaCar[position as number].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsReservaVuelaCar[position as number].flota = state.modalState.flota as string;
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
        this.groupsPreReserva[position].modelo = state.modalState.modelo as string;
        this.groupsPreReserva[position].clasevehiculo = state.modalState.claseVehiculo as string;
        this.groupsPreReserva[position].flota = state.modalState.flota as string;
    }
    removeAtItemsPrereserva(position: number) {
        this.itemsPreReservas.splice(position as number, 1);
    }
    removeAtGroupsPrereserva(position: number) {
        this.groupsPreReserva.splice(position, 1);
    }


    insertNewElementGrupoPreReserva(state: ContainerState) {
        this.groupsPreReserva.push(
            {
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

            });
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





}


export let dataSchedulerGrid = new DataSchedulerGrid(dataCars);
