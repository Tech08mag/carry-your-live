import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ToDo from './pages/ToDo';
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
      <Route exact path="/" render={() => <Redirect to="/login" />} />

      <Route
        exact
        path="/login"
        render={() => <Login key="login" />}
      />

      <Route
        exact
        path="/register"
        render={() => <Register key="register" />}
      />

      <Route
        exact
        path="/create-todo"
        render={() => <CreateToDo key="create-todo" />}
      />

      <Route
        exact
        path="/todo"
        render={() => <ToDo key="todo" />}
      />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
