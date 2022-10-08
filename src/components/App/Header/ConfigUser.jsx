import { UserCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
import { coverImageUrl } from './HeaderList';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../../credentials';
import { Link } from 'react-router-dom';

const storage = getStorage(app);

function hashFunction(key) {
  const splittedWord = key.toLowerCase().split('');
  const codes = splittedWord.map((letter) => `${letter}${String(letter).charCodeAt(0)}`);
  return codes.join('');
}
const auth = getAuth();

export default function ConfigUser({ user, toast, setOpen }) {
  const [edit, setEdit] = useState(true);
  const [deleteUserState, setDeleteUserState] = useState(false);
  const [typeInput, seTypeInput] = useState(false);
  const file = useRef();
  const porfileFields = {
    Correo: user.email,
    'Numero de telefono': user.phoneNumber ? user.phoneNumber : 'Undefine',
    'Fecha de creacion': user.metadata.creationTime,
    'Ultima conexion': user.metadata.lastSignInTime,
  };
  const [data, setData] = useState({
    oldPassword: '',
    image: '',
    desertRef: '',
    name: '',
    email: '',
  });
  const uploadImage = (event) => {
    event.preventDefault();
    const urlImage = file.current.files[0];
    const desertRef = `/Users/${Math.floor(Math.random() * 10000000) + hashFunction(urlImage.name)}`;
    const storageRef = ref(storage, desertRef);
    const task = uploadBytes(storageRef, urlImage);
    if (data.image === '') {
      task.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          toast.success('La imagen se ha subido con exito', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setData({ ...data, image: downloadURL, desertRef: desertRef });
        });
      });
    } else {
      const desertRefDelete = data.desertRef;
      const storageRefDelete = ref(storage, desertRefDelete);

      deleteObject(storageRefDelete);

      task.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          toast.success('La imagen se ha subido con exito', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setData({ ...data, image: downloadURL, desertRef: desertRefDelete });
        });
      });
    }
  };

  const handleSubmitUserName = (event) => {
    event.preventDefault();

    if (!typeInput) {
      if (!file.current.files[0]) {
        return toast.warning('No se ha selecionado ninguna imagen', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: data.image,
      })
        .then(() => {
          toast.success('Usuario actualizado exitosamente', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOpen(false);
        })
        .catch(() => {
          toast.error('El usuario no se ha podido actualizar', {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
    if (typeInput) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, data.oldPassword);
      // eslint-disable-next-line no-unused-vars
      const result = reauthenticateWithCredential(auth.currentUser, credential);

      updateEmail(auth.currentUser, data.email)
        .then(() => {
          toast.success('Usuario actualizado exitosamente', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOpen(false);
        })
        .catch(() => {
          toast.error('El usuario no se ha podido actualizar', {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const deletePorfile = (event) => {
    event.preventDefault();

    if (!data.oldPassword) {
      setDeleteUserState(true);
      return toast.info('Ingrese la password para eliminar', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const credential = EmailAuthProvider.credential(auth.currentUser.email, data.oldPassword);
    // eslint-disable-next-line no-unused-vars
    const result = reauthenticateWithCredential(auth.currentUser, credential);

    deleteUser(auth.currentUser)
      .then(() => {
        toast.success('Usuario eliminadao exitosamente', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpen(false);
      })
      .catch(() => {
        toast.erro('El usuario no se ha podido eliminar', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <article>
      {/* Profile header */}
      <div>
        <div>
          <img className="h-32 w-full object-cover lg:h-48 rounded-md" src={coverImageUrl[Math.floor(Math.random() * (coverImageUrl.length - 0) + 0)]} alt="" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={user.photoURL ? user.photoURL : `https://ui-avatars.com/api/?name=${user.displayName}&size=128&rounded=true&background=44403c&color=fff&bold=true`}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-xl font-bold text-gray-900">{user.displayName ? user.displayName : 'anonimo'}</h1>
              </div>
              <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setEdit(!edit)}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  {edit && <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
                  {!edit && <XCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
                  {edit && <span>Editar</span>}
                  {!edit && <span>Cancelar</span>}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">{user.name}</h1>
          </div>
        </div>
      </div>

      {/* Description list */}
      {edit && (
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {Object.keys(porfileFields).map((field) => (
              <div key={field} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">{field}</dt>
                <dd className="mt-1 text-sm text-gray-900">{porfileFields[field]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {!edit && (
        <>
          <form onSubmit={handleSubmitUserName} className="mt-5 md:col-span-2">
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-6">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Selecciona lo que deceas actualizar
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={() => seTypeInput(!typeInput)}
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Nombre de usuario</option>
                  <option>Correo Electronico</option>
                </select>
              </div>
              {!typeInput && !deleteUserState && (
                <div className="col-span-6 h-10">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}
              {typeInput && !deleteUserState && (
                <div className="col-span-6 h-10">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    value={data.email}
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}
              {!typeInput && !deleteUserState && (
                <div>
                  <labe htmlFor="" className="col-span-6  block text-sm font-medium text-gray-700">
                    Photo
                  </labe>
                  <div className="grid grid-rows-1 grid-cols-2 gap-8">
                    <UserCircleIcon className="h-10 w-10 text-gray-300 mr-5" />
                    <div className="mt-1 flex items-center">
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="pointer rounded-full border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50">
                          <span>Seleccionar </span>
                          <input ref={file} id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={uploadImage}
                        className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {(deleteUserState || typeInput) && (
                <div className="col-span-6 h-10">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Old Password
                  </label>
                  <input
                    onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
                    value={data.oldPassword}
                    type="password"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
            <div className="mt-5 px-4 py-3 text-right sm:px-6">
              <button
                onClick={deletePorfile}
                className="inline-flex justify-center rounded-md text-gray-700 hover:text-white border border-transparent bg-gray-100 py-2 px-4 text-sm font-medium shadow-sm hover:bg-rose-700"
              >
                eliminar
              </button>
              <button
                type="submit"
                className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Guardar
              </button>
            </div>
          </form>
        </>
      )}

      {/* Team GRAFICAS list */}
      <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* <h2 className="text-sm font-medium text-gray-500">Team members</h2> */}
        {/* <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {team.map((person) => (
            <div
              key={person.handle}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
              </div>
              <div className="min-w-0 flex-1">
                <a href="/" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="truncate text-sm text-gray-500">{person.role}</p>
                </a>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      {edit && (
        <div className="mt-5 px-4 py-3 text-right sm:px-6">
          <Link
            to="/Analitics"
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Ver estadisticas
          </Link>
          <button
            onClick={() => signOut(auth)}
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Cerrar sesion
          </button>
        </div>
      )}
    </article>
  );
}
