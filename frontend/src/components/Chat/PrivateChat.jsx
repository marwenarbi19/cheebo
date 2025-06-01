import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Phone, Video, MoreVertical, Plus, Search, Paperclip, Smile, Image } from 'lucide-react';

const PrivateChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchUsers, setSearchUsers] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(new Set([1, 3, 5]));
  
  const [conversations, setConversations] = useState([
    {
      id: 1,
      participantId: 2,
      participantName: 'Dr. Mouna Boukadi',
      participantAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Kqt6vs7YvZXCB-7NpouY4jDPLdClHA4NrA&s',
      lastMessage: 'Merci pour la consultation',
      lastMessageTime: '2024-05-31T14:30:00',
      unread: 2,
      isOnline: true,
      messages: [
        { 
          id: 1, 
          senderId: 2, 
          senderName: 'Dr. Mouna Boukadi',
          text: 'Bonjour, comment va votre chien après le traitement ?', 
          timestamp: '2024-05-31T14:25:00',
          type: 'text'
        },
        { 
          id: 2, 
          senderId: 1, 
          senderName: 'Vous',
          text: 'Il va beaucoup mieux, merci !', 
          timestamp: '2024-05-31T14:28:00',
          type: 'text'
        }
      ]
    }
  ]);

  const availableUsers = [
    { id: 5, name: 'Dr. Ahmed Ben Ali', avatar: '/users/vet1.jpg', isOnline: true, role: 'Vétérinaire' },
    { id: 6, name: 'Sophie Martin', avatar: '/users/user_3.jpg', isOnline: false, role: 'Propriétaire' }
  ];

  const messagesEndRef = useRef(null);
  const currentUserId = 1;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: currentUserId,
      senderName: 'Vous',
      text: message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeChat.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message,
          lastMessageTime: newMessage.timestamp
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setActiveChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const startNewChat = (user) => {
    const existingChat = conversations.find(conv => conv.participantId === user.id);
    
    if (existingChat) {
      setActiveChat(existingChat);
      setShowNewChatModal(false);
      return;
    }

    const newConversation = {
      id: Date.now(),
      participantId: user.id,
      participantName: user.name,
      participantAvatar: user.avatar,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      unread: 0,
      isOnline: onlineUsers.has(user.id),
      messages: []
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveChat(newConversation);
    setShowNewChatModal(false);
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition z-40"
        title="Messages privés"
      >
        <MessageCircle className="w-6 h-6" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalUnread}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 w-96 h-[500px] bg-white dark:bg-dark-card rounded-lg shadow-2xl z-40 flex flex-col border border-gray-200 dark:border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 bg-primary text-white rounded-t-lg">
          <h3 className="font-semibold">
            {activeChat ? (
              <div className="flex items-center">
                <button
                  onClick={() => setActiveChat(null)}
                  className="mr-2 p-1 hover:bg-white/20 rounded"
                >
                  ←
                </button>
                <img
                  src={activeChat.participantAvatar}
                  alt={activeChat.participantName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-medium">{activeChat.participantName}</div>
                  <div className="text-xs opacity-75">
                    {onlineUsers.has(activeChat.participantId) ? 'En ligne' : 'Hors ligne'}
                  </div>
                </div>
              </div>
            ) : (
              'Messages Privés'
            )}
          </h3>
          
          <div className="flex items-center space-x-2">
            {!activeChat && (
              <button
                onClick={() => setShowNewChatModal(true)}
                className="p-1 hover:bg-white/20 rounded"
                title="Nouveau message"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={() => {
                setIsOpen(false);
                setActiveChat(null);
              }}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!activeChat ? (
          /* Liste des conversations */
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className="flex items-center p-3 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  {onlineUsers.has(conv.participantId) && (
                    <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 dark:text-dark-text text-sm">
                    {conv.participantName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conv.lastMessage || 'Aucun message'}
                  </p>
                </div>
                
                {conv.unread > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                    {conv.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Chat actif */
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {activeChat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.senderId === currentUserId
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-dark-text'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark-accent text-gray-800 dark:text-dark-text"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal nouveau chat */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-800 dark:text-dark-text">Nouveau message</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {availableUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => startNewChat(user)}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-dark-text text-sm">
                      {user.name}
                    </h4>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateChat;