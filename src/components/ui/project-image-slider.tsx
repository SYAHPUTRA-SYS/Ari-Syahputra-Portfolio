"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

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

  if (!images.length) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/30 text-sm text-muted-foreground">
        No preview available
      </div>
    );
  }

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
      sliderRef.current.scrollLeft / sliderRef.current.clientWidth
    );

    setCurrentIndex(index);
  };

  return (
    <div className="group/slider relative w-full overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-muted/60 to-muted/20">
      {/* Image Slider */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative aspect-[16/10] w-full flex-none snap-center"
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain p-2 transition-transform duration-500 group-hover/slider:scale-[1.03]"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToImage(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition hover:bg-black/80 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToImage(Math.min(images.length - 1, currentIndex + 1))
            }
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition hover:bg-black/80 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          {/* Dots + counter */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((image, index) => (
              <button
                key={`dot-${image}-${index}`}
                type="button"
                onClick={() => scrollToImage(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <div className="absolute right-2 top-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
