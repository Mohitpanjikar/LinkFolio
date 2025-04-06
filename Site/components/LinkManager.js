import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const LinkManager = ({ token }) => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newLink, setNewLink] = useState({ url: '', title: '', icon: '' });
  const [editingLink, setEditingLink] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('http://localhost:8080/data/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenMail: token,
          }),
        });

        const data = await response.json();

        if (data.status === 'Okay') {
          // Additional fetch to get the full links data
          const userResponse = await fetch(`http://localhost:8080/get/${data.userData.handle}`);
          const userData = await userResponse.json();
          
          if (userData.status === 'success') {
            setLinks(userData.userData.links || []);
          }
        }
      } catch (error) {
        console.error('Error fetching links:', error);
        toast.error('Failed to load links');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchLinks();
    }
  }, [token]);

  const handleAddLink = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!newLink.url || !newLink.title) {
      toast.error('URL and title are required');
      setIsSubmitting(false);
      return;
    }

    try {
      // Add URL protocol if not present
      let url = newLink.url;
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }

      const response = await fetch('http://localhost:8080/api/add-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          url,
          title: newLink.title,
          icon: newLink.icon,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setLinks(data.links);
        setNewLink({ url: '', title: '', icon: '' });
        toast.success('Link added successfully!');
      } else {
        toast.error(data.error || 'Failed to add link');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditingLink = (link) => {
    setEditingLink({ ...link });
  };

  const cancelEditing = () => {
    setEditingLink(null);
  };

  const handleUpdateLink = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add URL protocol if not present
      let url = editingLink.url;
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }

      const response = await fetch('http://localhost:8080/api/update-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          linkId: editingLink._id,
          url,
          title: editingLink.title,
          icon: editingLink.icon,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setLinks(data.links);
        setEditingLink(null);
        toast.success('Link updated successfully!');
      } else {
        toast.error(data.error || 'Failed to update link');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Error updating link:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLink = async (linkId) => {
    if (!window.confirm('Are you sure you want to delete this link?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/delete-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          linkId,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setLinks(data.links);
        toast.success('Link deleted successfully!');
      } else {
        toast.error(data.error || 'Failed to delete link');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded w-64"></div>
          <div className="h-12 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add New Link Form */}
      <div className="card p-6">
        <h2 className="font-heading text-lg font-semibold mb-4 text-gray-900">Add New Link</h2>
        <form onSubmit={handleAddLink}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="input-field"
                placeholder="e.g. My Portfolio"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="text"
                id="url"
                className="input-field"
                placeholder="e.g. mywebsite.com"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                Icon (optional)
              </label>
              <input
                type="text"
                id="icon"
                className="input-field"
                placeholder="Icon class name or URL"
                value={newLink.icon}
                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>

      {/* Links List */}
      <div className="card p-6">
        <h2 className="font-heading text-lg font-semibold mb-4 text-gray-900">Your Links</h2>
        
        {links.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <p className="text-gray-600">You don't have any links yet. Add your first link above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {editingLink && editingLink._id === link._id ? (
                  // Edit Form
                  <form onSubmit={handleUpdateLink} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          value={editingLink.title}
                          onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          value={editingLink.url}
                          onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon (optional)
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          value={editingLink.icon || ''}
                          onChange={(e) => setEditingLink({ ...editingLink, icon: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2 justify-end">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="btn-secondary"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  // Link Display
                  <div className="flex items-center justify-between">
                    <div className="flex items-center max-w-[70%]">
                      {link.icon ? (
                        <span className="text-xl mr-3 text-primary-600">
                          <i className={link.icon}></i>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center bg-primary-100 text-primary-600 w-8 h-8 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </span>
                      )}
                      <div className="truncate">
                        <h3 className="font-medium text-gray-900">{link.title}</h3>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary-600 truncate">
                          {link.url}
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditingLink(link)}
                        className="text-gray-500 hover:text-primary-600 transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link._id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete"
                        disabled={isSubmitting}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkManager; 