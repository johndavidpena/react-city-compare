import React from 'react';
import './Unsplash.scss';

// const LeftArrow = props => {
//   return (
//     <div className="arrow backArrow" onClick={props.goToPrevSlide}>
//       &#8602;
//     </div>
//   );
// };

// const RightArrow = props => {
//   return (
//     <div className="arrow nextArrow" onClick={props.goToNextSlide}>
//       &#8603;
//     </div>
//   );
// };

const Image = ({ image }) => {
  const styles = {
    backgroundImage: `url('${image}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  };

  return <div className="Unsplash__image" style={styles} />;
};

const Unsplash = props => {
  // props.pics;
  console.log('[Unsplash] ', props);

  // let currentIndex = 0;
  // let translateValue = 0;

  // const goToPrevSlide = () => {
  //   console.log('goToPrevSlide, current index: ', currentIndex);
  // };

  // const goToNextSlide = () => {
  //   console.log('goToNextSlide, currentIndex: ', currentIndex);
  // };

  // slideWidth = () => {
  //   return document.querySelector('.Unsplash__image').clientWidth;
  // };

  return (
    <div className="Unsplash">
      {<Image key="test" image={props.pics[3].urls.regular} />}

      {/* <LeftArrow goToPrevSlide={this.goToPrevSlide} />

      <RightArrow goToNextSlide={this.goToNextSlide} /> */}
    </div>
  );
};

export default Unsplash;
