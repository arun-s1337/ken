import React from 'react';

function Maparea() {
  return (
    <div className="w-full overflow-hidden shadow-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.3633326551676!2d-74.44125262523683!3d40.86390002830443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c30825daae078b%3A0x2f68b72749a8fa26!2s354%20Kingston%20Rd%2C%20Parsippany-Troy%20Hills%2C%20NJ%2007054%2C%20USA!5e0!3m2!1sen!2sin!4v1746862773735!5m2!1sen!2sin" 
        width="100%" 
        height="450"
        className="border-0"
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
      ></iframe>
    </div>
  );
}

export default Maparea;