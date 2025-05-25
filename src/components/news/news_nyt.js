import axios from 'axios';


export async function getNews() {
  const API_KEY = 'xiz1Std8nVLg0lGGC5hif1k4rGqZTJnQ';
  const url = `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log(response.data.results[0].multimedia[0].url)
    return response.data.results;
    
    
  } catch (error) {
    console.error('Error al obtener noticias:', error.message);
    return [];
  }
}