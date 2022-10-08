import { Popover } from '@headlessui/react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../common/Modal';
import ConfigUser from './ConfigUser';
import PostForm from './PostForm';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderComponent({ user, userNavigation, navigation, toast }) {
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  return (
    <>
      <Popover
        as="header"
        className={({ open }) => classNames(open ? 'fixed z-50 inset-0 overflow-y-auto' : '', 'bg-stone-800 bg-opacity-40 backdrop-blur-md backdrop-filtershadow-sm lg:static lg:overflow-y-visible')}
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
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>

                  {/* Profile dropdown */}
                  <button onClick={() => setOpenUser(true)} className="ml-2 flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.photoURL ? user.photoURL : `https://ui-avatars.com/api/?name=${user.displayName}&size=128&rounded=true&background=b45309&color=fff&bold=true`}
                      alt=""
                    />
                  </button>

                  <button
                    onClick={() => setOpen(!open)}
                    className="ml-6 inline-flex items-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Nuevo Post
                  </button>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden z-40" aria-label="Global">
              <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4 z-40">
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
                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photoURL ? user.photoURL : `https://ui-avatars.com/api/?name=${user.displayName}&size=128&rounded=true&background=44403c&color=fff&bold=true`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.displayName}</div>
                    <div className="text-sm font-medium text-gray-200">{user.email}</div>
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <a key={item.name} href={item.href} className="block rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-50 hover:text-gray-900">
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
                <button
                  onClick={() => setOpen(true)}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                >
                  Nuevo Post
                </button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <Modal open={open} setOpen={setOpen} title="Crear nuevo post">
        <PostForm user={user} toast={toast} setOpen={setOpen} />
      </Modal>
      <Modal open={openUser} setOpen={setOpenUser} title="Opciones de usuario">
        <ConfigUser user={user} toast={toast} setOpen={setOpenUser} />
      </Modal>
    </>
  );
}
