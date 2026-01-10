import { BlockTemplate } from '@/types/newsletter';

export const blockTemplates: BlockTemplate[] = [
  {
    id: 'zichovec-header',
    name: 'Záhlaví',
    type: 'zichovec-header',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      image: ''
    }
  },
  {
    id: 'zichovec-header-menu',
    name: 'Záhlaví s menu',
    type: 'zichovec-header-menu',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      image: '',
      menuItems: [
        { text: 'E-shop ↓', url: '#' },
        { text: 'Limitky a Novinky', url: '#' },
        { text: 'Dárky a balíčky', url: '#' },
        { text: 'Zachraň pivo', url: '#' }
      ]
    }
  },
  {
    id: 'benefits',
    name: 'Benefity',
    type: 'benefits',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      benefits: [
        { icon: '', title: 'Experiment', description: 'Náš pivovar rád experimentuje a neustále objevuje nové chutě a způsoby vaření piva.' },
        { icon: '', title: 'Radost', description: 'Pivo jako radost, zážitek, komunita.' },
        { icon: '', title: 'Komunita', description: 'Propojujeme zákazníky s výrobou, sládky, inspirací, chutěmi i místem.' }
      ]
    }
  },
  {
    id: 'article-text',
    name: 'Článek',
    type: 'article-text',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      title: 'OPA: Jemná evoluce moderních ale',
      text: '',
      quote: 'OPA je pivo, které spojuje lehkost, sametovou jemnost a moderní chmelení v harmonický celek'
    }
  },
  {
    id: 'product-list',
    name: 'List produktů',
    type: 'product-list',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      title: 'Mohlo by vám chutnat'
    }
  },
  {
    id: 'promo-box',
    name: 'Promo boxy',
    type: 'promo-box',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {}
  },
  {
    id: 'mista',
    name: 'Místa',
    type: 'mista',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      title: 'Kde nás ochutnáte?'
    }
  },
  {
    id: 'categories',
    name: 'Kategorie',
    type: 'categories',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      title: 'Vyber si to pravé pro tebe'
    }
  },
  {
    id: 'locations',
    name: 'Lokace',
    type: 'locations',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      title: 'Kde nás ochutnáte?'
    }
  },
  {
    id: 'pozice',
    name: 'Pozice',
    type: 'pozice',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      title: 'Volné pozice'
    }
  },
  {
    id: 'product-text',
    name: 'Produkt + text',
    type: 'product-text',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      title: 'Magop',
      text: 'V pátce roku 2019 vyhlášena servrem Untapped.com nejlepším pivem v České republice.'
    }
  },
  {
    id: 'blog-posts',
    name: 'Blog posty',
    type: 'blog-posts',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {
      title: 'Novinky od ZICHOVCE'
    }
  },
  {
    id: 'gallery-trio',
    name: 'Galerie trio',
    type: 'gallery-trio',
    thumbnail: '/api/placeholder/200/150',
    color: 'red',
    defaultContent: {
      photos: []
    }
  },
  {
    id: 'gallery-duo',
    name: 'Galerie duo',
    type: 'gallery-duo',
    thumbnail: '/api/placeholder/200/150',
    color: 'red',
    defaultContent: {
      photos: []
    }
  },
  {
    id: 'gallery-single',
    name: 'Galerie one foto',
    type: 'gallery-single',
    thumbnail: '/api/placeholder/200/150',
    color: 'red',
    defaultContent: {
      photos: []
    }
  },
  {
    id: 'text-two-columns',
    name: 'Text',
    type: 'text-two-columns',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      leftColumn: 'Slovníček',
      rightColumn: 'NEIPA, neboli New England India Pale Ale, je moderní, svrchně kvašený styl piva.'
    }
  },
  {
    id: 'zichovec-footer',
    name: 'Patička',
    type: 'zichovec-footer',
    thumbnail: '/api/placeholder/200/150',
    color: 'black',
    defaultContent: {
      footerText: '+420 602 555 555',
      copyright: 'Copyright © 2025 Pivovar ZICHOVEC. Všechna práva vyhrazena.'
    }
  }
];
