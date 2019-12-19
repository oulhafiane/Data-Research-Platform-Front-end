import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

const items = [
  {
    src: require("assets/img/banner/banner11.jpg"),
    opacity: 0
  },
  {
    src: require("assets/img/banner/banner12.jpg"),
    opacity: 2
  },
  {
    src: require("assets/img/banner/banner13.jpg"),
    opacity: 0
  },
  {
    src: require("assets/img/banner/banner15.jpg"),
    opacity: 0
  },
  {
    src: require("assets/img/banner/banner16.jpg"),
    opacity: 2
  },
  {
    src: require("assets/img/banner/banner10.jpg"),
    opacity: 0
  }
];

const Carousels = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{ width: "100%", height: "100vh" }}
        />
        {/* Mask */}
        {item.opacity !== 0 ? (
          <span
            className={`mask bg-gradient-default opacity-${item.opacity}`}
          />
        ) : null}{" "}
        <div className="carousel-caption">
          <h3>Data &amp; Research Platform</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </CarouselItem>
    );
  });

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval="3000"
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
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

export default Carousels;
