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
    id: 'promo-box',
    name: 'Promo boxy',
    type: 'promo-box',
    thumbnail: '/api/placeholder/200/150',
    color: 'green',
    defaultContent: {}
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
