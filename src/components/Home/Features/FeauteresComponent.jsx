export default function FeaturesComponent() {
  return (
    <>
      {/* Featured section */}
      <section aria-labelledby="comfort-heading" className="mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8" id="Create">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618005198920-f0cb6201c115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 id="comfort-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                ¿Por que ArtBook?
              </h2>
              <p className="mt-3 text-xl text-white">ArtBook es una red social que busca que los artistas tengan mas recocimiento y visibilidad por su arte</p>
              <a href="/" className="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto">
                Registrate
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
