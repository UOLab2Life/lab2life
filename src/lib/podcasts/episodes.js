import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export async function getAllEpisodes() {
  try {
    const { data, error } = await supabase
      .from('Episodes')
      .select('episode_id, release_date, title, description_en, description_fr, category_en, category_fr, audio_file_url, youtube_url')
      .order('episode_id', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return []
    }

    return (data || []).map((item) => {
      let publishedDate
      if (item.release_date) {
        const [year, month, day] = item.release_date.split('-').map(Number)
        publishedDate = new Date(year, month - 1, day)
      } else {
        publishedDate = new Date()
      }
      
      return {
        id: item.episode_id,
        title: item.title,
        published: publishedDate,
        description_en: item.description_en,
        description_fr: item.description_fr,
        category_en: item.category_en,
        category_fr: item.category_fr,
        youtube_url: item.youtube_url,
        content: item.description_en || '',
        audio: {
          src: item.audio_file_url,
          type: 'audio/mp3',
        },
      }
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    return []
  }
}
