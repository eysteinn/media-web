import React, { useState, useEffect } from 'react';
import './photos.css';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetching images from an API
    fetch('http://localhost:8080/api/v1/search')
        .then(response => response.json())
        .then(data => {
        if (data && data.photos) {
            setImages(data.photos.slice(0, 100)); // Limiting to the first 20 images
        }
        })
        .catch(error => console.log('Error fetching images:', error));
    }, []);

    const handleImageClick = image => {
        setSelectedImage(image);
        };

        const handleCloseImage = () => {
        setSelectedImage(null);
        };
        
  return (
    <div className="image-grid">
      {images.map(image => (
        <img 
            key={image.uuid}
            src={image.thumbnail_url} 
            alt={image.filename} 
            className="image-item"
            onClick={() => handleImageClick(image)}
 
        />
      ))}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseImage}>
            
          <div className="modal">
          <div >
            Timestamp: {selectedImage.unixtime}
            </div>
            <img
              src={selectedImage.image_url} // Adjust URL structure as needed
              alt={selectedImage.filename}
              className="modal-image"
            />
            <button onClick={handleCloseImage} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;