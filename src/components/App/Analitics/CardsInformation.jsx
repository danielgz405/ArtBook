import { CalendarDaysIcon, EyeIcon, HeartIcon } from '@heroicons/react/20/solid';

export default function CardsInfo({ posts, user }) {
  const postUser = posts.filter((post) => post.author.email === user.email);
  let accLikes = 0;
  let accViews = 0;

  postUser.map((post) => {
    accViews = post.views + accViews;
  });

  postUser.map((post) => {
    accLikes = post.likes + accLikes;
  });
  const cards = [
    { name: 'Publicaciones', icon: CalendarDaysIcon, amount: postUser.length },
    { name: 'Visualizaciones', icon: EyeIcon, amount: accViews },
    { name: 'Likes', icon: HeartIcon, amount: accLikes },
    // More items...
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium leading-6 text-gray-50">Resumen</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
