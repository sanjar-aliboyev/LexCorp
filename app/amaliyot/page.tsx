'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../constants/translations';
import { client } from '../sanity/client';
import Link from 'next/link';
import type { SuccessCase, ProcessedCase, ClientData, Language, CategoryMap } from '../types';

// --- DATA: Clients (Static) ---
const CLIENTS_DATA = [
  { id: 1, name: "Samsung C&T", industry: "IT & Electronics", country: "South Korea", logo: "SAMSUNG" },
  { id: 2, name: "Hyundai Engineering", industry: "Construction", country: "South Korea", logo: "HYUNDAI" },
  { id: 3, name: "Lukoil", industry: "Oil & Gas", country: "Russia", logo: "LUKOIL" },
  { id: 4, name: "JP Morgan", industry: "Finance", country: "USA", logo: "JP MORGAN" },
  { id: 5, name: "Siemens Energy", industry: "Energy", country: "Germany", logo: "SIEMENS" },
  { id: 6, name: "CNPC", industry: "Oil & Gas", country: "China", logo: "CNPC" }
];

// FIXED CONFIG: ISO NUMERIC CODES
const COUNTRY_CODES: { [key: string]: string } = {
  'USA': '840',
  'Germany': '276',
  'Russia': '643',
  'China': '156',
  'South Korea': '410',
  'Turkey': '792'
};

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const INDUSTRIES = ["All", "Oil & Gas", "Finance", "Construction", "IT & Electronics", "Energy"];

// --- HELPER: Category Translations for Sanity Data ---
const CATEGORY_MAP: CategoryMap = {
  UZ: { 'corporate': 'Korporativ', 'litigation': 'Sud', 'tax': 'Soliq', 'ip': 'IP', 'labor': 'Mehnat', 'construction': 'Qurilish' },
  RU: { 'corporate': 'Корпоративное', 'litigation': 'Суды', 'tax': 'Налоги', 'ip': 'IP', 'labor': 'Трудовое', 'construction': 'Строительство' },
  EN: { 'corporate': 'Corporate', 'litigation': 'Litigation', 'tax': 'Tax', 'ip': 'IP', 'labor': 'Labor', 'construction': 'Construction' }
};

// --- FETCH SANITY DATA ---
async function getCases() {
  return client.fetch(`
    *[_type == "successCase"] | order(_createdAt desc) {
      "id": slug.current,
      "image": image.asset->url,
      category,
      statValue,
      content
    }
  `, {}, { next: { revalidate: 30 } });
}

