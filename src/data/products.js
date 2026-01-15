// Данные товаров - можно загружать из API или JSON файла

export const productsData = [
  // Торты
  {
    id: 'tort-duet',
    name: 'Торт «Дуэт»',
    category: 'torts',
    image: 'cotolog/tort/дуэт_сайт.jpg',
    description: 'Сочетание шоколадного и ванильного бисквита с прослойкой крем-брюле из чёрного и белого шоколада с кокосовой стружкой.',
    weight: '800 г',
    price: 1500,
    popular: true
  },
  {
    id: 'tort-medovik',
    name: 'Торт «Медовик сметанный»',
    category: 'torts',
    image: 'cotolog/tort/медовик_сметана_сайт.jpg',
    description: 'Медовые коржи с молочно-сливочным кремом.',
    weight: '400 г',
    price: 800,
    popular: true
  },
  {
    id: 'tort-pancho',
    name: 'Торт «Панчо»',
    category: 'torts',
    image: 'cotolog/tort/панчо_сайт.jpg',
    description: 'Воздушный торт с кусочками ананаса и фундука на основе сметанного крема.',
    weight: '800 г',
    price: 1600
  },
  {
    id: 'tort-mango',
    name: 'Торт «Манго-маракуйя»',
    category: 'torts',
    image: 'cotolog/tort/mango.jpg',
    description: 'Шифоновый белый бисквит с кремом чиз и пюре манго-маракуйи.',
    weight: '750 г',
    price: 1700,
    popular: true
  },
  {
    id: 'tort-snikers',
    name: 'Торт «Сникерс»',
    category: 'torts',
    image: 'cotolog/tort/сниккерс_сайт.jpg',
    description: 'Шоколадный торт с карамелью, арахисом и кремом чиз.',
    weight: '1000 г',
    price: 2000,
    popular: true
  },
  {
    id: 'tort-izumrud',
    name: 'Торт «Изумрудный»',
    category: 'torts',
    image: 'cotolog/tort/Изумрудный_сайт.jpg',
    description: 'Фисташковый бисквит с ягодным муссом и сливочным кремом.',
    weight: '750 г',
    price: 1800,
    popular: true
  },
  {
    id: 'tort-paris',
    name: 'Торт «Париж»',
    category: 'torts',
    image: 'cotolog/tort/париж_сайт.jpg',
    description: 'Кольцо из заварного теста с кремом «Пралине» и свежими ягодами.',
    weight: '800 г',
    price: 1650,
    popular: true
  },
  {
    id: 'tort-devochka',
    name: 'Торт «Молочная девочка»',
    category: 'torts',
    image: 'cotolog/tort/devochka.jpg',
    description: 'Коржи на сгущённом молоке с нежным сливочным кремом чиз.',
    weight: '700 г',
    price: 1400
  },
  
  // Десерты
  {
    id: 'desert-kartoshka',
    name: 'Пирожное «Картошка»',
    category: 'desserts',
    image: 'cotolog/desert/Картошка-целая2.jpg',
    description: 'Мягкое бисквитное пирожное с нежным вкусом какао и сливок.',
    weight: '70 г',
    price: 150
  },
  {
    id: 'desert-pavlova',
    name: 'Десерт «Павлова»',
    category: 'desserts',
    image: 'cotolog/desert/павлова.jpg',
    description: 'Воздушное безе с кремом «Чиз» и свежими ягодами.',
    weight: '180 г',
    price: 300
  },
  {
    id: 'desert-cheesecake',
    name: 'Чизкейк «Шоколадный»',
    category: 'desserts',
    image: 'cotolog/desert/чиз_шоколад.jpg',
    description: 'Песочная основа, сливочный сыр, шоколад и глазурь.',
    weight: '140 г',
    price: 350
  },
  {
    id: 'desert-ecler',
    name: 'Пирожное «Эклер»',
    category: 'desserts',
    image: 'cotolog/desert/эклер.jpg',
    description: 'Нежное заварное тесто, сливочный крем и шоколадная помадка.',
    weight: '80 г',
    price: 180
  },
  
  // Халва
  {
    id: 'halva-araxis',
    name: 'Халва арахисовая',
    category: 'halva',
    image: 'cotolog/xalva/арахис.jpg',
    description: 'Классическая халва из обжаренного арахиса.',
    weight: '400 г',
    price: 450
  },
  {
    id: 'halva-kunzhut',
    name: 'Халва кунжутная',
    category: 'halva',
    image: 'cotolog/xalva/кунжутная.jpg',
    description: 'Тахинная халва с мягкой сливочно-ореховой текстурой.',
    weight: '400 г',
    price: 500
  },
  {
    id: 'halva-podsol',
    name: 'Халва подсолнечная',
    category: 'halva',
    image: 'cotolog/xalva/podsol.jpg',
    description: 'Классическая подсолнечная халва ручного замеса.',
    weight: '400 г',
    price: 400
  },
  
  // Урбечи
  {
    id: 'urbech-gretskiy',
    name: 'Урбеч из грецкого ореха',
    category: 'urbech',
    image: 'cotolog/uebech/urbech.jpg',
    description: 'Состав: ядра грецкого ореха тёртые.',
    weight: '240 г',
    price: 500
  },
  {
    id: 'urbech-tikva',
    name: 'Урбеч из семечек тыквы',
    category: 'urbech',
    image: 'cotolog/uebech/tikva.jpg',
    description: 'Состав: семечки тыквы.',
    weight: '240 г',
    price: 450
  },
  {
    id: 'urbech-kunzhut',
    name: 'Урбеч из семян кунжута',
    category: 'urbech',
    image: 'cotolog/uebech/кунжут.jpg',
    description: 'Состав: белый кунжут.',
    weight: '240 г',
    price: 480
  },
  
  // Арахисовая паста
  {
    id: 'peanut-klassik',
    name: 'Арахисовая паста «Классическая»',
    category: 'peanut',
    image: 'cotolog/araxis/класик.jpg',
    description: 'Арахисовая паста «Классическая» 240 г. Состав: арахис обжаренный, соль.',
    weight: '240 г',
    price: 350
  },
  {
    id: 'peanut-med',
    name: 'Арахисовая паста «С мёдом»',
    category: 'peanut',
    image: 'cotolog/araxis/С-мёдом-2.jpg',
    description: 'Арахисовая паста с мёдом 240 г.',
    weight: '240 г',
    price: 380
  },
  {
    id: 'peanut-shokolad',
    name: 'Арахисовая паста «Шоколадная»',
    category: 'peanut',
    image: 'cotolog/araxis/Шоколадная-3.jpg',
    description: 'Арахисовая паста «Шоколадная» 240 г.',
    weight: '240 г',
    price: 420
  }
];

// Категории
export const categories = [
  { id: 'all', name: 'Все товары', icon: '🍰' },
  { id: 'torts', name: 'Торты', icon: '🎂' },
  { id: 'desserts', name: 'Десерты', icon: '🧁' },
  { id: 'halva', name: 'Халва', icon: '🍯' },
  { id: 'urbech', name: 'Урбечи', icon: '🥜' },
  { id: 'peanut', name: 'Арахисовая паста', icon: '🥜' }
];

// Функции для работы с товарами
export const getProductsByCategory = (category) => {
  if (category === 'all') return productsData;
  return productsData.filter(product => product.category === category);
};

export const getPopularProducts = () => {
  return productsData.filter(product => product.popular);
};

export const getProductById = (id) => {
  return productsData.find(product => product.id === id);
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return productsData.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery)
  );
};

