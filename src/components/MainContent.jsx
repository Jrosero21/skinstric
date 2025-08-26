import React from 'react';
import Image from 'next/image';

const MainContent = () => {
  return (
    <main className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>
      
      {/* Camera and Gallery Sections */}
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        
        {/* Camera Component */}
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            alt="Diamond Large"
            width={482}
            height={482}
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResDiamond-large.884fc6a9.png&w=1080&q=75"
          />
          <Image
            alt="DiamondMedium"
            width={444.34}
            height={444.34}
            className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-190"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResDiamond-medium.2224a388.png&w=1080&q=75"
          />
          <Image
            alt="DiamondSmall"
            width={405.18}
            height={405.18}
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResDiamond-small.bd0ba7e9.png&w=828&q=75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              alt="Camera Icon"
              width={136}
              height={136}
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcamera-icon.14742046.png&w=384&q=75"
            />
            <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
              <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                ALLOW A.I.<br />TO SCAN YOUR FACE
              </p>
              <Image
                alt="Scan Line"
                width={66}
                height={59}
                className="absolute hidden md:block md:right-[143px] md:top-[20px]"
                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResScanLine.99dc727d.png&w=256&q=75"
              />
            </div>
          </div>
        </div>
        
        {/* Gallery Component */}
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            alt="Diamond Large"
            width={484}
            height={484}
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResDiamond-large.884fc6a9.png&w=1080&q=75"
          />
          <Image
            alt="DiamondMedium"
            width={448}
            height={448}
            className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-195"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResDiamond-medium.2224a388.png&w=1080&q=75"
          />
          <Image
            alt="DiamondSmall"
            width={408}
            height={408}
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResDiamond-small.bd0ba7e9.png&w=828&q=75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              alt="Photo Upload Icon"
              width={136}
              height={136}
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgallery-icon.c9f2deef.png&w=384&q=75"
            />
            <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
              <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                ALLOW A.I.<br />ACCESS GALLERY
              </p>
              <Image
                alt="Gallery Line"
                width={66.33}
                height={59.37}
                className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FResGalleryLine.84646ce1.png&w=256&q=75"
              />
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"></div>
        </div>
        
        {/* File Input (Hidden) */}
        <input accept="image/*" className="hidden" type="file" />
      </div>
    </main>
  );
};

export default MainContent;