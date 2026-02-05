import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { simpleCloudStorageManager } from '../dashboard/utils';

const RecentBlogs = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentPosts();
  }, []);

  const loadRecentPosts = async () => {
    try {
      // Get published blog posts only
      const allPosts = await simpleCloudStorageManager.list('blog');
      const publishedPosts = allPosts
        .filter(post => post.status === 'published')
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3); // Get 3 most recent posts
      
      setRecentPosts(publishedPosts);
    } catch (error) {
      console.error('Failed to load recent blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-footerText">Stay updated with industry insights and career advice</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azure"></div>
          </div>
        </div>
      </section>
    );
  }

  if (recentPosts.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-footerText">Stay updated with industry insights and career advice</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 mb-6">No blog posts available at the moment.</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-azure text-white font-medium rounded-lg hover:bg-azureSoft transition-colors duration-200"
            >
              Visit Our Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Latest from Our Blog</h2>
          <p className="text-xl text-footerText max-w-3xl mx-auto">
            Stay updated with industry insights, career advice, and recruitment trends
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              {/* Featured Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-azure to-azureSoft flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="mx-auto h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-sm opacity-90">Featured Image</p>
                </div>
              </div>

              <div className="p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-azure/10 text-azure"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-azure transition-colors duration-200">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-footerText mb-4 leading-relaxed">
                  {truncateText(post.excerpt)}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.createdBy}
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-azure hover:text-azureSoft transition-colors duration-200 font-medium"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-3 bg-azure text-white font-medium rounded-lg hover:bg-azureSoft transition-colors duration-200"
          >
            View All Blog Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;