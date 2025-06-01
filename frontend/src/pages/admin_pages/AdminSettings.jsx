import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Save, 
  Upload,
  Settings,
  Mail,
  Shield,
  Globe,
  Palette,
  Bell,
  Database,
  Key,
  Users,
  MessageSquare,
  Store,
  Truck,
  CreditCard,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswords, setShowPasswords] = useState({});
  const [settings, setSettings] = useState({
    // Paramètres généraux
    general: {
      siteName: 'Cheebo',
      siteDescription: 'Plateforme pour propriétaires d\'animaux',
      siteUrl: 'https://cheebo.com',
      contactEmail: 'contact@cheebo.com',
      supportEmail: 'support@cheebo.com',
      timezone: 'Europe/Paris',
      language: 'fr',
      maintenanceMode: false
    },
    // Paramètres de sécurité
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      sessionTimeout: 1440, // minutes
      maxLoginAttempts: 5,
      enableTwoFactor: false,
      blockSuspiciousIPs: true
    },
    // Paramètres email
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'noreply@cheebo.com',
      smtpPassword: '••••••••••',
      fromName: 'Cheebo',
      fromEmail: 'noreply@cheebo.com',
      enableEmailNotifications: true
    },
    // Paramètres boutique
    shop: {
      currency: 'EUR',
      taxRate: 20,
      shippingCost: 5.99,
      freeShippingThreshold: 50,
      enableInventoryTracking: true,
      lowStockThreshold: 10,
      autoApproveProducts: false
    },
    // Paramètres communauté
    community: {
      autoApproveUsers: true,
      requireEmailVerification: true,
      moderateComments: false,
      allowFileUploads: true,
      maxFileSize: 10, // MB
      allowedFileTypes: 'jpg,jpeg,png,gif,mp4',
      enableReports: true
    },
    // Notifications
    notifications: {
      newUserRegistration: true,
      newPost: false,
      newOrder: true,
      reportedContent: true,
      systemAlerts: true,
      emailDigest: true
    }
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'shop', label: 'Boutique', icon: Store },
    { id: 'community', label: 'Communauté', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    // Simulation de sauvegarde
    alert('Paramètres sauvegardés avec succès !');
  };

  const handleBackup = () => {
    // Simulation de sauvegarde
    const backup = {
      timestamp: new Date().toISOString(),
      settings: settings
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cheebo-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du site</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL du site</label>
          <input
            type="url"
            value={settings.general.siteUrl}
            onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description du site</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email de contact</label>
          <input
            type="email"
            value={settings.general.contactEmail}
            onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          >
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
          Mode maintenance
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Longueur minimale du mot de passe</label>
          <input
            type="number"
            min="6"
            max="32"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tentatives de connexion max</label>
          <input
            type="number"
            min="3"
            max="10"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireSpecialChars"
            checked={settings.security.requireSpecialChars}
            onChange={(e) => handleSettingChange('security', 'requireSpecialChars', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="requireSpecialChars" className="text-sm font-medium text-gray-700">
            Exiger des caractères spéciaux dans les mots de passe
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableTwoFactor"
            checked={settings.security.enableTwoFactor}
            onChange={(e) => handleSettingChange('security', 'enableTwoFactor', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="enableTwoFactor" className="text-sm font-medium text-gray-700">
            Activer l'authentification à deux facteurs
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="blockSuspiciousIPs"
            checked={settings.security.blockSuspiciousIPs}
            onChange={(e) => handleSettingChange('security', 'blockSuspiciousIPs', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="blockSuspiciousIPs" className="text-sm font-medium text-gray-700">
            Bloquer les adresses IP suspectes
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Serveur SMTP</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Port SMTP</label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur SMTP</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe SMTP</label>
          <div className="relative">
            <input
              type={showPasswords.smtp ? 'text' : 'password'}
              value={settings.email.smtpPassword}
              onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('smtp')}
              className="absolute right-2 top-2.5 text-gray-400"
            >
              {showPasswords.smtp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableEmailNotifications"
          checked={settings.email.enableEmailNotifications}
          onChange={(e) => handleSettingChange('email', 'enableEmailNotifications', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="enableEmailNotifications" className="text-sm font-medium text-gray-700">
          Activer les notifications par email
        </label>
      </div>
    </div>
  );

  const renderShopSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
          <select
            value={settings.shop.currency}
            onChange={(e) => handleSettingChange('shop', 'currency', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dollar ($)</option>
            <option value="GBP">Livre (£)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Taux de TVA (%)</label>
          <input
            type="number"
            step="0.1"
            value={settings.shop.taxRate}
            onChange={(e) => handleSettingChange('shop', 'taxRate', parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frais de livraison (€)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shop.shippingCost}
            onChange={(e) => handleSettingChange('shop', 'shippingCost', parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seuil livraison gratuite (€)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shop.freeShippingThreshold}
            onChange={(e) => handleSettingChange('shop', 'freeShippingThreshold', parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableInventoryTracking"
            checked={settings.shop.enableInventoryTracking}
            onChange={(e) => handleSettingChange('shop', 'enableInventoryTracking', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="enableInventoryTracking" className="text-sm font-medium text-gray-700">
            Activer le suivi des stocks
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoApproveProducts"
            checked={settings.shop.autoApproveProducts}
            onChange={(e) => handleSettingChange('shop', 'autoApproveProducts', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="autoApproveProducts" className="text-sm font-medium text-gray-700">
            Approuver automatiquement les nouveaux produits
          </label>
        </div>
      </div>
    </div>
  );

  const renderCommunitySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Taille max fichier (MB)</label>
          <input
            type="number"
            min="1"
            max="100"
            value={settings.community.maxFileSize}
            onChange={(e) => handleSettingChange('community', 'maxFileSize', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Types de fichiers autorisés</label>
          <input
            type="text"
            value={settings.community.allowedFileTypes}
            onChange={(e) => handleSettingChange('community', 'allowedFileTypes', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8657ff]"
            placeholder="jpg,png,gif,mp4"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoApproveUsers"
            checked={settings.community.autoApproveUsers}
            onChange={(e) => handleSettingChange('community', 'autoApproveUsers', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="autoApproveUsers" className="text-sm font-medium text-gray-700">
            Approuver automatiquement les nouveaux utilisateurs
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireEmailVerification"
            checked={settings.community.requireEmailVerification}
            onChange={(e) => handleSettingChange('community', 'requireEmailVerification', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="requireEmailVerification" className="text-sm font-medium text-gray-700">
            Exiger la vérification par email
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="moderateComments"
            checked={settings.community.moderateComments}
            onChange={(e) => handleSettingChange('community', 'moderateComments', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="moderateComments" className="text-sm font-medium text-gray-700">
            Modérer les commentaires
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowFileUploads"
            checked={settings.community.allowFileUploads}
            onChange={(e) => handleSettingChange('community', 'allowFileUploads', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="allowFileUploads" className="text-sm font-medium text-gray-700">
            Autoriser le téléchargement de fichiers
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Notifications administrateur</h3>
      
      <div className="space-y-3">
        {Object.entries(settings.notifications).map(([key, value]) => {
          const labels = {
            newUserRegistration: 'Nouveau utilisateur inscrit',
            newPost: 'Nouvelle publication',
            newOrder: 'Nouvelle commande',
            reportedContent: 'Contenu signalé',
            systemAlerts: 'Alertes système',
            emailDigest: 'Résumé par email'
          };
          
          return (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={key} className="text-sm font-medium text-gray-700">
                {labels[key]}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'email':
        return renderEmailSettings();
      case 'shop':
        return renderShopSettings();
      case 'community':
        return renderCommunitySettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
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
          <Link to="/admin/orders" className="block hover:text-gray-300">
            🛒 Gestion des commandes
          </Link>
          <Link to="/admin/stats" className="block hover:text-gray-300">
            📈 Statistiques
          </Link>
          <Link to="/admin/settings" className="block text-yellow-300 font-semibold">
            ⚙️ Paramètres
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
            <h1 className="text-3xl font-bold mb-2 text-[#8657ff]">Paramètres Système</h1>
            <p className="text-gray-600">Configurez les paramètres de votre plateforme</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleBackup}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Database className="w-4 h-4" />
              Sauvegarder
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#8657ff] hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Save className="w-4 h-4" />
              Enregistrer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Onglets */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[#8657ff] text-[#8657ff]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;