// /pages/api/instagram.js

const POSTS = [
  {
    id: 'DY68je-MSml',
    url: 'https://www.instagram.com/p/DY68je-MSml/',
    type: 'posts',
    thumbnail: '/thumbnails/am.jpg',
    label: 'AM',
  },
  {
    id: 'DY49MAUx7Uz',
    url: 'https://www.instagram.com/p/DY49MAUx7Uz/',
    type: 'posts',
    thumbnail: '/thumbnails/hlysht.jpg',
    label: 'HLYSHT',
  },
  {
    id: 'DZA3apzs9px',
    url: 'https://www.instagram.com/p/DZA3apzs9px/',
    type: 'posts',
    thumbnail: '/thumbnails/no-breaks.jpg',
    label: 'NO BREAKS',
  },
  {
    id: 'DZLn9RUtRmE',
    url: 'https://www.instagram.com/p/DZLn9RUtRmE/',
    type: 'posts',
    thumbnail: '/thumbnails/neverlanded.jpg',
    label: 'NEVERLANDED',
  },
]

export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).json({
    profiles: [
      { type: 'posts',  posts: POSTS.filter(p => p.type === 'posts') },
      { type: 'promos', posts: POSTS.filter(p => p.type === 'promos') },
    ],
  })
}