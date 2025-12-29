'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, Calendar, ArrowRight, Send, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';
import Link from 'next/link';
import Image from 'next/image';

// --- 1. HELPER: Extract YouTube ID ---
function getEmbedUrl(url: string) {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

type MonthMap = {
  UZ: string[];
  RU: string[];
  EN: string[];
};

type CategoryMap = {
  UZ: { [key: string]: string };
  RU: { [key: string]: string };
  EN: { [key: string]: string };
};

type BlogPostContent = {
  category: string;
  title: string;
  excerpt: string;
};

interface BlogPost {
  id: string;
  image: string;
  date: string;
  content: {
    UZ?: BlogPostContent;
    RU?: BlogPostContent;
    EN?: BlogPostContent;
  };
}

interface Video {
  title: string;
  url: string;
}

interface ProcessedBlogPost {
  id: string;
  image: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
}

// --- 2. CONFIG: Translations & Maps ---
function formatDate(dateString: string, lang: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  const months: MonthMap = {
    UZ: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    RU: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  const validLangs = Object.keys(months) as Array<keyof MonthMap>;
  const currentLang: keyof MonthMap = validLangs.includes(lang as keyof MonthMap) ? (lang as keyof MonthMap) : "UZ";
  const monthName = months[currentLang][parseInt(month) - 1];
  return `${day} ${monthName}, ${year}`;
}

const CATEGORY_MAP: CategoryMap = {
  UZ: { "Economic cases": "Iqtisodiy ishlar", "Civil cases": "Fuqarolik ishlari", "Criminal cases": "Jinoyat ishlari", "Corporate law": "Korporativ huquq", "Tax issues": "Soliq masalalari", "IT and Internet law": "IT va Internet" },
  RU: { "Economic cases": "Экономические дела", "Civil cases": "Гражданские дела", "Criminal cases": "Уголовные дела", "Corporate law": "Корпоративное право", "Tax issues": "Налоговые вопросы", "IT and Internet law": "IT и Интернет" },
  EN: { "Economic cases": "Economic Cases", "Civil cases": "Civil Cases", "Criminal cases": "Criminal Cases", "Corporate law": "Corporate Law", "Tax issues": "Tax Issues", "IT and Internet law": "IT & Internet" }
};

const FILTER_BUTTONS = {
  UZ: ["Barcha", "Iqtisodiy ishlar", "Fuqarolik ishlari", "Jinoyat ishlari", "Korporativ huquq", "Soliq masalalari", "IT va Internet"],
  RU: ["Все", "Экономические дела", "Гражданские дела", "Уголовные дела", "Корпоративное право", "Налоговые вопросы", "IT и Интернет"],
  EN: ["All", "Economic Cases", "Civil Cases", "Criminal Cases", "Corporate Law", "Tax Issues", "IT & Internet"]
};

// --- 3. FETCH DATA (ARTICLES + VIDEOS) ---
async function getData() {
  const posts: BlogPost[] = await client.fetch(`
    *[_type == "post"] | order(date desc) {
      "id": slug.current,
      "image": image.asset->url,
      date,
      content
    }
  `);
  
  const videos: Video[] = await client.fetch(`
    *[_type == "video"] | order(publishedAt desc) {
      title,
      url
    }
  `);

  return { posts, videos };
}

export default function BlogPage() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [displayCount, setDisplayCount] = useState(6); // Initially display 6 videos
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(lang === 'UZ' ? 'Barcha' : (lang === 'RU' ? 'Все' : 'All'));
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load All Data
  useEffect(() => {
    getData()
      .then((data) => {
        setPosts(data.posts);
        setVideos(data.videos); // Store all fetched videos
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLoadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 6, videos.length));
  };

  // --- 4. PROCESSING ---
  const processedPosts: ProcessedBlogPost[] = posts.map((post) => {
    const content = post.content[lang as keyof typeof post.content] || post.content['UZ'];
    const rawCategory = content?.category || "General";
    const translatedCategory = CATEGORY_MAP[lang as keyof typeof CATEGORY_MAP]?.[rawCategory] || CATEGORY_MAP['EN']?.[rawCategory] || rawCategory;

    return {
      id: post.id,
      image: post.image,
      date: post.date,
      title: content?.title || "No Title",
      category: translatedCategory,
      excerpt: content?.excerpt || ""
    };
  });

  const filteredPosts = processedPosts.filter(post => {
    const allLabel = lang === 'UZ' ? 'Barcha' : (lang === 'RU' ? 'Все' : 'All');
    return (activeCategory === allLabel || post.category === activeCategory) &&
           post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentButtons = FILTER_BUTTONS[lang as keyof typeof FILTER_BUTTONS] || FILTER_BUTTONS['UZ'];

  // Form Logic
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'UZ' ? "Xabar yuborildi!" : "Message sent!");
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh' }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: '160px 5% 60px', backgroundColor: '#001F3F', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-merriweather)', marginBottom: '20px' }}>
          {t.blogPage.heroTitle}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a0aec0', maxWidth: '600px', margin: '0 auto 40px' }}>
          {t.blogPage.heroDesc}
        </p>
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
          <input 
            type="text" 
            placeholder={t.blogPage.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '15px 20px 15px 50px', borderRadius: '30px', border: 'none', outline: 'none', fontSize: '1rem' }}
          />
          <Search color="#666" style={{ position: 'absolute', top: '15px', left: '20px' }} />
        </div>
      </section>

      {/* FILTER BAR */}
      <section style={{ position: 'sticky', top: '80px', zIndex: 90, backgroundColor: 'var(--bg-body)', borderBottom: '1px solid var(--border-color)', padding: '20px 5%' }}>
        <div className="category-scroll">
          {currentButtons.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section style={{ padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
        ) : filteredPosts.length > 0 ? (
          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <div key={post.id} className="article-card">
                <div className="card-image-container">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <span className="category-badge">{post.category}</span>
                </div>
                <div className="card-content">
                  <div className="meta"><Calendar size={14} /> {formatDate(post.date, lang)}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className="read-more">
                    {t.blogPage.readMore} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}><h3>{t.blogPage.noResults}</h3></div>
        )}
      </section>

      {/* --- NEW BLOCK: YOUTUBE VIDEO GRID --- */}
      {videos.length > 0 && (
        <section style={{ padding: '40px 5% 80px', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-merriweather)', 
              color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' 
            }}>
              <PlayCircle size={32} color="#ff0000" fill="#ff0000" stroke="#fff" />
              {lang === 'UZ' ? "Videoteka" : (lang === 'RU' ? "Videoteka" : "Video Grid")}
            </h2>
            
            <div className="video-grid">
              {videos.slice(0, displayCount).map((video, index) => {
                const embedUrl = getEmbedUrl(video.url);
                if (!embedUrl) return null;
                return (
                  <div key={index} className="video-card">
                    <div className="video-wrapper">
                      <iframe 
                        src={embedUrl} 
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="video-info">
                      <h4>{video.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
            {displayCount < videos.length && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button 
                  onClick={handleLoadMore} 
                  style={{ 
                    padding: '12px 30px', 
                    background: '#001F3F', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '30px', 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    cursor: 'pointer', 
                    transition: 'background 0.3s ease' 
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#003366')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#001F3F')}
                >
                  {lang === 'UZ' ? "Ko'proq video yuklash" : (lang === 'RU' ? "Загрузить больше видео" : "Load More Videos")}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CONTACT FORM */}
      <section style={{ backgroundColor: 'var(--bg-body)', padding: '80px 5%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-main)', fontFamily: 'var(--font-merriweather)', marginBottom: '10px' }}>
            {t.blogPage.formTitle}
          </h2>
          <div className="animated-form-wrapper">
            <form className="inner-form" onSubmit={handleFormSubmit}>
              <div className="form-grid">
                <div><label>{t.blogPage.labelName}</label><input type="text" required className="blog-input" /></div>
                <div><label>{t.blogPage.labelPhone}</label><input type="tel" required className="blog-input" /></div>
              </div>
              <div style={{ marginTop: '20px' }}><label>{t.blogPage.labelMsg}</label><textarea rows={4} className="blog-input"></textarea></div>
              <button type="submit" className="submit-btn">{t.blogPage.btnSubmit} <Send size={18} /></button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .category-scroll { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none; }
        .category-scroll::-webkit-scrollbar { display: none; }
        .cat-btn { padding: 8px 20px; border-radius: 20px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-secondary); cursor: pointer; white-space: nowrap; transition: 0.2s; }
        .cat-btn.active { background: #001F3F; color: #fff; border-color: #001F3F; }
        
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
        .article-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s; }
        .article-card:hover { transform: translateY(-5px); box-shadow: var(--shadow); }
        .card-image-container { height: 220px; position: relative; overflow: hidden; }
        .category-badge { position: absolute; top: 15px; left: 15px; background: #C5A059; color: #001F3F; padding: 6px 12px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; }
        .card-content { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
        .meta { color: var(--text-secondary); font-size: 0.85rem; display: flex; align-items: center; gap: 5px; margin-bottom: 12px; }
        .read-more { color: var(--primary-color); font-weight: 700; display: flex; align-items: center; gap: 5px; font-size: 0.9rem; margin-top: auto; }

        /* VIDEO STYLES */
        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; }
        .video-card { background: var(--bg-card); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow); }
        .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; }
        .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
        .video-info { padding: 20px; }
        .video-info h4 { color: var(--text-main); font-size: 1.1rem; margin: 0; line-height: 1.4; }

        /* FORM STYLES */
        .animated-form-wrapper { padding: 4px; border-radius: 16px; background: linear-gradient(60deg, #001F3F, #C5A059); box-shadow: 0 15px 40px rgba(0,31,63,0.15); }
        .inner-form { background: var(--bg-card); border-radius: 12px; padding: 40px; text-align: left; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .blog-input { width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 6px; margin-top: 5px; background: var(--bg-surface); color: var(--text-main); }
        .submit-btn { width: 100%; marginTop: 30px; background: #001F3F; color: #fff; padding: 15px; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; }
        
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
