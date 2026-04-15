import { Link, Outlet, useLocation } from "react-router-dom"
import { ShoppingCart, Store, Badge } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"

export default function MainLayout() {
  const { pathname } = useLocation()
  const { totalItems } = useCart()

  const navLinks = [
    { to: "/", label: "Products" },
    { to: "/product/1", label: "Product Details" },
    { to: "/cart", label: "Cart" },
    { to: "/notfound", label: "Not Found" },
  ]

  return (
    <div className="min-h-screen bg-background">
    
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          
          <Link to="/" className="flex items-center gap-2 font-semibold text-primary">
            <Store size={20} />
            <span>ShopLab</span>
          </Link>

        
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label === "Cart" && (
                  <div className="flex items-center gap-1 relative">
                    <ShoppingCart size={15} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs rounded-full bg-destructive text-destructive-foreground">
                        {totalItems}
                      </Badge>
                    )}
                  </div>
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content — offset for fixed navbar */}
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-12">
        <Outlet />
      </main>
    </div>
  )
}
