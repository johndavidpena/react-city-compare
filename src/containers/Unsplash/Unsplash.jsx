import React, { Component } from 'react';
import './Unsplash.scss';

const Image = ({ image }) => {
  const styles = {
    backgroundImage: `url('${image}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  };

  return <div className="Unsplash__image" style={styles} />;
};

class Unsplash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [props.pics],
      currentIndex: 0,
      translateValue: 0
    };
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0) return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  };

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if (this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -this.slideWidth()
    }));
  };

  slideWidth = () => {
    return document.querySelector('.Unsplash__image').clientWidth;
  };

  render() {
    return (
      <div className="Unsplash">
        <div
          className="Unsplash__imageWrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}
        >
          {this.state.images.map((image, i) => (
            <Image key={i} image={image.urls.regular} />
          ))}
        </div>

        <LeftArrow goToPrevSlide={this.goToPrevSlide} />

        <RightArrow goToNextSlide={this.goToNextSlide} />
      </div>
    );
  }
}

const LeftArrow = props => {
  return (
    <div className="arrow backArrow" onClick={props.goToPrevSlide}>
      &#8602;
    </div>
  );
};

const RightArrow = props => {
  return (
    <div className="arrow nextArrow" onClick={props.goToNextSlide}>
      &#8603;
    </div>
  );
};

export default Unsplash;
