# Supabase Setup for Contact Form

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Database Table

Create a table named `Questions` in your Supabase database with the following schema:

```sql
CREATE TABLE Questions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Features

- ✅ Form data is saved to Supabase database
- ✅ Automatic ID generation (BIGSERIAL)
- ✅ Automatic timestamp (created_at)
- ✅ Form validation before submission
- ✅ Loading state during submission
- ✅ Error handling for database failures
- ✅ Success modal on successful submission
- ✅ Form clearing after successful submission

## Table Structure

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key (auto-generated) |
| name | TEXT | Contact name |
| email | TEXT | Contact email |
| subject | TEXT | Message subject |
| message | TEXT | Message content |
| created_at | TIMESTAMPTZ | Submission timestamp (auto-generated) |
