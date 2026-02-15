import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonRow, IonCol, IonToast, IonGrid } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LoginCard: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username && password) {
      console.log('Logging in with:', username, password);
      setToastMessage('Login successful!');
      setShowToast(true);
      history.push('/home');
    } else {
      setToastMessage('Please enter valid credentials.');
      setShowToast(true);
    }
  };

  const navigateToSignup = () => {
    history.push('/register');
  };

  return (
    <>
      <IonCard className="login-card">
        <IonCardHeader>
          <IonCardTitle>Login</IonCardTitle>
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
                    Login
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
          <IonRow>
            <IonCol size="12">
              <IonButton fill="clear" color="primary" onClick={navigateToSignup}>
                Don't have an account? Sign Up
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

export default LoginCard;
