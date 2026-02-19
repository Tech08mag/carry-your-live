import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonToast,
  IonGrid,
} from '@ionic/react';

interface LoginCardProps {
  onLoginSuccess: () => void; // callback from parent
}

const LoginCard: React.FC<LoginCardProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      setToastMessage('Login successful!');
      setShowToast(true);

      setTimeout(() => {
        onLoginSuccess(); // let parent handle navigation
      }, 1000);
    } else {
      setToastMessage('Please fill out all fields.');
      setShowToast(true);
    }
  };

  return (
    <IonCard
      style={{
        background: 'linear-gradient(135deg, #2b0a3c, #3f0f6d, #5a1b9a)',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(90,27,154,0.4)',
        overflow: 'hidden',
      }}
    >
      <IonCardContent>
        <form onSubmit={handleSubmit}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                  placeholder="Username"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #6a1b9a',
                    backgroundColor: 'rgba(40,30,60,0.9)',
                    color: '#e0c7ff',
                    marginBottom: '12px',
                  }}
                />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  placeholder="Password"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #6a1b9a',
                    backgroundColor: 'rgba(40,30,60,0.9)',
                    color: '#e0c7ff',
                    marginBottom: '16px',
                  }}
                />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <IonButton
                  expand="full"
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                    color: '#e0c7ff',
                    fontWeight: 600,
                    borderRadius: '12px',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(110,27,154,0.4)',
                  }}
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          position="bottom"
          color="tertiary"
        />
      </IonCardContent>
    </IonCard>
  );
};

export default LoginCard;
