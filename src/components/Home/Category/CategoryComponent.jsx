const categories = [
  {
    name: 'Realismo',
    href: '/login',
    imageSrc: 'https://www.lifeder.com/wp-content/uploads/2019/05/Realismo-artistico-wiki.jpg',
  },
  {
    name: 'Fotorrealismo',
    href: '/login',
    imageSrc: 'https://cdn.oldskull.net/wp-content/uploads/2015/01/mike-dargas-painting-4.jpg',
  },
  {
    name: 'Expresionismo',
    href: '/login',
    imageSrc: 'https://www.inoutviajes.com/fotos/20/14602_feininger-barco.jpg',
  },
  {
    name: 'Impresionismo',
    href: '/login',
    imageSrc: 'https://www.arquitecturapura.com/wp-content/uploads/2019/07/ESCULTURAS-IMPRESIONISTAS.jpg',
  },
  { name: 'Óleo', href: '/login', imageSrc: 'https://3.bp.blogspot.com/-Gr_jVLHBH6U/VIN-EdwU4CI/AAAAAAAANH8/t_tr_5ikxs0/s1600/bodegones-con-jarras-pintados-oleo.jpg' },
];

export default function CategoryComponent() {
  return (
    <>
      {/* Category section */}
      <section aria-labelledby="category-heading" className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8" id="Artists">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Category of Art
          </h2>
          <a href="/home" className="hidden text-sm font-semibold text-stone-600 hover:text-stone-500 sm:block">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories.map((category) => (
                  <a key={category.name} href={category.href} className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto">
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imageSrc} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a href="/" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
}
