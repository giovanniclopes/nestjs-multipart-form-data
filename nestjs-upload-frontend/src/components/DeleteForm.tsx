import { useState } from "react";
import axios from "axios";

interface DeleteFormProps {
  fetchImages: () => void;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ fetchImages }) => {
  const [imageToDelete, setImageToDelete] = useState<string>("");

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

  const handleDeleteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageToDelete.trim()) {
      deleteImage(imageToDelete.trim());
    } else {
      alert("Por favor, insira o nome do arquivo da imagem para deletar.");
    }
  };

  return (
    <form
      onSubmit={handleDeleteSubmit}
      className="mt-8 flex flex-row items-center gap-4"
    >
      <input
        type="text"
        placeholder="Nome da imagem para deletar"
        value={imageToDelete}
        onChange={(e) => setImageToDelete(e.target.value)}
        className="w-96 px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-lg shadow-md hover:border-red-700 transition-colors duration-300 transform hover:scale-100 mbl:w-80"
      />
      <button
        type="submit"
        className="w-44 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
      >
        Deletar Imagem
      </button>
    </form>
  );
};

export default DeleteForm;
