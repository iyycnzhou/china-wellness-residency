/**
 * 预约申请路由
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');

// 获取预约列表
router.get('/', (req, res) => {
  db.all('SELECT * FROM applications ORDER BY created_at DESC', [], (err, applications) => {
    if (err) {
      return res.status(500).json({ success: false, message: '数据库错误' });
    }

    res.json({
      success: true,
      data: applications
    });
  });
});

// 获取单个预约
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM applications WHERE id = ?', [req.params.id], (err, application) => {
    if (err) {
      return res.status(500).json({ success: false, message: '数据库错误' });
    }

    if (!application) {
      return res.status(404).json({ success: false, message: '预约不存在' });
    }

    res.json({
      success: true,
      data: application
    });
  });
});

// 提交预约申请
router.post('/', (req, res) => {
  const { name, email, phone, serviceType, preferredDate, message } = req.body;

  // 验证必填字段
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: '姓名、邮箱和电话为必填项' 
    });
  }

  db.run(
    `INSERT INTO applications (name, email, phone, service_type, preferred_date, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, serviceType || '', preferredDate || '', message || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: '提交失败' 
        });
      }

      res.json({
        success: true,
        message: '预约申请已提交',
        data: {
          id: this.lastID,
          name,
          email,
          phone,
          serviceType,
          preferredDate,
          message
        }
      });
    }
  );
});

// 更新预约状态
router.put('/:id', (req, res) => {
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: '无效的状态值' 
    });
  }

  db.run(
    'UPDATE applications SET status = ? WHERE id = ?',
    [status, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: '更新失败' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: '预约不存在' });
      }

      res.json({
        success: true,
        message: '状态已更新'
      });
    }
  );
});

// 删除预约
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM applications WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: '删除失败' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: '预约不存在' });
    }

    res.json({
      success: true,
      message: '删除成功'
    });
  });
});

module.exports = router;