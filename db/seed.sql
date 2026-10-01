

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