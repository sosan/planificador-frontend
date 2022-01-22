import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,

  IonItemGroup,
  IonItemDivider,
  IonRouterOutlet,
  IonImg

} from '@ionic/react';



import { useLocation } from 'react-router-dom';
import { 
  IItemCategoria,
  categoriasContratos,
  categoriasInformes,
  categoriasFacturacion,
  categoriasMultas,
  categoriasPlaning
} from "../datos/listadoCategorias";
import '../css/Menu.css';

const Menu: React.FC = () => {
  const location = useLocation();
  
  const GetListCategories = (categorias: IItemCategoria[]) =>
  {
    
    const listadoCategorias = [];
    for (const index in categorias)
    {
      const elemento = categorias[index];
      // console.log("index=" + index + "listado=" + elemento);
  
      listadoCategorias.push(
          <IonMenuToggle key={index} autoHide={false}>
            <IonItem className={location.pathname === elemento.url ? 'selected' : ''} routerLink={elemento.url} routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" ios={elemento.iosIcon} md={elemento.mdIcon} />
              <IonLabel>{elemento.title}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        );
  
    }

    return listadoCategorias;
  };

  const listadoPlaning = GetListCategories(categoriasPlaning);
  const listadoContratos = GetListCategories(categoriasContratos);
  const listadoFacturacion = GetListCategories(categoriasFacturacion);
  const listadoInformes = GetListCategories(categoriasInformes);
  const listadoMultas = GetListCategories(categoriasMultas);



  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        
        <IonList id="inbox-list">
          <IonListHeader className=" noselect"  >PLANIFICADOR</IonListHeader>
          <IonNote className=" noselect" >RentCarMallorca</IonNote>

          <IonMenuToggle key={"dash"} autoHide={false}>
            <IonItem className={location.pathname === "/page/Dashboard" ? 'selected' : 'noselected'} routerLink={"/page/Dashboard"} routerDirection="none" lines="none" detail={false}>
              <IonImg src={"./assets/icon/icon.png"} className="icono-logo" />
              <IonLabel>Menu Principal</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Planing</IonLabel>
            </IonItemDivider>
            {listadoPlaning }
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Contratos</IonLabel>
            </IonItemDivider>
            {listadoContratos}
          </IonItemGroup>


          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Facturacion</IonLabel>
            </IonItemDivider>
            {listadoFacturacion}
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Informes</IonLabel>
            </IonItemDivider>
            {listadoInformes}
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Multas</IonLabel>
            </IonItemDivider>
            {listadoMultas}
          </IonItemGroup>

        </IonList>

      </IonContent>
    </IonMenu>
  );

};

export default Menu;
