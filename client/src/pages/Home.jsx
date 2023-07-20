import React, { useEffect, useState, useContext } from 'react';
import ArticleList from '../components/ArticleList';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { MyContext } from './context';
import Cookie from 'js-cookie';

function Home() {
  const [article, setArticle] = useState([]);
  const { baseUrl } = useContext(MyContext);

  useEffect(() => {
    axios.get(`${baseUrl}/posts`).then((response) => {
      setArticle(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      {article.length == 0 ? (
        <b>Loading . . . </b>
      ) : (
        <main>
          {article.map((v, i) => {
            return <ArticleList key={v.id} prop={v} />;
          })}
        </main>
      )}
    </>
  );
}

export default Home;
