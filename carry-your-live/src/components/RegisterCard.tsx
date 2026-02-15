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
import { useHistory } from 'react-router-dom';

const RegisterCard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setToastMessage('Registration successful!');
      setShowToast(true);
      setTimeout(() => history.push('/login'), 2000);
    } else {
      setToastMessage('Please fill out all fields.');
      setShowToast(true);
    }
  };

  return (
    <>
      <IonCard
        style={{
          background: 'linear-gradient(135deg, #3b0a45, #4e137d, #6a1b9a)',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(110,27,154,0.4)',
        }}
      >
        <IonCardContent>
          <form onSubmit={handleSubmit}>
            <IonGrid>
              {/* Username */}
              <IonRow>
                <IonCol size="12">
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    required
                    placeholder="Username"
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

              {/* Password */}
              <IonRow>
                <IonCol size="12">
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                    placeholder="Password"
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

              {/* Register Button */}
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
                      boxShadow: '0 2px 8px rgba(110,27,154,0.3)',
                    }}
                  >
                    Register
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </IonCardContent>
      </IonCard>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
        position="bottom"
        color="tertiary"
      />
    </>
  );
};

export default RegisterCard;
