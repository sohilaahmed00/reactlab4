import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function Cart() {
  const { cartItems, updateQty, removeItem, totalPrice, totalItems, clearCart } =
    useCart()

  const navigate = useNavigate()

  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
          <ShoppingCart size={36} className="text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-6">
          Your cart is empty. Start shopping!
        </p>

        <Button onClick={() => navigate("/")}>Browse Products</Button>
      </div>
    )
  }

  return (
    <div>
    
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <p className="text-sm text-muted-foreground">
            {totalItems} items in your cart
          </p>
        </CardHeader>
      </Card>

      
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex gap-4 items-center p-6">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-cover rounded-md"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-lg font-bold">${item.price.toFixed(2)}</p>

                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                  >
                    <Minus size={16} />
                  </Button>

                  <Badge>{item.qty}</Badge>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    <Plus size={16} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full">
            <label className="text-sm text-muted-foreground">
              Promo Code
            </label>
            <Input placeholder="Enter discount code" />
          </div>

          <div className="flex justify-between w-full text-xl font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button className="flex-1 bg-primary">Checkout</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}