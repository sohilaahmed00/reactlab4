import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you are looking for does not exist.
      </p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  )
}
