import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Modal from './components/Modal'
import LocationForm from './components/LocationForm'
import BookForm from './components/BookForm'
import DataList from './components/DataList'


const App = () => {
  const [modal, setModal] = useState({ isOpen: false });
  const [pathName, setPathName] = useState('No Location');

  const [currentLocationId, setCurrentLocationId] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [directories, setDirectories] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchData = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/locations/current/${id}`);
        if (response.data.locations.length > 0) {
            setDirectories(response.data.directories);
            setBooks(response.data.books);
            const parentLocation = response.data.locations.find((x) => x.parent_location_id === null);
            if (currentLocationId === 0) {
                // default location
                setCurrentLocation(parentLocation);
                setCurrentLocationId(parentLocation.id);
                setPathName(parentLocation.name);
                
            } else {
              const location = response.data.locations.find((x) => x.id === id);
              setCurrentLocation(location);
              setCurrentLocationId(location.id);
              setPathName(parentLocation.path);
            }
        }
        
    } catch(err) {
        console.log('Error fetching data: ', err);
    }  
}

useEffect(() => {
    fetchData(currentLocationId);
}, []);


  return (
    <div className='container p-4 mx-auto'>
      <Modal modal={modal} setModal={setModal} />
      <h1 className="text-3xl font-bold">
        Node.js and React Take Home Test Instructions
      </h1>
      <div>
        <h3 className="inline-flex text-base font-semibold leading-7 text-gray-900">LOCATION </h3>
        <input id="currentLocation" name="currentLocation" type="text" className="inline-flex px-2 mx-2 my-4 w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" readOnly value={pathName}/>
      </div>
      <LocationForm currentLocationId={currentLocationId} fetchData={fetchData} setModal={setModal} />
      <BookForm currentLocationId={currentLocationId} fetchData={fetchData} setModal={setModal} pathName={pathName} />

      <DataList currentLocation={currentLocation} directories={directories} books={books} fetchData={fetchData} setModal={setModal} />
    </div>
  );
}

export default App;
