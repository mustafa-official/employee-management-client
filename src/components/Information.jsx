const Information = () => {
  return (
    <div className="py-16">
      <div className="items-center justify-between lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
              Best place to choose <br /> your{" "}
              <span className="text-blue-500 ">clothes</span>
            </h1>

            <p className="mt-3 text-gray-600 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              beatae error laborum ab amet sunt recusandae? Reiciendis natus
              perspiciatis optio.
            </p>

            <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              Shop Now
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full lg:w-1/3">
          <img className="w-full" src="" alt="Catalogue-pana.svg" />
        </div>
      </div>
    </div>
  );
};

export default Information;
