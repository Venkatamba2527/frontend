-- ═══════════════════════════════════════════════════════════
-- Campaign Platform — Schema + Seed
-- Run with: docker exec -i campaigndb psql -U campaign_user -d campaignDb < db/schema.sql
-- ═══════════════════════════════════════════════════════════

DROP TABLE IF EXISTS campaigns CASCADE;

CREATE TABLE campaigns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    status          VARCHAR(50) NOT NULL DEFAULT 'draft',
    channel         VARCHAR(50) NOT NULL,
    owner_id        UUID,
    budget          NUMERIC(12,2) NOT NULL DEFAULT 0,
    spent           NUMERIC(12,2) NOT NULL DEFAULT 0,
    currency        VARCHAR(3) NOT NULL DEFAULT 'USD',
    start_date      DATE,
    end_date        DATE,
    metrics         JSONB NOT NULL DEFAULT '{}'::jsonb,
    audience        JSONB NOT NULL DEFAULT '{}'::jsonb,
    assets          JSONB NOT NULL DEFAULT '[]'::jsonb,
    schedule        JSONB NOT NULL DEFAULT '{}'::jsonb,
    metadata        JSONB NOT NULL DEFAULT '{}'::jsonb,
    tags            TEXT[] DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_campaigns_status   ON campaigns(status)   WHERE deleted_at IS NULL;
CREATE INDEX idx_campaigns_channel  ON campaigns(channel)  WHERE deleted_at IS NULL;
CREATE INDEX idx_campaigns_dates    ON campaigns(start_date, end_date);
CREATE INDEX idx_campaigns_created  ON campaigns(created_at DESC);
CREATE INDEX idx_campaigns_metrics  ON campaigns USING GIN(metrics);
CREATE INDEX idx_campaigns_audience ON campaigns USING GIN(audience);
CREATE INDEX idx_campaigns_metadata ON campaigns USING GIN(metadata);
CREATE INDEX idx_campaigns_tags     ON campaigns USING GIN(tags);

INSERT INTO campaigns (name, description, status, channel, budget, spent, start_date, end_date, metrics, audience, tags)
VALUES
('Summer Sale 2025', 'Annual summer promotion', 'Active', 'Email',
 5000, 3200, '2025-06-01', '2025-06-30',
 '{"impressions": 45000, "clicks": 2800, "conversions": 320}'::jsonb,
 '{"segments": ["returning-customers"]}'::jsonb,
 ARRAY['summer', 'promo']),

('Product Launch – X1', 'New product line launch', 'Scheduled', 'Social',
 12000, 0, '2025-07-10', '2025-08-10',
 '{"impressions": 0, "clicks": 0, "conversions": 0}'::jsonb,
 '{"segments": ["early-adopters"]}'::jsonb,
 ARRAY['launch']),

('Retargeting Q3', 'Re-engage warm leads', 'Active', 'Display',
 8000, 4100, '2025-07-01', '2025-09-30',
 '{"impressions": 120000, "clicks": 5400, "conversions": 610}'::jsonb,
 '{"segments": ["cart-abandoners"]}'::jsonb,
 ARRAY['retarget']),

('Brand Awareness', 'Top of funnel awareness', 'Paused', 'Search',
 6000, 1800, '2025-05-15', '2025-08-15',
 '{"impressions": 30000, "clicks": 1200, "conversions": 95}'::jsonb,
 '{}'::jsonb, ARRAY['awareness']),

('Holiday Teaser', 'Pre-holiday buzz', 'Draft', 'Social',
 9500, 0, '2025-11-01', '2025-12-25',
 '{}'::jsonb, '{}'::jsonb, ARRAY['holiday']),

('Newsletter Promo', 'Monthly newsletter push', 'Completed', 'Email',
 2500, 2480, '2025-04-01', '2025-04-30',
 '{"impressions": 22000, "clicks": 1900, "conversions": 210}'::jsonb,
 '{}'::jsonb, ARRAY['newsletter']);