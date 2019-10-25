import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";

const CarouselPost = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === Object.keys(props.imgs).length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? Object.keys(props.imgs).length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = Object.keys(props.imgs).map(key => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(false)}
        onExited={() => setAnimating(false)}
        key={key}
      >
        <img
          alt="carousel"
          src={props.imgs[key].img}
          style={{ width: "100%", height: props.height }}
        />
      </CarouselItem>
    );
  });

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
      >
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </>
  );
};

export default CarouselPost;
