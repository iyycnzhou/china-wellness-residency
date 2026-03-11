-- China Wellness Residency Benefits Network Database Schema
-- MySQL 8.0+

-- ============================================
-- 用户表
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    country VARCHAR(100),
    language ENUM('zh', 'en') DEFAULT 'en',
    membership_level ENUM('basic', 'medical', 'premium') DEFAULT NULL,
    membership_status ENUM('active', 'inactive', 'expired') DEFAULT 'inactive',
    membership_start_date DATE DEFAULT NULL,
    membership_end_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_membership (membership_level, membership_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 会员权益表
-- ============================================
CREATE TABLE IF NOT EXISTS membership_entitlements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    membership_level ENUM('basic', 'medical', 'premium') NOT NULL,
    beds_count INT DEFAULT 1,
    residency_days INT DEFAULT 30,
    health_screening ENUM('basic', 'comprehensive', 'vip') DEFAULT 'basic',
    medical_access ENUM('standard', 'priority', 'vip') DEFAULT 'standard',
    reimbursement_amount DECIMAL(10,2) DEFAULT 0,
    personal_concierge BOOLEAN DEFAULT FALSE,
    price_usd DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 初始化会员权益数据
-- ============================================
INSERT INTO membership_entitlements (membership_level, beds_count, residency_days, health_screening, medical_access, reimbursement_amount, personal_concierge, price_usd) VALUES
('basic', 1, 30, 'basic', 'standard', 0, FALSE, 4000.00),
('medical', 2, 60, 'comprehensive', 'priority', 100000.00, FALSE, 10000.00),
('premium', 3, 90, 'vip', 'vip', 300000.00, TRUE, 20000.00);

-- ============================================
-- 康养目的地表
-- ============================================
CREATE TABLE IF NOT EXISTS wellness_destinations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_zh VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    category ENUM('coastal', 'hot_spring', 'mountain', 'wellness_town') NOT NULL,
    province VARCHAR(100) DEFAULT 'Shandong',
    city VARCHAR(100) NOT NULL,
    description_zh TEXT,
    description_en TEXT,
    image_path VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_location (province, city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 合作医疗机构表
-- ============================================
CREATE TABLE IF NOT EXISTS medical_partners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_zh VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    type ENUM('grade_a_general', 'specialty', 'tcm', 'dental', 'rehabilitation') NOT NULL,
    city VARCHAR(100) NOT NULL,
    address_zh TEXT,
    address_en TEXT,
    contact_phone VARCHAR(50),
    contact_email VARCHAR(255),
    specialties TEXT COMMENT 'JSON array of specialties',
    image_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 预约咨询表
-- ============================================
CREATE TABLE IF NOT EXISTS consultations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED DEFAULT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    preferred_membership ENUM('basic', 'medical', 'premium', 'undecided') DEFAULT 'undecided',
    message TEXT,
    preferred_language ENUM('zh', 'en') DEFAULT 'en',
    status ENUM('pending', 'contacted', 'scheduled', 'completed', 'cancelled') DEFAULT 'pending',
    assigned_to BIGINT UNSIGNED DEFAULT NULL COMMENT 'Staff user ID',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 用户健康档案表
-- ============================================
CREATE TABLE IF NOT EXISTS health_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    record_type ENUM('screening', 'consultation', 'treatment', 'tcm_assessment') NOT NULL,
    record_date DATE NOT NULL,
    provider_id BIGINT UNSIGNED DEFAULT NULL COMMENT 'Medical partner ID',
    summary_zh TEXT,
    summary_en TEXT,
    attachments JSON COMMENT 'File paths',
    is_confidential BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES medical_partners(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_date (record_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 用户驻留记录表
-- ============================================
CREATE TABLE IF NOT EXISTS residency_stays (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    destination_id BIGINT UNSIGNED NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    room_type ENUM('single', 'double', 'family', 'premium') DEFAULT 'single',
    beds_count INT DEFAULT 1,
    status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled') DEFAULT 'pending',
    days_used INT DEFAULT 0,
    total_cost DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES wellness_destinations(id) ON DELETE RESTRICT,
    INDEX idx_user (user_id),
    INDEX idx_dates (check_in_date, check_out_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 系统配置表
-- ============================================
CREATE TABLE IF NOT EXISTS system_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 初始化系统配置
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name_zh', '中国全球健康驻留权益网络', 'string', '网站中文名称'),
('site_name_en', 'China Wellness Residency Benefits Network', 'string', '网站英文名称'),
('contact_email', 'concierge@chinawellnessresidency.com', 'string', '咨询邮箱'),
('contact_phone', '+86-XXX-XXXX-XXXX', 'string', '咨询热线'),
('currency_default', 'USD', 'string', '默认货币');
