/**
 * 会员路由
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');

// 获取会员列表
router.get('/', (req, res) => {
  db.all(`
    SELECT m.*, u.name as user_name, u.email as user_email
    FROM memberships m
    LEFT JOIN users u ON m.user_id = u.id
    ORDER BY m.created_at DESC
  `, [], (err, memberships) => {
    if (err) {
      return res.status(500).json({ success: false, message: '数据库错误' });
    }

    res.json({
      success: true,
      data: memberships
    });
  });
});

// 获取单个会员
router.get('/:id', (req, res) => {
  db.get(`
    SELECT m.*, u.name as user_name, u.email as user_email
    FROM memberships m
    LEFT JOIN users u ON m.user_id = u.id
    WHERE m.id = ?
  `, [req.params.id], (err, membership) => {
    if (err) {
      return res.status(500).json({ success: false, message: '数据库错误' });
    }

    if (!membership) {
      return res.status(404).json({ success: false, message: '会员记录不存在' });
    }

    res.json({
      success: true,
      data: membership
    });
  });
});

// 申请会员
router.post('/', (req, res) => {
  const { userId, membershipType, startDate } = req.body;

  if (!membershipType || !startDate) {
    return res.status(400).json({ 
      success: false, 
      message: '会员类型和开始日期为必填项' 
    });
  }

  // 计算结束日期（假设年度会员）
  const start = new Date(startDate);
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 1);

  db.run(
    `INSERT INTO memberships (user_id, membership_type, start_date, end_date)
     VALUES (?, ?, ?, ?)`,
    [userId || null, membershipType, startDate, end.toISOString().split('T')[0]],
    function(err) {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: '申请失败' 
        });
      }

      res.json({
        success: true,
        message: '会员申请成功',
        data: {
          id: this.lastID,
          userId,
          membershipType,
          startDate,
          endDate: end.toISOString().split('T')[0]
        }
      });
    }
  );
});

// 更新会员状态
router.put('/:id', (req, res) => {
  const { status } = req.body;

  const validStatuses = ['active', 'expired', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: '无效的状态值' 
    });
  }

  db.run(
    'UPDATE memberships SET status = ? WHERE id = ?',
    [status, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: '更新失败' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: '会员记录不存在' });
      }

      res.json({
        success: true,
        message: '状态已更新'
      });
    }
  );
});

// 删除会员
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM memberships WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: '删除失败' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: '会员记录不存在' });
    }

    res.json({
      success: true,
      message: '删除成功'
    });
  });
});

module.exports = router;