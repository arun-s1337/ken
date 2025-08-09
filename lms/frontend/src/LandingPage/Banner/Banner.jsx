import React from 'react';
import bannerim from "../../assets/comingsoonbanner.png";

function Mainbanner() {
  return (
    <div className='container-fluid p-0'> {/* Remove padding */}
      <img 
        src={bannerim} 
        alt="Coming Soon Banner" 
        className='img-fluid w-100 h-auto' // Bootstrap responsive classes
        style={{ 
          maxHeight: '480px', // Prevents oversized height on mobile
          objectFit: 'cover', // Ensures image covers container without distortion
        }}
        loading="lazy" 
      />
    </div>
  );
}

export default Mainbanner;