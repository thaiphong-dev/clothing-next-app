import React from "react";
import Image from "next/image";
import slide1 from "./../../../public/images/slide-01.jpg";
import slide2 from "./../../../public/images/slide-02.jpg";
import slide3 from "./../../../public/images/slide-03.jpg";
import Carousel from "react-bootstrap/Carousel";

export default function Slider() {
  return (
    <div>
      <Carousel fade={true} interval={1000}>
        <Carousel.Item>
          <Image className="d-block w-100" src={slide1} alt="First slide" />
          <Carousel.Caption className="flex-col-l-m">
            <h3 className="ltext-101 cl2 respon2">Women Collection 2018</h3>
            <p className="ltext-201 cl2 p-t-19 p-b-43 respon1">NEW SEASON</p>
            <div>
              <a
                className="
                    flex-c-m
                    stext-101
                    cl0
                    size-101
                    bg1
                    bor1
                    hov-btn1
                    p-lr-15
                    trans-04
                  "
              >
                Shop Now
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src={slide2} alt="Second slide" />

          <Carousel.Caption className="flex-col-l-m">
            <h3 className="ltext-101 cl2 respon2">Men New-Season</h3>
            <div className="ltext-201 cl2 p-t-19 p-b-43 respon1">
              Jackets & Coats
            </div>
            <div>
              <a
                className="
                    flex-c-m
                    stext-101
                    cl0
                    size-101
                    bg1
                    bor1
                    hov-btn1
                    p-lr-15
                    trans-04
                  "
              >
                Shop Now
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block w-100" src={slide3} alt="Third slide" />

          <Carousel.Caption className="flex-col-l-m">
            <h3 className="ltext-101 cl2 respon2">Men Collection 2018</h3>
            <div className="ltext-201 cl2 p-t-19 p-b-43 respon1">
              New arrivals
            </div>
            <div>
              <a
                className="
                    flex-c-m
                    stext-101
                    cl0
                    size-101
                    bg1
                    bor1
                    hov-btn1
                    p-lr-15
                    trans-04
                  "
              >
                Shop Now
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
