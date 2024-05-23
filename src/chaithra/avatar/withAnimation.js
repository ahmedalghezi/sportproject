import React from 'react';
import { useSpring, animated } from 'react-spring';

const withAnimation = (WrappedComponent) => {
    const WithAnimation = (props) => {
        const textAnimationProps = useSpring({
            opacity: 1,
            transform: 'translateX(0px)',
            from: { opacity: 0, transform: 'translateX(-20px)' },
            enter: { opacity: 1, transform: 'translateX(0px)' },
            leave: { opacity: 0, transform: 'translateX(20px)' },
            config: { duration: 500 },
        });

        const hoverAnimationProps = useSpring({
            color: '#ff00ff',
            config: { duration: 200 },
        });

        return (
            <animated.div style={{ textAnimationProps, hoverAnimationProps }}>
                <WrappedComponent {...props} />
            </animated.div>
        );
    };
    return WithAnimation;
};

export default withAnimation;
