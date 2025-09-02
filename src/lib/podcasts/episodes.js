import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export async function getAllEpisodes() {
  try {
    const { data, error } = await supabase
      .from('Episodes')
      .select('episode_id, release_date, title, description, category, audio_file_url, youtube_url')
      .order('episode_id', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    return (data || []).map((item) => ({
      id: item.episode_id,
      title: item.title,
      published: new Date(item.release_date),
      description: item.description,
      category: item.category,
      youtube_url: item.youtube_url,
      content: item.description || '',
      audio: {
        src: item.audio_file_url,
        type: 'audio/mp3',
      },
    }))
  } catch (err) {
    console.error('Unexpected error:', err)
    return []
  }
}

//TEST TO CHECK IF DATABASE CONNECTION WORKS, PLEASE LEAVE IT UNTOUCHED
// export async function testConnection() {
//   try {
//     const { data, error } = await supabase
//       .from('Episodes')
//       .select('*')
//       .limit(1)

//     if (error) {
//       console.error('❌ Connection failed:', error)
//       return { success: false, data: null }
//     }

//     if (!data || data.length === 0) {
//       console.warn('⚠️ Connected, but no entries in Episodes table')
//       return { success: true, data: [] }
//     }

//     console.log('✅ Supabase connection works! Sample row:', data[0])
//     return { success: true, data }
//   } catch (err) {
//     console.error('❌ Unexpected error:', err)
//     return { success: false, data: null }
//   }
// }
