import {
  IonHeader,
  IonIcon,
  IonPage,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonToolbar,
  IonTabs,
  IonTitle,
  IonContent,
} from '@ionic/react';
import { checkmark, calendar, settings } from 'ionicons/icons';
import ToDo from './ToDo';

function Tabs() {
  return (
    <IonTabs>
      <IonTab tab="todo">
        <IonPage id="todo-page">
          <IonHeader>
            <IonToolbar>
              <IonTitle>To Do</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <ToDo />
          </IonContent>
        </IonPage>
      </IonTab>
      <IonTab tab="radio">
        <IonPage id="radio-page">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Radio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="example-content">Radio content</div>
          </IonContent>
        </IonPage>
      </IonTab>
      <IonTab tab="calendar">
        <IonPage id="calendar-page">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Calendar</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="example-content">Calendar content</div>
          </IonContent>
        </IonPage>
      </IonTab>
      <IonTab tab="settings">
        <IonPage id="settings-page">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Settings</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="example-content">Settings content</div>
          </IonContent>
        </IonPage>
      </IonTab>

      <IonTabBar slot="bottom">
        <IonTabButton tab="todo">
          <IonIcon icon={checkmark} />
          Do To
        </IonTabButton>
        <IonTabButton tab="calendar">
          <IonIcon icon={calendar} />
          Calendar
        </IonTabButton>
        <IonTabButton tab="settings">
          <IonIcon icon={settings} />
          Settings
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default Tabs;
