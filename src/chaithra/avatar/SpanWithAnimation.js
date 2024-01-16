import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const SpanWithAnimation = ({ children, additionalStyles }) => {
  const [isHovered, setHovered] = useState(false);

  const spanAnimation = useSpring({
    color: isHovered ? 'black' : 'black',
    fontSize: isHovered ? '1.2em' : '1em',
    backgroundColor: isHovered ? 'lightgray' : 'transparent',
    borderRadius: '4px',
    padding: '4px',
    margin: '0 4px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',

  });

  return (
    <animated.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={spanAnimation}
    >
      {children}
    </animated.span>
  );
};

export default SpanWithAnimation;
