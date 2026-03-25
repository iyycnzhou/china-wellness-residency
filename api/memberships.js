/**
 * 会员路由
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');

// 获取会员列表
router.get('/', (req, res) => {
  try {
    const memberships = db.prepare(`
      SELECT m.*, u.name as user_name, u.email as user_email
      FROM memberships m
      LEFT JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
    `).all();

    res.json({
      success: true,
      data: memberships
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 获取单个会员
router.get('/:id', (req, res) => {
  try {
    const membership = db.prepare(`
      SELECT m.*, u.name as user_name, u.email as user_email
      FROM memberships m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?
    `).get(req.params.id);

    if (!membership) {
      return res.status(404).json({ success: false, message: '会员记录不存在' });
    }

    res.json({
      success: true,
      data: membership
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '数据库错误' });
  }
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

  try {
    const result = db.prepare(
      `INSERT INTO memberships (user_id, membership_type, start_date, end_date)
       VALUES (?, ?, ?, ?)`
    ).run(userId || null, membershipType, startDate, end.toISOString().split('T')[0]);

    res.json({
      success: true,
      message: '会员申请成功',
      data: {
        id: result.lastInsertRowid,
        userId,
        membershipType,
        startDate,
        endDate: end.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '申请失败' 
    });
  }
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

  try {
    const result = db.prepare(
      'UPDATE memberships SET status = ? WHERE id = ?'
    ).run(status, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '会员记录不存在' });
    }

    res.json({
      success: true,
      message: '状态已更新'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失败' });
  }
});

// 删除会员
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM memberships WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '会员记录不存在' });
    }

    res.json({
      success: true,
      message: '删除成功'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除失败' });
  }
});

module.exports = router;