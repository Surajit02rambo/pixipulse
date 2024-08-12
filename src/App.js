import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { IoCreate } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { SiGoogledisplayandvideo360, SiVorondesign } from "react-icons/si";
import { GiLightBulb } from "react-icons/gi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import logo from './images/logo.png';
import video from './images/introVideo.mp4';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorStyle, setCursorStyle] = useState({ top: 0, left: 0 });
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [boxImages, setBoxImages] = useState([
    localStorage.getItem('boxImage1') || '',
    localStorage.getItem('boxImage2') || '',
    localStorage.getItem('boxImage3') || '',
  ]);
  const introRef = useRef(null);

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
      caption: "Transforming Ideas into Digital Gold.",
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
    const videoElement = document.getElementById('videoElement');
    const playButton = document.getElementById('playButton');
    videoElement.controls = true;
    videoElement.play();
    playButton.style.display = 'none';
  };

  const handleFileUpload = (index) => {
    const fileInput = document.getElementById(`fileInput${index}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (index, event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const newBoxImages = [...boxImages];
        newBoxImages[index] = e.target.result;
        setBoxImages(newBoxImages);
        localStorage.setItem(`boxImage${index + 1}`, e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentIntroRef = introRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
        }
      });
    });

    if (currentIntroRef) {
      observer.observe(currentIntroRef);
    }

    return () => {
      if (currentIntroRef) {
        observer.unobserve(currentIntroRef);
      }
    };
  }, []);

  return (
    <div className="App">
      {/* Custom Cursor */}
      <div className="cursor" style={{ transform: `translate(${cursorStyle.left}px, ${cursorStyle.top}px)` }}>
        <div className="cursor-dot"></div>
      </div>

      {/* Header Section */}
      <header className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
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
          <center><FaCaretDown size={40} className='icon' /></center>
        </div>
      </div>

      {/* Intro Section */}
      <div className= {`intro ${introVisible ? 'visible' : ''}`} ref={introRef}>
        <div className='intro-caption'>
          <div className='intro-info'>
            <GiLightBulb size={80} className='icon' />
            <h4>Think</h4>
            <p>Retrospect a unique pattern in mind to proceed.</p>
          </div>
          <div className='intro-info'>
            <PiChalkboardTeacherDuotone size={80} className='icon' />
            <h4>Learn</h4>
            <p>Get started with something new to learn something new.</p>
          </div>
          <div className='intro-info'>
            <SiVorondesign size={80} className='icon' />
            <h4>Design</h4>
            <p>Craft your ideas into reality and make the most out of it.</p>
          </div>
          <div className='intro-info'>
            <IoCreate size={80} className='icon' />
            <h4>Create</h4>
            <p>Make your passion your goals and achieve them to gain success.</p>
          </div>
        </div>
        <div className='intro-video'>
          <div className="video-container">
            <video id="videoElement" width="100%" height="auto">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-controls">
              <button onClick={handlePlay} className="play-btn" id="playButton"><SiGoogledisplayandvideo360 size={80} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section" id="uploadSection">
        <h4>Our Moodboards</h4>
        <h3>Explore Your Moods</h3>
        <div className='box-container'>
          {boxImages.map((imgSrc, index) => (
            <div key={index} className="box" onClick={() => handleFileUpload(index)}>
              {imgSrc ? <img src={imgSrc} alt="Uploaded preview" /> : <p>Click to Upload Image</p>}
              <input
                id={`fileInput${index}`}
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(index, event)}
                style={{ display: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
