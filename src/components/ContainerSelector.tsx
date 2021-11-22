import '../css/ContainerSelector.css';
import * as categorias from "./Categorias";
import React, { ReactElement } from 'react';
import { IonTitle, IonButton, IonSegment, IonSegmentButton, IonToolbar, IonIcon, IonMenuButton, IonText } from '@ionic/react';


const routesContainer = categorias.FillAllRoutes();



interface ContainerProps {
  name: string;
}

let currentContent: ReactElement;
let currentTitle: ReactElement;

export const ContainerSelector: React.FC<ContainerProps> = ({ name }) => {

  currentContent = routesContainer[name.toLowerCase()];
  
  return (
    <>
      {currentContent}
    </>
  );
};

export const TitleSelector: React.FC<ContainerProps> = ({ name }) => {

  const key = `${name.toLowerCase()}Title`;
  currentTitle = routesContainer[key];

  return (
    <div className="izquierda padding-titulo">
      
      <IonText>{name}</IonText>
      {/* <IonButton href="#">HOY</IonButton>
      <div className="enlinea">
        <IonButton href="#">&lt;</IonButton>
        <IonText className="noselect textoFechaTitle"> 10 NOV 2021 - 20 NOV 2021 </IonText>
        <IonButton href="#">&gt;</IonButton>

      </div>

      <div className="enlinea">
        <IonButton href="#">1 SEMANA</IonButton>
        <IonButton href="#">2 SEMANAS</IonButton>
        <IonButton href="#">MES</IonButton>

      </div>
       */}
    </div>
  );

};
