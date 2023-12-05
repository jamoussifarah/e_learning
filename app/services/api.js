const apiUrl = 'http://localhost:5000/api/cours';

export const fetchCourses = async () => {
  try {
    const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
