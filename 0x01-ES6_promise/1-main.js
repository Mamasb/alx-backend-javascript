import getFullResponseFromAPI from './1-promise';

getFullResponseFromAPI()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
