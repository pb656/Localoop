import { MapPin, Coins, QrCode, Info, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../utils/AuthContext";
import { toast } from "sonner";
import type { Product } from "./ProductCatalogue";

interface ProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getConditionColor: (condition: Product["condition"]) => string;
}

export function ProductDialog({
  product,
  open,
  onOpenChange,
  getConditionColor,
}: ProductDialogProps) {
  const { user } = useAuth();

  const handleReserve = () => {
    if (!user) {
      toast.error("Please sign in to reserve items");
      return;
    }
    toast.success("Item reserved! You can pick it up at " + product.cafe);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.brand}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <ImageWithFallback
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <p className="text-sm text-gray-500 text-center mt-2">
              {product.images.length} photos • Swipe to view all angles
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge className={getConditionColor(product.condition)}>
                  {product.condition}
                </Badge>
                <Badge variant="outline">{product.category}</Badge>
                {product.size && (
                  <Badge variant="outline">Size {product.size}</Badge>
                )}
              </div>

              <p className="text-gray-600">{product.description}</p>
            </div>

            <Separator />

            {/* Pricing */}
            <div>
              <h4 className="text-sm mb-2">Price</h4>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl">{product.price} QAR</span>
                <span className="text-gray-500">or</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">{product.loopCredits}</span>
                  <Coins className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-gray-500">LoopCredits</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Pickup Location */}
            <div>
              <h4 className="text-sm mb-2">Pickup Location</h4>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p>{product.cafe}</p>
                  <p className="text-sm text-gray-600">
                    {product.distance}km away
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* LoopTag */}
            <div>
              <h4 className="text-sm mb-2">Authenticity & Traceability</h4>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <QrCode className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">LoopTag: {product.loopTag}</p>
                  <p className="text-sm text-gray-600">
                    Scan QR code on item to verify authenticity and view full
                    history
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Condition Details */}
            <div>
              <h4 className="text-sm mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                About "{product.condition}"
              </h4>
              <p className="text-sm text-gray-600">
                {product.condition === "New" &&
                  "Brand new items, never worn. Tags may still be attached."}
                {product.condition === "Worn 1-2x" &&
                  "Barely used items in excellent condition. Minimal signs of wear."}
                {product.condition === "Pre-loved" &&
                  "Gently used items that have been worn and loved. All items professionally cleaned."}
                {product.condition === "Vintage" &&
                  "Authentic vintage pieces with character. Age adds unique charm."}
                {product.condition === "Upcycled" &&
                  "Creatively transformed items. Each piece is one-of-a-kind."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Reserve Now
              </Button>
              <Button variant="outline" className="flex-1">
                Save for Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
