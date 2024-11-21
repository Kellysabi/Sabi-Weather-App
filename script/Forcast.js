class WeatherService {
  constructor() {
    this.apiKey = 'bfbce5fd05f74eefbdc230719241809';
    this.baseUrl = 'https://api.weatherapi.com/v1';
  }

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

  async getCity(city) {
    const url = `${this.baseUrl}/search.json?key=${this.apiKey}&q=${city}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error fetching city information:', error);
      throw error;
    }
  }

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
