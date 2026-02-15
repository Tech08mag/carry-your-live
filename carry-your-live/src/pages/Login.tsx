import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginCard from '../components/LoginCard'; // Ensure path is correct

const Login: React.FC = () => {
  return (
    <IonPage>
      {/* Main content */}
      <IonContent fullscreen color="dark">
        {/* Condensed header for scroll behavior */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Centered login card container */}
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm">
            {/* Logo and header */}
            <div className="text-center mb-6">
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

            {/* Login Card */}
            <LoginCard />

            {/* Footer link */}
            <p className="mt-4 text-center text-sm text-gray-400">
              Don’t have an account?{' '}
              <a
                href="/register"
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
