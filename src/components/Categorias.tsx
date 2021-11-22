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

import React, { ReactElement } from 'react';

import Completar_reservaContainer from "./Completar_reservaContainer";
import PrereservarContainer from "./PrereservarContainer";
import DashboardContainer from "./DashboardContainer";
import SubalquileresContainer from "./SubalquileresContainer";
import FlotaContainer from "./FlotaContainer";
import MotosContainer from "./MotosContainer";


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



// export let routesContainer: Record<string, string> = {
//     "Dashboard": "Dashboard",
// };

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

const FillSelectedCategory = (categoria: IItemCategoria[]) =>
{

    let routes: Record<string, ReactElement> = { };

    for (let index in categoria)
    {
        const elemento = categoria[index];
        // console.log("OLE=" + JSON.stringify(elemento));
        
        const keyRoutes = elemento.containerId?.toLowerCase() as string;
        const keyTitulosCategoria = elemento.url?.toString().split("/")[2] as string;

        // console.log("keyTitulosCategoria" + keyTitulosCategoria);
        // console.log("keyRoutes" + keyRoutes);
        
        titulosCategorias[keyTitulosCategoria] = elemento.title?.toString() as string;
        routes[keyRoutes] = elemento.container as ReactElement;
        // console.log("key=" + key);
        // console.log("123=" + JSON.stringify(elemento.container));
    }

    return routes;

};

export const FillAllRoutes = () =>
{

    let routesContainer: Record<string, ReactElement> = {};

    routesContainer = FillSelectedCategory(categoriasPlaning);

    routesContainer["dashboard"] = <DashboardContainer />;

    // console.log("JSON=" + JSON.stringify(routesContainer));
    return routesContainer;
};
