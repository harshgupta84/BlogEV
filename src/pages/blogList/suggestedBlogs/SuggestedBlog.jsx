import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import { Sparkles, TrendingUp, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import axios from 'axios';
import Cookies from 'js-cookie';

function SuggestedBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuggestedBlogs();
  }, []);

  const fetchSuggestedBlogs = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Please login to view suggested blogs');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:3000/blog/allblogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setBlogs(response.data || []);
    } catch (err) {
      setError('Failed to fetch suggested blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <DotPattern className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )} />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Discovering Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Finding the perfect content for you...
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
            <BookOpen className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Unable to load blogs</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Button onClick={fetchSuggestedBlogs} className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const isEmpty = blogs.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <DotPattern className={cn(
        "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
      )} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Discover Amazing Blogs
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {isEmpty 
              ? "No blogs available at the moment"
              : `Explore ${blogs.length} amazing blog${blogs.length !== 1 ? 's' : ''} from our community`
            }
          </p>
        </div>

        {isEmpty ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    No blogs yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Be the first to share your thoughts with the community!
                  </p>
                  <Link to="/blog/create">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create First Blog
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Blogs Grid */
          <>
            {/* Stats Bar */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {blogs.length} Blogs
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Set(blogs.map(blog => blog.user?.id || blog.author)).size} Authors
                      </span>
                    </div>
                  </div>
                  <Link to="/blog/create">
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Blog
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Blogs List */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {blogs.map((blog) => (
                <BlogPostCard 
                  key={blog.id} 
                  blog={blog} 
                  showActions={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SuggestedBlog;