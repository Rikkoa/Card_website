import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import CardModal from './CardModal';

function AdminDashboard() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState("cards");

  // Dropdown state
  const [dropdowns, setDropdowns] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingDropdown, setEditingDropdown] = useState(null);

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("adminAuth") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/card_admin");
  };

  useEffect(() => {
    fetchCards();
    fetchDropdowns();
  }, []);

  // ---------------- Cards ----------------
  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/cards.php');
      setCards(response.data);
    } catch (error) {
      setError('獲取卡牌列表失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = () => {
    setEditingCard(null);
    setShowModal(true);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleDeleteCard = async (id) => {
    if (!window.confirm('確定要刪除這張卡牌嗎？')) return;
    try {
      await axios.delete(`/api/cards.php?id=${id}`);
      setCards(cards.filter(card => card.id !== id));
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.error || '刪除卡牌失敗');
    }
  };

  const handleSaveCard = async (cardData) => {
    try {
      if (editingCard) {
        const response = await axios.put(`/api/cards.php?id=${editingCard.id}`, cardData);
        setCards(cards.map(card => card.id === editingCard.id ? response.data : card));
      } else {
        const response = await axios.post('/api/cards.php', cardData);
        setCards([...cards, response.data]);
      }
      setShowModal(false);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || '保存卡牌失敗');
    }
  };

  // ---------------- Dropdowns ----------------
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
      setError('獲取下拉選單失敗');
    }
  };

  const handleAddOrUpdateDropdown = async () => {
    try {
      if (editingDropdown) {
        await axios.put(`/api/ddl.php?id=${editingDropdown.id}`, {
          score: newScore,
          description: newDesc
        });
      } else {
        await axios.post(`/api/ddl.php`, {
          score: newScore,
          description: newDesc
        });
      }
      setNewScore("");
      setNewDesc("");
      setEditingDropdown(null);
      fetchDropdowns();
    } catch (error) {
      setError(error.response?.data?.error || '操作失敗');
    }
  };

  const handleEditDropdown = (item) => {
    setEditingDropdown(item);
    setNewScore(item.score);
    setNewDesc(item.description);
  };

  const handleDeleteDropdown = async (id) => {
    if (!window.confirm('確定要刪除這個選項嗎？')) return;
    try {
      await axios.delete(`/api/cards.php?dropdown=1&id=${id}`);
      setDropdowns(dropdowns.filter(d => d.id !== id));
    } catch (error) {
      setError(error.response?.data?.error || '刪除失敗');
    }
  };

  return (
    <div className="container">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h2>👑 管理面板</h2>
          <div>
            <span style={{ marginRight: '15px' }}>歡迎, {auth.username}</span>
            
            <button className="btn btn-small" style={{ background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' }} onClick={handleLogout}>
              登出
            </button>
          </div>
        </div>
        <div className="tabs">
              <button className={activeTab === "cards" ? "tab-btn active" : "tab-btn "}  onClick={() => setActiveTab("cards")}>卡牌管理</button>
              <button className={activeTab === "dropdowns" ? "tab-btn active" : "tab-btn "} onClick={() => setActiveTab("dropdowns")}>下拉選單管理</button>
              {/* <button className={activeTab === "stats" ? "tab-btn active" : "tab-btn "} onClick={() => setActiveTab("stats")}>統計</button>
              <button className={activeTab === "settings" ? "tab-btn active" : "tab-btn "} onClick={() => setActiveTab("settings")}>設定</button> */}
        </div>


        {/* Tab Content */}
        {activeTab === "cards" && (
          <div>
            {error && <div className="error-message">{error}</div>}
            <button className="btn" onClick={handleAddCard}>+ 添加卡牌</button>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>載入中...</div>
            ) : cards.length === 0 ? (
              <div className="empty-state"><div className="empty-state-icon">🃏</div><p>還沒有卡牌，點擊上方按鈕添加第一張卡牌！</p></div>
            ) : (
              <table className="card-table">
                <thead><tr><th>編號</th><th>名稱</th><th>類型/種類</th><th>分數</th><th>等級</th><th>數量</th><th>圖片</th><th>操作</th></tr></thead>
                <tbody>
                  {cards.map(card => (
                    <tr key={card.id}>
                      <td>{card.card_id}</td>
                      <td>{card.card_name}</td>
                      <td>{card.card_type || '-'}</td>
                      <td>{card.card_score || '-'}</td>
                      <td>{card.card_level || '-'}</td>
                      <td>{card.card_quantity}</td>
                      <td>{card.image_url1 && '✓'}{card.image_url2 && '✓'}{card.image_url3 && '✓'}{!card.image_url1 && !card.image_url2 && !card.image_url3 && '-'}</td>
                      <td>
                        <button className="btn btn-small btn-edit" onClick={() => handleEditCard(card)}>編輯</button>
                        <button className="btn btn-small btn-delete" onClick={() => handleDeleteCard(card.id)}>刪除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showModal && <CardModal card={editingCard} onSave={handleSaveCard} onCancel={() => setShowModal(false)} />}
          </div>
        )}

        {activeTab === "dropdowns" && (
        <div>
          {/* <h3>📋 下拉選單管理</h3> */}

          {/* 新增/修改表單 */}
          <div style={{ marginBottom: "15px" }}>
            <label>分數</label><br />
            <input className="ddl-input" type="text" placeholder="分數" value={newScore} onChange={(e) => setNewScore(e.target.value)} />
            <label>等級</label><br />
            <input className="ddl-input" type="text" placeholder="等級" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            <br />
            <button className="btn " onClick={handleAddOrUpdateDropdown}>{editingDropdown ? "更新" : "新增"}</button>
          </div>

          {/* 狀態顯示 */}
          {error && <div className="error-message">{error}</div>}
            <table className="card-table">
              <thead>
                <tr>
                  <th>分數</th>
                  <th>等級</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(dropdowns) && dropdowns.map(item => (
                  <tr key={item.id}>
                    <td>{item.score}</td>
                    <td>{item.description}</td>
                    <td>
                      <button className="btn btn-small btn-edit" onClick={() => handleEditDropdown(item)}>編輯</button><br />
                      <button className="btn btn-small btn-delete" onClick={() => handleDeleteDropdown(item.id)}>刪除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}

      </div>
    </div>
  );
}

export default AdminDashboard;
