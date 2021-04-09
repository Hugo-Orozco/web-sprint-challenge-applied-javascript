const Tabs = (topics) => {

  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  const div = document.createElement('div');
  div.className = 'topics';

  topics.forEach((topic) => {

    const divChild = document.createElement('div');
    divChild.className = 'tab';
    divChild.textContent = topic;

    div.appendChild(divChild);

  });

  return div;

};

const tabsAppender = (selector) => {

  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //

  const query = document.querySelector(selector);

  const axios = require('axios').default;

  const endpoint = 'https://lambda-times-api.herokuapp.com/topics';

  axios.get(endpoint).then((response) => {

    const data = response.data;

    const topics = data.topics;

    query.appendChild(Tabs(topics));

  });

};

export { Tabs, tabsAppender };
