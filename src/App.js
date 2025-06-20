import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import GalleryPage from './GalleryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<GalleryPage />} />
    </Routes>
  );
}