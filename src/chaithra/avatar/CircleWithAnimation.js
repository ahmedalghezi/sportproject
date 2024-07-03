import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const CircleWithAnimation = ({ cx, cy, r, stroke, fill }) => {
  const [isHovered, setHovered] = useState(false);

  const circleAnimation = useSpring({
    r: isHovered ? r * 1.2 : r,
    stroke: isHovered ? 'blue' : stroke,
    fill: isHovered ? 'blue' : fill,
  });

  return (
    <animated.circle
      cx={cx}
      cy={cy}
      r={circleAnimation.r}
      stroke={circleAnimation.stroke}
      fill={circleAnimation.fill}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

export default CircleWithAnimation;
