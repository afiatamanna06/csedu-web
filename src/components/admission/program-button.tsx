import React from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface ProgramButtonProps {
  program: string;
  href: string;
  className?: string;
}

const ProgramButton: React.FC<ProgramButtonProps> = ({ 
  program, 
  href,
  className = "" 
}) => {
  return (
    <Link 
      to={href}
      className={`block w-full md:w-auto ${className}`}
      activeProps={{
        className: "border-2 border-[#FFC300]"
      }}
    >
      <Button 
        className="w-full md:w-80 h-20 text-lg font-semibold bg-[#13274C] hover:bg-[#13274C]/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
      >
        {program}
      </Button>
    </Link>
  );
};

export default ProgramButton;