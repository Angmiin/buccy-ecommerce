import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
          alt="Luxury fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          BUCCI
        </h1>
        <p className="mb-8 max-w-2xl text-lg font-light tracking-wider sm:text-xl">
          Redefining luxury with extravagance and elegance. Discover our latest
          collection.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            size="lg"
            className="min-w-[150px] bg-white text-black"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="min-w-[150px] bg-white text-black"
          >
            <Link href="/collections/new">New Arrivals</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === 1 ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
