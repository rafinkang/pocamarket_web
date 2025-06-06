import { cn } from "@/lib/utils"; // cn 유틸리티 import

// components
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ImageCarousel ({images, className, ...props}) {
    return (
      <Carousel className={cn(className)} {...props}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-3 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className="flex h-full items-center justify-center p-6">
                      <img src={src} 
                          alt={`home-slide-image ${index + 1}`} 
                          className="w-full h-full object-cover rounded-md" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
    )
}