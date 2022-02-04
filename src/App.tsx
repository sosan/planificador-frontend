import { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
// import {  } from './datos/Data';
// import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './css/variables.css';


const App: React.FC = () => {

  const [showLoading, setShowLoading] = useState(true);

  return (
    <IonApp>
      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Cargando...'}
        duration={1000}
      />
      <IonReactRouter>
        <IonSplitPane contentId="main" disabled={true}>
          {/* <Menu />  Menu comentado */}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/Dashboard" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
