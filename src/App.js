import React, { useState, useEffect } from 'react';
import './App.css';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { FaCaretDown } from "react-icons/fa";
import { SiCreatereactapp } from "react-icons/si";
import { HiBars3BottomRight } from "react-icons/hi2";
import logo from './images/logo.png';

function App() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorStyle, setCursorStyle] = useState({ top: 0, left: 0 });


  const slides = [
    {
      src: "https://i.postimg.cc/pTmvHqTX/slide1.png",
      title: "DIGITAL DREAMS DELIVERED",
      label: "Create Today Connect Tomorrow",
      caption: "Your Imagination defines our creation.",
    },
    {
      src: "https://i.postimg.cc/DyJSgPPh/slide2.png",
      title: "UNVEIL THE UNEXPECTED",
      label: "Crafting Pixels Shaping Futures",
      caption: "Transforming Ideas into Digital Gold."
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePlay = () => {
    const video = document.getElementById('videoElement');
    const playButton = document.getElementById('playButton');
    video.play();
    playButton.style.display = 'none';
  }

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      requestAnimationFrame(() => {
        setCursorStyle({
          top: clientY,
          left: clientX,
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="App">
      {/* Custom Cursor */}
      <div className="cursor" style={{ transform: `translate(${cursorStyle.left}px, ${cursorStyle.top}px)` }}>
        <div className="cursor-dot"></div>
      </div>

      {/* Header Section */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <nav className="nav-links">
          <ul>
            <li onClick={toggleMenu}>
              <a href="#home">MENU</a>
              <HiBars3BottomRight className='icon' size={30} />
            </li>
          </ul>
        </nav>
      </header>

      {/* Sliding Menu */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>
          <IoMdClose size={30} />
        </button>
        <ul>
          <li><a href="#section1">Section 1</a></li>
          <li><a href="#section2">Section 2</a></li>
          <li><a href="#section3">Section 3</a></li>
        </ul>
      </div>

    {/* Carousel Section */}
      <div className="carousel" id='home'>
        <div className="carousel-inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            >
              <center>
                <div className="carousel-caption">
                  <h1>{slide.title}</h1>
                  <h3>{slide.label}</h3>
                  <div className='headlines'>
                    <p>{slide.caption}</p>
                  </div>
                </div>
              </center>
              <img src={slide.src} alt={slide.label} />
            </div>
          ))}
        </div>
        <div className="carousel-buttons">
          <button className="carousel-button" onClick={handlePrev}>
            <IoIosArrowBack size={30} />
          </button>
          <button className="carousel-button" onClick={handleNext}>
            <IoIosArrowForward size={30} />
          </button>
        </div>
        <div className="slide-counter">
          {`${activeIndex + 1} / ${slides.length}`}
        </div>
        <div className='scroll-down'>
          <p>SCROLL DOWN</p>
          <center><FaCaretDown size={40} className='icon'/></center>
        </div>
      </div>


      <div className='intro'>
          <div className='intro-caption'>
            <div className='intro-info'>
              <SiCreatereactapp size={70} className='icon'/>
              <p>lorem ipsum dolor lorem ipsum dolor</p>
            </div>
            <div className='intro-info'>
              <SiCreatereactapp size={70} className='icon'/>
              <p>lorem ipsum dolor lorem ipsum dolor</p>
            </div>
            <div className='intro-info'>
              <SiCreatereactapp size={70} className='icon'/>
              <p>lorem ipsum dolor lorem ipsum dolor</p>
            </div>
            <div className='intro-info'>
              <SiCreatereactapp size={70} className='icon'/>
              <p>lorem ipsum dolor lorem ipsum dolor</p>
            </div>
          </div>
          <div className='intro-video'>
            <div className="video-container">
              <video id="videoElement" width="100%" height="auto" controls>
                <source src="https://videos.pexels.com/video-files/3130182/3130182-sd_640_360_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-controls">
                <button onClick={handlePlay} className="play-btn" id="playButton">Play</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
