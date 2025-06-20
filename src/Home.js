// Portfolio Starter - V3.4
// Author: Antonio Resende
// Version: 3.4
// Date: 2025-06-20
// Description: React + Tailwind CSS portfolio site with categorized 3D renderings, contact info, and full gallery features

import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { title: 'Abstract', image: '/categories/abstract.jpg', description: 'Creative compositions exploring form, color, and light.' },
  { title: 'Architectural', image: '/categories/architectural.jpg', description: 'Renderings of interiors, exteriors, and architectural concepts.' },
  { title: 'Automation', image: '/categories/automation.jpg', description: 'Factory systems, robotics, and industrial automation concepts.' },
  { title: 'CNC Machines', image: '/categories/cnc.jpg', description: '3D models and renderings of CNC machining equipment.' },
  { title: 'Electronics', image: '/categories/electronics.jpg', description: 'Boards, enclosures, and product visualizations in electronics.' },
  { title: 'Food & Drink Products', image: '/categories/food.jpg', description: 'Packaging, presentation, and photorealistic renderings of consumables.' },
  { title: 'Jewelry', image: '/categories/jewelry.jpg', description: 'Detailed renderings of rings, pendants, and luxury accessories.' },
  { title: 'Mechanical Parts', image: '/categories/mechanical.jpg', description: 'Precision mechanical components and technical renderings.' },
  { title: 'Vehicles', image: '/categories/vehicles.jpg', description: 'From automotive components to full vehicle visualizations.' },
  { title: 'Others', image: '/categories/others.jpg', description: 'Miscellaneous projects and experiments in 3D rendering.' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-6 text-white">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Antonio Resende | 3D Design & Rendering</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Explore a categorized portfolio of industrial designs, product concepts, and photorealistic renderings.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-24">
        {categories.map((cat, index) => (
          <a
            key={index}
            href={`/${cat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            className="bg-gray-900 shadow-2xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 group"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-56 object-cover group-hover:opacity-90"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-2">{cat.title}</h2>
              <p className="text-gray-400 text-sm">{cat.description}</p>
            </div>
          </a>
        ))}
      </section>

      <footer className="text-center text-sm text-gray-400">
        <div className="space-y-2">
          <p>Email: <a href="mailto:amaralresende@gmail.com" className="text-white hover:underline">amaralresende@gmail.com</a></p>
          <p>Phone/WhatsApp: <a href="https://wa.me/351935017007" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">+351 935 017 007</a></p>
          <p>Location: Ovar, Portugal</p>
        </div>
        <p className="mt-8">© 2025 Antonio Resende. All rights reserved.</p>
      </footer>
    </div>
  );
}
