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
import Masonry from 'react-masonry-css';

export default function GalleryPage() {
  const { slug } = useParams();
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const importAll = async () => {
      setIsLoading(true);
      const loadedImages = [];
      const loadImage = (url) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = url;
          img.onload = () => resolve(url);
          img.onerror = () => resolve(null);
        });

      const imagePromises = [];
      for (let i = 1; i <= 50; i++) {
        const url = `/categories/${slug}/image${i}.jpg`;
        imagePromises.push(loadImage(url));
      }

      const results = await Promise.all(imagePromises);
      results.forEach((url) => {
        if (url) loadedImages.push({ src: url });
      });

      setImages(loadedImages);
      setIsLoading(false);
    };
    importAll();
  }, [slug]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1280: 4,
    1024: 3,
    640: 2,
    0: 1,
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="w-full h-64 bg-gray-800 rounded-lg animate-pulse-modern overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg animate-shimmer"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <Link to="/" className="inline-block mt-2 text-blue-400 hover:underline">← Back to Home</Link>
      </div>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
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
                className="w-full mb-4 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer opacity-0 animate-fade-in"
                style={{ breakInside: 'avoid' }}
              />
            ))}
          </Masonry>
          {images.length === 0 && (
            <div className="text-center col-span-full py-20">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-xl text-gray-400 mb-2">No images found</p>
              <p className="text-sm text-gray-500">This category appears to be empty</p>
            </div>
          )}
        </>
      )}

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
          
          @keyframes pulse-modern {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.8; }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .animate-pulse-modern {
            animation: pulse-modern 2s ease-in-out infinite;
          }
          
          .animate-shimmer {
            background: linear-gradient(90deg, #2d3748 25%, #4a5568 50%, #2d3748 75%);
            background-size: 200% 100%;
            animation: shimmer 2s ease-in-out infinite;
          }
          /* Masonry styles */
          .my-masonry-grid {
            display: flex;
            margin-left: -1rem; /* gutter size offset */
            width: auto;
          }
          .my-masonry-grid_column {
            padding-left: 1rem; /* gutter size */
            background-clip: padding-box;
          }
          .my-masonry-grid_column > img {
            margin-bottom: 1rem;
          }
        `}
      </style>
    </div>
  );
}