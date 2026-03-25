/**
 * 认证路由
 * 注册、登录、获取用户信息
 */

const express = require('express');
const router = express.Router();
const { db } = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'medlink-jwt-secret-2026';

// 用户注册
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  // 验证必填字段
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: '姓名、邮箱和密码为必填项' 
    });
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: '邮箱格式不正确' 
    });
  }

  try {
    // 检查邮箱是否已注册
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: '该邮箱已被注册' 
      });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入用户
    const result = db.prepare(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)'
    ).run(name, email, phone || '', hashedPassword);

    // 生成 token
    const token = jwt.sign(
      { id: result.lastInsertRowid, email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '注册成功',
      data: {
        id: result.lastInsertRowid,
        name,
        email,
        phone: phone || '',
        token
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: '邮箱和密码为必填项' 
    });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '邮箱或密码错误' 
      });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: '邮箱或密码错误' 
      });
    }

    // 生成 token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '登录成功',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 获取用户信息
router.get('/profile', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: '未登录' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = db.prepare('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?')
      .get(decoded.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: '用户不存在' 
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token 无效或已过期' 
    });
  }
});

// 发送验证码
router.post('/send-verification', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: '邮箱为必填项' 
    });
  }

  try {
    // 生成 6 位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 分钟后过期

    db.prepare(
      'INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)'
    ).run(email, code, expiresAt.toISOString());

    // 开发环境直接返回验证码（生产环境应发送邮件）
    console.log(`📧 验证码已生成: ${email} -> ${code}`);
    
    res.json({
      success: true,
      message: '验证码已发送',
      // 开发环境返回验证码，生产环境删除此行
      _dev_code: code
    });
  } catch (error) {
    console.error('验证码错误:', error);
    res.status(500).json({ 
      success: false, 
      message: '验证码生成失败' 
    });
  }
});

// 验证验证码
router.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ 
      success: false, 
      message: '邮箱和验证码为必填项' 
    });
  }

  try {
    const record = db.prepare(
      'SELECT * FROM verification_codes WHERE email = ? AND code = ? AND expires_at > ?'
    ).get(email, code, new Date().toISOString());

    if (!record) {
      return res.status(400).json({ 
        success: false, 
        message: '验证码无效或已过期' 
      });
    }

    // 删除已使用的验证码
    db.prepare('DELETE FROM verification_codes WHERE id = ?').run(record.id);

    res.json({
      success: true,
      message: '验证成功'
    });
  } catch (error) {
    console.error('验证错误:', error);
    res.status(500).json({ 
      success: false, 
      message: '验证失败' 
    });
  }
});

module.exports = router;