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


import Completar_reservaContainer from "../components/Completar_reservaContainer";
import PrereservarContainer from "../components/PrereservarContainer";
import DashboardContainer from "../components/DashboardContainer";
import SubalquileresContainer from "../components/SubalquileresContainer";
import FlotaContainer from "../components/FlotaContainer";
import MotosContainer from "../components/MotosContainer";




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
}

export const categoriasDashboard: IItemCategoria[] = [

    {
        title: 'Planning',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Planning",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/prereservar',
        containerId: "Planning",
        container: <PrereservarContainer />,
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
        containerId: "Contratos",
        container: <PrereservarContainer />,
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
        container: <PrereservarContainer />,
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
        container: <PrereservarContainer />,
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
        container: <PrereservarContainer />,
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
        container: <PrereservarContainer />,
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },

];

export const categoriasPlaning: IItemCategoria[] = [
    {
        title: 'Pre-Reservar',
        image: "https://via.placeholder.com/180x80",

        colorBoton: "colorBotonCategorias",
        colorBackground: "colorBackgroundCategorias",
        cardTitle: "Pre-Reservar",
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
        cardTitle: "Completar Reserva",
        cardContent: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        url: '/page/completar_reserva',
        containerId: "Completar_reserva",
        container: <Completar_reservaContainer />,
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
        cardTitle: "Motos",
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

        cardTitle: "SubAlquileres",
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


export const categoriasContratos: IItemCategoria[] = [
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
        container: <Completar_reservaContainer />,
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
        container: <Completar_reservaContainer />,
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
        container: <Completar_reservaContainer />,
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
        container: <Completar_reservaContainer />,
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
