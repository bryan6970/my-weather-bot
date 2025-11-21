// Base URL for data.gov.sg API v2
const BASE_URL = "https://api-open.data.gov.sg/v2/real-time/api";

/** 
@param {string} location - Jurong West 
*/
function get2HourForecast(location) {
  const url = `${BASE_URL}/two-hr-forecast`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch 2-hour forecast: " + response.status);
      }
      return response.json();
    })
    .then(data => {
     
      const forecasts = data.data.items[0].forecasts;
      for (const forecastObj of forecasts) {
        if (forecastObj.area === location) {
          return forecastObj.forecast;
        }
      }
      throw new Error(`${location} not found in forecast!`);
    });
}

/**
 * Get 24-hour forecast (or daily forecast) for a region at a specific datetime
 * @param {string} region - e.g. north/south/east/west/central
 * @param {Date} targetTime - Date object
 */
function getDailyForecast(region, targetTime) {
  const url = `${BASE_URL}/24-hour-weather-forecast`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch 24-hour forecast: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      const periods = data.data.items[0].periods;
      for (const period of periods) {
        const start = new Date(period.start);
        const end = new Date(period.end);
        if (targetTime >= start && targetTime <= end) {
          if (period.regions[region]) {
            return period.regions[region].text;
          } else {
            throw new Error(`Region ${region} not found in period forecast`);
          }
        }
      }
      throw new Error(`No forecast found for ${targetTime}`);
    });
}

export { get2HourForecast, getDailyForecast };
