const UploadForm: React.FC = () => {
  return (
    <form
      className="flex flex-row gap-4 items-center justify-center"
      action="http://localhost:3000/images/upload"
      method="POST"
      id="uploadForm"
      encType="multipart/form-data"
    >
      <input
        className="w-96 mt-8 px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:border-blue-700 transition-colors duration-300 transform hover:scale-100 mbl:w-80"
        type="file"
        name="file"
        multiple
      />
      <input
        className="w-44 mt-8 px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        type="submit"
        value="Enviar imagem"
      />
    </form>
  );
};

export default UploadForm;
