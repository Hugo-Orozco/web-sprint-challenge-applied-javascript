const Card = (article) => {

  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const { headline, authorPhoto, authorName } = article;

  const div = document.createElement('div');
  div.className = 'card';

  const divChild = document.createElement('div');
  divChild.className = 'headline';
  divChild.textContent = headline;

  const divChild2 = document.createElement('div');
  divChild2.className = 'author';

  const divGrandChild = document.createElement('div');
  divGrandChild.className = 'img-container';

  const span = document.createElement('span');
  span.textContent = `By ${authorName}`;

  const img = document.createElement('img');
  img.src = authorPhoto;

  div.appendChild(divChild);
  div.appendChild(divChild2);

  divChild2.appendChild(divGrandChild);
  divChild2.appendChild(span);

  divGrandChild.appendChild(img);

  div.addEventListener('click', (event) => {

    console.log(headline);

  });

  return div;

};

const cardAppender = (selector) => {

  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  const query = document.querySelector(selector);

  const axios = require('axios').default;

  const endpoint = 'https://lambda-times-api.herokuapp.com/articles';

  axios.get(endpoint).then((response) => {

    const data = response.data;

    const articles = data.articles;

    const values = Object.values(articles);

    values.forEach((value) => {

      value.forEach((article) => {

        query.appendChild(Card(article));

      });

    });

  });

};

export { Card, cardAppender };
