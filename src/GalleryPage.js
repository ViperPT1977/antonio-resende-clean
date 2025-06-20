import React from 'react';
import { useParams } from 'react-router-dom';

export default function GalleryPage() {
  const { category } = useParams();
  const imageCount = 12;

  const images = Array.from({ length: imageCount }, (_, i) => ({
    thumb: `/categories/${category}/image${i + 1}.jpg`,
    full: `/categories/${category}/image${i + 1}.jpg`
  }));

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10 capitalize">{category.replace(/-/g, ' ')}</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <a key={index} href={img.full} target="_blank" rel="noopener noreferrer">
            <img
              src={img.thumb}
              alt={`Render ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition"
            />
          </a>
        ))}
      </div>
    </div>
  );
}