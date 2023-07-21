import React from 'react';
import '../App.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function ArticleList({ prop }) {
  const timestamp = prop.date;
  const date = new Date(parseInt(timestamp));

  return (
    <div className="article-entry">
      <section>
        <Link to={`/view/${prop.id}`}>
          <img id="article-img" src={prop.image} alt="profile_image" />
        </Link>
      </section>

      <article>
        <div>
          <Link to={`/view/${prop.id}`}>
            <b>{prop.title}</b>
          </Link>
          <p style={{color:'#444a', marginTop: '5px'}}>{format(date, 'd-MMM-yyyy')}</p>
        </div>
        <p>{prop.summary}</p>
      </article>
    </div>
  );
}

export default ArticleList;
