import { Popover } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderComponentOutLogin({ userNavigation, navigation }) {
  return (
    <>
      <Popover
        as="header"
        className={({ open }) =>
          classNames(open ? 'fixed inset-0 z-10 overflow-y-auto' : '', 'bg-stone-800 bg-opacity-40 z-10 backdrop-blur-md backdrop-filtershadow-sm lg:static lg:overflow-y-visible')
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img className="h-8 w-auto" src="LogoDarkOutCircle.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          onChange={() => {
                            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
                          }}
                          id="search"
                          name="search"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-amber-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                    <span className="sr-only">Open menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <Link
                    to="/login"
                    className="ml-6 inline-flex items-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Iniciar sesion
                  </Link>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50', 'block rounded-md py-2 px-3 text-base font-medium')}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <a key={item.name} href={item.href} className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                >
                  Iniciar sesion
                </Link>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}
