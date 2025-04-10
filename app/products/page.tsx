import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import { Slider } from "@/components/ui/slider";

// Mock data - would be fetched from API in real implementation
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: [
    "Silk Blend Blazer",
    "Cashmere Sweater",
    "Leather Trousers",
    "Signature Scarf",
    "Wool Coat",
    "Designer T-Shirt",
    "Luxury Jeans",
    "Statement Belt",
  ][i % 8],
  price: [2450, 1250, 1850, 650, 3200, 450, 950, 550][i % 8],
  image: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26",
    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc",
  ][i % 8],
  category: [
    "Outerwear",
    "Tops",
    "Pants",
    "Accessories",
    "Outerwear",
    "Tops",
    "Pants",
    "Accessories",
  ][i % 8],
  isNew: i % 5 === 0,
}));

const categories = [
  "All Categories",
  "Outerwear",
  "T-shirts & Tops",
  "Pants",
  "Underwear",
  "Accessories",
  "Hoodies & Sweatshirts",
];

const collections = [
  "All Collections",
  "Summer",
  "Winter",
  "Spring",
  "Fall",
  "Limited Edition",
];

const genders = ["All", "Men", "Women", "Unisex"];

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">
          Shop All Products
        </h1>
        <p className="text-muted-foreground">
          Discover our curated selection of luxury clothing and accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="mb-4 font-medium">Search</h3>
              <Input placeholder="Search products..." />
            </div>

            <div>
              <h3 className="mb-4 font-medium">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm text-muted-foreground"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Collections</h3>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Collections" />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem
                      key={collection}
                      value={
                        collection === "All Collections"
                          ? "all"
                          : collection.toLowerCase()
                      }
                    >
                      {collection}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Gender</h3>
              <div className="space-y-2">
                {genders.map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox id={`gender-${gender}`} />
                    <label
                      htmlFor={`gender-${gender}`}
                      className="text-sm text-muted-foreground"
                    >
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 5000]}
                  min={0}
                  max={5000}
                  step={100}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">$0</span>
                  <span className="text-sm text-muted-foreground">$5,000+</span>
                </div>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Mobile Filters */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">Filters</Button>
          </div>

          {/* Desktop Sort */}
          <div className="mb-6 hidden items-center justify-end lg:flex">
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="icon">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
