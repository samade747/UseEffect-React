import React, { useState, useEffect } from 'react';

function UserProfile() {
  // State to store user data
  const [user, setUser] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // useEffect to fetch user data
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data from JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the response as JSON
        const data = await response.json();
        
        // Update the user state with fetched data
        setUser(data);
      } catch (error) {
        // Handle any errors that occurred during fetch
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        // Stop loading regardless of success or error
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function (runs when component unmounts)
    return () => {
      console.log('Cleanup: Component unmounted');
      // Here, you could cancel ongoing requests, clear timers, etc.
    };
  }, []); // Empty dependency array means this effect runs only once

  // Display loading, error, or user data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  );
}

export default UserProfile;
