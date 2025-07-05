import AcademicPrograms from "@/components/home/academic-programs";
import { ExcellenceInEducation } from "@/components/home/excellence";
import { DepartmentOverview } from "@/components/home/landing";
import GoogleMap from "@/components/home/map";
import News from "@/components/home/news";
import Notices from "@/components/home/notices";

export default function Home() {
  return (
    <div className="w-full relative mt-[4rem] lg:mt-[8rem]">
      <DepartmentOverview />
      <ExcellenceInEducation />
      <AcademicPrograms />
      <News />
      <Notices />
      <GoogleMap />
    </div>
  );
}
