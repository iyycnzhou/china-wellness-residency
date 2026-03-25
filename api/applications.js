/**
 * 预约申请路由
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');

// 获取预约列表
router.get('/', (req, res) => {
  try {
    const applications = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all();
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 获取单个预约
router.get('/:id', (req, res) => {
  try {
    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: '预约不存在' });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '数据库错误' });
  }
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

  try {
    const result = db.prepare(
      `INSERT INTO applications (name, email, phone, service_type, preferred_date, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(name, email, phone, serviceType || '', preferredDate || '', message || '');

    res.json({
      success: true,
      message: '预约申请已提交',
      data: {
        id: result.lastInsertRowid,
        name,
        email,
        phone,
        serviceType,
        preferredDate,
        message
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '提交失败' 
    });
  }
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

  try {
    const result = db.prepare(
      'UPDATE applications SET status = ? WHERE id = ?'
    ).run(status, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '预约不存在' });
    }

    res.json({
      success: true,
      message: '状态已更新'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新失败' });
  }
});

// 删除预约
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM applications WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '预约不存在' });
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