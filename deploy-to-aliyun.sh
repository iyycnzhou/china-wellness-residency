#!/bin/bash

# ===================================
# China Wellness Residency 部署脚本
# 执行方式: bash deploy-to-aliyun.sh
# ===================================

set -e  # 遇到错误立即退出

SERVER_IP="8.219.153.214"
SERVER_USER="root"
SERVER_PASS="iyyzhou214@126.com"
REMOTE_PATH="/var/www/china-wellness-residency"
LOCAL_PATH="/mnt/d/openclaw/workspace/china-wellness-residency"

echo "🚀 开始部署到阿里云服务器..."
echo "服务器: $SERVER_USER@$SERVER_IP"
echo "远程路径: $REMOTE_PATH"
echo ""

# 1. 创建远程目录
echo "📁 创建远程目录..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_PATH $REMOTE_PATH/api $REMOTE_PATH/data"

# 2. 清理旧文件（只清理网站文件，不清理配置和数据）
echo "🧹 清理旧文件..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "rm -rf $REMOTE_PATH/dist $REMOTE_PATH/assets $REMOTE_PATH/*.html $REMOTE_PATH/*.js $REMOTE_PATH/*.json 2>/dev/null || true"

# 3. 上传前端文件
echo "📦 上传前端文件 (dist/)..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -r $LOCAL_PATH/dist/* $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

# 4. 上传 API 文件
echo "📦 上传 API 文件..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/api/db.js $SERVER_USER@$SERVER_IP:$REMOTE_PATH/api/
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/api/auth.js $SERVER_USER@$SERVER_IP:$REMOTE_PATH/api/
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/api/users.js $SERVER_USER@$SERVER_IP:$REMOTE_PATH/api/
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/api/applications.js $SERVER_USER@$SERVER_IP:$REMOTE_PATH/api/
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/api/memberships.js $SERVER_USER@$SERVER_IP:$REMOTE_PATH/api/

# 5. 上传服务器配置文件
echo "📦 上传 server.js..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/server.js $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

# 6. 上传 package.json
echo "📦 上传 package.json..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $LOCAL_PATH/package.json $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

# 7. 在服务器上执行配置
echo ""
echo "⚙️  配置服务器..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << 'ENDSSH'

cd /var/www/china-wellness-residency

# 安装依赖
echo "📥 安装依赖..."
npm install --production 2>/dev/null || npm install

# 设置环境变量
echo "⚙️  配置环境变量..."
cat > .env << 'EOF'
API_SECRET_KEY=medlink-prod-key-2026
SITE_CONFIG_API_KEY=
PORT=3000
NODE_ENV=production
DATA_DIR=/var/www/china-wellness-residency/data
EOF

# 确保 data 目录存在
mkdir -p data

# 安装 PM2（如果没有）
if ! command -v pm2 &> /dev/null; then
    echo "📥 安装 PM2..."
    npm install -g pm2
fi

# 重启 API 服务
echo "🔄 重启 API 服务..."
pm2 delete medlink-api 2>/dev/null || true
pm2 start server.js --name "medlink-api"
pm2 save

# 测试服务
echo ""
echo "🧪 测试服务..."
sleep 2
echo "API 健康检查:"
curl -s http://localhost:3000/api/health || echo "API 未响应"
echo ""
echo ""
echo "前端测试:"
curl -s http://localhost/ | grep -o "<title>.*</title>" || echo "前端未响应"

ENDSSH

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址:"
echo "   HTTPS: https://med-link.cn"
echo "   API:   https://med-link.cn/api/health"
echo ""
echo "🔐 API Key: medlink-prod-key-2026"
echo ""