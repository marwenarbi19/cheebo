import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Heart, MessageSquare, Share2, PenLine, X, Users, Bookmark, Clock, Video, Store, MoreHorizontal, Search, PawPrint, Send } from 'lucide-react';

// Composant pour les éléments de la barre latérale (inchangé)
const SidebarItem = ({ icon, text, onClick }) => {
  return (
    <div 
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium text-gray-900 dark:text-dark-text">{text}</span>
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// Composant pour les utilisateurs connectés (inchangé)
const ConnectedUserItem = ({ userImage, name, isOnline }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
      <img
        src={userImage}
        alt={`${name} profile`}
        className="w-6 h-6 rounded-full object-cover border border-gray-300 dark:border-gray-600"
      />
      <span className="text-sm font-medium text-gray-900 dark:text-dark-text">{name}</span>
      <div className={`w-3 h-3 rounded-full ml-auto ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
    </div>
  );
};

ConnectedUserItem.propTypes = {
  userImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

// Composant pour la barre latérale gauche (inchangé)
const LeftSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-gray-50 dark:bg-dark-card border-r border-gray-200 dark:border-gray-600 p-4 overflow-y-auto h-screen hidden lg:block scrollbar-thin scrollbar-thumb-custom-purple scrollbar-track-custom-light-track dark:scrollbar-track-custom-dark-track scrollbar-rounded">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-dark-text" />
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          />
        </div>
      </div>
      <div className="mb-4">
        <SidebarItem icon={<Users className="w-6 h-6 text-primary" />} text="Utilisateur" onClick={() => handleNavigation('/profile')} />
        <SidebarItem icon={<Users className="w-6 h-6 text-primary" />} text="Amis" />
        <SidebarItem icon={<Bookmark className="w-6 h-6 text-primary" />} text="Enregistrements" />
        <SidebarItem icon={<Clock className="w-6 h-6 text-primary" />} text="Souvenirs" />
        <SidebarItem icon={<Users className="w-6 h-6 text-primary" />} text="Groupes" />
        <SidebarItem icon={<Video className="w-6 h-6 text-primary" />} text="Vidéo" />
        <SidebarItem icon={<Store className="w-6 h-6 text-primary" />} text="Marketplace" />
        <SidebarItem icon={<PawPrint className="w-6 h-6 text-primary" />} text="Adoption" onClick={() => handleNavigation('/adoption')}/>
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {};

// Composant pour la barre latérale droite (inchangé)
const RightSidebar = () => {
  const connectedUsers = [
    { userImage: '/users/user_1.jpg', name: 'Jean Dupont', isOnline: true },
    { userImage: '/users/user_2.jpg', name: 'Marie Lefèvre', isOnline: false },
    { userImage: '/users/user_3.avif', name: 'Thomas Martin', isOnline: true },
    { userImage: '/users/user_4.jpg', name: 'Alice Dubois', isOnline: true },
    { userImage: '/users/user_5.jpg', name: 'Bob Martin', isOnline: false },
  ];

  return (
    <div className="w-64 bg-gray-50 dark:bg-dark-card border-l border-gray-200 dark:border-gray-600 p-4 overflow-y-auto h-screen hidden lg:block scrollbar-thin scrollbar-thumb-custom-purple scrollbar-track-custom-light-track dark:scrollbar-track-custom-dark-track scrollbar-rounded">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-text">Utilisateurs connectés</h2>
        {connectedUsers.map((user, index) => (
          <ConnectedUserItem
            key={index}
            userImage={user.userImage}
            name={user.name}
            isOnline={user.isOnline}
          />
        ))}
      </div>
    </div>
  );
};

RightSidebar.propTypes = {};

// Composant pour un commentaire individuel
const Comment = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 p-3 border-t border-gray-200 dark:border-gray-600">
      <img
        src={comment.userImage}
        alt={`${comment.user} profile`}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-sm text-gray-800 dark:text-dark-text">{comment.user}</p>
        <p className="text-sm text-gray-600 dark:text-dark-text">{comment.text}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{comment.time}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    userImage: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

const PostCard = ({ post, onComment, onShare }) => {
  const [liked, setLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const dropdownRef = useRef(null);

  // Gestion du clic en dehors pour fermer le menu déroulant
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, {
        userImage: '/users/current_user.jpg', // À remplacer par l'image de l'utilisateur connecté
        user: 'Utilisateur Actuel', // À remplacer par le nom de l'utilisateur connecté
        text: commentText,
        time: 'À linstant',
      });
      setCommentText('');
    }
  };

  const handleShare = () => {
    onShare(post.id);
  };

  return (
    <div className="w-full bg-white dark:bg-dark-card shadow-md rounded-lg mb-6 overflow-hidden transition-colors duration-300 relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <img
            src={post.userImage}
            alt={`${post.user} profile`}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-sm"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-dark-text">{post.user}</p>
            <p className="text-xs text-gray-500 dark:text-dark-text">{post.time}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-gray-500 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1"
            aria-label="Options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {showOptions && (
            <div
              ref={dropdownRef}
              className="absolute top-8 right-0 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-600 rounded-md shadow-lg w-48 z-10"
            >
              <div className="py-1">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => {
                    setShowOptions(false);
                    alert('Article enregistré !');
                  }}
                >
                  Enregistrer l'article
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => {
                    setShowOptions(false);
                    alert('Message envoyé !');
                  }}
                >
                  Message
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => {
                    setShowOptions(false);
                    alert('Rapport envoyé');
                  }}
                >
                  Rapport
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  onClick={() => {
                    setShowOptions(false);
                    alert('Utilisateur bloqué');
                  }}
                >
                  Bloquer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-700 dark:text-dark-text mb-4">{post.phrase}</p>
        <img
          src={post.petImage}
          alt={`${post.user}'s pet`}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2"
            aria-label={liked ? "Je n'aime plus" : "J'aime"}
          >
            <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-500 dark:text-dark-text'}`} />
            <span className="text-sm text-gray-600 dark:text-dark-text">{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2"
            aria-label="Commenter"
          >
            <MessageSquare className="w-5 h-5 text-gray-500 dark:text-dark-text" />
            <span className="text-sm text-gray-600 dark:text-dark-text">{post.comments.length}</span>
          </button>
        </div>
        <button
          onClick={handleShare}
          className="text-gray-500 dark:text-dark-text"
          aria-label="Partager"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {showComments && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Écrire un commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text"
            />
            <button
              type="submit"
              className="p-2 bg-primary hover:bg-primary-dark text-white rounded-full"
              aria-label="Envoyer le commentaire"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          {post.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userImage: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    phrase: PropTypes.string.isRequired,
    petImage: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        userImage: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onComment: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      userImage: '/users/user_1.jpg',
      user: 'Jean Dupont',
      time: 'Il y a 10 minutes',
      phrase: 'Belle journée au parc avec Rex ! Il adore courir après les écureuils.',
      petImage: '/pets/pet_1.webp',
      likes: 42,
      comments: [],
    },
    {
      id: 2,
      userImage: '/users/user_2.jpg',
      user: 'Marie Lefèvre',
      time: 'Il y a 1 heure',
      phrase: 'Première visite chez le vétérinaire pour Milo aujourd\'hui. Tout va bien !',
      petImage: '/pets/pet_2.jpeg',
      likes: 28,
      comments: [],
    },
    {
      id: 3,
      userImage: '/users/user_3.avif',
      user: 'Thomas Martin',
      time: 'Hier à 18:30',
      phrase: 'Nouvel arrivant dans la famille ! Voici Luna, notre petite chatte de 3 mois.',
      petImage: '/pets/pet_3.jpg',
      likes: 56,
      comments: [],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    userImage: '/users/default.jpg',
    user: '',
    phrase: '',
    petImage: '/pets/default.jpg',
  });

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
  };

  const handleShare = (postId) => {
    // Simulation du partage (peut être remplacé par une API réelle ou une logique de partage)
    alert(`Publication ${postId} partagée !`);
    // Pour une implémentation réelle, vous pourriez :
    // - Copier un lien vers le presse-papiers
    // - Ouvrir une fenêtre de partage vers d'autres réseaux
    // - Appeler une API pour enregistrer le partage
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostWithInfo = {
      ...newPost,
      id: posts.length + 1,
      time: "À l'instant",
      likes: 0,
      comments: [],
    };
    setPosts([newPostWithInfo, ...posts]);
    setNewPost({ userImage: '/users/default.jpg', user: '', phrase: '', petImage: '/pets/default.jpg' });
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="bg-white dark:bg-dark-gray min-h-screen flex">
        <LeftSidebar />
        <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-custom-purple scrollbar-track-custom-light-track dark:scrollbar-track-custom-dark-track scrollbar-rounded">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-full transition-colors duration-300"
            >
              <PenLine className="w-4 h-4" />
              <span className="font-medium">Nouvelle publication</span>
            </button>
          </div>
          <div className="max-w-2xl mx-auto">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </div>
        </div>
        <RightSidebar />
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-accent p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 dark:text-dark-text hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-dark-text">
                Nouvelle publication
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={newPost.user}
                  onChange={(e) => setNewPost({ ...newPost, user: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text"
                  required
                />
                <input
                  type="text"
                  placeholder="Lien image de profil"
                  value={newPost.userImage}
                  onChange={(e) => setNewPost({ ...newPost, userImage: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text"
                />
                <input
                  type="text"
                  placeholder="Phrase de votre post"
                  value={newPost.phrase}
                  onChange={(e) => setNewPost({ ...newPost, phrase: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text"
                  required
                />
                <input
                  type="text"
                  placeholder="Lien image animal"
                  value={newPost.petImage}
                  onChange={(e) => setNewPost({ ...newPost, petImage: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text"
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-full transition-colors duration-300"
                >
                  Publier
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;