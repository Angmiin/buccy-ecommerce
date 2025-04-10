import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// Mock data - would be fetched from API in real implementation
const featuredProducts = [
  {
    id: "1",
    name: "Silk Blend Blazer",
    price: 2450,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    category: "Outerwear",
    isNew: true,
  },
  {
    id: "2",
    name: "Cashmere Sweater",
    price: 1250,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "Tops",
    isNew: false,
  },
  {
    id: "3",
    name: "Leather Trousers",
    price: 1850,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
    category: "Pants",
    isNew: true,
  },
  {
    id: "4",
    name: "Signature Scarf",
    price: 650,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26",
    category: "Accessories",
    isNew: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="container px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Featured Collection
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Discover our most coveted pieces, meticulously crafted for the
          discerning individual.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isNew && (
                  <Badge className="absolute right-3 top-3 bg-black px-2 py-1 text-white">
                    New
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="font-serif text-lg">
                    ${product.price.toLocaleString()}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {product.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/products">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
