export const ExcellenceInEducation = () => {
  return (
    <div className="max-w-7xl mx-auto mt-[10rem] md:mt-[7rem] lg:mt-[6rem] px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Text Content */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Excellence in Education
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            About Department of Computer Science and Engineering
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            The Department of Computer Science and Engineering of University of
            Dhaka (CSEDU) under the Faculty of Engineering and Technology (FoET)
            fosters quality education and research endeavors in diverse fields
            of computing.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            The CSEDU offers a 4 years Bachelor of Science, 1.5 years Master of
            Science, 2 years M.Phil, and Ph.D degree programs in Computer
            Science and Engineering. We also offer a Professional Masters in
            Information and Cyber Security (PMICS) degree program of 1.5 years
            duration. The CSEDU has become the finest and strongest academic
            department in the region for education and research in computing
            fields. We are proud to be the home of consecutive champion teams
            for regional and national level competitive programming contests.
          </p>

          <button className="mt-8 px-6 py-2 border border-gray-900 text-gray-900 rounded hover:bg-gray-50 transition-colors">
            Read more
          </button>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-1/2 hidden lg:block">
          <img
            src="/exellence1.png" // Replace with your actual image path
            alt="CSEDU Department"
            className="w-[15rem] h-[25rem] mt-20 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
