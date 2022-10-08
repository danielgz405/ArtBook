import { HomeIcon } from '@heroicons/react/24/solid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import GraphicsComponent from '../components/App/Analitics/GraphicsComponent';
import HeaderComponent from '../components/App/Header/HeaderComponent';
import { backgroundHeroImage } from '../components/Home/Navigation/NavigationList';
import { app } from '../credentials';

const auth = getAuth(app);

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

export default function GraphicsPage({ toast }) {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });
  return (
    <>
      {user && (
        <>
          {/* Decorative image and overlay */}
          <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
            <img src={backgroundHeroImage[Math.floor(Math.random() * (backgroundHeroImage.length - 0) + 0)]} alt="" className="h-full w-full object-cover object-center backdrop-filter" />
          </div>
          <div aria-hidden="true" className="fixed inset-0 z-10 overflow-hidden bg-stone-700 bg-opacity-20 backdrop-blur-md"></div>
          <div className="min-h-full absolute z-10 w-full">
            <HeaderComponent user={user} userNavigation={userNavigation} navigation={navigation} toast={toast} />
            <GraphicsComponent user={user} />
          </div>
        </>
      )}
    </>
  );
}
