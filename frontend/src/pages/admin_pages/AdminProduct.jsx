import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
  Download,
  X,
  Save
} from 'lucide-react';

const AdminProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Croquettes Premium pour Chien',
      price: 49.99,
      oldPrice: 59.99,
      description: 'Croquettes haut de gamme pour chiens adultes de toutes races. Enrichies en vitamines et minéraux pour une santé optimale.',
      rating: 4.8,
      reviews: 124,
      stock: 15,
      status: 'active',
      images: ['https://ik.imagekit.io/yynn3ntzglc/france/production/catalog/products/001005/1.jpg'],
      category: 'Chien',
      brand: 'Royal Canin',
      weight: '2kg',
      sales: 156,
      dateAdded: '2024-01-15',
      lowStockThreshold: 10
    },
    {
      id: 2,
      name: 'Croquettes Premium pour Chat',
      price: 39.99,
      oldPrice: 49.99,
      description: 'Croquettes haut de gamme pour chats adultes. Formulées pour maintenir une peau saine et un pelage brillant.',
      rating: 4.7,
      reviews: 90,
      stock: 20,
      status: 'active',
      images: ['https://ik.imagekit.io/yynn3ntzglc/france/production/catalog/products/001005/2.jpg'],
      category: 'Chat',
      brand: 'Royal Canin',
      weight: '1.5kg',
      sales: 134,
      dateAdded: '2024-01-12',
      lowStockThreshold: 10
    },
    {
      id: 3,
      name: 'Jouet Corde pour Chien',
      price: 15.99,
      oldPrice: null,
      description: 'Jouet en corde naturelle, parfait pour le jeu et le nettoyage des dents.',
      rating: 4.5,
      reviews: 45,
      stock: 30,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'],
      category: 'Chien',
      brand: 'Kong',
      weight: '200g',
      sales: 89,
      dateAdded: '2024-01-10',
      lowStockThreshold: 15
    },
    {
      id: 4,
      name: 'Litière Chat Naturelle',
      price: 12.99,
      oldPrice: 15.99,
      description: 'Litière naturelle absorbante et anti-odeurs. Biodégradable et respectueuse de l\'environnement.',
      rating: 4.3,
      reviews: 67,
      stock: 5,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400'],
      category: 'Chat',
      brand: 'Catsan',
      weight: '10L',
      sales: 78,
      dateAdded: '2024-01-08',
      lowStockThreshold: 10
    },
    {
      id: 5,
      name: 'Collier Anti-Puces',
      price: 29.99,
      oldPrice: 34.99,
      description: 'Collier efficace contre les puces et les tiques. Protection longue durée pour votre animal.',
      rating: 4.6,
      reviews: 88,
      stock: 0,
      status: 'out_of_stock',
      images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'],
      category: 'Chien',
      brand: 'Seresto',
      weight: '50g',
      sales: 67,
      dateAdded: '2024-01-05',
      lowStockThreshold: 5
    },
    {
      id: 6,
      name: 'Nouveau Produit Test',
      price: 19.99,
      oldPrice: null,
      description: 'Produit en cours de test, non encore publié sur le site.',
      rating: 0,
      reviews: 0,
      stock: 50,
      status: 'draft',
      images: ['https://via.placeholder.com/400'],
      category: 'Général',
      brand: 'Test Brand',
      weight: '1kg',
      sales: 0,
      dateAdded: '2024-01-20',
      lowStockThreshold: 20
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    description: '',
    stock: '',
    category: 'Chien',
    brand: '',
    weight: '',
    status: 'active',
    lowStockThreshold: 10,
    images: []
  });

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statuses = ['all', 'active', 'draft', 'out_of_stock', 'discontinued'];
  const categories = ['all', 'Chien', 'Chat', 'Oiseau', 'Général'];

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice || '',
      description: product.description,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      weight: product.weight,
      status: product.status,
      lowStockThreshold: product.lowStockThreshold,
      images: product.images
    });
    setShowModal(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      oldPrice: '',
      description: '',
      stock: '',
      category: 'Chien',
      brand: '',
      weight: '',
      status: 'active',
      lowStockThreshold: 10,
      images: []
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock),
      lowStockThreshold: parseInt(formData.lowStockThreshold),
      rating: editingProduct ? editingProduct.rating : 0,
      reviews: editingProduct ? editingProduct.reviews : 0,
      sales: editingProduct ? editingProduct.sales : 0,
      dateAdded: editingProduct ? editingProduct.dateAdded : new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...productData }
          : product
      ));
    } else {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...productData
      };
      setProducts(prev => [...prev, newProduct]);
    }
    
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedProducts.length === 0) return;
    
    switch (action) {
      case 'activate':
        setProducts(prev => prev.map(product => 
          selectedProducts.includes(product.id) 
            ? { ...product, status: 'active' }
            : product
        ));
        break;
      case 'deactivate':
        setProducts(prev => prev.map(product => 
          selectedProducts.includes(product.id) 
            ? { ...product, status: 'draft' }
            : product
        ));
        break;
      case 'delete':
        if (window.confirm(`Supprimer ${selectedProducts.length} produit(s) ?`)) {
          setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
        }
        break;
      default:
        console.warn(`Action non reconnue: ${action}`);
        break;
    }
    setSelectedProducts([]);
  };

  const openDetailModal = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800',
      discontinued: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      active: 'Actif',
      draft: 'Brouillon',
      out_of_stock: 'Rupture',
      discontinued: 'Arrêté'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const isLowStock = (product) => {
    return product.stock <= product.lowStockThreshold && product.stock > 0;
  };

  const exportProducts = () => {
    const data = filteredProducts.map(product => ({
      ID: product.id,
      Nom: product.name,
      Prix: product.price,
      Stock: product.stock,
      Catégorie: product.category,
      Marque: product.brand,
      Statut: product.status,
      Ventes: product.sales,
      Note: product.rating
    }));
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `produits-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const ProductModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Modifier produit' : 'Ajouter produit'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom du produit"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                required
              />
              <input
                type="text"
                placeholder="Marque"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                step="0.01"
                placeholder="Prix (DT)"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Ancien prix (DT)"
                value={formData.oldPrice}
                onChange={(e) => setFormData({...formData, oldPrice: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              />
              <input
                type="text"
                placeholder="Poids/Volume"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              />
            </div>

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff] h-20 resize-none"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              >
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              >
                <option value="active">Actif</option>
                <option value="draft">Brouillon</option>
                <option value="out_of_stock">Rupture de stock</option>
                <option value="discontinued">Arrêté</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                required
              />
              <input
                type="number"
                placeholder="Seuil stock bas"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({...formData, lowStockThreshold: e.target.value})}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#8657ff] hover:bg-purple-700 text-white py-2 px-4 rounded font-medium flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingProduct ? 'Modifier' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded font-medium"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ProductDetailModal = () => {
    if (!selectedProduct) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeDetailModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              
              <div className="space-y-2">
                <p><strong>Marque:</strong> {selectedProduct.brand}</p>
                <p><strong>Catégorie:</strong> {selectedProduct.category}</p>
                <p><strong>Poids:</strong> {selectedProduct.weight}</p>
                <p><strong>Date d'ajout:</strong> {new Date(selectedProduct.dateAdded).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Informations commerciales</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Prix:</span>
                    <span className="font-bold text-green-600">{selectedProduct.price.toFixed(2)} DT</span>
                  </div>
                  {selectedProduct.oldPrice && (
                    <div className="flex justify-between">
                      <span>Ancien prix:</span>
                      <span className="line-through text-gray-500">{selectedProduct.oldPrice.toFixed(2)} DT</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Stock:</span>
                    <span className={`font-medium ${isLowStock(selectedProduct) ? 'text-orange-600' : selectedProduct.stock === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedProduct.stock} unités
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    {getStatusBadge(selectedProduct.status)}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Note moyenne:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{selectedProduct.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Avis:</span>
                    <span>{selectedProduct.reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ventes:</span>
                    <span>{selectedProduct.sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenus:</span>
                    <span className="font-bold text-green-600">
                      {(selectedProduct.sales * selectedProduct.price).toFixed(2)} DT
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    closeDetailModal();
                    handleEditProduct(selectedProduct);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => {
                    handleDeleteProduct(selectedProduct.id);
                    closeDetailModal();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8657ff] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block hover:text-gray-300">
            📊 Tableau de bord
          </Link>
          <Link to="/admin/users" className="block hover:text-gray-300">
            👤 Gestion des utilisateurs
          </Link>
          <Link to="/admin/product" className="block text-yellow-300 font-semibold">
            📝 Gestion des produits
          </Link>
          <Link to="/admin/posts" className="block hover:text-gray-300">
            📄 Gestion des posts
          </Link>
          <Link to="/admin/orders" className="block hover:text-gray-300">
            🛒 Gestion des commandes
          </Link>
          <Link to="/admin/stats" className="block hover:text-gray-300">
            📈 Statistiques
          </Link>
          <Link to="/" className="block text-red-300 hover:text-red-200">
            🔓 Déconnexion
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-[#8657ff]">Gestion des Produits</h1>
            <p className="text-gray-600">Gérez le catalogue de produits de la boutique</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Plus className="w-4 h-4" />
              Ajouter produit
            </button>
            <button
              onClick={exportProducts}
              className="flex items-center gap-2 bg-[#8657ff] hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, marque ou catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              />
            </div>

            {/* Filtres */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            >
              <option value="all">Tous les statuts</option>
              {statuses.slice(1).map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Actions en lot */}
          {selectedProducts.length > 0 && (
            <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 self-center">
                {selectedProducts.length} produit(s) sélectionné(s)
              </span>
              <button
                onClick={() => handleBulkAction('activate')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Activer
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              >
                Désactiver
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Produits</p>
                <p className="text-2xl font-bold text-blue-600">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock bas</p>
                <p className="text-2xl font-bold text-orange-600">
                  {products.filter(p => isLowStock(p)).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Total</p>
                <p className="text-2xl font-bold text-purple-600">
                  {products.reduce((sum, p) => sum + (p.sales * p.price), 0).toFixed(0)} DT
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tableau des produits */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left p-4 font-semibold">Produit</th>
                  <th className="text-left p-4 font-semibold">Prix</th>
                  <th className="text-left p-4 font-semibold">Stock</th>
                  <th className="text-left p-4 font-semibold">Statut</th>
                  <th className="text-left p-4 font-semibold">Performance</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.brand} • {product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-bold text-green-600">
                        {product.price.toFixed(2)} DT
                      </div>
                      {product.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {product.oldPrice.toFixed(2)} DT
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className={`font-medium ${
                        product.stock === 0 ? 'text-red-600' : 
                        isLowStock(product) ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {product.stock}
                      </div>
                      {isLowStock(product) && (
                        <div className="text-xs text-orange-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Stock bas
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="p-4">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{product.rating} ({product.reviews})</span>
                        </div>
                        <div className="text-gray-600">
                          {product.sales} ventes
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openDetailModal(product)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {showModal && <ProductModal />}
        {showDetailModal && <ProductDetailModal />}
      </main>
    </div>
  );
};

export default AdminProduct;