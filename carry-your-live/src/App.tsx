import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ToDo from './pages/To-Do';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateToDo from './pages/CreateToDo';

/* Ionic CSS imports */
import '@ionic/react/css/core.css';

/* Basic CSS for Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional Ionic utilities */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Tailwind CSS */
import './index.css'; // Make sure index.css has Tailwind directives

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Default route: login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/create-todo">
          <CreateToDo />
        </Route>
        <Route exact path="/todo">
          <ToDo />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
