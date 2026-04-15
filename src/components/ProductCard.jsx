import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star"
import { useCart } from "@/context/CartContext"

export default function ProductCard({ id, title, price, category, stock, image, rating = 0 }) {
  const { addItem } = useCart()
  const inStock = stock > 0

  return (
    <Card className="flex flex-col overflow-hidden group hover:shadow-xl hover:shadow-emerald/10 transition-all duration-300 hover:-translate-y-2">
      <img
        src={image}
        alt={title}
        className="h-44 w-full object-contain group-hover:brightness-110 transition-all duration-300 bg-muted"
        onError={(e) => e.target.src = 'https://placehold.co/300x200/e2e8f0/475569?text=No+Image'}
      />

      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base line-clamp-2 leading-tight max-w-[200px]">{title}</CardTitle>
            {inStock ? (
              <Badge variant="secondary" className="shrink-0 bg-emerald-100/80 text-emerald-800 border-emerald-200 text-xs px-2 py-1">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="shrink-0 text-xs px-2 py-1">
                Out of Stock
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={rating} />
            <Badge variant="outline" className="text-xs line-clamp-1 max-w-24">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => addItem({ id, title, price, image, stock })}
            size="sm"
            className="h-10 text-sm"
            disabled={!inStock}
          >
            Add to Cart
          </Button>
          <Button asChild size="sm" className="h-10 text-sm" variant="outline" disabled={!inStock}>
            <Link to={`/product/${id}`}>Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
