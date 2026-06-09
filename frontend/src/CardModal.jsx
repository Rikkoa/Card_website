import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardModal({ card, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    card_id: '',
    card_name: '',
    card_level: '',
    card_score: '',
    card_quantity: 1,
    image_url1: '',
    image_url2: '',
    image_url3: '',
    card_type: ''
  });

  const [dropdowns, setDropdowns] = useState([]); // 🔑 存放分數/描述選項

  useEffect(() => {
    if (card) {
      // 嘗試從 dropdowns 找對應描述
      let level = card.card_level || '';
      if (!level && dropdowns.length > 0) {
        const selected = dropdowns.find(d => d.score === card.card_score);
        level = selected ? selected.description : '';
      }

      setFormData({
        card_id: card.card_id,
        card_name: card.card_name,
        card_level: level,
        card_score: card.card_score,
        card_quantity: card.card_quantity,
        image_url1: card.image_url1 || '',
        image_url2: card.image_url2 || '',
        image_url3: card.image_url3 || '',
        card_type: card.card_type || ''
      });
    }
  }, [card, dropdowns]); // 🔑 加上 dropdowns 依賴


  // 🔑 載入 dropdown options
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const response = await axios.get('/api/ddl.php');
        console.log("Dropdown API 回傳:", response.data);
        if (Array.isArray(response.data)) {
          setDropdowns(response.data);
        } else {
          setDropdowns([]);
        }
      } catch (error) {
        setDropdowns([]);
        alert('獲取下拉選單失敗: ' + (error.response?.data?.error || '請稍後再試'));
      }
    };

    fetchDropdowns(); // 🔑 這裡要呼叫
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    // 如果選擇的是分數，則自動更新 level
    if (name === "card_score") {
      const selected = dropdowns.find(d => d.score === value);
      setFormData({
        ...formData,
        card_score: value,
        card_level: selected ? selected.description : ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.card_id || !formData.card_name || !formData.card_score) {
      alert('請填寫必填 * 欄位');
      return;
    }
    if (!/^\d{1,30}$/.test(formData.card_id)) {
      alert('卡牌編號必須為1-30位數字');
      return;
    }

    const payload = {
      ...formData,
      card_score: parseFloat(formData.card_score),
      card_quantity: parseInt(formData.card_quantity) || 1
    };

    try {
      let response;
      if (card) {
        response = await axios.put(`/api/cards.php?id=${card.id}`, payload);
      } else {
        response = await axios.post('/api/cards.php', payload);
      }

      if (response.data.success) {
        alert(response.data.message);
        onSave(response.data);
        window.location.reload();
      } else {
        alert('操作失敗: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('伺服器錯誤，請稍後再試');
    }
  };

  const handleddlChange = (e) => {
    const { name, value } = e.target;
    if (name === "card_score") {
      const selected = dropdowns.find(d => d.score === value);
      setFormData({
        ...formData,
        card_score: value,
        card_level: selected ? selected.description : ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header-wrapper">
          <div className="modal-header">
            <div className="modal-header-content">
              <h2>{card ? '編輯卡牌' : '添加卡牌'}</h2>
            </div>
            <button className="modal-close" onClick={onCancel} aria-label="關閉">×</button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 卡牌編號 */}
          <div className="form-group">
            <label>卡牌編號 *</label>
            <input type="text" name="card_id" className="form-input"
              value={formData.card_id} onChange={handleChange} required />
          </div>

          {/* 卡牌名稱 */}
          <div className="form-group">
            <label>卡牌名稱 *</label>
            <textarea name="card_name" className="form-input"
              value={formData.card_name} onChange={handleChange} rows="3" required />
          </div>

          {/* 卡牌類型 */}
          <div className="form-group">
            <label>卡牌類型/種類</label>
            <input type="text" name="card_type" className="form-input"
              value={formData.card_type} onChange={handleChange} />
          </div>
          
          {/* 卡牌分數 (Dropdown) */}
          <div className="form-group">
            <label>卡牌分數 *</label>
            <select name="card_score" className="form-input"
              value={formData.card_score} onChange={handleddlChange} required>
              <option value="">請選擇分數</option>
              {Array.isArray(dropdowns) && dropdowns.map(d => (
                <option key={d.id} value={d.score}>{d.score}</option>
              ))}
            </select>
          </div>

          {/* 卡牌等級 (自動填入) */}
          <div className="form-group">
            <label>卡牌等級 (選分數自動填入)</label>
            <input
              type="text"
              name="card_level"
              className="form-input"
              value={formData.card_level}
              readOnly
            />
          </div>

          {/* 卡牌數量 */}
          <div className="form-group">
            <label>卡牌數量</label>
            <input type="number" name="card_quantity" className="form-input"
              value={formData.card_quantity} onChange={handleChange} min="1" />
          </div>

          {/* 圖片 URL */}
          <div className="form-group"><label>圖片 URL 1</label>
            <input type="url" name="image_url1" className="form-input"
              value={formData.image_url1} onChange={handleChange} />
          </div>
          <div className="form-group"><label>圖片 URL 2</label>
            <input type="url" name="image_url2" className="form-input"
              value={formData.image_url2} onChange={handleChange} />
          </div>
          <div className="form-group"><label>圖片 URL 3</label>
            <input type="url" name="image_url3" className="form-input"
              value={formData.image_url3} onChange={handleChange} />
          </div>

          {/* 按鈕 */}
          <div className="action-buttons" style={{ justifyContent: 'center' }}>
            <button type="submit" className="btn" style={{ width: 'auto' }}>保存</button>
            <button type="button" className="btn" onClick={onCancel}
              style={{ width: 'auto', background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' }}>
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
