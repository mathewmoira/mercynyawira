/*
  # Add sample blog posts

  1. Data
    - Add three sample blog posts with featured images
    - Add sample categories
    - Link posts to categories
*/

-- Insert sample categories if they don't exist
INSERT INTO categories (name, slug)
VALUES 
  ('Customer Service', 'customer-service'),
  ('Virtual Assistance', 'virtual-assistance'),
  ('Social Media', 'social-media')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO posts (title, content, slug, featured_image, published, created_at)
VALUES
  (
    'The Art of Exceptional Customer Service',
    E'In today''s digital age, exceptional customer service remains the cornerstone of business success. Through my years of experience, I''ve discovered that truly outstanding service goes beyond simply solving problems – it''s about creating memorable experiences that turn customers into loyal advocates.\n\nHere are key principles I''ve learned:\n\n1. Active Listening: Understanding the customer''s needs before offering solutions\n2. Empathy: Putting yourself in the customer''s shoes\n3. Proactive Communication: Keeping customers informed at every step\n4. Going the Extra Mile: Exceeding expectations whenever possible\n\nBy implementing these principles, businesses can build stronger relationships with their customers and drive long-term growth.',
    'art-of-exceptional-customer-service',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    true,
    NOW() - INTERVAL '2 days'
  ),
  (
    'Maximizing Productivity with Virtual Assistance',
    E'As businesses increasingly embrace remote work, virtual assistance has become an invaluable resource for maintaining efficiency and productivity. Drawing from my experience as a virtual assistant, I''ve compiled essential strategies for maximizing the benefits of this modern working relationship.\n\nKey areas where virtual assistance excels:\n\n1. Email and Calendar Management\n2. Administrative Tasks and Documentation\n3. Research and Data Organization\n4. Social Media Management\n5. Customer Support\n\nLearn how to leverage these services to streamline your operations and focus on core business growth.',
    'maximizing-productivity-virtual-assistance',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984',
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'Building a Strong Social Media Presence',
    E'In the digital era, a strong social media presence is crucial for business success. Through my experience managing social media accounts for various clients, I''ve developed a comprehensive approach to building and maintaining an engaging online presence.\n\nThis article covers:\n\n1. Content Strategy Development\n2. Engagement Techniques\n3. Analytics and Performance Tracking\n4. Brand Voice Consistency\n5. Community Management\n\nDiscover how to create a social media strategy that resonates with your audience and drives meaningful engagement.',
    'building-strong-social-media-presence',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    true,
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- Link posts to categories
WITH posts_data AS (
  SELECT id, slug FROM posts WHERE slug IN (
    'art-of-exceptional-customer-service',
    'maximizing-productivity-virtual-assistance',
    'building-strong-social-media-presence'
  )
),
categories_data AS (
  SELECT id, slug FROM categories WHERE slug IN (
    'customer-service',
    'virtual-assistance',
    'social-media'
  )
)
INSERT INTO post_categories (post_id, category_id)
SELECT 
  p.id,
  c.id
FROM posts_data p
CROSS JOIN categories_data c
WHERE 
  (p.slug = 'art-of-exceptional-customer-service' AND c.slug = 'customer-service') OR
  (p.slug = 'maximizing-productivity-virtual-assistance' AND c.slug = 'virtual-assistance') OR
  (p.slug = 'building-strong-social-media-presence' AND c.slug = 'social-media')
ON CONFLICT DO NOTHING;