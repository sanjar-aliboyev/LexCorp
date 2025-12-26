'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

// Helper to format dates
function formatDate(dateString: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

export default function NewsSection() {
  const { lang } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Latest 3 Posts from Sanity
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "post"] | order(date desc)[0...3] {
            "id": slug.current,
            "image": image.asset->url,
            date,
            content
          }
        `);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 2. Define Section Titles based on your request
  const sectionTitle = lang === 'UZ' ? 'ProLex Tahlili' : 'ProLex Notes';
  const viewAllText = lang === 'UZ' ? 'Barchasini ko\'rish' : (lang === 'RU' ? 'Смотреть все' : 'View All');

  return (
    <section className="news-section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <h2 className="title">{sectionTitle}</h2>
          <Link href="/blog" className="view-all-btn">
            {viewAllText} <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grid */}
        <div className="news-grid">
          {loading ? (
            // Skeleton Loading State
            [1, 2, 3].map((i) => (
              <div key={i} className="news-card skeleton">
                <div className="skeleton-img"></div>
                <div className="skeleton-text"></div>
              </div>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => {
              // Extract content for current language (Fallback to UZ if missing)
              const content = post.content[lang] || post.content['UZ'];
              
              return (
                <Link key={post.id} href={`/blog/${post.id}`} className="news-card">
                  <div className="image-wrapper">
                    {post.image ? (
                      <img src={post.image} alt={content?.title} />
                    ) : (
                      <div className="placeholder-img">ProLex</div>
                    )}
                  </div>
                  <div className="content">
                    <div className="meta">
                      <Calendar size={14} /> {formatDate(post.date)}
                    </div>
                    <h3>{content?.title || "No Title"}</h3>
                    <p>{content?.excerpt ? content.excerpt.substring(0, 100) + "..." : ""}</p>
                    <span className="read-more">
                      {lang === 'UZ' ? "Batafsil" : "Read More"} <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="no-news">No posts found.</div>
          )}
        </div>

      </div>

      <style jsx>{`
        .news-section {
          padding: 100px 5%;
          background-color: var(--bg-body);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* HEADER */
        .section-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 50px; border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
        }

        .title {
          font-family: var(--font-merriweather);
          font-size: 2.5rem;
          color: var(--text-main);
          margin: 0;
        }

        .view-all-btn {
          display: flex; align-items: center; gap: 8px;
          color: #C5A059; font-weight: 700; text-transform: uppercase;
          font-size: 0.9rem; transition: gap 0.2s;
        }
        .view-all-btn:hover { gap: 12px; }

        /* GRID */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        /* CARD */
        .news-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
          border-color: #C5A059;
        }

        .image-wrapper {
          height: 220px;
          overflow: hidden;
          background: #001F3F;
          display: flex; align-items: center; justify-content: center;
        }

        .image-wrapper img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s;
        }
        .news-card:hover .image-wrapper img { transform: scale(1.05); }

        .placeholder-img {
          color: rgba(255,255,255,0.2); font-weight: 900; font-size: 2rem;
        }

        .content { padding: 25px; display: flex; flex-direction: column; flex-grow: 1; }

        .meta {
          display: flex; align-items: center; gap: 6px;
          color: #C5A059; font-size: 0.85rem; margin-bottom: 10px; font-weight: 600;
        }

        .content h3 {
          font-family: var(--font-merriweather);
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 20px;
          line-height: 1.6;
          flex-grow: 1;
        }

        .read-more {
          display: flex; align-items: center; gap: 5px;
          color: var(--text-main); font-weight: 700; font-size: 0.9rem;
          margin-top: auto;
        }
        .news-card:hover .read-more { color: #C5A059; }

        /* SKELETON LOADING */
        .skeleton { pointer-events: none; }
        .skeleton-img { height: 220px; background: rgba(200,200,200,0.1); }
        .skeleton-text { height: 150px; background: rgba(200,200,200,0.05); }

        @media (max-width: 768px) {
          .section-header { flex-direction: column; align-items: flex-start; gap: 15px; }
          .title { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
}