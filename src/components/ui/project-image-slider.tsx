
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

interface ProjectImageSliderProps {
  images: string[];
  alt: string;
}

export default function ProjectImageSlider({
  images,
  alt,
}: ProjectImageSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToImage = (index: number) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollTo({
      left: sliderRef.current.clientWidth * index,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const index = Math.round(
      sliderRef.current.scrollLeft /
        sliderRef.current.clientWidth
    );

    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-md">
      {/* Image Slider */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative flex-none w-full h-[200px] snap-center"
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              scrollToImage(Math.max(0, currentIndex - 1))
            }
            disabled={currentIndex === 0}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 disabled:hidden transition"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              scrollToImage(
                Math.min(images.length - 1, currentIndex + 1)
              )
            }
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 disabled:hidden transition"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
