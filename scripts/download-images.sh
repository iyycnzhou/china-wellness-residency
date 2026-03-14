#!/bin/bash
# =============================================================================
# 图片资源下载脚本 - 全球驻留权益网站
# =============================================================================
# 开发者：Sophie (索菲)
# 创建时间：2026-03-14
# 
# 使用方法：
#   cd /mnt/d/openclaw/workspace/china-wellness-residency
#   bash scripts/download-images.sh
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="$PROJECT_DIR/public/images"

echo "=========================================="
echo "📸 全球驻留权益网站 - 图片资源下载"
echo "=========================================="
echo ""
echo "项目目录：$PROJECT_DIR"
echo "图片目录：$IMAGES_DIR"
echo ""

# 创建目录结构
echo "📁 创建目录结构..."
mkdir -p "$IMAGES_DIR"/{banner,services,icons,partners,backgrounds}

# 图片资源列表（使用 Unsplash 和 Pexels 的直接链接）
# 注意：这些链接可能会失效，如失效请访问原网站下载

declare -A BANNER_IMAGES=(
    ["hero-1.jpg"]="https://images.pexels.com/photos/2863793/pexels-photo-2863793.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
    ["hero-2.jpg"]="https://images.pexels.com/photos/2863796/pexels-photo-2863796.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
    ["hero-3.jpg"]="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
)

declare -A SERVICE_IMAGES=(
    ["hospital.jpg"]="https://images.pexels.com/photos/262550/pexels-photo-262550.jpeg?auto=compress&cs=tinysrgb&w=800"
    ["wellness.jpg"]="https://images.pexels.com/photos/1646948/pexels-photo-1646948.jpeg?auto=compress&cs=tinysrgb&w=800"
    ["tcm.jpg"]="https://images.pexels.com/photos/5469555/pexels-photo-5469555.jpeg?auto=compress&cs=tinysrgb&w=800"
    ["tourism.jpg"]="https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800"
)

# 下载 Banner 图片
echo ""
echo "🏨 下载 Banner 图片..."
for filename in "${!BANNER_IMAGES[@]}"; do
    url="${BANNER_IMAGES[$filename]}"
    output="$IMAGES_DIR/banner/$filename"
    
    if [ -f "$output" ] && [ $(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null) -gt 10000 ]; then
        echo "  ✅ $filename (已存在)"
    else
        echo "  ⬇️  下载 $filename..."
        curl -L -o "$output" "$url" 2>/dev/null || echo "  ⚠️  $filename 下载失败"
    fi
done

# 下载服务图片
echo ""
echo "🏥 下载服务图片..."
for filename in "${!SERVICE_IMAGES[@]}"; do
    url="${SERVICE_IMAGES[$filename]}"
    output="$IMAGES_DIR/services/$filename"
    
    if [ -f "$output" ] && [ $(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null) -gt 10000 ]; then
        echo "  ✅ $filename (已存在)"
    else
        echo "  ⬇️  下载 $filename..."
        curl -L -o "$output" "$url" 2>/dev/null || echo "  ⚠️  $filename 下载失败"
    fi
done

# 检查下载结果
echo ""
echo "=========================================="
echo "📊 下载结果统计"
echo "=========================================="
echo ""

banner_count=$(ls -1 "$IMAGES_DIR/banner/"*.jpg 2>/dev/null | wc -l)
services_count=$(ls -1 "$IMAGES_DIR/services/"*.jpg 2>/dev/null | wc -l)

echo "Banner 图片：$banner_count 张"
echo "服务图片：$services_count 张"
echo ""

# 显示已下载的图片
echo "📁 已下载的图片:"
echo ""
echo "Banner:"
ls -lh "$IMAGES_DIR/banner/"*.jpg 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}' || echo "  (无)"
echo ""
echo "服务:"
ls -lh "$IMAGES_DIR/services/"*.jpg 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}' || echo "  (无)"
echo ""

# 提供备用下载方案
echo "=========================================="
echo "💡 如果下载失败，请访问以下网站手动下载:"
echo "=========================================="
echo ""
echo "1. Unsplash (推荐)"
echo "   https://unsplash.com/s/photos/luxury-wellness-resort"
echo ""
echo "2. Pexels"
echo "   https://www.pexels.com/search/wellness%20resort/"
echo ""
echo "3. Pixabay"
echo "   https://pixabay.com/images/search/wellness%20resort/"
echo ""
echo "搜索关键词:"
echo "  - luxury resort (豪华度假村)"
echo "  - wellness spa (康养 SPA)"
echo "  - nature landscape (自然风景)"
echo "  - traditional chinese medicine (中医)"
echo "  - hot spring (温泉)"
echo ""

echo "=========================================="
echo "✅ 图片下载完成!"
echo "=========================================="
