import React, { ReactElement } from 'react';
import {
    archiveOutline,
    archiveSharp,
    heartOutline,
    heartSharp,
    mailOutline,
    mailSharp,
    paperPlaneOutline,
    paperPlaneSharp,
    trashOutline,
    trashSharp,

} from 'ionicons/icons';

import imagenPlanning from "../images/PlanningIMG.png";
import imagenContrato from "../images/1_contrato_IMG.png";
import imagenDevolucion from "../images/devolucion_IMG.png";
import imagenDevoluciones from "../images/Devoluciones_IMG.png";
import imagenFacturas from "../images/Facturas_IMG.png";
import imagenInformes from "../images/informes_IMG.png";
import imagenMultas from "../images/Multas_IMG.png";


import CompletarReservaContainer from "../components/Completar_reservaContainer";

// import DashboardContainer from "../pages/DashboardContainer";
import SubalquileresContainer from "../components/SubalquileresContainer";
import MotosContainer from "../components/MotosContainer";

import PrereservarContainer from "../components/PrereservarContainer";

import { MenuContratos } from '../pages/MenuContratosContainer';
import { IngresarContrato } from '../components/IngresarContratoContainer';
import { ModificarContrato } from '../components/ModificarContratoContainer';

import { SchedulerContainer } from '../components/SchedulerGrid';
import { FlotaManager } from '../pages/ManagerFlota';


// 1.Planinging
//  Preservas
//  Completar Preservar
//  Flota
//  Moto
//  SubAlquileres

// 2. Contratos
// 3. facturacion

// 4. Multas
// 5. Informes



export interface IItemCategoria {
    title?: string;
    image?: string;
    cardSubtitle?: string;
    cardTitle?: string;
    cardContent: string[];
    colorBoton?: string;
    colorBackground?: string;
    url?: string;
    containerId?: string;
    container: ReactElement;
    iosIcon?: string;
    mdIcon?: string;
    visibleInMenu?: boolean;
}



// imagenDevolucion
// 
// 
// 
// 


export const categoriasDashboard: IItemCategoria[] = [

    {
        title: 'Planning',
        image: imagenPlanning,

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Planning",
        cardContent: ["Pre Reserva", "Reserva VuelaCar", "Completar Pre reserva", "Consulta - Modifica - Elimina" ],
        url: '/page/planning',
        containerId: "planning",
        container: <></>,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Devoluciones',
        image: imagenDevolucion,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Devoluciones",
        cardContent: ["Devoluciones de HOY"],
        url: '/page/devolucion',
        containerId: "Devolucion",
        container: <></>,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Menu Flota Planning',
        image: imagenDevoluciones,
        visibleInMenu: false,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Menu Flota Planning",
        cardContent: ["Alta de Matrículas", "Baja de Matrículas"],
        url: '/page/flota-manager',
        containerId: "flota-manager",
        container: <FlotaManager />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Contratos',
        image: imagenContrato,

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Contratos",
        cardContent: ["Ingresar Contratos", "Modificar Contratos"],
        url: '/page/contratos',
        containerId: "contratos",
        container: <></>,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Multas',
        image: imagenMultas,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Multas",
        cardContent: ["Localizar multas",],
        url: '/page/multas',
        containerId: "Multas",
        container: <></>,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Facturas',
        image: imagenFacturas,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Facturas",
        cardContent: ["Facturas", ],
        url: '/page/facturas',
        containerId: "Facturas",
        container: <></>, //<PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
   
    {
        title: 'Informes',
        image: imagenInformes,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Informes",
        cardContent: ["Informes", ],
        url: '/page/informes',
        containerId: "Informes",
        container: <></>, 
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
  
   

];

export const categoriasPlaning: IItemCategoria[] = [
    {
        title: 'Planning',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Planning",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/planning',
        containerId: "planning",
        container: <SchedulerContainer name="schedulercontainer" />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Completar Reserva',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Completar Reserva",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/completar_reserva',
        containerId: "Completar_reserva",
        container: <></>, //<CompletarReservaContainer />,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Flota',
        url: '/page/flota',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Flota",
        containerId: "Flota",
        container: <></>, //<FlotaContainer />,
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Motos',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Motos",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/motos',
        containerId: "Motos",
        container: <></>, //<MotosContainer />,
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'SubAlquileres',
        image: "https://via.placeholder.com/180x80",

        cardTitle: "SubAlquileres",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        url: '/page/subalquileres',
        containerId: "Subalquileres",
        container: <></>, //<SubalquileresContainer />,
        iosIcon: trashOutline,
        mdIcon: trashSharp
    }

];


export const categoriasContratos: IItemCategoria[] = [
    
    
    {
        title: 'Menu Contratos',
        image: "https://via.placeholder.com/180x80",
        visibleInMenu: false,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Menu Contratos",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/contratos',
        containerId: "contratos",
        container: <MenuContratos />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    
    {
        title: 'Ingresar Contrato',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Ingresar Contrato",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/ingresarcontrato',
        containerId: "IngresarContrato",
        container: <MenuContratos />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Modificar Contrato',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Modificar Contrato",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/modificarcontrato',
        containerId: "ModificarContrato",
        container: <MenuContratos />,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    
];


// --------------
export const categoriasFlotaManager: IItemCategoria[] = [

    {
        title: 'Menu Flota',
        image: "https://via.placeholder.com/180x80",
        visibleInMenu: false,
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Menu Flota",
        cardContent: ["Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", ],
        url: '/page/flota-manager',
        containerId: "flota-manager",
        container: <FlotaManager />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },

];
// --------

export const categoriasFacturacion: IItemCategoria[] = [

   

];

export const categoriasMultas: IItemCategoria[] = [

    


];


export const categoriasInformes: IItemCategoria[] = [
   
   

];

export let titulosCategorias: Record<string, string | any> = {
    "Dashboard": "Sistema Gestión de Alquileres"
};
