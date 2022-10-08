import { useEffect, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, CodeBracketIcon, EllipsisVerticalIcon, EyeIcon, FlagIcon, HandThumbUpIcon, MagnifyingGlassIcon, PlusIcon, ShareIcon, StarIcon } from '@heroicons/react/20/solid';
import { ArrowTrendingUpIcon, Bars3Icon, BellIcon, FireIcon, HomeIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import HeaderComponent from '../Header/HeaderComponent';
import MenuNav from '../Menu/MenuComponent';
import FeelComponent from '../Menu/Feeld';
import InfoMenuComponent from '../InfoMenu/InfoMenu';
import { backgroundHeroImage } from '../../Home/Navigation/NavigationList';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../../credentials';
import HeaderComponentOutLogin from '../Header/HeaderComponetOutLogin';

const db = getFirestore(app);

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  // { name: 'Popular', href: '#', icon: FireIcon, current: false },
  // { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  // { name: 'Trending', href: '#', icon: ArrowTrendingUpIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export default function HomeComponent({ user, toast }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Post'));
        const listPosts = [];
        querySnapshot.forEach((doc) => {
          listPosts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(listPosts);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  return (
    <>
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
        <img src={backgroundHeroImage[Math.floor(Math.random() * (backgroundHeroImage.length - 0) + 0)]} alt="" className="h-full w-full object-cover object-center backdrop-filter" />
      </div>
      <div aria-hidden="true" className="fixed inset-0 z-10 overflow-hidden bg-stone-700 bg-opacity-20 backdrop-blur-md"></div>
      <div className="min-h-full absolute z-10 w-full">
        {user && <HeaderComponent user={user} userNavigation={userNavigation} navigation={navigation} toast={toast} />}
        {!user && <HeaderComponentOutLogin userNavigation={userNavigation} navigation={navigation} />}
        <div className="py-10 z-10 absolute w-full">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <MenuNav navigation={navigation} />
            <FeelComponent posts={posts} />
            <InfoMenuComponent posts={posts} />
          </div>
        </div>
      </div>
    </>
  );
}
