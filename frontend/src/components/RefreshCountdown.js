import React, { useState, useEffect } from 'react';

const RefreshCountdown = () => {
  const [countdown, setCountdown] = useState(29);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  return (
    <div>
      {countdown === 0 ? '30 detik' : `${countdown} dtk`}
    </div>
  );
};

export default RefreshCountdown;