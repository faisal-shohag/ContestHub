import{ useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Counter = ({ end }) => {
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      let current = 0;
      const increment = (end - current) / 100;
      const interval = setInterval(() => {
        current += increment;
        spanRef.current.innerText = `${Math.round(current).toLocaleString()}`;
        if (current >= end) clearInterval(interval);
      }, 30);
    }
  }, [end]);

  return <span ref={spanRef}></span>;
};

Counter.propTypes = {
  end: PropTypes.number.isRequired,
};

export default Counter