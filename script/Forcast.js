class WeatherService {
  constructor(apiKey) {
    this.apiKey = 'bfbce5fd05f74eefbdc230719241809';
    this.baseUrl = 'http://api.weatherapi.com/v1';
  }

  // Get weather information using a city name or coordinates (e.g., 'New York' or '37.7749,-122.4194')
  async getWeather(query) {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }

  // Get city information by city name
  async getCity(city) {
    const url = `${this.baseUrl}/search.json?key=${this.apiKey}&q=${city}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data[0]; // Return the first result
    } catch (error) {
      console.error('Error fetching city information:', error);
      throw error;
    }
  }

  // Get time zone offset (optional)
  async getTimeZone(name) {
    const url = `${this.baseUrl}/timezone.json?key=${this.apiKey}&q=${name}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching time zone offset:', error);
      throw error;
    }
  }
}
