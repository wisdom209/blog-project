import React from 'react';
import '../App.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function ArticleList({ prop }) {
  const oldimg = 'https://cdn.mos.cms.futurecdn.net/6NRkmu3P6HKqSK66jTniTH.jpg';
  const timestamp = prop.date;
  const date = new Date(parseInt(timestamp));

  return (
    <div className="article-entry">
      <section>
        <Link to={`/view/${prop.id}`}>
          <img src={prop.image} alt="profile_image" />
        </Link>
      </section>

      <article>
        <div>
          <Link to={`/view/${prop.id}`}>
            <b>{prop.title}</b>
          </Link>
          <p>{format(date, 'd-MMM-yyyy')}</p>
        </div>
        <p>{prop.summary}</p>
      </article>
    </div>
  );
}

export default ArticleList;
