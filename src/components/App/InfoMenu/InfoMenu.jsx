import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function InfoMenuComponent({ posts }) {
  return (
    <aside className="hidden xl:col-span-4 xl:block">
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="trending-heading">
          <div className="rounded-lg bg-white shadow">
            <div className="p-6">
              <h2 id="trending-heading" className="text-base font-medium text-gray-900">
                Trending
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {posts
                    .filter((post) => format(new Date(post.datetime), 'dd', { locale: es }) === format(new Date(), 'dd', { locale: es }))
                    .map((post) => (
                      <li key={post.id} className="flex space-x-3 py-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src={post.author.imageUrl} alt={post.author.name} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-800">{post.body}</p>
                          <div className="mt-2 flex">
                            <span className="inline-flex items-center text-sm">
                              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium text-gray-900">{post.comments.length}</span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">View all</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
