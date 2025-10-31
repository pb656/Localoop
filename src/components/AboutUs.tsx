import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Leaf, Users, Recycle, Globe2, ArrowLeft } from "lucide-react";

export function AboutUs({ onBack }: { onBack: () => void }) {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-8 w-8 text-green-600" />
            <h2 className="text-4xl">About Localoop</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re building a circular fashion economy—powered by community, transparency, and local impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6">
            <Users className="h-6 w-6 mb-3 text-blue-600" />
            <h3 className="mb-2">Community First</h3>
            <p className="text-sm text-gray-600">Local buyers and sellers form the heart of our platform. We keep value within neighborhoods.</p>
          </Card>
          <Card className="p-6">
            <Recycle className="h-6 w-6 mb-3 text-green-600" />
            <h3 className="mb-2">Circular by Design</h3>
            <p className="text-sm text-gray-600">Every item gets a second life. We help reduce waste, extend fashion lifecycles, and reward sustainability.</p>
          </Card>
          <Card className="p-6">
            <Globe2 className="h-6 w-6 mb-3 text-amber-600" />
            <h3 className="mb-2">Transparent & Traceable</h3>
            <p className="text-sm text-gray-600">With LoopTags and café partnerships, purchasing stays accountable and verified.</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To make sustainable fashion the default choice by connecting local communities, enabling effortless reuse, and rewarding eco-friendly behavior with LocaCredit.
          </p>
        </Card>
      </div>
    </section>
  );
}
