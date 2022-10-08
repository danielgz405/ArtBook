import { Fragment, useState } from 'react';
import NavigationDesktop from './NavigationDesktop';
import NavigationMovile from './NavigationMovile';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];
const navigation = {
  categories: [
    {
      name: 'Artistas',
      featured: [
        {
          name: 'Realismo',
          href: '/login',
          imageSrc: 'https://www.lifeder.com/wp-content/uploads/2019/05/Realismo-artistico-wiki.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Fotorrealismo',
          href: '/login',
          imageSrc: 'https://cdn.oldskull.net/wp-content/uploads/2015/01/mike-dargas-painting-4.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Expresionismo',
          href: '/login',
          imageSrc: 'https://www.inoutviajes.com/fotos/20/14602_feininger-barco.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Impresionismo',
          href: '/login',
          imageSrc: 'https://www.arquitecturapura.com/wp-content/uploads/2019/07/ESCULTURAS-IMPRESIONISTAS.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
  ],
  pages: [{ name: 'Comenzar', href: 'Create' }],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavigationComponent({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <NavigationMovile mobileMenuOpen={mobileMenuOpen} Fragment={Fragment} setMobileMenuOpen={setMobileMenuOpen} navigation={navigation} classNames={classNames} currencies={currencies} />
      <NavigationDesktop Fragment={Fragment} setMobileMenuOpen={setMobileMenuOpen} navigation={navigation} classNames={classNames} currencies={currencies}>
        {children}
      </NavigationDesktop>
    </>
  );
}
