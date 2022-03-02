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

import CompletarReservaContainer from "../components/Completar_reservaContainer";

// import DashboardContainer from "../pages/DashboardContainer";
import SubalquileresContainer from "../components/SubalquileresContainer";
import FlotaContainer from "../components/FlotaContainer";
import MotosContainer from "../components/MotosContainer";

import PrereservarContainer from "../components/PrereservarContainer";

import { MenuContratos } from '../pages/MenuContratosContainer';
import { IngresarContrato } from '../components/IngresarContratoContainer';
import { ModificarContrato } from '../components/ModificarContratoContainer';

import { SchedulerContainer } from '../components/SchedulerGrid';

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
    cardContent?: string;
    colorBoton?: string;
    colorBackground?: string;
    url?: string;
    containerId?: string;
    container: ReactElement;
    iosIcon?: string;
    mdIcon?: string;
    visibleInMenu?: boolean;
}

export const categoriasDashboard: IItemCategoria[] = [

    {
        title: 'Planning',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Planning",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/planning',
        containerId: "planning",
        container: <></>,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Contratos',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Contratos",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/contratos',
        containerId: "contratos",
        container: <></>, //<PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Facturas',
        image: "https://via.placeholder.com/180x80",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Facturas",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/facturas',
        containerId: "Facturas",
        container: <></>, //<PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Multas',
        image: "https://via.placeholder.com/180x80",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Multas",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/multas',
        containerId: "Multas",
        container: <></>, //<PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Informes',
        image: "https://via.placeholder.com/180x80",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Informes",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/informes',
        containerId: "Informes",
        container: <></>, //<PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Devolucion',
        image: "https://via.placeholder.com/180x80",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Devolucion",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/devolucion',
        containerId: "Devolucion",
        container: <></>, // <PrereservarContainer />,
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Motos',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Motos",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
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
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/modificarcontrato',
        containerId: "ModificarContrato",
        container: <MenuContratos />,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    
];



export const categoriasFacturacion: IItemCategoria[] = [

    {
        title: 'Pre-Reservar',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/prereservar',
        containerId: "Prereservar",
        container: <PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Completar Reserva',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/completar_reserva',
        containerId: "Completar_reserva",
        container: <CompletarReservaContainer />,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Flota',
        url: '/page/flota',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        containerId: "Flota",
        container: <FlotaContainer />,
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Motos',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/motos',
        containerId: "Motos",
        container: <MotosContainer />,
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'SubAlquileres',
        image: "https://via.placeholder.com/180x80",

        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        url: '/page/subalquileres',
        containerId: "Subalquileres",
        container: <SubalquileresContainer />,
        iosIcon: trashOutline,
        mdIcon: trashSharp
    }


];

export const categoriasMultas: IItemCategoria[] = [

    {
        title: 'Pre-Reservar',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/prereservar',
        containerId: "Prereservar",
        container: <PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Completar Reserva',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/completar_reserva',
        containerId: "Completar_reserva",
        container: <CompletarReservaContainer />,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Flota',
        url: '/page/flota',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        containerId: "Flota",
        container: <FlotaContainer />,
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Motos',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/motos',
        containerId: "Motos",
        container: <MotosContainer />,
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'SubAlquileres',
        image: "https://via.placeholder.com/180x80",

        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        url: '/page/subalquileres',
        containerId: "Subalquileres",
        container: <SubalquileresContainer />,
        iosIcon: trashOutline,
        mdIcon: trashSharp
    }



];


export const categoriasInformes: IItemCategoria[] = [
    {
        title: 'Pre-Reservar',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/prereservar',
        containerId: "Prereservar",
        container: <PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Completar Reserva',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/completar_reserva',
        containerId: "Completar_reserva",
        container: <CompletarReservaContainer />,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Flota',
        url: '/page/flota',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        containerId: "Flota",
        container: <FlotaContainer />,
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Motos',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/motos',
        containerId: "Motos",
        container: <MotosContainer />,
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'SubAlquileres',
        image: "https://via.placeholder.com/180x80",

        cardTitle: "Titulo",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        url: '/page/subalquileres',
        containerId: "Subalquileres",
        container: <SubalquileresContainer />,
        iosIcon: trashOutline,
        mdIcon: trashSharp
    }




];

export let titulosCategorias: Record<string, string | any> = {
    "Dashboard": "Dashboard"
};
