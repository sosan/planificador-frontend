import React, { ReactElement } from 'react';
import DashboardContainer from "../pages/DashboardContainer";
import * as listadoCategorias from "../datos/listadoCategorias";


const FillSelectedCategory = (categoria: listadoCategorias.IItemCategoria[]) =>
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
        
        listadoCategorias.titulosCategorias[keyTitulosCategoria] = elemento.title?.toString() as string;
        routes[keyRoutes] = elemento.container as ReactElement;
        // console.log("key=" + key);
        // console.log("123=" + JSON.stringify(elemento.container));
    }

    return routes;

};

export const FillAllRoutes = () =>
{

    const categoriasPlaning = FillSelectedCategory(listadoCategorias.categoriasPlaning);
    const categoriasContratos = FillSelectedCategory(listadoCategorias.categoriasContratos);
    const categoriasFacturacion = FillSelectedCategory(listadoCategorias.categoriasFacturacion);
    const categoriasInformes = FillSelectedCategory(listadoCategorias.categoriasInformes);
    const categoriasMultas = FillSelectedCategory(listadoCategorias.categoriasMultas);
    const categoriasFlotaManager = FillSelectedCategory(listadoCategorias.categoriasFlotaManager);

    let routesContainer: Record<string, ReactElement> = {
        ...categoriasPlaning,
        ...categoriasContratos,
        ...categoriasFacturacion,
        ...categoriasInformes,
        ...categoriasMultas,
        ...categoriasFlotaManager
        
    };
    

    routesContainer["dashboard"] = <DashboardContainer />;

    // console.log("JSON=" + JSON.stringify(routesContainer));
    return routesContainer;
};
