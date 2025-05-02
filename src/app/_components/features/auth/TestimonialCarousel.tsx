import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/trpc/react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsQuery = api.testimonials.all.useQuery() as {
    data: Testimonial[];
  };

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % testimonialsQuery.data.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsQuery.data.length) %
        testimonialsQuery.data.length
    );
  };

  // Auto-advance the carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonialsQuery.data[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <div className="from-primary/5 to-primary/20 relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br">
      <div className="absolute inset-0 z-0">
        <Image
          src={currentTestimonial.image || '/placeholder.svg'}
          alt={`${currentTestimonial.author} from ${currentTestimonial.company}`}
          fill
          className="object-cover opacity-90 transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
        <div className="mb-8 max-w-md">
          <div className="mb-4 text-5xl font-bold">&quot;</div>
          <p className="mb-6 text-xl leading-relaxed font-medium transition-all duration-500">
            {currentTestimonial.quote}
          </p>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              {currentTestimonial.author}
            </h3>
            <p className="text-sm text-white/80">
              {currentTestimonial.role}, {currentTestimonial.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="ml-4 flex gap-1.5">
            {testimonialsQuery.data.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
