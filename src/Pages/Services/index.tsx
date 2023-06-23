import { GoogleMaps } from "../../components";

const Services = () => {
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h2 
        className="text-2xl my-4 mb-8 text-headingColor font-semi-bold capitalize relative before:absolute before:rounded before:content before:w-32 before:h-1 before:-bottom-2 before:left-6 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Services village
        </h2>
      <GoogleMaps />
    </div>
  );
}

export default Services;