import React, { useState, useEffect } from "react";
import { Search, MapPin, PlusCircle, X, Upload } from "lucide-react";
import clsx from "clsx";
import Layout from "../components/Layout";

// AnimalCard Component
const AnimalCard = ({ animal, onClick }) => {
  return (
    <div
      className="border rounded-lg p-4 shadow-md bg-white dark:bg-dark-card text-gray-800 dark:text-dark-text transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      {animal.image && (
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-semibold">{animal.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{animal.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 italic">{animal.type}</p>
    </div>
  );
};

// AddAnimalForm Component
const AddAnimalForm = ({ onAddAnimal, onClose }) => {
  const [name, setName] = useState("");
  const [history, setHistory] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("Mâle");
  const [sterilized, setSterilized] = useState("Non");
  const [vaccinated, setVaccinated] = useState("Oui");
  const [availability, setAvailability] = useState("Oui");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnimal = {
      id: Date.now(),
      name,
      type: species,
      description: history,
      image: image || null,
      address,
      phone,
      gender,
      sterilized,
      vaccinated,
      availability,
      birthDate,
    };
    onAddAnimal(newAnimal);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image Upload */}
      <div className="flex flex-col items-center">
        <div className="w-full h-32 bg-gray-300 dark:bg-dark-accent rounded-md flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Uploaded animal"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <label className="flex flex-col items-center cursor-pointer">
              <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400 mt-1">
                Uploader une image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Nom de l'animal de compagnie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded bg-gray-200 dark:bg-dark-accent text-gray-800 dark:text-dark-text border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* History */}
      <div>
        <textarea
          placeholder="Histoire de l'animal de compagnie"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          required
          className="w-full border p-2 rounded bg-gray-200 dark:bg-dark-accent text-gray-800 dark:text-dark-text border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
        />
      </div>

      {/* Address */}
      <div>
        <input
          type="text"
          placeholder="Adresse de l'animal de compagnie"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border p-2 rounded bg-gray-200 dark:bg-dark-accent text-gray-800 dark:text-dark-text border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Phone Number */}
      <div>
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border p-2 rounded bg-gray-200 dark:bg-dark-accent text-gray-800 dark:text-dark-text border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      

      {/* Species */}
      <div>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
          className="w-full border p-2 rounded bg-gray-200 dark:bg-dark-accent text-gray-800 dark:text-dark-text border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>
            Espèce
          </option>
          <option value="Chien">Chien</option>
          <option value="Chat">Chat</option>
          <option value="Oiseau">Oiseau</option>
          <option value="Lapin">Lapin</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Le genre
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Mâle"
              checked={gender === "Mâle"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Mâle
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Femelle"
              checked={gender === "Femelle"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Femelle
          </label>
        </div>
      </div>

      {/* Sterilized */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Stérilisé
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sterilized"
              value="Oui"
              checked={sterilized === "Oui"}
              onChange={(e) => setSterilized(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Oui
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sterilized"
              value="Non"
              checked={sterilized === "Non"}
              onChange={(e) => setSterilized(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Non
          </label>
        </div>
      </div>

      {/* Vaccinated */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Vaccins
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="vaccinated"
              value="Oui"
              checked={vaccinated === "Oui"}
              onChange={(e) => setVaccinated(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Oui
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="vaccinated"
              value="Non"
              checked={vaccinated === "Non"}
              onChange={(e) => setVaccinated(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Non
          </label>
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Disponibilité
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="availability"
              value="Oui"
              checked={availability === "Oui"}
              onChange={(e) => setAvailability(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Oui
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="availability"
              value="Non"
              checked={availability === "Non"}
              onChange={(e) => setAvailability(e.target.value)}
              className="mr-2 text-primary focus:ring-primary"
            />
            Non
          </label>
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="w-full border p-2 rounded bg-gray-200 dark:bg-dark-accent text-gray-800 dark:text-dark-text border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
        >
          Ajouter un animal
        </button>
      </div>
    </form>
  );
};

// AnimalDetailsModal Component
const AnimalDetailsModal = ({ animal, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-dark-card rounded-lg p-4 max-w-md w-full relative max-h-[90vh] overflow-y-auto scrollbar-rounded">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        {animal.image && (
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <div className="text-gray-800 dark:text-dark-text">
          <h3 className="text-xl font-semibold mb-2">
            {animal.name} <span className="text-primary">✔</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{animal.description}</p>
          <h4 className="text-lg font-semibold mb-2">Détails de l'animal</h4>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Espèce:</span> {animal.type}
            </p>
            <p>
              <span className="font-medium">Genre:</span> {animal.gender || "Non spécifié"}
            </p>
            <p>
              <span className="font-medium">Date de naissance:</span>{" "}
              {animal.birthDate || "Non spécifiée"}
            </p>
            <p>
              <span className="font-medium">Vaccins:</span> {animal.vaccinated || "Non spécifié"}
            </p>
            <p>
              <span className="font-medium">Stérilisé:</span> {animal.sterilized || "Non spécifié"}
            </p>
            <p>
              <span className="font-medium">Disponibilité:</span>{" "}
              {animal.availability || "Non spécifiée"}
            </p>
            <p>
              <span className="font-medium">Adresse:</span> {animal.address || "Non spécifiée"}
            </p>
            <p>
              <span className="font-medium">Téléphone:</span> {animal.phone || "Non spécifié"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function Adoption() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const animalsPerPage = 6;

  // Fetch animals
  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const data = [
          {
            id: 1,
            name: "Milo",
            type: "Chien",
            description: "Adorable et joueur.",
            image: "https://placedog.net/400/300?id=1",
          },
          {
            id: 2,
            name: "Luna",
            type: "Chat",
            description: "Très affectueuse.",
            image: "https://placekitten.com/400/300",
          },
          {
            id: 3,
            name: "Coco",
            type: "Oiseau",
            description: "Chante tous les matins.",
            image: "https://www.publicdomainpictures.net/pictures/320000/velka/bird-on-a-tree-1533444673n9B.jpg",
          },
          {
            id: 4,
            name: "Bunny",
            type: "Lapin",
            description: "Adore les carottes.",
            image: "https://cdn.pixabay.com/photo/2018/03/29/12/30/rabbit-3270424_1280.jpg",
          },
          {
            id: 5,
            name: "Rex",
            type: "Chien",
            description: "Garde bien la maison.",
            image: "https://placedog.net/400/300?id=5",
          },
          {
            id: 6,
            name: "Mimi",
            type: "Chat",
            description: "Très calme et propre.",
            image: "https://placekitten.com/401/300",
          },
          {
            id: 7,
            name: "Sky",
            type: "Oiseau",
            description: "Très curieux.",
            image: "https://cdn.pixabay.com/photo/2016/03/27/22/22/bird-1284512_1280.jpg",
          },
        ];
        setAnimals(data);
      } catch {
        setError("Impossible de charger les animaux.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleAddAnimal = (newAnimal) => {
    setAnimals((prev) => [...prev, newAnimal]);
  };

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
  };

  const closeDetailsModal = () => {
    setSelectedAnimal(null);
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesType = selectedType ? animal.type === selectedType : true;
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredAnimals.length / animalsPerPage);
  const startIndex = (currentPage - 1) * animalsPerPage;
  const currentAnimals = filteredAnimals.slice(startIndex, startIndex + animalsPerPage);

  const renderPaginationButtons = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        className={clsx(
          "px-3 py-1 rounded",
          currentPage === i + 1
            ? "bg-primary text-white"
            : "bg-secondary dark:bg-dark-accent text-gray-700 dark:text-dark-text hover:bg-primary hover:text-white"
        )}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen font-sans bg-secondary dark:bg-dark-gray transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-dark-card p-4 shadow-md flex items-center justify-between">
          <div className="container mx-auto flex items-center gap-4 flex-1">
            <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Recherche"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <MapPin className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
        </header>

        {/* Add Animal Button */}
        <div className="container mx-auto p-4 flex justify-end">
          <button
            className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark"
            onClick={() => setIsModalOpen(true)}
            aria-label="Ajouter un animal"
          >
            <PlusCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="container mx-auto p-4 flex gap-2 overflow-x-auto">
          {["Tous", "Chien", "Chat", "Oiseau", "Lapin"].map((type) => (
            <button
              key={type}
              className={clsx(
                "px-3 py-1 rounded-full text-sm cursor-pointer whitespace-nowrap",
                selectedType === type || (type === "Tous" && selectedType === null)
                  ? "bg-primary text-white"
                  : "bg-secondary dark:bg-dark-accent text-gray-700 dark:text-dark-text hover:bg-primary hover:text-white"
              )}
              onClick={() => handleTypeChange(type === "Tous" ? null : type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
              Animaux à adopter
            </h2>

            {loading && <p className="text-gray-800 dark:text-dark-text">Chargement...</p>}
            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAnimals.length > 0 ? (
                currentAnimals.map((animal) => (
                  <AnimalCard 
                    key={animal.id} 
                    animal={animal} 
                    onClick={() => handleAnimalClick(animal)} 
                  />
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
                  Aucun animal trouvé.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 flex-wrap gap-2">
                {renderPaginationButtons()}
              </div>
            )}
          </div>
        </main>

        {/* Animal Details Modal */}
        {selectedAnimal && (
          <AnimalDetailsModal animal={selectedAnimal} onClose={closeDetailsModal} />
        )}

        {/* Modal for adding animal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto scrollbar-rounded">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Fermer le formulaire"
              >
                <X className="h-6 w-6 text-gray-800 dark:text-dark-text" />
              </button>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-dark-text">
                Ajouter un animal
              </h3>
              <AddAnimalForm
                onAddAnimal={handleAddAnimal}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}