import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"

// Mock data - would be fetched from API in real implementation
const cartItems = [
  {
    id: "1",
    name: "Silk Blend Blazer",
    price: 2450,
    quantity: 1,
    image: "/placeholder.svg?height=600&width=400",
    size: "M",
    color: "Black",
  },
  {
    id: "4",
    name: "Signature Scarf",
    price: 650,
    quantity: 2,
    image: "/placeholder.svg?height=600&width=400",
    size: "One Size",
    color: "Burgundy",
  },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="relative h-20 w-16 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} | Color: {item.color}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>${item.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            className="h-8 w-12 rounded-none border-x-0 text-center"
                            readOnly
                          />
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none">
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>${(item.price * item.quantity).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex max-w-md items-center gap-2">
                <Input placeholder="Coupon code" className="max-w-[200px]" />
                <Button variant="outline">Apply Coupon</Button>
              </div>
              <Button variant="outline">Update Cart</Button>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full bg-black text-white hover:bg-black/90" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>

            <div className="mt-6 rounded-lg border p-6">
              <h3 className="mb-4 text-sm font-medium">We Accept</h3>
              <div className="flex flex-wrap gap-2">
                <div className="rounded border px-3 py-2 text-xs">Visa</div>
                <div className="rounded border px-3 py-2 text-xs">Mastercard</div>
                <div className="rounded border px-3 py-2 text-xs">American Express</div>
                <div className="rounded border px-3 py-2 text-xs">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven&apos;t added anything to your cart yet.</p>
          </div>
          <Button asChild className="bg-black text-white hover:bg-black/90">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

