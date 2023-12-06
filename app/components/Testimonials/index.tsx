"use client"

import Slider from "react-slick";

import { StarIcon } from '@heroicons/react/24/solid';
import Image from "next/image";
import React, { useState, useEffect } from "react";

// CAROUSEL DATA
interface Participant {
  email: string,
  password: string,
  name: string,
}

interface Avis {
  comment: string,
  participant: Participant,
}

// CAROUSEL SETTINGS
const AvisList = () => {
  const [avis, setAvis] = useState<Avis[]>([]);

 useEffect(() => {
  const fetchAvisData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/avis');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("ffffffffff");
      setAvis(data);
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
    }
  };
  fetchAvisData();
}, []);


  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      }
    ]
  };

  return (
    <div className="pt-40 pb-10 sm:pb-32 lg:py-32" id="testimonial">
      <div className='mx-auto max-w-7xl sm:py-4 lg:px-8'>
        <Slider {...settings}>
          {avis.map((items, i) => (
            <div key={i}>
              <div className={`bg-white m-4 p-5 my-20 relative ${i % 2 ? 'middleDiv' : 'testimonial-shadow'}`}>
                <div className="absolute top-[-45px]">
                  {/* Make sure to provide a valid src for the Image component */}
                  <Image src="/assets/mentor/user2.png" alt="/assets/mentor/user2.png" width={100} height={100} className="inline-block" />
                </div>
                <h4 className='text-base font-normal text-darkgray my-4'>{items.comment}</h4>
                <hr style={{ color: "#D7D5D5" }} />
                <div className="flex justify-between">
                  <div>
                  </div>
                  <div className="flex">
                    <StarIcon width={20} className="text-gold" />
                    <StarIcon width={20} className="text-gold" />
                    <StarIcon width={20} className="text-gold" />
                    <StarIcon width={20} className="text-gold" />
                    <StarIcon width={20} className="text-lightgray" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default AvisList;
