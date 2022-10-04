import CategoryComponent from '../components/Home/Category/CategoryComponent';
import FeaturesComponent from '../components/Home/Features/FeauteresComponent';
import FooterComponent from '../components/Home/Footer/FooterComponent';
import HeroSection from '../components/Home/HeroSection/HeroSectionnComponet';
import NavigationComponent from '../components/Home/Navigation/NavigationComponent';

export default function Home() {
  return (
    <div className="bg-white">
      <NavigationComponent>
        <HeroSection />
      </NavigationComponent>
      <main>
        <CategoryComponent />
        <FeaturesComponent />
      </main>
      <FooterComponent />
      <h1></h1>
    </div>
  );
}
