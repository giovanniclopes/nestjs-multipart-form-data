// src/App.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Image {
  url: string;
  fileName: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string>("");

  // Configurações do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  // Função para buscar as imagens da API
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/images/list");
      setImages(response.data);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      setError("Erro ao buscar imagens. Tente novamente mais tarde.");
    }
  };

  const deleteImage = async (fileName: string) => {
    try {
      await axios.delete(`http://localhost:3000/images/${fileName}`);
      alert("Imagem deletada com sucesso!");
      fetchImages(); // Atualizar lista de imagens
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      alert("Erro ao deletar imagem. Verifique se o nome está correto.");
    }
  };

  // Função de envio do formulário de exclusão de imagem
  const handleDeleteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageToDelete.trim()) {
      deleteImage(imageToDelete.trim());
    } else {
      alert("Por favor, insira o nome do arquivo da imagem para deletar.");
    }
  };

  useEffect(() => {
    fetchImages();

    const intervalId = setInterval(fetchImages, 43200000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-black mb-12 drop-shadow-lg">
        Upload e Carrossel de Imagens
      </h1>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Carrossel de imagens */}
      {images.length > 0 ? (
        <Slider {...sliderSettings} className="w-full max-w-4xl">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.url}
                alt={image.fileName}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center">
                <p className="text-xs font-semibold">{image.fileName}</p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        !error && <p className="text-gray-200">Nenhuma imagem encontrada.</p>
      )}

      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
      >
        Atualizar Imagens
      </button>
      <div>
        <form
          className="flex flex-row gap-5 items-center justify-center"
          action="http://localhost:3000/images/upload"
          method="POST"
          id="uploadForm"
          encType="multipart/form-data"
        >
          <input
            className="w-96 mt-8 px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:border-blue-700 transition-colors duration-300 transform hover:scale-100"
            type="file"
            name="file"
          />
          <input
            className="mt-8 px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            type="submit"
            value="Enviar imagem"
          />
        </form>
        <div>
          <form
            onSubmit={handleDeleteSubmit}
            className="mt-8 flex flex-row items-center gap-4"
          >
            <input
              type="text"
              placeholder="Nome da imagem para deletar"
              value={imageToDelete}
              onChange={(e) => setImageToDelete(e.target.value)}
              className="w-96 px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:border-blue-700 transition-colors duration-300 transform hover:scale-100"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
            >
              Deletar Imagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
