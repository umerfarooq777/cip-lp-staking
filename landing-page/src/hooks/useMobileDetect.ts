import { useState, useEffect } from 'react';

function useMobileDetect(breakpoint = 767.99): boolean { 
  const [isMobile, setIsMobile] = useState<boolean>(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => { 
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

export default useMobileDetect;