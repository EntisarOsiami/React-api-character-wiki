import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AddCharacter() {
  const url = 'https://68276c5e6b7628c529104d57.mockapi.io/api/character';
  const [character, setCharacter] = useState({
    name: '',
    img: '',
    gender: '',
  });

  function addChar(e) {
    e.preventDefault();
    if (!character.name || !character.img || !character.gender) {
      toast.error('Please fill all fields');
      return;
    }
    axios.post(url, character).then((response) => {
      if (response) {
        toast.success('Character added successfully');
        setCharacter({
          name: '',
          img: '',
          gender: '',
        });
      }
    });
  }

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [character]);

  const [searchVal, setSearchVal] = useState('');
  const [filteredChar, setFilteredChar] = useState(characters);

  const search = () => {
    const filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredChar(filtered);
    if (filtered.length === 0 && searchVal) {
      toast.error('oops!');
    }
  };

  useEffect(() => {
    setFilteredChar(characters);
  }, [characters]);

  return (
  
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto px-4 py-8'>
      <div className='max-w-md flex flex-col mx-auto mb-4'>
        <div className='flex gap-3 mb-4'>
          <input
            type='text'
            placeholder='Search Character'
            value={searchVal}
            className='w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button
            onClick={search}
            className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200'>
            Search
          </button>
        </div>
      </div>

      <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-8'>
        <h1 className='text-3xl font-bold text-center mb-6 text-green-800'>
          Add Your Character
        </h1>
        <form className='space-y-4'>
          <input
            type='text'
            placeholder='Name'
            value={character.name}
            onChange={(e) =>
              setCharacter({ ...character, name: e.target.value })
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          />
          <input
            type='text'
            placeholder='Image URL'
            value={character.img}
            onChange={(e) =>
              setCharacter({ ...character, img: e.target.value })
            }
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          />
          <select
            onChange={(e) =>
              setCharacter({ ...character, gender: e.target.value })
            }
            value={character.gender}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'>
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <button
            onClick={addChar}
            className='w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200'>
            Add Character
          </button>
        </form>
      </div>

     
    </div>
     <div className='max-w-6xl mx-auto'>
        {filteredChar.length > 0 ? (
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredChar.map((char) => (
              <li
                key={char.id}
                className='bg-white rounded-lg shadow-lg overflow-hidden'>
                <img src={char.img} className='w-full h-100 object-center object-cover' />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    {char.name}
                  </h2>
                  <p className='text-gray-600 mt-2'>{char.gender}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-center text-gray-500 mt-8'>
            <p>oops! no character found! </p>
          </div>
        )}
      </div>
    </>
  );
}

export default AddCharacter;
