"use client"

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Shield, MapPin, Users, CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: MapPin,
      title: "Blockchain-Based Origin Tracking",
      description: "Trace every herb from its source location with tamper-proof blockchain records, ensuring data integrity from farm to formulation."
    },
    {
      icon: Shield,
      title: "Immutable Quality Records",
      description: "Verify purity, safety tests, and certifications stored securely on-chain, guaranteeing authentic and unaltered quality information."
    },
    {
      icon: Leaf,
      title: "Sustainable & Verified Sourcing",
      description: "Support eco-conscious farming practices with blockchain validation of growers and collectors across the supply chain."
    },
    {
      icon: Users,
      title: "Transparent Consumer Access",
      description: "Empower consumers with QR codes linked to blockchain data, providing end-to-end herb traceability at their fingertips."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Geo-Tagging & Cultivation Records",
      description: "Farmers and collectors upload soil, weather, and farming details with geo-coordinates directly to the blockchain."
    },
    {
      step: "02", 
      title: "Processing & Validation",
      description: "Drying, grinding, and testing logs are recorded as immutable blockchain transactions, ensuring tamper-proof documentation."
    },
    {
      step: "03",
      title: "Supply Chain Tracking", 
      description: "Transportation, storage, and handling events are added to the distributed ledger, visible to all stakeholders."
    },
    {
      step: "04",
      title: "Consumer QR Verification",
      description: "End-users scan a QR code to instantly access the full blockchain history of the herb, from soil to shelf."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-25 to-teal-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-25 pb-10">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1 
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight"
          >
            Blockchain-Powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Traceability</span>
            <br />
            From Soil to Shelf
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Experience Ayurveda with trust and technology. Every herb’s journey is verified. Ensuring transparency, authenticity, and purity for consumers and businesses alike.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/lookup"> 
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 cursor-pointer px-8 py-4 text-lg rounded-full shadow-xl hover:scale-110 transition-transform duration-200">
                Track Your Herb
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/importt">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full border-2 hover:scale-110 transition-transform duration-200 border-green-600 text-green-600 cursor-pointer">
                Add Your Herb Now!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Blockchain Traceability?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional supply chains lack transparency. With blockchain, every herb’s data is secure, verifiable, and visible to everyone — farmers, manufacturers, regulators, and consumers.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-10 px-4 bg-gradient-to-r from-green-50 to-emerald-50 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              How Blockchain Ensures Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each stage of the herb’s journey is captured on a secure, immutable ledger. No data manipulation, no hidden steps — just pure, transparent Ayurveda.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-green-400 to-emerald-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Trust Every
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Record</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                With blockchain traceability, your herbs come with proof, not promises. Every transaction is permanent, auditable, and secure for maximum peace of mind.
              </p>
              
              <div className="space-y-4">
                {[
                  "100% verified origin using blockchain",
                  "Immutable records for authenticity",
                  "Support for sustainable farming communities",
                  "On-chain certifications accessible anytime"
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="relative">
  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
    <video 
      src="/video1.mp4" 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="w-full h-full object-cover"
    />
  </div>
</motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-r from-green-600 to-emerald-600 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp} className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Trust Your Herbs with Ayutrace?
            </h2>
            <p className="text-xl mb-10 opacity-90 leading-relaxed">
              Join the future of Ayurveda. Blockchain-powered traceability ensures purity, authenticity, and transparency at every step.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/importt"><Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-xl">
                Start Journey of Your Herb                <ArrowRight className="ml-2 w-5 h-5" />
              </Button></Link>
              <div className="flex items-center gap-4">
                
                
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">AyuTrace by Ethicons</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Ancient Ayurveda. Modern Blockchain. Total Transparency.
          </p>
          <div className="text-sm text-gray-500">
            © 2025 Ayutrace Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
