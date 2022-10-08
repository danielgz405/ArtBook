import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '../../../credentials';
import { useRef, useState } from 'react';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(app);
const db = getFirestore(app);

function hashFunction(key) {
  const splittedWord = key.toLowerCase().split('');
  const codes = splittedWord.map((letter) => `${letter}${String(letter).charCodeAt(0)}`);
  return codes.join('');
}

export default function PostForm({ user, toast, setOpen }) {
  const now = new Date();
  const file = useRef();
  const [data, setData] = useState({
    likes: 0,
    views: 0,
    author: {
      name: user.displayName ? user.displayName : 'anonimo',
      email: user.email,
      imageUrl: user.photoURL ? user.photoURL : `https://ui-avatars.com/api/?name=${user.displayName}&size=128&rounded=true&background=44403c&color=fff&bold=true`,
    },
    comments: [],
    date: `${now.toLocaleDateString}`,
    datetime: `${now}`,
    title: '',
    body: '',
    price: '0',
    image: '',
    desertRef: '',
  });
  const uploadImage = (event) => {
    event.preventDefault();
    const urlImage = file.current.files[0];
    const desertRef = `/Post/${Math.floor(Math.random() * 10000000) + hashFunction(urlImage.name)}`;
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file.current.files[0]) {
      return toast.warning('Porfavor seleccione una imagen', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    try {
      await addDoc(collection(db, 'Post'), {
        ...data,
      });
      toast.success('Se ha creado el post', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-5 bg-gray-100 px-4 py-5 sm:p-6 shadow-lg">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Titulo
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    className="block w-full flex-1 pl-2 h-9 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                    placeholder="Obra de arte"
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    value={data.price}
                    onChange={(e) => setData({ ...data, price: e.target.value })}
                    className="block w-full flex-1 pl-2 h-9 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                    placeholder="Obra de arte"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Descripcion
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={data.body}
                  onChange={(e) => setData({ ...data, body: e.target.value })}
                  className="mt-1 pl-2 pt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                  placeholder="Describe un poco la obra"
                  defaultValue={''}
                />
              </div>
            </div>
            <div>
              <label htmlFor="temp-id" className="block text-sm font-medium text-gray-700">
                Imagen
              </label>
              {data.image === '' ? (
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-500"
                      >
                        <span>Sube un imagen </span>
                        <input ref={file} id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">para que todos lo vean</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                    <button
                      type="button"
                      onClick={uploadImage}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      Guardar Imagen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-500"
                    >
                      <img role="presentation" className="hover:opacity-60 rounded-md" src={data.image} alt="" />
                      <input ref={file} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <button
                      type="button"
                      onClick={uploadImage}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      Guardar Imagen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
