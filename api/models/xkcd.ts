export interface ComicDb extends Comic {
    id: number
}

export interface Comic {
    title: string,
    url: string
}

export interface XkcdResponse {
  month: string,
  num: number,
  link: string,
  year: string,
  news: string,
  safe_title: string,
  transcript: string,
  alt: string,
  img: string,
  title: string,
  day: string
}
