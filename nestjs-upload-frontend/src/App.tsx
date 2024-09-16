import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "./components/ImageGallery";
import UploadForm from "./components/UploadForm";
import DeleteForm from "./components/DeleteForm";
import ErrorMessage from "./components/ErrorMessage";

interface Image {
  url: string;
  fileName: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/images/list");
      setImages(response.data);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      setError("Erro ao buscar imagens. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchImages();

    const intervalId = setInterval(fetchImages, 43200000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-black mb-12 drop-shadow-lg mbl:text-3xl">
        Upload utilizando Multipart/form-data
      </h1>

      {error && <ErrorMessage message={error} />}

      <ImageGallery images={images} />

      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
      >
        Atualizar Imagens
      </button>

      <UploadForm />

      <DeleteForm fetchImages={fetchImages} />
    </div>
  );
}

export default App;
