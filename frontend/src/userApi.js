const fetchUserData = async () => {
    try {
      // Replace 'http://localhost:3000/api/user-data' with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/verify');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Error fetching user data. Please try again.');
    }
  };
  
  export default fetchUserData;
  