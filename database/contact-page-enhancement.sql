-- China Wellness Residency - Contact Page Enhancement Database Extensions
-- 在现有 schema.sql 基础上添加此脚本

-- ============================================
-- 客户服务请求表（关联 existing consultations 表）
-- ============================================
CREATE TABLE IF NOT EXISTS client_service_requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consultation_id BIGINT UNSIGNED NOT NULL,
    service_type ENUM('appointment', 'residency', 'treatment', 'wellness_checkup') NOT NULL,
    requested_destination_id BIGINT UNSIGNED DEFAULT NULL,
    requested_provider_id BIGINT UNSIGNED DEFAULT NULL,
    preferred_date DATE,
    special_requests TEXT,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_destination_id) REFERENCES wellness_destinations(id) ON DELETE SET NULL,
    FOREIGN KEY (requested_provider_id) REFERENCES medical_partners(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_consultation (consultation_id),
    INDEX idx_destination (requested_destination_id),
    INDEX idx_provider (requested_provider_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 服务方入驻申请表
-- ============================================
CREATE TABLE IF NOT EXISTS provider_applications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    company_name_zh VARCHAR(255) NOT NULL,
    company_name_en VARCHAR(255) NOT NULL,
    application_type ENUM('medical', 'wellness', 'hotel', 'scenic', 'tcm') NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    business_license_path VARCHAR(255) DEFAULT NULL,
    description_zh TEXT,
    description_en TEXT,
    address_zh TEXT,
    address_en TEXT,
    specialties JSON,
    status ENUM('pending', 'reviewing', 'approved', 'rejected') DEFAULT 'pending',
    reviewer_id BIGINT UNSIGNED DEFAULT NULL,
    review_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_reviewer (reviewer_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 初始化数据验证
-- ============================================
SELECT 'Database extensions created successfully!' AS status;
