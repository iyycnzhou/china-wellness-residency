/**
 * 用户路由
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');

// 获取用户列表
router.get('/', (req, res) => {
  db.all('SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC', [], (err, users) => {
    if (err) {
      return res.status(500).json({ success: false, message: '数据库错误' });
    }

    res.json({
      success: true,
      data: users
    });
  });
});

// 获取单个用户
router.get('/:id', (req, res) => {
  db.get('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [req.params.id], (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: '数据库错误' });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    res.json({
      success: true,
      data: user
    });
  });
});

// 更新用户
router.put('/:id', (req, res) => {
  const { name, phone } = req.body;

  db.run(
    'UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, phone, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: '更新失败' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: '用户不存在' });
      }

      res.json({
        success: true,
        message: '更新成功'
      });
    }
  );
});

// 删除用户
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: '删除失败' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    res.json({
      success: true,
      message: '删除成功'
    });
  });
});

module.exports = router;