'use client';

import {
  ServiceCard,
  ServiceCardBenefitListItem,
  ServiceCardCallToAction,
  ServiceCardDescription,
  ServiceCardList,
  ServiceCardPrice,
  ServiceCardTitle,
} from '@/components/service-card';
import { useMotionValue } from 'framer-motion';
import { type MouseEvent, useEffect, useRef, useState } from 'react';

function ServicesGrid() {
  const mousePositionX = useMotionValue(0);
  const mousePositionY = useMotionValue(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    mousePositionX.set(clientX);
    mousePositionY.set(clientY);
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const slideWidth = scrollContainer.scrollWidth / totalSlides;
      const currentSlide = Math.round(scrollLeft / slideWidth);
      setActiveSlide(currentSlide);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (slideIndex: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const slideWidth = scrollContainer.scrollWidth / totalSlides;
    scrollContainer.scrollTo({
      left: slideIndex * slideWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Services"
        tabIndex={0}
        onMouseMove={handleMouseMove}
        className="group gap-6 flex overflow-x-auto snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-5 lg:overflow-visible max-lg:gap-4 max-lg:-mx-4 max-lg:px-4 max-lg:scrollbar-hide edge-fade-x focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <ServiceCard
          parentMousePositionX={mousePositionX}
          parentMousePositionY={mousePositionY}
          className="rounded-ss-xl lg:col-span-2 max-lg:rounded-xl max-lg:flex-[0_0_82%] max-lg:min-w-[82%] max-lg:snap-center max-lg:scroll-mx-4"
        >
          <div>
            <ServiceCardTitle>Web application</ServiceCardTitle>
            <ServiceCardPrice>Available upon request</ServiceCardPrice>
            <ServiceCardDescription>
              Tailored web apps, paired with a marketing website, or cross-platform solutions.
              Let&apos;s get together and discuss your vision to provide a custom quote.
            </ServiceCardDescription>
            <ServiceCardList>
              <ServiceCardBenefitListItem>Modern, custom design</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Responsive & accessible</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Optimized performance</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Animations & interactions</ServiceCardBenefitListItem>
            </ServiceCardList>
          </div>
          <ServiceCardCallToAction />
        </ServiceCard>
        <ServiceCard
          parentMousePositionX={mousePositionX}
          parentMousePositionY={mousePositionY}
          className="lg:col-span-3 lg:rounded-es-xl max-lg:rounded-xl max-lg:flex-[0_0_82%] max-lg:min-w-[82%] max-lg:snap-center max-lg:scroll-mx-4"
        >
          <div>
            <ServiceCardTitle>E-Commerce (Shopify)</ServiceCardTitle>
            <ServiceCardPrice>Available upon request</ServiceCardPrice>
            <ServiceCardDescription>
              Level up your Shopify store with a custom theme, tailored to your products and customer
              audience.
            </ServiceCardDescription>
            <ServiceCardList>
              <ServiceCardBenefitListItem>Modern, custom design</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Responsive & accessible</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>
                Seamless store integration with Shopify
              </ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Self-customizable content</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Conversion rate optimization</ServiceCardBenefitListItem>
            </ServiceCardList>
          </div>
          <ServiceCardCallToAction />
        </ServiceCard>
        <ServiceCard
          parentMousePositionX={mousePositionX}
          parentMousePositionY={mousePositionY}
          className="lg:col-span-3 lg:rounded-se-xl max-lg:rounded-xl max-lg:flex-[0_0_82%] max-lg:min-w-[82%] max-lg:snap-center max-lg:scroll-mx-4"
        >
          <div>
            <ServiceCardTitle>Website</ServiceCardTitle>
            <ServiceCardPrice>Available upon request</ServiceCardPrice>
            <ServiceCardDescription>
              There are no limits to your website vision ― Let&apos;s make it happen!
            </ServiceCardDescription>
            <ServiceCardList>
              <ServiceCardBenefitListItem>Modern, custom design</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Responsive & accessible</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Animations & interactions</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>SEO & page speed optimization</ServiceCardBenefitListItem>
              <ServiceCardBenefitListItem>Engaging user experience</ServiceCardBenefitListItem>
            </ServiceCardList>
          </div>
          <ServiceCardCallToAction />
        </ServiceCard>

        <ServiceCard
          parentMousePositionX={mousePositionX}
          parentMousePositionY={mousePositionY}
          className="rounded-ee-xl lg:col-span-2 max-lg:rounded-xl max-lg:flex-[0_0_82%] max-lg:min-w-[82%] max-lg:snap-center max-lg:scroll-mx-4"
        >
          <div>
            <ServiceCardTitle>Custom solution</ServiceCardTitle>
            <ServiceCardPrice>Available upon request</ServiceCardPrice>
            <ServiceCardDescription>
              Need a unique solution? Don&apos;t hesitate to ask ― We are your problem solvers.{' '}
              <span className="text-neutrals-100">
                Let&apos;s discuss your requirements and create a tailored package.
              </span>
            </ServiceCardDescription>
          </div>
          <ServiceCardCallToAction />
        </ServiceCard>
      </div>

      {/* Sleek mobile navigation dots */}
      <div className="flex justify-center mt-4 lg:hidden">
        <div className="flex gap-1" role="tablist" aria-label="Services slides">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeSlide}
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="flex min-h-11 min-w-11 items-center justify-center p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                aria-hidden="true"
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'bg-primary w-8 scale-110'
                    : 'bg-neutrals-600 hover:bg-neutrals-500 w-2'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ServicesGrid };
