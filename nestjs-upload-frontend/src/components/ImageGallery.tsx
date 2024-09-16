interface ImageGalleryProps {
  images: Array<{ url: string; fileName: string }>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={image.url}
              alt={image.fileName}
              className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300 ease-in-out"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
              <p className="text-xs font-semibold">{image.fileName}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-200">Nenhuma imagem encontrada.</p>
      )}
    </div>
  );
};

export default ImageGallery;
