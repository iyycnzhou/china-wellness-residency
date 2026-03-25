/**
 * 用户路由
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');

// 获取用户列表
router.get('/', (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC').all();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 获取单个用户
router.get('/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?').get(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 更新用户
router.put('/:id', (req, res) => {
  const { name, phone } = req.body;

  try {
    const result = db.prepare(
      'UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(name, phone, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    res.json({
      success: true,
      message: '更新成功'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失败' });
  }
});

// 删除用户
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '用户不存在' });
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