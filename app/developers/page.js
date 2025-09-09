"use client";

import Image from "next/image";

export default function DevelopersPage() {
  const developers = [
    {
      name: "Nikunj Miglani",
      role: "Web Developer, Blockchain",
      bio: "Designs the blockchain infrastructure ensuring security, scalability, and immutability for herb traceability.",
      image: "/dev1.jpg",
    },
    {
      name: "Ayush Gupta",
      role: "Blockchain, Backend ",
      bio: "Builds the user interface and backend services that connect farmers, manufacturers, and consumers.",
      image: "/dev2.jpg",
    },
    {
      name: "Sushant Bhardwaj",
      role: "Blockchain",
      bio: "Works on geo-tagging, analytics, and predictive models to enhance supply chain insights.",
      image: "/dev3.jpg",
    },
    {
      name: "Arpita Singh Baghel",
      role: "UI/UX Designer",
      bio: "Crafts intuitive and beautiful interfaces for seamless interaction across devices.",
      image: "/dev4.jpg",
    },
    {
      name: "Prabhuji Mishra",
      role: "Research",
      bio: "Develops smart contracts that automate verification and trust across the Ayurvedic herb ecosystem.",
      image: "/dev5.jpg",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center drop-shadow-md">
          Meet Our Developers
        </h1>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          The Ethicons platform is built by a passionate team of developers
          combining technology and Ayurveda to ensure trust and transparency.
        </p>

        {/* Developer Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="w-full max-w-sm p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {/* Profile Image */}
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image
                  src={dev.image}
                  alt={dev.name}
                  fill
                  className="rounded-full object-cover border-4 border-green-400"
                />
              </div>

              {/* Info */}
              <h2 className="text-2xl font-semibold text-green-300 text-center">
                {dev.name}
              </h2>
              <p className="text-sm text-gray-400 text-center mb-3">
                {dev.role}
              </p>
              <p className="text-gray-200 text-center">{dev.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
