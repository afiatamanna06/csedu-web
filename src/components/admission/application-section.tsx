import React, { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface ApplicationSectionProps {
  programType: string;
}

const ApplicationSection: React.FC<ApplicationSectionProps> = ({
  programType,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    // Create a simple PDF blob for demo download
    const pdfContent =
      "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Contents 4 0 R/Parent 2 0 R>>endobj 4 0 obj<</Length 11>>stream\nHello World\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000054 00000 n\n0000000107 00000 n\n0000000170 00000 n\ntrailer<</Size 5/Root 1 0 R>>startxref\n250\n%%EOF";
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-form.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      alert(`Selected file: ${files[0].name}`);
      // Implement actual upload logic here
    }
  };

  const handlePayFee = () => {
    window.open("https://sandbox.sslcommerz.com/", "_blank");
  };

  return (
    <>
      <div className="bg-[#13274C] w-200 p-8 rounded-lg shadow-lg border border-gray-100 mb-12 mx-auto block">
        <h2 className="text-2xl font-bold mb-8 text-[#FFC300] border-b-2 border-white pb-3 flex flex-col items-center">
          Start an Application
        </h2>
        <div className="space-y-6">
          <Link to={"/form-fillup" as string}>
            <Button className="w-100 h-16 text-lg font-bold bg-[#FFC300] hover:bg-[#FFD720] text-black mb-6 rounded-full mx-auto block">
              Fillup Form Online
            </Button>
          </Link>
          <Button
            className="w-100 h-16 text-lg font-bold bg-[#FFC300] hover:bg-[#FFD720] text-black rounded-full mx-auto block"
            onClick={handleDownload}
          >
            Download Form
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple
          />
          <Button
            className="w-100 h-16 text-lg font-bold bg-[#FFC300] hover:bg-[#FFD720] text-black rounded-full mx-auto block"
            onClick={handleUploadClick}
          >
            Upload Documents
          </Button>
          <Button
            className="w-100 h-16 text-lg font-bold bg-[#FFC300] hover:bg-[#FFD720] text-black rounded-full mx-auto block"
            onClick={handlePayFee}
          >
            Pay Fee
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-3">
          Application Requirements
        </h2>
        <div className="space-y-6 text-lg text-gray-700">
          <div>
            <h3 className="font-semibold text-[#13274C]">
              1. Completed Application Form
            </h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Online Departments form or Downloaded PDF</li>
              <li>¥2,000 non-refundable fee (bikash/Nagad/Bank)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#13274C]">
              2. Academic Documents
            </h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>RSC Traversal (attested)</li>
              <li>CGPA Proof: Minimum 3.0 (Thesis) / 2.5 (Project)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#13274C]">
              3. Recommendation Letters
            </h3>
            <p className="mt-2">2 letters (academic supervisors preferred)</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#13274C]">
              4. Research Proposal ({programType} only)
            </h3>
            <p className="mt-2">500-1000 words (PDF)</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-12 mb-12">
        {/* Deadlines */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-3">
            Admission Deadlines
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold min-w-[120px]">
                January 1, 2025
              </span>
              <span>Application opens</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold min-w-[120px]">June 30, 2025</span>
              <span>Last Date to Apply</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold min-w-[120px]">July 10, 2025</span>
              <span>Admission Test/Interview</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold min-w-[120px]">July 25, 2025</span>
              <span>Final Result</span>
            </li>
          </ul>
        </div>

        {/* FAQs */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-[#13274C] border-b-2 border-[#FFC300] pb-3">
            FAQs
          </h2>
          <div className="space-y-4 text-lg text-gray-700">
            <div>
              <h3 className="font-semibold text-[#13274C]">
                What is the application fee?
              </h3>
              <p className="mt-1">
                The application fee is 1000 BDT for {programType} program.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#13274C]">
                Can I apply for multiple programs?
              </h3>
              <p className="mt-1">
                Yes, you can apply for multiple programs but you need to submit
                separate applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#13274C]">
                Is there any scholarship available?
              </h3>
              <p className="mt-1">
                Yes, there are merit-based scholarships available for
                outstanding students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationSection;
