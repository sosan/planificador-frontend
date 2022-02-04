import '../css/ContainerSelector.css';
import * as categorias from "./Categorias";
import React, { ReactElement } from 'react';
// import { IonText } from '@ionic/react';


const routesContainer = categorias.FillAllRoutes();



interface ContainerProps {
  name: string;
}

type ContainerState = {
  borrado: boolean;
}


let currentContent: ReactElement;
let currentTitle: ReactElement;

export class ContainerSelector extends React.Component<ContainerProps, ContainerState>
{

  render()
  {
    currentContent = routesContainer[this.props.name.toLowerCase()];
    return (
      <>
        {currentContent}
      </>
    );

  }
}

export const TitleSelector: React.FC<ContainerProps> = ({ name }) => {

  // const key = `${name.toLowerCase()}Title`;
  // currentTitle = routesContainer[key];
  
  // <IonButton href="#">HOY</IonButton>
  // <div className="enlinea">
  //   <IonButton href="#">&lt;</IonButton>
  //   <IonText className="noselect textoFechaTitle"> 10 NOV 2021 - 20 NOV 2021 </IonText>
  //   <IonButton href="#">&gt;</IonButton>

  // </div>

  // <div className="enlinea">
  //   <IonButton href="#">1 SEMANA</IonButton>
  //   <IonButton href="#">2 SEMANAS</IonButton>
  //   <IonButton href="#">MES</IonButton>

  // </div>
   
  return (
    <div className="centrado-flex">
      <h1 className='titulo-central'>{name}</h1>
    </div>
  );

};
