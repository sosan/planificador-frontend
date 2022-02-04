import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import {ContainerSelector, TitleSelector} from '../components/ContainerSelector';
import { titulosCategorias } from "../datos/listadoCategorias";

import '../css/Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const titulo = titulosCategorias[name];

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader> */}

      <IonContent fullscreen>
        <TitleSelector name={titulo} />
        <ContainerSelector name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
