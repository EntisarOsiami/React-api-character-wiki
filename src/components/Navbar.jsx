import { Link } from 'react-router';
import { CiMenuBurger } from 'react-icons/ci';
import { GiBoatHorizon } from 'react-icons/gi';

function Navbar() {
  return (
    <>
      <nav className='navbar hidden md:block mb-3 text-white bg-green-800 shadow-lg border-b-2 border-yellow-300'>
        <div className='container mx-auto px-4 py-4 flex gap-3 justify-start items-center'>
          <GiBoatHorizon className='text-white text-4xl' />
          <Link
            to='/'
            className='text-2xl text-white font-bold hover:text-yellow-300 transition-colors'>
            Character Wiki
          </Link>
        </div>
      </nav>

      <nav className='md:hidden bg-green-800 shadow-lg border-b-2 border-yellow-400'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <Link to='/' className=''>
            <GiBoatHorizon className='text-white text-4xl' />
          </Link>
          <button className='text-white text-2xl focus:outline-none transition-colors'>
            <CiMenuBurger />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
