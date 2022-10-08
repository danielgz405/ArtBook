import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Menu, Transition } from '@headlessui/react';
import { ChatBubbleLeftEllipsisIcon, CodeBracketIcon, EyeIcon, FlagIcon, EllipsisVerticalIcon, HandThumbUpIcon, ShareIcon, StarIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [{ name: 'Recent', href: '', current: true }];

export default function FeelComponent({ posts }) {
  return (
    <main className="lg:col-span-9 xl:col-span-6">
      <div className="px-4 sm:px-0">
        <div className="sm:hidden">
          <label htmlFor="question-tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="question-tabs"
            className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                href={tab.href}
                aria-current={tab.current ? 'page' : undefined}
                className={classNames(
                  tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                  tabIdx === 0 ? 'rounded-l-lg' : '',
                  tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                  'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                )}
              >
                <span>{tab.name}</span>
                <span aria-hidden="true" className={classNames(tab.current ? 'bg-stone-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5')} />
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-4 z-40">
        <h1 className="sr-only">Recent questions</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6 z-40">
              <article aria-labelledby={'post-title-' + post.id}>
                <div>
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <a href={post.author.href} className="hover:underline">
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        <a href={post.href} className="hover:underline">
                          <time dateTime={post.datetime}>{format(new Date(post.datetime), 'yyy LLLL dd h:m', { locale: es })}</time>
                        </a>
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 self-center">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <p className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm')}>
                                    <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Add to favorites</span>
                                  </p>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <p className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm')}>
                                    <CodeBracketIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Embed</span>
                                  </p>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <p className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm')}>
                                    <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Report content</span>
                                  </p>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <h2 id={'post-title-' + post.id} className="mt-4 text-base font-medium text-gray-900">
                    {post.title}
                  </h2>
                </div>
                <div className="mt-2 space-y-4 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: post.body }} />
                <div className="mt-2 space-y-4 text-sm text-gray-700">
                  <img src={post.image} alt="" className="rounded-md m-1" />
                </div>
                <div className="mt-6 flex justify-between space-x-8">
                  <div className="flex space-x-6">
                    <span className="inline-flex items-center text-sm">
                      <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium text-gray-900">{post.likes}</span>
                        <span className="sr-only">likes</span>
                      </button>
                    </span>
                    <span className="inline-flex items-center text-sm">
                      <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium text-gray-900">{post.comments.length}</span>
                        <span className="sr-only">replies</span>
                      </button>
                    </span>
                    <span className="inline-flex items-center text-sm">
                      <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium text-gray-900">{post.views}</span>
                        <span className="sr-only">views</span>
                      </button>
                    </span>
                  </div>
                  <div className="flex text-sm">
                    <span className="inline-flex items-center text-sm">
                      <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <ShareIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium text-gray-900">Share</span>
                      </button>
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
