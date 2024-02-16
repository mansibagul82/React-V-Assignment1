import { useState } from 'react';
import './App.css'


function DataDisplay({data})
{

  return(
    <div className='data-display'>
      {Array.isArray(data) &&
        data.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}

      {/* If data is not an array, display it as a single paragraph  */}

      {!Array.isArray(data) && <p>{JSON.stringify(data)}</p>}
      
    </div>
  )
}

function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  async function fetchData(){
    setIsLoading(true)
    try {
      // Use fetch to get the data from the endpoint
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }
      // Parse the response as JSON and set the data state
      const data = await response.json();
      setData(data);
    } catch (error) {
      // If an error occurs, set the error state
      setError(error.message);
    } finally {
      // Set isLoading to false after the request is done
      setIsLoading(false);
    }
  }
 
  return (
    <div className="app">
      {/* Add a button that calls the fetchData function when clicked */}
      <button onClick={fetchData}>Fetch Data</button>
      {/* Render different UI elements based on the state of isLoading and error */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Pass the data state to the DataDisplay component */}
      <DataDisplay data={data} />
    </div>
  )
}

export default App
