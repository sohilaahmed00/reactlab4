import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchProduct } from "@/data/products"

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProduct(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-xl mx-auto">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-52 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <Package size={20} className="text-destructive" />
              </div>
              <CardTitle>Product Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No product found with ID: <strong>{id}</strong>
              {error && ` - ${error}`}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate("/")}>
        <ArrowLeft size={16} />
        Back to Home
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Package size={20} className="text-primary" />
            </div>
            <CardTitle>Product Details</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Product ID: <span className="font-bold text-foreground text-base">{id}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-md object-contain h-52"
          />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">{product.category}</Badge>
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  In Stock ({product.stock})
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">{product.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
