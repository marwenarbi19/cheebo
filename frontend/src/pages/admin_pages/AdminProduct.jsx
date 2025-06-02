import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Plus, Download, Search, Edit, Trash2 } from 'lucide-react';

const AdminProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Croquettes Premium',
      category: 'Nourriture',
      price: 29.99,
      stock: 100,
      status: 'active',
      description: 'Croquettes pour chiens de haute qualité',
      image: '/products/croquettes.jpg'
    },
    {
      id: 2,
      name: 'Jouet à mâcher',
      category: 'Jouets',
      price: 12.50,
      stock: 50,
      status: 'active',
      description: 'Jouet durable pour chiens',
      image: '/products/jouet.jpg'
    },
    {
      id: 3,
      name: 'Litière pour chats',
      category: 'Accessoires',
      price: 15.75,
      stock: 10,
      status: 'low_stock',
      description: 'Litière agglomérante pour chats',
      image: '/products/litiere.jpg'
    },
    {
      id: 4,
      name: 'Collier ajustable',
      category: 'Accessoires',
      price: 9.99,
      stock: 0,
      status: 'out_of_stock',
      description: 'Collier pour chiens, taille ajustable',
      image: '/products/collier.jpg'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active',
    description: '',
    image: ''
  });

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'active',
      description: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      description: product.description,
      image: product.image
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProductData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10)
    };

    if (editingProduct) {
      // Modifier produit existant
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...newProductData }
          : product
      ));
    } else {
      // Ajouter nouveau produit
      const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
      const newProduct = {
        id: maxId + 1,
        ...newProductData,
        image: formData.image || '/products/default.jpg'
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
      case 'out_of_stock':
        setProducts(prev => prev.map(product => 
          selectedProducts.includes(product.id) 
            ? { ...product, status: 'out_of_stock' }
            : product
        ));
        break;
      case 'delete':
        if (window.confirm(`Supprimer ${selectedProducts.length} produit(s) ?`)) {
          setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
          setSelectedProducts([]);
        }
        break;
      default:
        break;
    }
  };

  const exportProducts = () => {
    const csvContent = [
      ['ID', 'Nom', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Description'],
      ...products.map(product => [
        product.id,
        product.name,
        product.category,
        product.price,
        product.stock,
        product.status,
        product.description
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products_export.csv';
    link.click();
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      out_of_stock: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      low_stock: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    
    const labels = {
      active: 'En stock',
      out_of_stock: 'Rupture',
      low_stock: 'Stock faible'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="p-10">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-[#8657ff]">Gestion des Produits</h1>
            <p className="text-gray-600">Gérez le catalogue de produits de la boutique</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter produit
            </button>
            <button
              onClick={exportProducts}
              className="flex items-center gap-2 bg-[#8657ff] hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Filtres et actions */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
              />
            </div>

            {/* Filtre par statut */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">En stock</option>
              <option value="low_stock">Stock faible</option>
              <option value="out_of_stock">Rupture</option>
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
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Activer
              </button>
              <button
                onClick={() => handleBulkAction('out_of_stock')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Marquer rupture
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>

        {/* Tableau des produits */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 focus:ring-[#8657ff]"
                    />
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-600">Produit</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Catégorie</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Prix</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Stock</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Statut</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      Aucun produit trouvé
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="rounded border-gray-300 focus:ring-[#8657ff]"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => {
                              e.target.src = '/products/default.jpg';
                            }}
                          />
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{product.category}</td>
                      <td className="p-4 text-sm text-gray-600">{product.price.toFixed(2)} €</td>
                      <td className="p-4 text-sm text-gray-600">{product.stock}</td>
                      <td className="p-4">{getStatusBadge(product.status)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Modifier"
                            aria-label={`Modifier le produit ${product.name}`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Supprimer"
                            aria-label={`Supprimer le produit ${product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal d'édition/ajout */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              
              <h3 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Modifier produit' : 'Ajouter produit'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <input
                    type="text"
                    placeholder="Catégorie"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Prix"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                  >
                    <option value="active">En stock</option>
                    <option value="low_stock">Stock faible</option>
                    <option value="out_of_stock">Rupture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                    rows="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL de l'image</label>
                  <input
                    type="text"
                    placeholder="URL de l'image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#8657ff] hover:bg-purple-700 text-white py-2 px-4 rounded font-medium transition-colors"
                  >
                    {editingProduct ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded font-medium transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProduct;