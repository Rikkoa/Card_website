import React from 'react';

function CardHolder() {
  return (
    <div className="hero">
      <img src="/assets/card_holder_banner.png" alt="Hero Background" className="hero-bg" style={{marginLeft:'1%',width:'98%',maxHeight:'600px'}}/>
      <div className="hero-content" style={{marginTop:'20px'}}>
        <div className="hero-text">
          <h1>
            <span className="text-zh">封套和標籤</span>
            <span className="text-en">Card Holder & Label</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              使用我們的頂級 PTCG 收藏卡磚與客製化標籤, 提升您的收藏層次。這款產品結合了最強的防護性能與專業藝廊般的視覺美感。每一款高透亮收藏卡磚都經過精密設計, 封裝盒更採用了精細的激光刻印商標（Laser-etched Logo）, 展現品牌質感與獨特性, 能保護您最珍貴的卡片免受環境損耗, 同時保持極致清晰的展示效果。
              <br /> <br />
              為了讓展示更完美, 我們的一體化標籤系統讓您可以記錄關鍵資訊包括卡片名稱、編號及稀有度。標籤特別採用了燙金 HKG CARDZ 商標與特製防偽雷射標籤, 並附有 QR Code 方便即時掃描查核, 確保每一張收藏的真實性與權威感。<br />
              簡潔現代的排版設計, 媲美專業評級機構的標準。無論您是要展示心目中的『夢幻神卡』, 還是整理整套比賽牌組, 這款卡片展示架都能確保您的收藏不僅僅是存放, 而是獲得應有的尊榮展示。
            </span>
            <span className="text-en">
              Elevate your collection with our premium TCG card holders and custom labels, designed to provide both maximum protection and a professional gallery-ready aesthetic. Each crystal-clear Trading Card Holder is precision-engineered to shield your most valuable cards from environmental wear while maintaining absolute clarity. For a truly premium touch, every holder features a high-definition Laser-etched Logo, adding a layer of sophisticated branding that sets your collection apart. 
              <br /> <br />
              To complete the look, our integrated label system allows you to catalog essential data including card identity, set number, and rarity in a clean, modern format that mirrors professional grading standards. <br />
              Each label features a premium Gold foil HKG CARDZ logo and a special anti-counterfeit laser label, along with a QR code for quick verification of your collection. Whether you are showcasing a center-piece "Grail" or organizing a competitive playset, this Trading Card Display Stand ensures your collection is not just stored, but celebrated with the distinction it deserves.
            </span>
          </p>
        </div>
      </div>
      <br />
      <img src="/assets/card_holder_footer.jpg" alt="Hero Background" className="hero-bg" style={{marginLeft:'1%',width:'98%',maxHeight:'550px'}}/>
    </div>
  );
}

export default CardHolder;
