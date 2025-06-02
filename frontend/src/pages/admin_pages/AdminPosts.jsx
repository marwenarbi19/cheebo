import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Flag,
  Download,
} from 'lucide-react';

const AdminPosts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Belle journée au parc avec Rex !',
      content: 'Rex adore courir après les écureuils. Nous avons passé une magnifique après-midi au parc.',
      author: 'Jean Dupont',
      authorEmail: 'jean.dupont@email.com',
      authorImage: '/users/user_1.jpg',
      date: '2024-01-20T10:30:00',
      status: 'published',
      type: 'image',
      likes: 245,
      comments: 32,
      shares: 12,
      image: '/pets/pet_1.webp',
      category: 'Chien',
      reported: false,
      reportCount: 0
    },
    {
      id: 2,
      title: 'Première visite chez le vétérinaire',
      content: 'Première visite chez le vétérinaire pour Milo aujourd\'hui. Tout va bien !',
      author: 'Marie Lefèvre',
      authorEmail: 'marie.lefevre@email.com',
      authorImage: '/users/user_2.jpg',
      date: '2024-01-19T15:45:00',
      status: 'published',
      type: 'image',
      likes: 189,
      comments: 28,
      shares: 8,
      image: '/pets/pet_2.jpeg',
      category: 'Chat',
      reported: false,
      reportCount: 0
    },
    {
      id: 3,
      title: 'Nouvel arrivant dans la famille !',
      content: 'Voici Luna, notre petite chatte de 3 mois. Elle s\'adapte très bien à sa nouvelle maison.',
      author: 'Thomas Martin',
      authorEmail: 'thomas.martin@email.com',
      authorImage: '/users/user_3.avif',
      date: '2024-01-18T09:15:00',
      status: 'published',
      type: 'image',
      likes: 167,
      comments: 24,
      shares: 15,
      image: '/pets/pet_3.jpg',
      category: 'Chat',
      reported: false,
      reportCount: 0
    },
    {
      id: 4,
      title: 'Contenu inapproprié suspect',
      content: 'Ce post contient du contenu potentiellement inapproprié qui nécessite une révision.',
      author: 'User Suspect',
      authorEmail: 'suspect@email.com',
      authorImage: '/users/default.jpg',
      date: '2024-01-17T14:20:00',
      status: 'pending',
      type: 'text',
      likes: 2,
      comments: 1,
      shares: 0,
      image: null,
      category: 'Général',
      reported: true,
      reportCount: 3
    },
    {
      id: 5,
      title: 'Conseils pour dresser votre chien',
      content: 'Voici quelques conseils utiles pour bien dresser votre chien et renforcer votre relation.',
      author: 'Dr. Mouna',
      authorEmail: 'dr.mouna@email.com',
      authorImage: '/users/vet1.jpg',
      date: '2024-01-16T11:30:00',
      status: 'published',
      type: 'text',
      likes: 456,
      comments: 67,
      shares: 34,
      image: null,
      category: 'Éducation',
      reported: false,
      reportCount: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Filtrage des posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    const matchesType = filterType === 'all' || post.type === filterType;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  const statuses = ['all', 'published', 'pending', 'rejected', 'draft'];
  const categories = ['all', 'Chien', 'Chat', 'Oiseau', 'Général', 'Éducation'];
  const types = ['all', 'image', 'video', 'text'];

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handlePostAction = (postId, action) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        switch (action) {
          case 'approve':
            return { ...post, status: 'published' };
          case 'reject':
            return { ...post, status: 'rejected' };
          case 'pending':
            return { ...post, status: 'pending' };
          default:
            return post;
        }
      }
      return post;
    }));
  };

  const handleBulkAction = (action) => {
    if (selectedPosts.length === 0) return;
    
    switch (action) {
      case 'approve':
        setPosts(prev => prev.map(post => 
          selectedPosts.includes(post.id) 
            ? { ...post, status: 'published' }
            : post
        ));
        break;
      case 'reject':
        setPosts(prev => prev.map(post => 
          selectedPosts.includes(post.id) 
            ? { ...post, status: 'rejected' }
            : post
        ));
        break;
      case 'delete':
        if (window.confirm(`Supprimer ${selectedPosts.length} post(s) ?`)) {
          setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
        }
        break;
      default:
        console.warn(`Action non reconnue: ${action}`);
        break;
    }
    setSelectedPosts([]);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      setSelectedPosts(prev => prev.filter(id => id !== postId));
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      published: 'Publié',
      pending: 'En attente',
      rejected: 'Rejeté',
      draft: 'Brouillon'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      image: <ImageIcon className="w-4 h-4" />,
      video: <Video className="w-4 h-4" />,
      text: <MessageSquare className="w-4 h-4" />
    };
    return icons[type] || <MessageSquare className="w-4 h-4" />;
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

  const exportPosts = () => {
    const data = filteredPosts.map(post => ({
      ID: post.id,
      Titre: post.title,
      Auteur: post.author,
      Date: formatDate(post.date),
      Statut: post.status,
      Type: post.type,
      Catégorie: post.category,
      Likes: post.likes,
      Commentaires: post.comments,
      Signalements: post.reportCount
    }));
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `posts-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const PostModal = () => {
    if (!selectedPost) return null;

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
            {/* Contenu du post */}
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={selectedPost.authorImage}
                  alt={selectedPost.author}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedPost.author}</h3>
                  <p className="text-sm text-gray-600">{formatDate(selectedPost.date)}</p>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3">{selectedPost.title}</h2>
              <p className="text-gray-700 mb-4">{selectedPost.content}</p>

              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt="Post content"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{selectedPost.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{selectedPost.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getTypeIcon(selectedPost.type)}
                  <span>{selectedPost.type}</span>
                </div>
              </div>
            </div>

            {/* Actions et informations */}
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    {getStatusBadge(selectedPost.status)}
                  </div>
                  <div className="flex justify-between">
                    <span>Catégorie:</span>
                    <span>{selectedPost.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email auteur:</span>
                    <span>{selectedPost.authorEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signalements:</span>
                    <span className={selectedPost.reportCount > 0 ? 'text-red-600 font-medium' : ''}>
                      {selectedPost.reportCount}
                    </span>
                  </div>
                </div>
              </div>

              {selectedPost.reported && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 text-red-800 mb-2">
                    <Flag className="w-4 h-4" />
                    <span className="font-medium">Post signalé</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Ce post a été signalé {selectedPost.reportCount} fois et nécessite une révision.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-semibold">Actions</h3>
                
                {selectedPost.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handlePostAction(selectedPost.id, 'approve');
                        closeModal();
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => {
                        handlePostAction(selectedPost.id, 'reject');
                        closeModal();
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeter
                    </button>
                  </>
                )}
                
                {selectedPost.status === 'published' && (
                  <button
                    onClick={() => {
                      handlePostAction(selectedPost.id, 'pending');
                      closeModal();
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Mettre en attente
                  </button>
                )}

                <button
                  onClick={() => {
                    handleDeletePost(selectedPost.id);
                    closeModal();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer définitivement
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
          <Link to="/admin/posts" className="block text-yellow-300 font-semibold">
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
            <h1 className="text-3xl font-bold mb-2 text-[#8657ff]">Gestion des Posts</h1>
            <p className="text-gray-600">Modérez et gérez toutes les publications de la communauté</p>
          </div>
          
          <button
            onClick={exportPosts}
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
                placeholder="Rechercher par titre, auteur ou contenu..."
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

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            >
              <option value="all">Tous les types</option>
              {types.slice(1).map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Actions en lot */}
          {selectedPosts.length > 0 && (
            <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 self-center">
                {selectedPosts.length} post(s) sélectionné(s)
              </span>
              <button
                onClick={() => handleBulkAction('approve')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Approuver
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Rejeter
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
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
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-blue-600">{posts.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Publiés</p>
                <p className="text-2xl font-bold text-green-600">
                  {posts.filter(p => p.status === 'published').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {posts.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Signalés</p>
                <p className="text-2xl font-bold text-red-600">
                  {posts.filter(p => p.reported).length}
                </p>
              </div>
              <Flag className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Tableau des posts */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left p-4 font-semibold">Post</th>
                  <th className="text-left p-4 font-semibold">Auteur</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Statut</th>
                  <th className="text-left p-4 font-semibold">Engagement</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(post.type)}
                        <div>
                          <div className="font-medium text-sm">{post.title}</div>
                          <div className="text-xs text-gray-500">{post.category}</div>
                          {post.reported && (
                            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                              <Flag className="w-3 h-3" />
                              <span>Signalé ({post.reportCount})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                          }}
                        />
                        <div>
                          <div className="font-medium text-sm">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.authorEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {formatDate(post.date)}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="p-4">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3 h-3 text-blue-500" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openModal(post)}
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
        {showModal && <PostModal />}
      </main>
    </div>
  );
};

export default AdminPosts;