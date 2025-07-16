import { useRouter } from "@tanstack/react-router";

export const ExcellenceInEducation = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto mt-[14rem] md:mt-[6rem] lg:mt-[7rem] px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8 w-[100%] justify-between">
        {/* Left Column - Text Content */}
        <div className="lg:w-1/2 xl:w-[45rem]">
          <h1 className="text-lg font-semibold text-[#2B1472] mb-4 leading-3">
            Excellence in Education
          </h1>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            About Department of Computer Science and Engineering
          </h2>

          <p className="text-[#444444] mb-6 leading-relaxed">
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

          <button
            onClick={() => {
              router.navigate({ to: "/about/history" as string });
            }}
            className="mt-1 px-8 py-3 bg-[#2B1472] rounded-[6px] font-semibold cursor-pointer hover:bg-[#1a0d4c] text-white transition-colors"
          >
            Read more
          </button>
        </div>

        {/* Right Column - Image */}
        <div className="hidden lg:flex lg:gap-6 xl:gap-10">
          <img
            src="/exellence1.png" // Replace with your actual image path
            alt="CSEDU Department"
            className="w-[15rem] xl:w-[17rem] h-[25rem] mt-20 object-cover rounded-[5px]"
          />
          <img
            src="/cultural.jpg" // Replace with your actual image path
            alt="CSEDU Department"
            className="w-[15rem] xl:w-[17rem] h-[25rem] mt-1 object-cover rounded-[5px]"
          />
        </div>
      </div>
    </div>
  );
};
