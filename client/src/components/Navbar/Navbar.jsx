import LogoutIcon from "../LogoutScreen/LogoutIcon";
import {CheckCircleIcon} from '@heroicons/react/24/solid';

function Navbar({ isLoggedIn, onLogout  }) {

  return (
    <div className='bg-darkTeal flex items-center justify-between px-4 py-2 shadow-md space-x-4'>
    <h2 className='flex items-center text-xl font-semibold text-white transition-transform transform hover:scale-105'>
  DO IT
  <CheckCircleIcon className="h-5 w-5 ml-2" /> 
</h2>

      
      {isLoggedIn && (
        <>
          
          <LogoutIcon onLogout={onLogout} />
        </>
      )}
    </div>
  );
}

export default Navbar;
