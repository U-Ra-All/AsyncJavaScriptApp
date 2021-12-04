'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const displayCountry = function (data, className = '') {
  const currencies = data.currencies;
  const currensyName = Object.values(currencies)[0].name;
  const currensySymbol = Object.values(currencies)[0].symbol;

  const languages = data.languages;
  const firstLanguage = Object.values(languages)[0];

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
        +data.population / 1000000
      ).toFixed(1)} миллионов</p>
      <p class="country__row"><span>🗣️</span>${firstLanguage}</p>
      <p class="country__row"><span>💰</span>${currensySymbol} ${currensyName}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const displayError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};

////////////////////////////////////////////////////

// const getCoutnryData = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
//   request.send();
//   // console.log(request.responseText);
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const currencies = data.currencies;
//     const currensyName = Object.values(currencies)[0].name;
//     const currensySymbol = Object.values(currencies)[0].symbol;

//     const languages = data.languages;
//     const firstLanguage = Object.values(languages)[0];

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} миллионов</p>
//       <p class="country__row"><span>🗣️</span>${firstLanguage}</p>
//       <p class="country__row"><span>💰</span>${currensySymbol} ${currensyName}</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

const getCoutnryAndBorderCountries = function (countryName) {
  // Вызов AJAX для получения данных о стране
  const request1 = new XMLHttpRequest();
  request1.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
  request1.send();

  request1.addEventListener('load', function () {
    const [data1] = JSON.parse(this.responseText);
    console.log(data1);

    // Отображение страны
    displayCountry(data1);

    // Получаем первую соседнюю страну
    const [firstNeighbour] = data1.borders;

    if (!firstNeighbour) return;

    // Вызов AJAX для получения данных о первой соседней стране
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${firstNeighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      displayCountry(data2, 'neighbour');
    });
  });
};

// getCoutnryAndBorderCountries('usa');

// setTimeout(() => {
//   console.log('Прошла 1 секунда');
//   setTimeout(() => {
//     console.log('Прошло 2 секунды');
//     setTimeout(() => {
//       console.log('Прошло 3 секунды');
//       setTimeout(() => {
//         console.log('Прошло 4 секунды');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
// request.send();

// const getCoutnryData = function (countryName) {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       displayCountry(data[0]);
//     });
// };

const getDataAndConvertToJSON = function (
  url,
  errorMessage = 'Что-то пошло не так 🧐.'
) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`${errorMessage} Ошибка ${response.status}`);
    return response.json();
  });
};

// const getCoutnryData = function (countryName) {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Страна не найдена. Ошибка ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       displayCountry(data[0]);
//       // const firstNeighbour = data[0].borders[0];
//       const firstNeighbour = 'afasga';

//       if (!firstNeighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Страна не найдена. Ошибка ${response.status}`);
//       return response.json();
//     })
//     .then(data => displayCountry(data[0], 'neighbour'))
//     .catch(e => {
//       console.error(`${e} 🧐`);
//       displayError(`Что-то пошло не так 🧐: ${e.message}. Попробуйте ещё раз!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCoutnryData = function (countryName) {
  getDataAndConvertToJSON(
    `https://restcountries.com/v3.1/name/${countryName}`,
    'Страна не найдена.'
  )
    .then(data => {
      displayCountry(data[0]);

      if (!data[0].borders) throw new Error('Соседних стран не найдено!');

      const firstNeighbour = data[0].borders[0];

      return getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/alpha/${firstNeighbour}`,
        'Страна не найдена.'
      );
    })
    .then(data => displayCountry(data[0], 'neighbour'))
    .catch(e => {
      console.error(`${e} 🧐`);
      displayError(`Что-то пошло не так 🧐: ${e.message} Попробуйте ещё раз!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCoutnryData('ukraine');
});

getCoutnryData('japan');
