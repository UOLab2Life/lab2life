import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getAllEpisodes() {
  try {
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (tablesError) {
      console.error('Error fetching tables:', tablesError)
    } else {
      console.log('Available tables:', tables?.map(t => t.table_name))
    }

    // Try to fetch from the podcasts table
    const { data, error } = await supabase
      .from('podcasts')
      .select('podcast_id, release_date, title, description, category, audio_file')
      .order('release_date', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    return (data || []).map((item) => ({
      id: item.podcast_id,
      title: item.title,
      published: new Date(item.release_date),
      description: item.description,
      category: item.category,
      audio: item.audio_file,
      content: item.description || '',
    }))
  } catch (err) {
    console.error('Unexpected error:', err)
    return []
  }
}
