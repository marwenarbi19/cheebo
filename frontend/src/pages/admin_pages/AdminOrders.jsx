import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Euro,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  Download
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'CMD-001',
      customerName: 'Jean Dupont',
      customerEmail: 'jean.dupont@email.com',
      customerPhone: '+33 6 12 34 56 78',
      customerAddress: '123 rue de la Paix, 75001 Paris',
      orderDate: '2024-01-20T10:30:00',
      status: 'processing',
      total: 89.97,
      items: [
        { name: 'Croquettes Premium Chien', quantity: 2, price: 49.99 },
        { name: 'Jouet Corde', quantity: 1, price: 15.99 }
      ],
      paymentMethod: 'Carte bancaire',
      paymentStatus: 'paid',
      shippingMethod: 'Standard',
      trackingNumber: 'FR123456789',
      notes: 'Livraison en point relais demandée'
    },
    {
      id: 'CMD-002',
      customerName: 'Marie Lefèvre',
      customerEmail: 'marie.lefevre@email.com',
      customerPhone: '+33 6 98 76 54 32',
      customerAddress: '456 avenue des Fleurs, 69000 Lyon',
      orderDate: '2024-01-19T15:45:00',
      status: 'shipped',
      total: 67.98,
      items: [
        { name: 'Croquettes Premium Chat', quantity: 1, price: 39.99 },
        { name: 'Litière Naturelle', quantity: 2, price: 12.99 }
      ],
      paymentMethod: 'PayPal',
      paymentStatus: 'paid',
      shippingMethod: 'Express',
      trackingNumber: 'FR987654321',
      notes: ''
    },
    {
      id: 'CMD-003',
      customerName: 'Thomas Martin',
      customerEmail: 'thomas.martin@email.com',
      customerPhone: '+33 6 11 22 33 44',
      customerAddress: '789 boulevard du Soleil, 13000 Marseille',
      orderDate: '2024-01-21T09:15:00',
      status: 'pending',
      total: 156.45,
      items: [
        { name: 'Croquettes Premium Chien', quantity: 3, price: 49.99 },
        { name: 'Collier Anti-Puces', quantity: 1, price: 29.99 }
      ],
      paymentMethod: 'Virement',
      paymentStatus: 'pending',
      shippingMethod: 'Standard',
      trackingNumber: '',
      notes: 'Client VIP - traitement prioritaire'
    },
    {
      id: 'CMD-004',
      customerName: 'Sophie Dubois',
      customerEmail: 'sophie.dubois@email.com',
      customerPhone: '+33 6 55 44 33 22',
      customerAddress: '321 rue des Animaux, 31000 Toulouse',
      orderDate: '2024-01-18T14:20:00',
      status: 'delivered',
      total: 78.96,
      items: [
        { name: 'Croquettes Premium Chat', quantity: 2, price: 39.99 }
      ],
      paymentMethod: 'Carte bancaire',
      paymentStatus: 'paid',
      shippingMethod: 'Express',
      trackingNumber: 'FR456789123',
      notes: 'Livraison réussie'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtrage des commandes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || order.paymentStatus === filterPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentStatuses = ['all', 'pending', 'paid', 'failed', 'refunded'];

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleOrderAction = (orderId, action) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        switch (action) {
          case 'process':
            return { ...order, status: 'processing' };
          case 'ship':
            return { ...order, status: 'shipped' };
          case 'deliver':
            return { ...order, status: 'delivered' };
          case 'cancel':
            return { ...order, status: 'cancelled' };
          default:
            return order;
        }
      }
      return order;
    }));
  };

  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) return;
    
    switch (action) {
      case 'process':
        setOrders(prev => prev.map(order => 
          selectedOrders.includes(order.id) 
            ? { ...order, status: 'processing' }
            : order
        ));
        break;
      case 'ship':
        setOrders(prev => prev.map(order => 
          selectedOrders.includes(order.id) 
            ? { ...order, status: 'shipped' }
            : order
        ));
        break;
      case 'cancel':
        if (window.confirm(`Annuler ${selectedOrders.length} commande(s) ?`)) {
          setOrders(prev => prev.map(order => 
            selectedOrders.includes(order.id) 
              ? { ...order, status: 'cancelled' }
              : order
          ));
        }
        break;
    }
    setSelectedOrders([]);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      pending: 'En attente',
      processing: 'En cours',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      pending: 'En attente',
      paid: 'Payé',
      failed: 'Échec',
      refunded: 'Remboursé'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportOrders = () => {
    const data = filteredOrders.map(order => ({
      Commande: order.id,
      Client: order.customerName,
      Email: order.customerEmail,
      Date: formatDate(order.orderDate),
      Statut: order.status,
      Paiement: order.paymentStatus,
      Total: order.total
    }));
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commandes-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const OrderModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations commande */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Commande {selectedOrder.id}</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Informations client</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedOrder.customerAddress}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Détails commande</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{formatDate(selectedOrder.orderDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="flex justify-between">
                    <span>Paiement:</span>
                    {getPaymentBadge(selectedOrder.paymentStatus)}
                  </div>
                  <div className="flex justify-between">
                    <span>Méthode paiement:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison:</span>
                    <span>{selectedOrder.shippingMethod}</span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span>Suivi:</span>
                      <span className="font-mono">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Articles et actions */}
            <div>
              <h3 className="font-semibold mb-4">Articles commandés</h3>
              <div className="space-y-3 mb-6">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
                      <p className="text-sm text-gray-600">{item.price.toFixed(2)} € x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>{selectedOrder.total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Actions</h3>
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleOrderAction(selectedOrder.id, 'process');
                      closeModal();
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    Traiter la commande
                  </button>
                )}
                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => {
                      handleOrderAction(selectedOrder.id, 'ship');
                      closeModal();
                    }}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg"
                  >
                    Marquer comme expédiée
                  </button>
                )}
                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => {
                      handleOrderAction(selectedOrder.id, 'deliver');
                      closeModal();
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                  >
                    Marquer comme livrée
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm('Annuler cette commande ?')) {
                      handleOrderAction(selectedOrder.id, 'cancel');
                      closeModal();
                    }
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  Annuler la commande
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
          <Link to="/admin/product" className="block hover:text-gray-300">
            📝 Gestion des produits
          </Link>
          <Link to="/admin/posts" className="block hover:text-gray-300">
            📄 Gestion des posts
          </Link>
          <Link to="/admin/orders" className="block text-yellow-300 font-semibold">
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
            <h1 className="text-3xl font-bold mb-2 text-[#8657ff]">Gestion des Commandes</h1>
            <p className="text-gray-600">Suivez et gérez toutes les commandes de la boutique</p>
          </div>
          
          <button
            onClick={exportOrders}
            className="flex items-center gap-2 bg-[#8657ff] hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par numéro, nom ou email..."
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
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            >
              <option value="all">Tous les paiements</option>
              {paymentStatuses.slice(1).map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Actions en lot */}
          {selectedOrders.length > 0 && (
            <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 self-center">
                {selectedOrders.length} commande(s) sélectionnée(s)
              </span>
              <button
                onClick={() => handleBulkAction('process')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Traiter
              </button>
              <button
                onClick={() => handleBulkAction('ship')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
              >
                Expédier
              </button>
              <button
                onClick={() => handleBulkAction('cancel')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Annuler
              </button>
            </div>
          )}
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Commandes</p>
                <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expédiées</p>
                <p className="text-2xl font-bold text-purple-600">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)} €
                </p>
              </div>
              <Euro className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left p-4 font-semibold">Commande</th>
                  <th className="text-left p-4 font-semibold">Client</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Statut</th>
                  <th className="text-left p-4 font-semibold">Paiement</th>
                  <th className="text-left p-4 font-semibold">Total</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-gray-600">
                          {order.items.length} article(s)
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-600">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {formatDate(order.orderDate)}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-4">
                      {getPaymentBadge(order.paymentStatus)}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">
                        {order.total.toFixed(2)} €
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openModal(order)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && <OrderModal />}
      </main>
    </div>
  );
};

export default AdminOrders;