import AcademicPrograms from "@/components/home/academic-programs";
import GoogleMap from "@/components/home/map";
import News from "@/components/home/news";
import Notices from "@/components/home/notices";

export default function Home() {
  return (
    <div className="w-full mt-[4rem] lg:mt-[8rem]">
      <AcademicPrograms />
      <News />
      <Notices />
      <GoogleMap />
    </div>
  );
}
