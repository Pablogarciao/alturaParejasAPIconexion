import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

// Define the structure of a Person object
interface Person {
  first_name: string;
  last_name: string;
  h_in: string;
  h_meters: string;
}

const App: React.FC = () => {
  // State to store the list of persons fetched from the API
  const [persons, setPersons] = useState<Person[]>([]);
  // State to store the desired height input by the user
  const [height, setHeight] = useState<number>(0);
  // State to store the pairs of persons whose heights sum up to the desired height
  const [pairs, setPairs] = useState<[Person, Person][]>([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://mach-eight.uc.r.appspot.com/')
      .then(response => response.json())
      .then(data => setPersons(data.values))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to find pairs of persons whose heights sum up to the given height
  const findPairs = (height: number) => {
    const pairs: [Person, Person][] = [];
    for (let i = 0; i < persons.length; i++) {
      for (let j = i + 1; j < persons.length; j++) {
        if (parseInt(persons[i].h_in) + parseInt(persons[j].h_in) === height) {
          pairs.push([persons[i], persons[j]]);
        }
      }
    }
    setPairs(pairs);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    findPairs(height);
  };

  return (
    <div className="App">
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Input field to enter the desired height */}
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            placeholder="Enter height in inches"
          />
          {/* Button to submit the form */}
          <button type="submit">Find Pairs</button>
        </form>
        <div>
          {/* Display the pairs of persons */}
          {pairs.length > 0 ? (
            pairs.map((pair, index) => (
              <div key={index}>
                <p>
                  {pair[0].first_name} {pair[0].last_name} ({pair[0].h_in} in) and {pair[1].first_name} {pair[1].last_name} ({pair[1].h_in} in) = {height} in
                </p>
              </div>
            ))
          ) : (
            <p>No pairs found</p>
          )}
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default App;
