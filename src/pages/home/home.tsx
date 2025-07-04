import AcademicPrograms from "@/components/home/academic-programs";
import GoogleMap from "@/components/home/map";

export default function Home() {
  return (
    <div className="w-full mt-[4rem] lg:mt-[8rem]">
      <AcademicPrograms />
      <GoogleMap />
    </div>
  );
}
