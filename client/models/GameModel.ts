export interface Games {
  id: number
  age_ratings?: number[]
  artworks?: number[]
  category: number
  cover?: number
  created_at: number
  external_games?: number[]
  first_release_date?: number
  game_modes?: number[]
  genres?: number[]
  name: string
  platforms?: number[]
  release_dates?: number[]
  screenshots?: number[]
  similar_games?: number[]
  slug: string
  summary?: string
  tags?: number[]
  updated_at: number
  url: string
  version_parent?: number
  version_title?: string
  checksum: string
  themes?: number[]
  websites?: number[]
  language_supports?: number[]
  alternative_names?: number[]
  collection?: number
  follows?: number
  franchises?: number[]
  involved_companies?: number[]
  keywords?: number[]
  multiplayer_modes?: number[]
  player_perspectives?: number[]
  videos?: number[]
  ports?: number[]
  collections?: number[]
  hypes?: number
  status?: number
  coverUrl?: string
}

export interface Game {
  id: number
  cover: Cover
  first_release_date: number
  genres: Genre[]
  involved_companies: Company[]
  keywords: Genre[]
  name: string
  platforms: Platform[]
  release_dates: ReleaseDate[]
  screenshots: Screenshot[]
  storyline: string
  summary: string
  themes: Theme[]
  websites: Website[]
}

export interface Company {
  id: number
  company: {
    id: number
    name: string
  }
}
export interface Screenshot {
  id: number
  image_id: string
}
export interface Cover {
  id: number
  image_id: string
}

export interface Platform {
  id: number
  name: string
}

export interface Genre {
  id: number
  name: string
}

export interface ReleaseDate {
  id: number
  date: number
}

export interface Website {
  id: number
  category: number
  url: string
}

export interface BacklogGames {
  id: number
  game_title: string
  genre: string
  platform: string
  publisher: string
  mood: string
  status: string
  rating: string
  image: string
}

export interface GameData {
  game_title: string
  genre?: string
  mood?: string
  platform?: string
}
