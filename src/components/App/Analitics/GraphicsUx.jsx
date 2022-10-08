import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: title,
    },
  },
});

export default function Grafics({ user, posts }) {
  const postUser = posts.filter((post) => post.author.email === user.email);
  const dates = postUser.map((post) => format(new Date(post.datetime), 'LLLL dd h:m', { locale: es }));
  const repeatDay = (dateNow) => dates.filter((dateCurrent) => dateNow && dates.some((date) => dateCurrent === date));
  let accLikes = 0;
  let accComentarios = 0;
  let accViews = 0;

  postUser.map((post) => {
    accViews = post.views + accViews;
  });

  postUser.map((post) => {
    accComentarios = post.comments.length + accComentarios;
  });

  postUser.map((post) => {
    accLikes = post.likes + accLikes;
  });

  const files = [
    {
      title: 'Publicaciones por dia',
      size: dates.length,
      obtions: options('Publicaciones por dia'),
      data: {
        labels: dates.map((date) => date),
        datasets: [
          {
            label: 'Posts',
            data: dates.map((date) => repeatDay(date).length),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
    },
    {
      title: 'Likes',
      size: accLikes,
      obtions: options('Likes por imagen'),
      data: {
        labels: postUser.map((post) => post.title),
        datasets: [
          {
            label: 'Likes',
            data: postUser.map((post) => post.likes),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
    },
    {
      title: 'Comentarios',
      size: accComentarios,
      obtions: options('Commentarios por imagen'),
      data: {
        labels: postUser.map((post) => post.title),
        datasets: [
          {
            label: 'Comentarios',
            data: postUser.map((post) => post.comments.length),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
    },
    {
      title: 'Visualizaciones',
      size: accViews,
      obtions: options('Visualizaciones por imagen'),
      data: {
        labels: postUser.map((post) => post.title),
        datasets: [
          {
            label: 'Visualizaciones',
            data: postUser.map((post) => post.views),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
    },
  ];
  return (
    <div className="mx-auto mt-5 max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium leading-6 text-gray-50">Graficas</h2>
      <div className="mt-2">
        <ul className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8">
          {files.map((file) => (
            <li key={file.source} className="relative">
              <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <Bar options={file.obtions} data={file.data} />
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-50">{file.title}</p>
              <p className="pointer-events-none block text-sm font-medium text-gray-300">{file.size}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
