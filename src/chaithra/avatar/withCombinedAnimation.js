import React from 'react';
import withTransition from './withTransition';
import withFadeInTransition from './withFadeInTransition';
import withAnimation from './withAnimation';

const withCombinedAnimation = (WrappedComponent) => {
  const CombinedAnimationHOC = (props) => {

    return (
      <WrappedComponent {...props} />
    );
  };

  const WrappedComponentWithAnimation = withAnimation(CombinedAnimationHOC);
  const WrappedComponentWithFadeInTransition = withFadeInTransition(WrappedComponentWithAnimation);
  const WrappedComponentWithCombinedTransition = withTransition(WrappedComponentWithFadeInTransition);

  return WrappedComponentWithCombinedTransition;
};

export default withCombinedAnimation;
