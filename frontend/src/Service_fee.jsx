import React from 'react';

function ServiceFee() {
  return (
    <div className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            <span className="text-zh">鑑定服務與費用</span>
            <span className="text-en">Grading Services & Fees</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              請根據您卡片的預估價值及所需的處理時間選擇合適的鑑定等級。
            </span>
            <span className="text-en">
              Choose the service level that best fits your collection's value and how quickly you need your cards back.
            </span>
          </p>
        </div>
      </div>
      <br /><br />
      <table className="grading-table">
        <thead>
          <tr>
            <th>服務等級 (Service Level)</th>
            <th>每張費用 (Fee Per Card)</th>
            <th>單張最高申報價值 (Max Declared Value)</th>
            <th>預計處理時間 (Est. Turnaround)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="zh">經濟型 </span><br /><span className="en">Economy</span></td>
            <td><span className="zh">$180 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">$1500 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">30-40 個工作日</span><br /><span className="en"> 30-40 Business Days</span></td>
          </tr>

          <tr>
            <td><span className="zh">批量型 (最少 20-100 張)</span><br /><span className="en">Bulk (Min. 20-100 cards)</span></td>
            <td><span className="zh">$35-$100 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">$1500 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">45+ 個工作日</span><br /><span className="en">45+ Business Days</span></td>
          </tr>

          <tr>
            <td><span className="zh">標準型 </span><br /><span className="en">Standard</span></td>
            <td><span className="zh">$1000 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">$2,500 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">15-25 個工作日</span><br /><span className="en">15-25 Business Days</span></td>
          </tr>

          <tr>
            <td><span className="zh">特級型</span><br /><span className="en">Express</span></td>
            <td><span className="zh">$1500+ HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">$10,000 HKD</span><br /><span className="en"></span></td>
            <td><span className="zh">5-10 個工作日</span><br /><span className="en">5-10 Business Days</span></td>
          </tr>
        </tbody>
      </table>

      <div className="hero-content" style={{marginTop:'2%'}}>
        <div className="hero-text">
          <h1>
            <span className="text-zh">遞送須知</span>
            <span className="text-en">Submission Guidelines</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              1. 申報價值：服務費用取決於卡片鑑定後的預估市場價值。<br />
              2. 包裝要求：寄送時請使用半硬質卡夾（如 Card Savers），請勿使用一般硬卡套（Top Loaders）。<br />
              3. 後補差額 (Upcharge)：若卡片鑑定後的市場價值超過所選等級的上限，客戶需補回對應等級的費用差額。
            </span>
            <span className="text-en">
              1. Declare Value: Fees are based on the estimated value of the card after grading.<br />
              2. Safe Packaging: Use semi-rigid holders (e.g., Card Savers) rather than top loaders for shipping.<br />
              3. Upcharges: If a card's market value exceeds your selected tier's limit after grading, an upcharge to the appropriate tier will apply.
            </span>
          </p>
        </div>
      </div>
      <div className="hero-content" style={{marginTop:'2%'}}>
        <div className="hero-text">
          <h1>
            <span className="text-zh">物流與寄送費用</span>
            <span className="text-en">Shipping & Handling</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              寄送費用：提交者需自行承擔將卡片寄往本中心的所有運費、保險費及相關稅費。<br />
              回郵費用：回郵運費將根據卡片數量及收貨地點在結帳時計算。我們強烈建議為回郵包裹購買全額保險。
            </span>
            <span className="text-en">
              Submission Costs: The submitter is responsible for all shipping costs, insurance, and any applicable duties/taxes when sending cards to our facility.<br />
              Return Shipping: Return shipping fees will be calculated at checkout based on the quantity of cards and your location. We highly recommend adding insurance to your return package.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceFee;
