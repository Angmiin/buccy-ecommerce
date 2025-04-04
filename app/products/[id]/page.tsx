import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Share2, Star } from "lucide-react";
import RelatedProducts from "@/components/related-products";

// Mock data - would be fetched from API in real implementation
const product = {
  id: "1",
  name: "Silk Blend Blazer",
  price: 2450,
  description:
    "Crafted from the finest silk blend, this blazer embodies luxury and sophistication. The tailored silhouette offers a flattering fit, while the subtle texture adds depth and character. Perfect for both formal occasions and elevated casual ensembles.",
  details: [
    "70% Silk, 30% Wool",
    "Fully lined",
    "Two-button closure",
    "Three exterior pockets",
    "Two interior pockets",
    "Dry clean only",
    "Made in Italy",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "Navy", value: "#0a192f" },
    { name: "Burgundy", value: "#800020" },
  ],
  images: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&q=60",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&q=40",
  ],
  category: "Outerwear",
  collection: "Fall/Winter",
  rating: 4.8,
  reviewCount: 24,
};

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer overflow-hidden"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="mb-2 flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {product.category}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {product.collection}
              </span>
            </div>
            <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">
              {product.name}
            </h1>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-black text-black"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="mb-6 font-serif text-2xl">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Color</label>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="relative h-8 w-8 cursor-pointer rounded-full border p-1"
                    style={{ borderColor: color.value }}
                  >
                    <span
                      className="block h-full w-full rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="sr-only">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Size</label>
              <Select defaultValue="m">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size.toLowerCase()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Quantity</label>
              <Select defaultValue="1">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <SelectItem key={qty} value={qty.toString()}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8 flex space-x-4">
            <Button className="flex-1 bg-black text-white hover:bg-black/90">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Free standard shipping on all orders over $200. Delivery time
                  is typically 3-5 business days.
                </p>
                <p>
                  Express shipping is available for an additional fee. Orders
                  placed before 12pm local time may ship the same day.
                </p>
                <p>
                  Returns are accepted within 30 days of delivery. Items must be
                  unworn, unwashed, and with all original tags attached.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  No reviews yet. Be the first to review this product.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <RelatedProducts />
    </div>
  );
}
