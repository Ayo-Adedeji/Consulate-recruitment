-- Simplified Supabase Database Schema for CMS Cloud Storage
-- This version avoids IF NOT EXISTS for better compatibility

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Content collections table (stores all CMS content: jobs, blogs, services, etc.)
CREATE TABLE cms_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_name VARCHAR(50) NOT NULL,
  item_id VARCHAR(100) NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100) DEFAULT 'system',
  status VARCHAR(20) DEFAULT 'published',
  UNIQUE(collection_name, item_id)
);

-- Media assets table (stores media file metadata)
CREATE TABLE cms_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  thumbnail_path VARCHAR(500),
  tags TEXT[],
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by VARCHAR(100) DEFAULT 'system',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100) DEFAULT 'system',
  status VARCHAR(20) DEFAULT 'published'
);

-- System configuration table (stores app settings)
CREATE TABLE cms_config (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collection metadata table (stores collection statistics)
CREATE TABLE cms_metadata (
  collection_name VARCHAR(50) PRIMARY KEY,
  count INTEGER DEFAULT 0,
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  size_bytes INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_cms_collections_collection_name ON cms_collections(collection_name);
CREATE INDEX idx_cms_collections_status ON cms_collections(status);
CREATE INDEX idx_cms_collections_created_at ON cms_collections(created_at);
CREATE INDEX idx_cms_collections_updated_at ON cms_collections(updated_at);
CREATE INDEX idx_cms_media_status ON cms_media(status);
CREATE INDEX idx_cms_media_mime_type ON cms_media(mime_type);

-- Enable Row Level Security (RLS)
ALTER TABLE cms_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_metadata ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cms_collections
-- Allow anonymous users to read published content
CREATE POLICY "Allow anonymous read published collections" 
ON cms_collections FOR SELECT TO anon 
USING (status = 'published');

-- Allow authenticated users to read all content
CREATE POLICY "Allow authenticated read collections" 
ON cms_collections FOR SELECT TO authenticated 
USING (true);

-- Allow authenticated users to insert content
CREATE POLICY "Allow authenticated insert collections" 
ON cms_collections FOR INSERT TO authenticated 
WITH CHECK (true);

-- Allow authenticated users to update content
CREATE POLICY "Allow authenticated update collections" 
ON cms_collections FOR UPDATE TO authenticated 
USING (true);

-- Allow authenticated users to delete content
CREATE POLICY "Allow authenticated delete collections" 
ON cms_collections FOR DELETE TO authenticated 
USING (true);

-- RLS Policies for cms_media
-- Allow anonymous users to read published media
CREATE POLICY "Allow anonymous read published media" 
ON cms_media FOR SELECT TO anon 
USING (status = 'published');

-- Allow authenticated users full access to media
CREATE POLICY "Allow authenticated read media" 
ON cms_media FOR SELECT TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated insert media" 
ON cms_media FOR INSERT TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update media" 
ON cms_media FOR UPDATE TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete media" 
ON cms_media FOR DELETE TO authenticated 
USING (true);

-- RLS Policies for cms_config
-- Allow authenticated users to read config
CREATE POLICY "Allow authenticated read config" 
ON cms_config FOR SELECT TO authenticated 
USING (true);

-- Allow authenticated users to modify config
CREATE POLICY "Allow authenticated write config" 
ON cms_config FOR ALL TO authenticated 
USING (true);

-- RLS Policies for cms_metadata
-- Allow authenticated users to read metadata
CREATE POLICY "Allow authenticated read metadata" 
ON cms_metadata FOR SELECT TO authenticated 
USING (true);

-- Allow authenticated users to modify metadata
CREATE POLICY "Allow authenticated write metadata" 
ON cms_metadata FOR ALL TO authenticated 
USING (true);

-- Insert initial configuration
INSERT INTO cms_config (key, value) VALUES 
('system_initialized', ('{"initialized": true, "version": "1.0.0", "timestamp": "' || NOW() || '"}')::jsonb);

-- Enable realtime for collections table
ALTER PUBLICATION supabase_realtime ADD TABLE cms_collections;
ALTER PUBLICATION supabase_realtime ADD TABLE cms_media;