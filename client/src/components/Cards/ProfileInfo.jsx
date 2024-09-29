import React, { useState } from 'react';
import HeaderPicture from '../HeaderPicture/HeaderPicture';
import { CogIcon } from '@heroicons/react/24/solid';

function ProfileInfo({ onLogout }) { 
  const [headerSetting, setHeaderSetting] = useState(false);

  const handleClose = () => {
    setHeaderSetting(false);
  };

  return (
    <>
      <div className='flex items-center gap-3'>
      <button onClick={() => setHeaderSetting(true)} aria-label="Edit profile settings">
          <CogIcon className="h-8 w-8 text-white" /> 
        </button>
      </div>
      {headerSetting && <HeaderPicture onClose={handleClose} onLogout={onLogout} />}
    </>
  );
}

export default ProfileInfo;
