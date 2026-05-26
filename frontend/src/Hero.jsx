import React from 'react';

function Hero() {
  return (
    <div className="hero" >
      <img src="/assets/home_banner.jpg" alt="Hero Background" className="hero-bg" style={{marginLeft:'1%',width:'98%',maxHeight:'500px'}}/>
      <br />
      <div className="hero-content">
        {/* <div className="hero-image">
          <img src="/assets/card1.jpg" alt="banner" className="hero-pokemon" />
          <div className="hero-badge">
            <span className="badge-text">專業查分</span>
          </div>
        </div> */}
        <div className="hero-text">
          <h1>
            <span className="text-zh">專業查分，守護你的收藏價值</span>
            <span className="text-en">Professional grading, protecting your collection’s worth</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              專業鑑定，讓收藏價值躍然紙上。<br />
              每一張珍藏都值得最嚴謹的對待。我們透過標準化評級流程，還原卡真實價值和提升價值，為您的收藏建立權威背書，讓交易更有保障。
            </span>
            <span className="text-en">
              Professional Evaluation: Unlocking the True Value of Your Cards.<br />
              Every card tells a story. Our rigorous inspection and standardized grading, giving your collection the prestige and market recognition it deserves and enhancing the value.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
