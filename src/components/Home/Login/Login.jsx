import { authLogin } from '../../../services/Auth';
import { backgroundImage } from './LoginList';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { app } from '../../../credentials';

const auth = getAuth(app);

export default function LoginComponent({ setLogin, toast }) {
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      window.location.href = './Home';
    }
  });
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    authLogin(data.email, data.password)
      .then(() => {
        toast.success('Success Notification !', {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.href = './Home';
      })
      .catch(() => {
        toast.error('Error en la credenciales', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <div className="flex min-h-full relative">
      <div className="lg:absolute lg:h-full z-30 flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 shadow sm:rounded-lg backdrop-blur-xl bg-slate-100/60">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="w-auto h-14 mx-auto" src="LogoWhiteOutCircle.png" alt="Art Book" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Inicia sesion con tu cuenta</h2>
            <p className="mt-2 text-sm text-gray-600">
              O{' '}
              <button onClick={() => setLogin(false)} className="font-medium text-stone-500 hover:text-stone-600">
                Crea tu cuenta
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-stone-500 focus:outline-none focus:ring-stone-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-stone-500 focus:outline-none focus:ring-stone-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* 
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-stone-600 focus:ring-stone-500" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div> */}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                  >
                    Inicia sesion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-0 flex-1 lg:block">
        <img className="absolute inset-0 h-full w-full object-cover" src={backgroundImage[Math.floor(Math.random() * (backgroundImage.length - 0) + 0)]} alt="" />
      </div>
    </div>
  );
}