export default function AmaliyotPage() {
  const { lang } = useLanguage();
  const currentLang = lang as Language;
  const t = translations[lang].practicePage;

  // Sanity Data State
  const [cases, setCases] = useState<SuccessCase[]>([]);
  
  // Filter States
  const [activeCountry, setActiveCountry] = useState('All');
  const [activeIndustry, setActiveIndustry] = useState('All');

  // Form States
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch Data on Load
  useEffect(() => {
    getCases()
      .then((data) => setCases(data))
      .catch((err) => console.error("Sanity Fetch Error:", err));
  }, []);

  // Prepare Client Data with Translations
  const clients: ClientData[] = CLIENTS_DATA.map(client => {
    const translation = t.clients.find((c: { id: number; description: string }) => c.id === client.id);
    return {
      ...client,
      description: translation ? translation.description : ""
    };
  });

  // Filter Clients
  const filteredClients = clients.filter(client => {
    const matchCountry = activeCountry === 'All' || client.country === activeCountry;
    const matchIndustry = activeIndustry === 'All' || client.industry === activeIndustry;
    return matchCountry && matchIndustry;
  });

  const handleCountryClick = (geoId: string) => {
    const countryName = Object.keys(COUNTRY_CODES).find(key => COUNTRY_CODES[key] === geoId);
    if (countryName) {
      setActiveCountry(countryName);
    } else {
      setActiveCountry('All');
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          source: 'Amaliyot Page (Practice)',
          interest: 'General Inquiry'
        }),
      });

      if (response.ok) {
        setFormMessage(t.formSuccess);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', message: '' }); // Clear form
        setTimeout(() => setFormMessage(''), 5000); // Clear message after 5s
      } else {
        setFormMessage(t.formError);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Form error:", error);
      setFormMessage(t.formError);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Process Sanity Cases
  const processedCases: ProcessedCase[] = cases.map((item) => {
    const content = item.content[currentLang] || item.content['UZ'];
    const displayCategory = CATEGORY_MAP[currentLang]?.[item.category] || item.category;

    return {
      id: item.id,
      image: item.image,
      category: displayCategory,
      title: content?.title || "No Title",
      challenge: content?.description || "Ma'lumot yo'q",
      outcome: item.statValue || "Muvaffaqiyatli yakunlandi",
      stat: item.statValue
    };
  });

  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', transition: 'background-color 0.3s' }}>
      <Header />

      {/* --- BLOCK 1: GLOBAL EXPERIENCE --- */}
      <section style={{ 
        padding: '160px 5% 100px', 
        backgroundColor: 'var(--bg-surface)', 
        color: 'var(--text-main)', 
        transition: 'background-color 0.3s, color 0.3s'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-merriweather)', marginBottom: '20px', fontWeight: 700 }}>
              {t.title}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              {t.desc}
            </p>
          </div>

          <div className="map-wrapper">
            <ComposableMap projectionConfig={{ scale: 200 }} width={1000} height={450} style={{ width: "100%", height: "100%" }}>
              <ZoomableGroup center={[20, 0]}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isClient = Object.values(COUNTRY_CODES).includes(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => isClient && handleCountryClick(geo.id)}
                          className={isClient ? "geo-client" : "geo-default"}
                          style={{
                            default: { outline: "none" },
                            hover: { 
                              fill: isClient ? "#C5A059" : "var(--map-default)", 
                              outline: "none",
                              cursor: isClient ? "pointer" : "default"
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {activeCountry !== 'All' && (
              <button 
                onClick={() => setActiveCountry('All')}
                style={{ 
                  position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', 
                  padding: '8px 16px', background: '#C5A059', border: 'none', borderRadius: '4px', 
                  cursor: 'pointer', fontWeight: 'bold', color: '#001F3F', zIndex: 10 
                }}
              >
                {t.resetBtn}
              </button>
            )}
          </div>

          <div className="industry-bar">
            <span style={{ color: 'var(--text-secondary)', marginRight: '20px', fontWeight: 600 }}>{t.industry}:</span>
            <div className="industry-scroll">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`ind-btn ${activeIndustry === ind ? 'active' : ''}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="clients-grid">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div key={client.id} className="client-card">
                  <div className="client-logo">{client.logo}</div>
                  <div className="client-info">
                    <h4>{client.name}</h4>
                    <span className="client-meta">{client.country} • {client.industry}</span>
                    <p>{client.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                {t.noClient}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- BLOCK 2: SUCCESS CASES --- */}
      <section style={{ padding: '100px 5%', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '60px', color: 'var(--text-main)', fontFamily: 'var(--font-merriweather)' }}>
          {t.casesTitle}
        </h2>
        
        {processedCases.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888' }}>Yuklanmoqda...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {processedCases.map((item) => (
              <div key={item.id} className="case-card">
                <div className="case-image" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="category-badge">{item.category}</div>
                </div>
                <div className="case-content">
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '25px', fontFamily: 'var(--font-merriweather)' }}>
                    {item.title}
                  </h2>
                  
                  <div className="detail-row">
                    <div className="icon-box red"><AlertTriangle size={20} /></div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>{t.challenge}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.challenge}</p>
                    </div>
                  </div>

                  <div className="detail-row outcome">
                    <div className="icon-box green"><CheckCircle2 size={20} /></div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>{t.outcome}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.outcome}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#C5A059', fontWeight: 700 }}>
                       <TrendingUp size={20} /> <span>{item.stat}</span>
                     </div>
                     <Link href={`/amaliyot/${item.id}`} style={{ textDecoration: 'none' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                          {t.readMore} <ArrowRight size={16} />
                        </button>
                     </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- BLOCK 3: CONTACT FORM --- */}
      <section style={{ padding: '100px 5%', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', padding: '50px', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontFamily: 'var(--font-merriweather)', color: 'var(--text-main)' }}>
            {t.formTitle}
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--text-secondary)'}}>
            {t.formDesc}
          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{translations[lang].blogPage.labelName}</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{translations[lang].blogPage.labelPhone}</label>
              <input 
                type="tel" 
                id="phone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="message">{translations[lang].blogPage.labelMsg}</label>
              <textarea 
                id="message" 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {/* STATUS MESSAGES */}
            {formMessage && (
              <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
                {isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <span>{formMessage}</span>
              </div>
            )}

            <button type="submit" className="submit-btn full-width" disabled={loading}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Loader2 className="spin" size={20} /> {translations[lang].servicesPage?.sending || "Sending..."}
                </div>
              ) : (
                translations[lang].blogPage.btnSubmit
              )}
            </button>
          </form>
        </div>
      </section>

      <style jsx>{`
        /* --- GLOBAL CSS VARIABLES --- */
        :global(:root) {
          --map-default: #EAEAEC;
          --map-client: #000080;
          --map-stroke: #FFFFFF;
        }

        :global([data-theme="dark"]) {
          --map-default: #3A3A3A;
          --map-client: #CD7F32;
          --map-stroke: #222222;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* --- MAP & COMPONENTS --- */
        .map-wrapper {
          position: relative; background: var(--bg-card); border-radius: 12px;
          border: 1px solid var(--border-color); height: 450px; margin-bottom: 50px;
          overflow: hidden; transition: background-color 0.3s;
        }

        :global(.geo-default) { fill: var(--map-default); stroke: var(--map-stroke); stroke-width: 0.6px; transition: all 0.3s; }
        :global(.geo-client) { fill: var(--map-client); stroke: var(--map-stroke); stroke-width: 0.6px; transition: all 0.3s; }

        .industry-bar { display: flex; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 40px; overflow-x: auto; }
        .industry-scroll { display: flex; gap: 10px; }
        .ind-btn { background: transparent; color: var(--text-secondary); border: none; padding: 8px 16px; cursor: pointer; font-size: 0.95rem; font-weight: 500; transition: color 0.2s; }
        .ind-btn:hover { color: var(--primary-color); }
        .ind-btn.active { color: #C5A059; font-weight: 700; border-bottom: 2px solid #C5A059; }

        .clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; }
        .client-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; display: flex; overflow: hidden; transition: transform 0.2s; box-shadow: var(--shadow); }
        .client-card:hover { transform: translateY(-5px); border-color: #C5A059; }
        .client-logo { width: 100px; background: #fff; color: #000; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; padding: 10px; text-align: center; flex-shrink: 0; border-right: 1px solid #eee; }
        .client-info { padding: 20px; }
        .client-info h4 { color: var(--text-main); margin-bottom: 5px; font-size: 1.1rem; }
        .client-meta { display: block; font-size: 0.8rem; color: #C5A059; margin-bottom: 10px; text-transform: uppercase; }
        .client-info p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; }

        .case-card { display: grid; grid-template-columns: 350px 1fr; background: var(--bg-card); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
        .case-image { background-size: cover; background-position: center; position: relative; }
        .category-badge { position: absolute; top: 20px; left: 20px; background: #001F3F; color: #fff; padding: 6px 12px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; }
        .case-content { padding: 40px; }
        .detail-row { display: flex; gap: 15px; margin-bottom: 20px; }
        .icon-box { width: 36px; height: 36px; border-radius: 50%; display: flex; alignItems: center; justifyContent: center; flex-shrink: 0; }
        .icon-box.red { background: rgba(229, 62, 62, 0.1); color: #e53e3e; }
        .icon-box.green { background: rgba(56, 161, 105, 0.1); color: #38a169; }
        .outcome { background: var(--bg-surface); padding: 15px; border-radius: 8px; border-left: 4px solid #38a169; }

        /* --- CONTACT FORM --- */
        .contact-form { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { display: flex; flex-direction: column; }
        .form-group.full-width { grid-column: 1 / -1; }
        .contact-form label { margin-bottom: 8px; font-weight: 600; color: var(--text-secondary); font-size: 0.9rem; }
        
        .contact-form input, .contact-form textarea {
          padding: 12px; border: 1px solid var(--border-color); border-radius: 6px;
          background-color: var(--bg-surface); color: var(--text-main); font-size: 1rem; transition: border-color 0.2s;
        }
        .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: #C5A059; }

        .submit-btn {
          padding: 14px; border: none; border-radius: 6px; background-color: #C5A059; color: #fff;
          font-weight: 700; font-size: 1rem; cursor: pointer; transition: background-color 0.2s;
        }
        .submit-btn:hover { background-color: #b38f4a; }
        .submit-btn:disabled { background-color: #ccc; cursor: not-allowed; }

        .status-message {
          grid-column: 1 / -1; padding: 15px; border-radius: 6px; display: flex; align-items: center; gap: 10px; font-weight: 500;
        }
        .status-message.success { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .status-message.error { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        @media (max-width: 900px) {
          .case-card { grid-template-columns: 1fr; }
          .case-image { height: 200px; }
          .case-content { padding: 25px; }
          .client-card { flexDirection: column; }
          .client-logo { width: 100%; height: 60px; border-right: none; border-bottom: 1px solid #eee; }
        }
        @media (max-width: 600px) {
          .contact-form { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}