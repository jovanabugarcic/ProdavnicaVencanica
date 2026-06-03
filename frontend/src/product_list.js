const products = [
    {
        _id: '1',
        name: 'Aurora Elegance',
        price: 1200,
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1125.jpg',
        description: "Elegantna venčanica sa čipkom i dugim šlepom.",
        category: "A-line",
        countInStock: 5,
        numReviews: 12,
        rating: 4.5,
    },
    {
        _id: '2',
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1126.jpg',
        name: "Luna Pearl",
        price: 980,
        rating: 4.2,
        description: "Minimalistički dizajn sa bisernim detaljima.",
        category: "Mermaid",
        countInStock: 3,
        numReviews: 8
    },
    {
        _id: '3',
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1127.jpg',
        name: "Crystal Dream",
        price: 1500,
        rating: 4.8,
        description: "Raskošna haljina sa kristalima i tilom.",
        category: "Ball Gown",
        countInStock: 2,
        numReviews: 20
    },
    {
        _id: '4',
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1129.jpg',
        name: "Ivory Grace",
    price: 1100,
    rating: 4.3,
    description: "Klasična venčanica u ivory nijansi.",
    category: "A-line",
    countInStock: 6,
    numReviews: 10,
    },
    {
        _id: '5',
       
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1130.jpg',
        name: "Royal Bloom",
    price: 1700,
    rating: 4.9,
    description: "Kraljevski model sa bogatim vezom.",
    category: "Ball Gown",
    countInStock: 1,
    numReviews: 25
    },
    {
        _id: '6',
       
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1131.jpg',
         name: "Silk Whisper",
    price: 900,
    rating: 4.1,
    description: "Lagani svileni model za letnja venčanja.",
    category: "Sheath",
    countInStock: 4,
    numReviews: 6
    },
    {
        _id: '7',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1133.jpg',
        name: "White Vow",
    price: 1300,
    rating: 4.6,
    description: "Beli tonovi sa zlatnim detaljima.",
    category: "A-line",
    countInStock: 3,
    numReviews: 15
    },
    {
        _id: '8',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1134.jpg',
        name: "Velvet Rose",
    price: 1400,
    rating: 4.7,
    description: "Romantična venčanica sa floralnim aplikacijama.",
    category: "Mermaid",
    countInStock: 2,
    numReviews: 18
    },
    {
        _id: '9',
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1135.jpg',
       name: "Diamond Mist",
    price: 1600,
    rating: 4.8,
    description: "Sjajni detalji koji podsećaju na dijamante.",
    category: "Ball Gown",
    countInStock: 1,
    numReviews: 22
    },
    {
        _id: '10',
       
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1136.jpg',
        name: "Pure Love",
    price: 850,
    rating: 4.0,
    description: "Jednostavan i nežan model.",
    category: "Sheath",
    countInStock: 7,
    numReviews: 5
    },
    {
        _id: '11',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1137.jpg',
        name: "Snow Queen", price: 1550, rating: 4.9, description: "Zimski glamur.", category: "Ball Gown", countInStock: 2, numReviews: 30 
    },
    {
        _id: '12',
       
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1138.jpg',
       name: "Eternal Kiss", price: 1150, rating: 4.4, description: "Romantična i bezvremenska.", category: "A-line", countInStock: 4, numReviews: 14
    },
    {
        _id: '13',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1139.jpg',
        name: "Blush Fairy", price: 990, rating: 4.3, description: "Lagani roze tonovi.", category: "A-line", countInStock: 5, numReviews: 9 
    },
    {
        _id: '14',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1140.jpg',
       name: "Midnight Swan", price: 1800, rating: 5.0, description: "Elegantna sa crnim detaljima.", category: "Mermaid", countInStock: 1, numReviews: 40
    },
    {
        _id: '15',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1141.jpg',
        name: "Angel Feather", price: 1250, rating: 4.6, description: "Detalji od perja.", category: "Ball Gown", countInStock: 3, numReviews: 16
    },
    {
        _id: '16',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1142.jpg',
        name: "Ocean Breeze", price: 870, rating: 4.1, description: "Savršena za plažu.", category: "Sheath", countInStock: 6, numReviews: 7
    },
    {
        _id: '17',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1143.jpg',
       name: "Moonlight Glow", price: 1350, rating: 4.7, description: "Sjajna poput mesečine.", category: "A-line", countInStock: 2, numReviews: 19
    },
    {
        _id: '18',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1144.jpg',
        name: "Garden Bliss", price: 920, rating: 4.2, description: "Cvetni motivi.", category: "A-line", countInStock: 5, numReviews: 11 
    },
    {
        _id: '19',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1145.jpg',
        name: "Silver Charm", price: 1450, rating: 4.8, description: "Srebrni vez.", category: "Mermaid", countInStock: 2, numReviews: 23
    },
    {
        _id: '20',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1146.jpg',
        name: "Heavenly Touch", price: 1000, rating: 4.3, description: "Nežan til.", category: "Ball Gown", countInStock: 4, numReviews: 12
    },
    {
        _id: '21',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1147.jpg',
        name: "White Symphony", price: 1500, rating: 4.9, description: "Harmoničan dizajn.", category: "Ball Gown", countInStock: 1, numReviews: 28
    },
    {
        _id: '22',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1148.jpg',
        name: "Star Dust", price: 1100, rating: 4.5, description: "Sjajni detalji.", category: "A-line", countInStock: 3, numReviews: 13
    },
     {
        _id: '23',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1149.jpg',
       name: "Star Dust", price: 1100, rating: 4.5, description: "Sjajni detalji.", category: "A-line", countInStock: 3, numReviews: 13
    },
     {
        _id: '24',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1150.jpg',
       name: "Dream Lace", price: 950, rating: 4.2, description: "Čipkasta elegancija.", category: "A-line", countInStock: 6, numReviews: 8
    },
     {
        _id: '25',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1151.jpg',
        name: "Crystal Swan", price: 1650, rating: 4.9, description: "Kristali i luksuz.", category: "Ball Gown", countInStock: 1, numReviews: 35 
    },
     {
        _id: '26',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/1152.jpg',
       name: "Soft Petal", price: 880, rating: 4.0, description: "Nežni cvetni detalji.", category: "Sheath", countInStock: 7, numReviews: 6
    },
     {
        _id: '27',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4000.jpg',
       name: "White Aura", price: 1400, rating: 4.7, description: "Beli sjaj.", category: "A-line", countInStock: 2, numReviews: 18 
    },
     {
        _id: '28',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4001.jpg',
         name: "Rose Whisper", price: 1050, rating: 4.4, description: "Romantičan stil.", category: "Mermaid", countInStock: 4, numReviews: 10
    },
     {
        _id: '29',

        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4002.jpg',
        name: "Elegant Muse", price: 1300, rating: 4.6, description: "Inspirisana umetnošću.", category: "A-line", countInStock: 3, numReviews: 14
    },
     {
        _id: '30',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4003.jpg',
        name: "Classic Charm", price: 900, rating: 4.1, description: "Bezvremenska elegancija.", category: "Sheath", countInStock: 5, numReviews: 7
    },
     {
        _id: '31',
       
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4004.jpg',
        name: "Diamond Veil", price: 1750, rating: 5.0, description: "Luksuz sa velom.", category: "Ball Gown", countInStock: 1, numReviews: 45 
    },
     {
        _id: '32',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4005.jpg',
        name: "Ivory Bloom", price: 1150, rating: 4.5, description: "Cvetni motivi.", category: "A-line", countInStock: 4, numReviews: 12
    },
     {
        _id: '33',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4006.jpg',
        name: "Celestial Bride", price: 1600, rating: 4.8, description: "Nebeski dizajn.", category: "Ball Gown", countInStock: 2, numReviews: 27 
    },
     {
        _id: '34',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4007.jpg',
        name: "Fairy Dust", price: 980, rating: 4.3, description: "Vilinski stil.", category: "A-line", countInStock: 6, numReviews: 9
    },
     {
        _id: '35',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4008.jpg',
        name: "Snowflake Dream", price: 1450, rating: 4.7, description: "Zimski motivi.", category: "Ball Gown", countInStock: 2, numReviews: 21
    },
     {
        _id: '36',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4009.jpg',
       name: "Pearl Essence", price: 1200, rating: 4.6, description: "Biserni detalji.", category: "Mermaid", countInStock: 3, numReviews: 15
    },
     {
        _id: '37',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4010.jpg',
        name: "Sunset Glow", price: 890, rating: 4.1, description: "Topli tonovi.", category: "Sheath", countInStock: 5, numReviews: 6
    },
     {
        _id: '38',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4011.jpg',
        name: "Royal Silk", price: 1500, rating: 4.9, description: "Svila i luksuz.", category: "Ball Gown", countInStock: 1, numReviews: 32
    },
     {
        _id: '39',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4012.jpg',
        name: "Magic Lace", price: 1100, rating: 4.4, description: "Čipka i elegancija.", category: "A-line", countInStock: 4, numReviews: 11 
    },
     {
        _id: '40',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4013.jpg',
        name: "Heaven Glow", price: 1350, rating: 4.7, description: "Sjaj i elegancija.", category: "Mermaid", countInStock: 2, numReviews: 20
    },
     {
        _id: '41',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4014.jpg',
        name: "Divine Touch", price: 1250, rating: 4.6, description: "Božanski stil.", category: "A-line", countInStock: 3, numReviews: 13 
    },
     {
        _id: '42',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4015.jpg',
         name: "Enchanted Ivory",
  price: 1180,
  rating: 4.5,
  description: "Romantična venčanica sa slojevima tila i suptilnim sjajem.",
  category: "A-line",
  countInStock: 4,
  numReviews: 13
    },
     {
        _id: '43',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4016.jpg',
         name: "Crystal Blossom",
  price: 1420,
  rating: 4.7,
  description: "Elegantni model sa cvetnim aplikacijama i kristalima.",
  category: "Ball Gown",
  countInStock: 2,
  numReviews: 21
    },
     {
        _id: '44',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4017.jpg',
        name: "Silhouette Chic",
  price: 970,
  rating: 4.2,
  description: "Uska i moderna venčanica koja prati liniju tela.",
  category: "Sheath",
  countInStock: 5,
  numReviews: 9
    },
     {
        _id: '45',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4018.jpg',
        name: "Royal Essence",
  price: 1680,
  rating: 4.9,
  description: "Luksuzna haljina sa bogatim detaljima i dugim šlepom.",
  category: "Ball Gown",
  countInStock: 1,
  numReviews: 34
    },
     {
        _id: '46',
        
        image: 'https://matrimonia.rs/img/kolekcije/2018/all/4019.jpg',
        name: "Soft Glow",
  price: 890,
  rating: 4.1,
  description: "Minimalistički dizajn sa nežnim sjajem za elegantan izgled.",
  category: "A-line",
  countInStock: 6,
  numReviews: 7
    },
   
]

export default products