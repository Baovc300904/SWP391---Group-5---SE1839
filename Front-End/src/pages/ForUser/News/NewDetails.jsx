import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import initialNews from '../../data/initialNews';
import { sanitizeUrl } from '../../../utils/security';
import './News.css';

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = initialNews.find(p => p.id === parseInt(id));

  // Sanitize current URL for social sharing
  const currentUrl = sanitizeUrl(window.location.href);

  if (!post) {
    return (
      <div className="news-container" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h2 style={{ color: '#b71c1c' }}>❌ Không tìm thấy bài viết!</h2>
        <button 
          onClick={() => navigate('/new')} 
          className="btn-create"
          style={{ marginTop: '1.5rem', backgroundColor: '#b71c1c' }}
        >
          ⬅ Quay lại
        </button>
      </div>
    );
  }

  return (
    <article className="news-detail-article">
      <button 
        onClick={() => navigate('/new')} 
        className="news-detail-btn-back"
        style={{ color: '#b71c1c', fontWeight: '700', marginBottom: '1rem' }}
        aria-label="Quay lại trang tin tức"
      >
        ⬅ Quay lại
      </button>

      <header className="article-header">
        <h1 className="article-title" style={{ color: '#b71c1c' }}>{post.title}</h1>
        <div className="article-meta" style={{ color: '#555' }}>
          <span className="author">Tác giả: <strong>{post.author || 'Admin'}</strong></span>
          <span className="date" style={{ marginLeft: '1rem' }}>🗓 {post.date}</span>
          <span className="category" style={{ marginLeft: '1rem' }}>
            Thể loại: <Link to="#" style={{ color: '#b71c1c', textDecoration: 'underline' }}>{post.category || 'Tin tức'}</Link>
          </span>
        </div>
      </header>

      <figure className="article-image-container" style={{ margin: '1.5rem 0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 6px 15px rgb(183 28 28 / 0.15)' }}>
        <img src={post.image} alt={post.title} className="article-image" />
        {post.caption && <figcaption className="image-caption">{post.caption}</figcaption>}
      </figure>

      <section 
        className="article-content" 
        dangerouslySetInnerHTML={{ __html: post.content || post.description }} 
        style={{ color: '#333', fontSize: '1.1rem', lineHeight: 1.8 }}
      />

      <footer className="article-footer" style={{ borderTop: '1px solid #eee', paddingTop: '1.2rem' }}>
        <div className="social-share" style={{ marginBottom: '1.2rem', gap: '1rem' }}>
          <span style={{ fontWeight: '600', color: '#b71c1c' }}>Chia sẻ bài viết:</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="share-btn facebook"
            aria-label="Chia sẻ lên Facebook"
            style={{ backgroundColor: '#b71c1c', padding: '0.4rem 1rem', borderRadius: '6px', color: '#fff', fontWeight: '600', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7f0000'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b71c1c'}
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="share-btn twitter"
            aria-label="Chia sẻ lên Twitter"
            style={{ backgroundColor: '#1976d2', padding: '0.4rem 1rem', borderRadius: '6px', color: '#fff', fontWeight: '600', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d47a1'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1976d2'}
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            className="share-btn linkedin"
            aria-label="Chia sẻ lên LinkedIn"
            style={{ backgroundColor: '#0a66c2', padding: '0.4rem 1rem', borderRadius: '6px', color: '#fff', fontWeight: '600', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#004182'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0a66c2'}
          >
            LinkedIn
          </a>
        </div>

        <div className="related-articles">
          <h3 style={{ color: '#b71c1c', fontWeight: '700', marginBottom: '1rem' }}>Bài viết liên quan</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {initialNews
              .filter(n => n.id !== post.id)
              .slice(0, 3)
              .map(n => (
                <li key={n.id} style={{ marginBottom: '0.6rem' }}>
                  <Link to={`/new/${n.id}`} style={{ color: '#444', fontWeight: '600', textDecoration: 'none' }} 
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                    {n.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </footer>
    </article>
  );
}
