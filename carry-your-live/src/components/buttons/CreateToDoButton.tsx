import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

function CreateToDoButton() {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end" className="mb-8 mr-6">
      <IonFabButton color="primary" routerLink="/create-todo">
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
}
export default CreateToDoButton;


