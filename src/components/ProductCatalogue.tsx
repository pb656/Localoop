import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ProductCard } from "./ProductCard";
import { ProductDialog } from "./ProductDialog";

export interface Product {
  id: number;
  name: string;
  price: number;
  loopCredits: number;
  condition: "New" | "Worn 1-2x" | "Pre-loved" | "Vintage" | "Upcycled" | "Old";
  category: string;
  images: string[];
  cafe: string;
  distance: number;
  description: string;
  loopTag: string;
  size?: string;
  brand?: string;
}

export function ProductCatalogue() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: 165,
      loopCredits: 450,
      condition: "Vintage",
      category: "Outerwear",
      images: [
        "https://images.unsplash.com/photo-1563339387-0ba9892a3f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXR8ZW58MXx8fHwxNzYxNTk0NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1080",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1080",
      ],
      cafe: "Brew & Loop Café",
      distance: 0.8,
      description:
        "Classic vintage denim jacket in excellent condition. Features brass buttons and authentic wear patterns that add character. Perfect for layering.",
      loopTag: "LT-VDJ-001",
      size: "M",
      brand: "Levi's",
    },
    {
      id: 2,
      name: "Leather Crossbody Bag",
      price: 140,
      loopCredits: 380,
      condition: "Worn 1-2x",
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1559563458-527698bf5295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBiYWd8ZW58MXx8fHwxNzYxNjUwMDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1080",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1080",
      ],
      cafe: "Green Bean Coffee",
      distance: 1.2,
      description:
        "Premium leather crossbody bag, barely used. Adjustable strap and multiple compartments. Timeless design that goes with everything.",
      loopTag: "LT-LCB-002",
      brand: "Coach",
    },
    {
      id: 3,
      name: "Minimalist White Sneakers",
      price: 190,
      loopCredits: 520,
      condition: "New",
      category: "Footwear",
      images: [
        "https://images.unsplash.com/photo-1620989928625-08536e746255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc25lYWtlcnN8ZW58MXx8fHwxNzYxNTM2NDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1080",
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1080",
      ],
      cafe: "Espresso Yourself",
      distance: 2.8,
      description:
        "Brand new minimalist sneakers made from sustainable materials. Clean design with premium comfort. Perfect everyday shoe.",
      loopTag: "LT-MWS-003",
      size: "UK 8",
      brand: "Veja",
    },
    {
      id: 4,
      name: "Upcycled Patchwork Tote",
      price: 105,
      loopCredits: 280,
      condition: "Upcycled",
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1080",
        "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=1080",
        "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=1080",
      ],
      cafe: "Local Grounds",
      distance: 3.5,
      description:
        "Handmade tote bag created from upcycled fabric scraps. Each piece is unique. Spacious and durable for everyday use.",
      loopTag: "LT-UPT-004",
      brand: "Local Artisan",
    },
    {
      id: 5,
      name: "Cashmere Blend Scarf",
      price: 120,
      loopCredits: 320,
      condition: "Pre-loved",
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1080",
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1080",
        "https://images.unsplash.com/photo-1591561954555-607968d49ed5?w=1080",
      ],
      cafe: "Brew & Loop Café",
      distance: 0.8,
      description:
        "Luxurious cashmere blend scarf in soft neutral tones. Gently used and professionally cleaned. Perfect for any season.",
      loopTag: "LT-CBS-005",
      brand: "Burberry",
    },
    {
      id: 6,
      name: "Vintage Band T-Shirt",
      price: 80,
      loopCredits: 220,
      condition: "Vintage",
      category: "Tops",
      images: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1080",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1080",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1080",
      ],
      cafe: "Green Bean Coffee",
      distance: 1.2,
      description:
        "Authentic vintage band t-shirt with classic print. Soft, worn-in feel. A true collector's item for music lovers.",
      loopTag: "LT-VBT-006",
      size: "L",
    },
    {
      id: 7,
      name: "Sustainable Cotton Dress",
      price: 175,
      loopCredits: 480,
      condition: "New",
      category: "Dresses",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1080",
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1080",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1080",
      ],
      cafe: "Espresso Yourself",
      distance: 2.8,
      description:
        "New sustainable cotton dress from an ethical brand. Flattering fit and versatile style. Made with organic materials.",
      loopTag: "LT-SCD-007",
      size: "S",
      brand: "Reformation",
    },
    {
      id: 8,
      name: "Leather Ankle Boots",
      price: 230,
      loopCredits: 620,
      condition: "Worn 1-2x",
      category: "Footwear",
      images: [
        "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=1080",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1080",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1080",
      ],
      cafe: "Local Grounds",
      distance: 3.5,
      description:
        "Premium leather ankle boots, barely worn. Classic design that never goes out of style. Comfortable and durable.",
      loopTag: "LT-LAB-008",
      size: "UK 6",
      brand: "Dr. Martens",
    },
    {
      id: 9,
      name: "Classic Wool Cardigan",
      price: 65,
      loopCredits: 180,
      condition: "Old",
      category: "Outerwear",
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1080",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1080",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1080",
      ],
      cafe: "Corner Café",
      distance: 4.2,
      description:
        "Well-loved wool cardigan with character and history. Shows signs of wear but still functional and cozy. Perfect for layering on cool evenings.",
      loopTag: "LT-WOC-009",
      size: "M",
      brand: "Uniqlo",
    },
  ];

  const conditions = ["New", "Worn 1-2x", "Pre-loved", "Vintage", "Upcycled", "Old"];
  const categories = ["Outerwear", "Accessories", "Footwear", "Tops", "Dresses"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition =
      selectedCondition === "all" || product.condition === selectedCondition;
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCondition && matchesCategory;
  });

  const getConditionColor = (condition: Product["condition"]) => {
    switch (condition) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Worn 1-2x":
        return "bg-green-100 text-green-800";
      case "Pre-loved":
        return "bg-purple-100 text-purple-800";
      case "Vintage":
        return "bg-amber-100 text-amber-800";
      case "Upcycled":
        return "bg-emerald-100 text-emerald-800";
      case "Old":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="catalogue" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl mb-4">Browse Collections</h2>
          <p className="text-xl text-gray-600">
            Discover sustainable fashion within 5km of you
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active filters display */}
          <div className="flex gap-2 mt-4">
            {conditions.map((condition) => (
              <Badge
                key={condition}
                variant={selectedCondition === condition ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCondition === condition ? getConditionColor(condition as Product["condition"]) : ""
                }`}
                onClick={() =>
                  setSelectedCondition(
                    selectedCondition === condition ? "all" : condition
                  )
                }
              >
                {condition}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
                getConditionColor={getConditionColor}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">
                No items found matching your criteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCondition("all");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
          getConditionColor={getConditionColor}
        />
      )}
    </section>
  );
}
