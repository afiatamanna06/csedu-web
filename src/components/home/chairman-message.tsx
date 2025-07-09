import { Link } from "@tanstack/react-router";

export default function ChairmanMessage() {
  return (
    <section className="px-6 md:px-16 py-14 bg-gradient-to-b from-[#f6f4fd] to-white">
      <div className="bg-white mx-auto container rounded-xl shadow-sm p-6 md:p-10 relative flex flex-col md:flex-row items-start gap-6">
        {/* Quote mark (optional decoration) */}
        <div className="absolute -top-24 right-4 text-[250px] text-[#f1ecfa]">
          &rdquo;
        </div>

        {/* Image + Name */}
        <div className="flex-shrink-0 text-center">
          <div className="bg-[#f3eefe] p-2 rounded-xl">
            <img
              src="/chairman.jpg"
              alt="Chairman"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
          <p className="font-semibold mt-4">Dr. Md. Abdur Razzaque</p>
          <p className="text-sm text-gray-500">Chairman, CSEDU</p>
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="italic text-gray-500 text-lg mb-2">
            Message from the Chairman
          </p>
          <p className="text-gray-800 text-lg leading-relaxed">
            It's my immense pleasure to welcome you all to the Department of
            Computer Science and Engineering (CSE) at the University of Dhaka
            (also known as CSEDU). The CSEDU is a place where the brightest
            minds from home and abroad assemble to build their future careers at
            highly reputed organizations at home and abroad. The department has
            been inspiring the best and brightest for more than three decades in
            fostering the frontier technologies of Computer Science and
            Engineering.
          </p>
          <Link
            to="/"
            className="text-[#3D007B] text-lg font-semibold mt-6 inline-block hover:underline"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
}
