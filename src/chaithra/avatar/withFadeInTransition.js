import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

const withFadeInTransition = (WrappedComponent) => {
  return (props) => {
    const withFadeInTransitionProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 1000 },
    });

    useEffect(() => {
      withFadeInTransitionProps.opacity.start(1);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
      <animated.div style={withFadeInTransitionProps}>
        <WrappedComponent {...props} />
      </animated.div>
    );
  };
};

export default withFadeInTransition;
