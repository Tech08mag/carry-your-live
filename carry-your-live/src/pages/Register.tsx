import { IonPage, IonContent } from '@ionic/react';
import RegisterCard from '../components/RegisterCard';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="dark">
        {/* Centered container */}
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
                Create your account
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Sign up to get started with your tasks
              </p>
            </div>

            {/* Register Card */}
            <RegisterCard />

            {/* Footer link */}
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
