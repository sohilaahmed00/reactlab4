import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

function StarRating({ rating = 0, className }) {
    const fullStars = Math.floor(rating)
    const hasHalf = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
            ))}
            {hasHalf && <StarHalf className="h-4 w-4 fill-primary/50 text-primary/50" />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>
    )
}

export { StarRating }

