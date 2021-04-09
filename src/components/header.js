const Header = (title, date, temp) => {

  // TASK 1
  // ---------------------
  // Implement this function taking `title`, `date` and `temp` as its 3 args and returning the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  //  <div class="header">
  //    <span class="date">{ date }</span>
  //    <h1>{ title }</h1>
  //    <span class="temp">{ temp }</span>
  //  </div>
  //

  const div = document.createElement('div');
  div.className = 'header';

  const span = document.createElement('span');
  span.className = 'date';
  span.textContent = date;

  const h1 = document.createElement('h1');
  h1.textContent = title;

  const span2 = document.createElement('span');
  span2.className = 'temp';
  span2.textContent = temp;

  div.appendChild(span);
  div.appendChild(h1);
  div.appendChild(span2);

  return div;

};

const headerAppender = (selector) => {

  // TASK 2
  // ---------------------
  // Implement this function taking a css selector as its only argument.
  // It should create a header using the Header component above, passing arguments of your choosing.
  // It should append the header to the element in the DOM that matches the given selector.
  //

  const query = document.querySelector(selector);

  const title = 'Lambda Times';

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = `${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`.toUpperCase();

  const success = (success) => {

    const coords = success.coords;

    const url = new URL('/api/current', 'https://fcc-weather-api.glitch.me');

    url.search = new URLSearchParams({ lat: coords.latitude, lon: coords.longitude });

    const axios = require('axios').default;

    axios.get(url.href).then((response) => {

      const data = response.data;

      const temp = data.main.temp;

      return query.appendChild(Header(title, date, `${temp.toFixed()}°`));

    }).catch((error) => {

      console.error(error);

      return query.appendChild(Header(title, date, '\u200B'));

    });


  };

  const error = (error) => {

    console.error(error);

    return query.appendChild(Header(title, date, '\u200B'));

  };

  navigator.geolocation.getCurrentPosition(success, error);

  // switch (navigator.onLine) {
  //   case (true): {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //     break;
  //   }
  //   case (false): {
  //     error(new Error('User is offline...'));
  //     break;
  //   }
  // }

};

export { Header, headerAppender };
