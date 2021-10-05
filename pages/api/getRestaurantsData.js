import axios from "axios";

export const getRestaurantsData = async (
  lat = "12.91285",
  lng = "100.87808",
  limit = 10
) => {
  let options = {
    url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
    params: {
      latitude: lat,
      longitude: lng,
      limit,
    },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
      "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
    },
  };

  const searchResults = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return searchResults;
};
