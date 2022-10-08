import { backgroundImage } from './LoginList';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../../../credentials';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const db = getFirestore(app);
const auth = getAuth(app);

const EMAIL = process.env.REACT_APP_MAIL_PUBLIC_ID;
const TEMPLATE1 = process.env.REACT_APP_TEMPLATE_PUBLIC_ID;
const USER = process.env.REACT_APP_USER_PUBLIC_ID;

export default function RegisterComponent({ setLogin, toast }) {
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      window.location.href = './Home';
    }
  });
  const [data, setData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const sendEmail = () => {
    emailjs
      .send(
        EMAIL,
        TEMPLATE1,
        {
          email: data.email,
        },
        USER
      )
      .then(
        () => {
          toast.success('Correo enviado', {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
        () => {
          toast.error('Ha ocurrido un error, Intentelo mas tarde', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
  };
  const createAcount = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success('Usuario Creado', {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.href = './Home';
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.password !== data.repeatPassword) {
      return toast.warning('Las contraseñas no coinciden', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const dataBd = { email: data.email, userName: '', urlImage: '', status: '' };

    try {
      await addDoc(collection(db, 'UserMetaData'), {
        ...dataBd,
      });
      toast.success('Usuario Registrado', {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log('ok');
      sendEmail();
      createAcount();
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-full relative">
      <div className="lg:absolute lg:h-full z-30 flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 shadow sm:rounded-lg backdrop-blur-xl bg-slate-100/60">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="w-auto h-14 mx-auto" src="LogoWhiteOutCircle.png" alt="Art Book" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Registarte con tu correo</h2>
            <p className="mt-2 text-sm text-gray-600">
              O{' '}
              <button onClick={() => setLogin(true)} className="font-medium text-stone-500 hover:text-stone-600">
                Inicia sesion
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
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      autoComplete="email"
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
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      autoComplete="current-password"
                      maxLength={8}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-stone-500 focus:outline-none focus:ring-stone-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Repeat Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="repeatPassword"
                      type="password"
                      value={data.repeatPassword}
                      onChange={(e) => setData({ ...data, repeatPassword: e.target.value })}
                      autoComplete="current-password"
                      maxLength={8}
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-stone-500 focus:outline-none focus:ring-stone-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                  >
                    Registarse
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
