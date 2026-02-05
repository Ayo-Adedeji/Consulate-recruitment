# Supabase Setup Guide

This guide will help you set up Supabase for global cloud storage synchronization.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `consulate-recruitment-cms`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for project to be ready (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (long string starting with `eyJ`)

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ENABLE_REALTIME=true
VITE_RETRY_ATTEMPTS=3
VITE_RETRY_DELAY=1000
VITE_OFFLINE_MODE=false
```

## Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `src/dashboard/config/schema.sql`
4. Paste into the SQL editor
5. Click "Run" to execute the schema setup
6. You should see success messages in the results

## Step 5: Configure Storage

1. In Supabase dashboard, go to **Storage**
2. The `cms-media` bucket should already be created by the schema
3. If not, create it manually:
   - Click "New bucket"
   - Name: `cms-media`
   - Public: ✅ (checked)
   - Click "Create bucket"

## Step 6: Test Connection

1. Start your development server: `npm run dev`
2. Open browser console
3. Look for these messages:
   - ✅ Cloud configuration validated
   - ✅ Database connection test successful
   - ✅ Cloud database initialized successfully

## Step 7: Deploy to Render

1. In your Render dashboard, go to your web service
2. Go to **Environment** tab
3. Add the environment variables:
   - `VITE_SUPABASE_URL`: Your project URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon key
   - `VITE_ENABLE_REALTIME`: `true`
4. Click "Save Changes"
5. Your app will automatically redeploy

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure your internet connection is stable

### Schema Issues
- Make sure you ran the complete schema.sql file
- Check the SQL Editor results for any errors
- Verify all tables were created in the **Database** → **Tables** section

### Permission Issues
- Ensure Row Level Security policies are properly set
- Check that the storage bucket has correct permissions
- Verify your anon key has the right permissions

### Environment Variables Not Loading
- Restart your development server after adding .env
- Make sure .env is in the project root
- Verify variable names start with `VITE_`

## Next Steps

Once Supabase is set up:
1. The system will automatically detect cloud configuration
2. Existing localStorage data will be migrated on first run
3. All new content will sync globally in real-time
4. Multiple devices will share the same data

## Security Notes

- Never commit your `.env` file to version control
- The anon key is safe for client-side use
- Row Level Security policies protect your data
- Only authenticated users can modify content
- Public users can only read published content