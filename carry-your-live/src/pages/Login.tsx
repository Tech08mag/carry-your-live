import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import LoginCard from '../components/LoginCard'; 
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();

  const handleLoginSuccess = () => {
    history.push('/todo'); // navigate here
  };

  return (
    <IonPage>
      <IonContent fullscreen color="dark">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex min-h-screen items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm text-center">
            <div className="mb-6">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="mx-auto h-12 w-auto"
              />
              <h2 className="mt-4 text-2xl font-bold text-[#e0c7ff]">
                Sign in to your account
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Enter your credentials to continue
              </p>
            </div>

            {/* Pass callback */}
            <LoginCard onLoginSuccess={handleLoginSuccess} />

            <p className="mt-4 text-sm text-gray-400">
              Don’t have an account?{' '}
              <button
                onClick={() => history.push("/register")}
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
