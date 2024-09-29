import React, { useState } from 'react';
import LogoutScreen from './LogoutScreen';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function LogoutIcon({ onLogout }) { 
  const [headerSetting, setHeaderSetting] = useState(false);

  const handleClose = () => {
    setHeaderSetting(false);
  };

  return (
    <>
      <div className='flex items-center gap-3'>
      <button onClick={() => setHeaderSetting(true)} aria-label="Edit profile settings">
          <ArrowRightOnRectangleIcon className="h-8 w-8 text-white" /> 
        </button>
      </div>
      {headerSetting && <LogoutScreen onClose={handleClose} onLogout={onLogout} />}
    </>
  );
}

export default LogoutIcon;
