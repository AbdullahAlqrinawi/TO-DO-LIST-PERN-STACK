import React, { useState } from 'react';
import HeaderPicture from '../HeaderPicture/HeaderPicture';
import { gitInitials } from '../../utils/helper';

function ProfileInfo({ onLogout, userName }) { 
  const [headerSetting, setHeaderSetting] = useState(false);

  const handleClose = () => {
    setHeaderSetting(false);
  };

  return (
    <>
      <div className='flex items-center gap-3'>
        <button onClick={() => setHeaderSetting(true)} aria-label="Edit profile picture">
          <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {gitInitials(userName)} 
          </div>
        </button>
      </div>
      {headerSetting && <HeaderPicture onClose={handleClose}onLogout={onLogout} />}
    </>
  );
}

export default ProfileInfo;
