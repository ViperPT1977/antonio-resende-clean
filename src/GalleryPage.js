// Portfolio Starter - V3.4
// Author: Antonio Resende
// Version: 3.4
// Date: 2025-06-20
// Description: Full gallery support with lightbox, zoom, fullscreen, lazy loading, swipe navigation

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

export default function GalleryPage() {
  const { slug } = useParams();
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const importAll = async () => {
      const loadedImages = [];
      for (let i = 1; i <= 50; i++) {
        const url = `/categories/${slug}/image${i}.jpg`;
        try {
          const response = await fetch(url, { method: 'HEAD' });
          if (response.ok) {
            loadedImages.push({ src: url });
          }
        } catch (error) {
          break;
        }
      }
      setImages(loadedImages);
    };
    importAll();
  }, [slug]);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <Link to="/" className="inline-block mt-2 text-blue-400 hover:underline">← Back to Home</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Gallery image ${index + 1}`}
            loading="lazy"
            onClick={() => {
              setPhotoIndex(index);
              setLightboxOpen(true);
            }}
            className="w-full h-64 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer opacity-0 animate-fade-in"
          />
        ))}
        {images.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">No images found for this category.</p>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={images}
          index={photoIndex}
          plugins={[Fullscreen, Zoom]}
          styles={{ container: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
        />
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
