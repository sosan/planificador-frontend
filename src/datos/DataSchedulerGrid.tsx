import { recordingSharp } from "ionicons/icons";
import { ContainerState } from "../components/Modal";
import { typeGroup } from "../components/SchedulerGrid";
import { IListadoPrereserva, IDataVehiculos, dataCars, ORDEN_LISTADO_MODELO_VEHICULOS, DEFAULT_TEXT_MATRICULA } from "./vehiculosGeneral";

class DataSchedulerGrid
{
    deleteDuplicatedReservas(state: ContainerState)
    {

        //TODO: añadirle consulta fechas
        /// TODO: falta generalizarlo y realizar lo mismo con el itemsREservasExterior
        let [existGroup, positiongroup] = this.searchDuplicatedGroupMatricula(this.groupsPreReserva, state.modalState.matricula as string);
        let existElement = state.modalState.matricula as string in this.itemsPreReservas;

        if (existElement === true && existGroup === true)
        {
            delete this.itemsPreReservas[state.modalState.matricula as string];
            existElement = state.modalState.matricula as string in this.itemsPreReservas;
            if (existElement === false)
            {
                // no hay mas elementos por tanto el grupo tiene que borrarse
                let [existGroup, positiongroup] = this.searchExistGroupById(this.groupsPreReserva, state.modalState.group as number);
                if (existGroup === true)
                {
                    this.groupsPreReserva.splice(positiongroup as number, 1);
                }

            }
        }

    }

    deleteDuplicatedSelectedItem()
    {

        

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

    

    groupsReservaVuelaCar: typeGroup[];
    groupsReservaExterior: typeGroup[];
    groupsPreReserva: typeGroup[];
    listadoClaseVehiculos: string[];
    listadoModelosVehiculos: string[];
    itemsReservasVuelaCar: Record<string, IListadoPrereserva>;
    itemsReservasExterior: Record<string, IListadoPrereserva>;
    itemsPreReservas: Record<string, IListadoPrereserva>;

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

        this.itemsPreReservas = {
            "0": {
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

            }

        };

        // this.itemsPreReservas = [{
        //     id: 0,
        //     group: 0,
        //     title: ' ',
        //     start_time: new Date(new Date().setHours(0, 0, 0)),
        //     end_time: new Date(new Date().setHours(23, 59, 59)),
        //     canMove: true,
        //     canResize: true,
        //     canChangeGroup: true,
        //     modalState: {
        //         fechaAlta: "asdasd",
        //         notareserva: "asdasd",
        //         matricula: "asdasd",
        //         modeloVehiculo: "asdasd",
        //         claseVehiculo: "asdasd",
        //         cantidadDias: 0,
        //         colaborador: "asdasd",
        //         flota: "asda",
        //         isPrereserva: false,
        //         estado: "asd",
        //         isNewRegister: false,
        //     },
        //     itemProps: {
        //         className: 'altura-items-inicio',
        //     }

        // },];

        this.itemsReservasVuelaCar = {
            "1": {
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
        }
        
        // this.itemsReservasVuelaCar = [
        //     {
        //         id: 1,
        //         group: 1,
        //         title: 'item 1',
        //         modalState: {
        //             fechaAlta: new Date().toISOString(),
        //             notareserva: "itemsdsdf",
        //             matricula: "",
        //             modeloVehiculo: "",
        //             claseVehiculo: "",
        //             cantidadDias: 3,
        //             colaborador: "",
        //             flota: "",
        //             estado: "reservado",
        //             isPrereserva: false,
        //             isNewRegister: false,

        //         },

        //         start_time: new Date(),
        //         end_time: new Date(),
        //         canMove: true,
        //         canResize: true,
        //         canChangeGroup: true,

        //         itemProps: {
        //             'data-custom-attribute': 'Random content',
        //             'aria-hidden': true,
        //             onDoubleClick: () => { console.log('You clicked double!') },
        //             className: 'altura-items',
        //             style: {
        //                 background: 'fuchsia',
        //             }
        //         }

        //     },

        // ];

        this.itemsReservasVuelaCar["1"].start_time.setHours(0, 0, 0);
        this.itemsReservasVuelaCar["1"].end_time.setHours(23, 59, 59);

        this.itemsReservasExterior = {
            "1": {...this.itemsReservasVuelaCar["1"] }
        };
        // this.itemsReservasExterior.push(this.itemsReservasVuelaCar["1"]);


        
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
        return Object.keys(this.itemsReservasVuelaCar).length;
    }

    getLengthItemsReservasExterior() {
        return Object.keys(this.itemsReservasExterior).length;
    }

    getLengthItemsPreReservas() {
        return Object.keys(this.itemsPreReservas).length;
    }

    getLengthGroupsReservaVuelaCar() {
        return Object.keys(this.groupsReservaVuelaCar).length;
    }

    getLengthGroupsReservaExterior() {
        return Object.keys(this.groupsReservaExterior).length;
    }

    getLengthGroupsPreReserva() {
        return Object.keys(this.groupsPreReserva).length;
    }

    fillGroupReservaVuelaCar(matricula: string, modelo: any, claseVehiculo: string, flota: string, position: number) {

        this.groupsReservaVuelaCar[position].matricula = matricula;
        this.groupsReservaVuelaCar[position].modelo = modelo;
        this.groupsReservaVuelaCar[position].clasevehiculo = claseVehiculo;
        this.groupsReservaVuelaCar[position].flota = flota;

    }

    fillItemsReservasVuelaCar(elementoReserva: IListadoPrereserva, matricula: string) {
        
        this.itemsReservasVuelaCar[matricula] = elementoReserva;

    }


    fillItemsReservasExterior(elementoReserva: IListadoPrereserva, matricula: string) {

        this.itemsReservasExterior[matricula] = elementoReserva;
    }


    fillGroupReservaExterior(matricula: string, modelo: string, claseVehiculo: string, flota: string, position: number) {
        this.groupsReservaExterior[position].matricula = matricula;
        this.groupsReservaExterior[position].modelo = modelo;
        this.groupsReservaExterior[position].clasevehiculo = claseVehiculo;
        this.groupsReservaExterior[position].flota = flota;
    }


}


export let dataSchedulerGrid = new DataSchedulerGrid(dataCars);

