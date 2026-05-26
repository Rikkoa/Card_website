import React from 'react';

function Plugins() {
  return (
    <div className="search_plugin" id="search">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
              <span className="text-zh">核實 HKG CARDZ 認證</span>
              <span className="text-en">Verify HKG CARDZ Authentication</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              輸入卡牌編號，即可快速獲得卡牌的評級。
            </span>
            <span className="text-en">
              Enter a card number to quickly search for grading and market value.
            </span>
          </p>
        </div>
        

        {/* <div className="hero-image">
          <img
            src="/assets/card2.jpg"
            alt="樣本(Sample Card)"
            className="hero-pokemon"
          />
          <div className="hero-badge">
            <span className="badge-text">專業查分</span>
          </div> 
        </div>*/}
      </div>
      <br />
      <img src="/assets/home_footer_banner.jpg" alt="Hero Background" className="hero-bg" style={{marginLeft:'1%',width:'98%',maxHeight:'350px'}}/>
    </div>
  );
}

export default Plugins;
