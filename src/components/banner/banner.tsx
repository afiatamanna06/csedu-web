const Banner = () => {
  return (
    <div className="flex flex-row items-center gap-2 lg:w-full lg:shadow-md lg:p-4">
      <img src="/du_logo.png" className="w-9" alt="" />
      <div className="text-sm text-gray-600">
        <p className="text-xs">University of Dhaka</p>
        <p className="font-semibold -mb-1">
          Department of Computer Science and Engineering
        </p>
      </div>
    </div>
  );
};

export default Banner;
