import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';

const withTransition = (Component) => {
  return (props) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionProps, setTransitionProps] = useSpring(() => ({
      opacity: 1,
      config: config.default,
    }));

    useEffect(() => {
      if (isTransitioning) {
        setTransitionProps({ opacity: 0 });
      } else {
        setTransitionProps({ opacity: 1 });
      }
    }, [isTransitioning, setTransitionProps]);

    const handleTransition = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    };

    return (
      <animated.div style={transitionProps}>
        <Component {...props} onTransition={handleTransition} />
      </animated.div>
    );
  };
};

export default withTransition;
