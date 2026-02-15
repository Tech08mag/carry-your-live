import React, { useState } from 'react';
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton,
  IonRow, IonCol, IonToast, IonGrid 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const RegisterCard: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      console.log('Registering user:', { username, password });
      setToastMessage('Registration successful!');
      setShowToast(true);

      // Navigate to login after toast
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } else {
      setToastMessage('Please fill out all fields.');
      setShowToast(true);
    }
  };

  const navigateToLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <IonCard className="register-card">
        <IonCardHeader>
          <IonCardTitle>Register</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <form onSubmit={handleSubmit}>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput
                      type="text"
                      value={username}
                      onIonChange={(e) => setUsername(e.detail.value!)}
                      required
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                      required
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonButton expand="full" type="submit">
                    Register
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>

          <IonRow>
            <IonCol size="12">
              <IonButton fill="clear" color="primary" onClick={navigateToLogin}>
                Already have an account? Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
        position="bottom"
      />
    </>
  );
};

export default RegisterCard;
