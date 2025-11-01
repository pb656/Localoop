import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Leaf, Users, Recycle, Globe2, ArrowLeft, Mail, Send } from "lucide-react";

export function AboutUs({ onBack }: { onBack: () => void }) {
  return (
    <section id="about-us" className="py-16 bg-gradient-to-br from-green-50 to-blue-50 min-h-[70vh]">
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

        <Card className="p-6 mb-10">
          <h3 className="mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To make sustainable fashion the default choice by connecting local communities, enabling effortless reuse, and rewarding eco-friendly behavior with LocaCredit.
          </p>
        </Card>

        <div className="text-center mb-10">
          <h2 className="text-3xl mb-2">Meet Our Team</h2>
          <p className="text-gray-600">The people behind Localoop</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 text-center">
            <img 
              src="/team/Ziya.jpg" 
              alt="Ziya Fathima"
              className="h-32 w-32 mx-auto mb-4 rounded-full object-cover border-4 border-blue-200"
            />
            <h4 className="mb-1 font-semibold">Ziya Fathima</h4>
            <p className="text-sm text-gray-600 mb-4">CEO & Co-founder</p>
            <p className="text-sm">Leading Localoop's vision for sustainable fashion transformation</p>
          </Card>

          <Card className="p-6 text-center">
            <img 
              src="/team/Pranay.jpg" 
              alt="Pranay Bhatia"
              className="h-32 w-32 mx-auto mb-4 rounded-full object-cover border-4 border-green-200"
            />
            <h4 className="mb-1 font-semibold">Pranay Bhatia</h4>
            <p className="text-sm text-gray-600 mb-4">CTO & Co-founder</p>
            <p className="text-sm">Building the technology powering circular fashion experiences</p>
          </Card>

          <Card className="p-6 text-center">
            <img 
              src="/team/Nandini.jpg" 
              alt="Nandini Pathak"
              className="h-32 w-32 mx-auto mb-4 rounded-full object-cover border-4 border-amber-200"
            />
            <h4 className="mb-1 font-semibold">Nandini Pathak</h4>
            <p className="text-sm text-gray-600 mb-4">CMO & Co-founder</p>
            <p className="text-sm">Connecting cafés and communities for seamless exchange</p>
          </Card>
        </div>

  <Card id="contact-us" className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl">Get In Touch</h2>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon."); }}>
            <div>
              <Label htmlFor="contactName">Your Name</Label>
              <Input id="contactName" type="text" placeholder="Ahmed Al-Mansoori" required />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input id="contactEmail" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="contactMessage">Message</Label>
              <textarea
                id="contactMessage"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Tell us how we can help..."
                required
              ></textarea>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
