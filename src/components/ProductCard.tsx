import { MapPin, Coins } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "./ProductCatalogue";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  getConditionColor: (condition: Product["condition"]) => string;
}

export function ProductCard({
  product,
  onSelect,
  getConditionColor,
}: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
      onClick={() => onSelect(product)}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getConditionColor(product.condition)}>
            {product.condition}
          </Badge>
          <Badge variant="outline">{product.category}</Badge>
        </div>

        <h3 className="mb-1">{product.name}</h3>
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl">{product.price} QAR</span>
            <span className="text-sm text-gray-500">
              or {product.loopCredits}
            </span>
            <Coins className="h-4 w-4 text-amber-500" />
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 pt-3 border-t">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{product.cafe}</span>
          <span className="ml-auto">{product.distance}km</span>
        </div>
      </div>
    </Card>
  );
}
