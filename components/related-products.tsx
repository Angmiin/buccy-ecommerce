import ProductCard from "@/components/product-card";

// Mock data - would be fetched from API in real implementation
const relatedProducts = [
  {
    id: "2",
    name: "Cashmere Sweater",
    price: 1250,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "Tops",
  },
  {
    id: "3",
    name: "Leather Trousers",
    price: 1850,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
    category: "Pants",
  },
  {
    id: "4",
    name: "Signature Scarf",
    price: 650,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Wool Coat",
    price: 3200,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543",
    category: "Outerwear",
  },
];

export default function RelatedProducts() {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold">You May Also Like</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
