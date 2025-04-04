import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && <Badge className="absolute right-3 top-3 bg-black px-2 py-1 text-white">New</Badge>}
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-black transition-all hover:bg-white">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </button>
      </div>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium hover:underline">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <p className="font-serif text-lg">${product.price.toLocaleString()}</p>
          <span className="text-sm text-muted-foreground">{product.category}</span>
        </div>
      </CardContent>
    </Card>
  )
}

