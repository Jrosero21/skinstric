import React from "react";

export default function PreviewBox({ src }: { src: string | null }) {
  return (
    <div className="capture-preview">
      <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
      <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
        {src ? (
        
          <img src={src} alt="preview" className="w-full h-full object-cover" />
        ) : null}
      </div>
    </div>
  );
}
