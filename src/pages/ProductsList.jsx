import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchProducts } from "@/data/products"

export default function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get("category")

  const [filters, setFilters] = useState([
    { label: "All Products", value: null }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const limit = 10;
  const skip = page * limit;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchProducts({ limit, skip })
        setProducts(response.products)
        setTotal(response.total)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [page])

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(new Set(products.map(p => p.category.toLowerCase())))
      const newFilters = [
        { label: "All Products", value: null },
        ...uniqueCategories.slice(0, 5).map(cat => ({ label: cat.charAt(0).toUpperCase() + cat.slice(1), value: cat }))
      ]
      setFilters(newFilters)
    }
  }, [products])

  const heading = category
    ? `Currently Browsing: ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : "All Products"

  const handleFilter = (value) => {
    if (value) {
      setSearchParams({ category: value })
    } else {
      setSearchParams({})
    }
  }

  const filtered = products
    .filter((p) => !category || p.category.toLowerCase() === category.toLowerCase())
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error Loading Products</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div>
      {/* Dynamic Heading */}
      <h1 className="mb-6 text-2xl font-bold">{heading}</h1>

      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-stretch sm:items-center">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f.label}
              variant={category === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No products found.
        </p>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-12">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.ceil(total / limit)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.min(Math.ceil(total / limit) - 1, p + 1))}
          disabled={page * limit + products.length >= total}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
