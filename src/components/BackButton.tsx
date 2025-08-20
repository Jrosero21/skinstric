import React from "react";
import { Link } from "react-router-dom";
import PolygonLeft from "../assets/PolygonLeft.png";

export default function BackButton({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} aria-label="Back" className="relative">
      <div>
        {/* Mobile label inside diamond */}
        <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
          <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
            BACK
          </span>
        </div>

        {/* Desktop: diamond + left triangle + BACK label */}
        <div className="group hidden sm:flex flex-row relative justify-center items-center">
          <div className="w-12 h-12 hidden sm:flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
            <img
              src={PolygonLeft}
              alt="Back"
              className="w-3 rotate-[-45deg]"
              draggable={false}
            />
          </div>
          <span className="text-sm font-semibold hidden sm:block ml-6">
            BACK
          </span>
        </div>
      </div>
    </Link>
  );
}
