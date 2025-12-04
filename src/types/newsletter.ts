export interface NewsletterBlock {
  id: string;
  type: string;
  content: {
    title?: string;
    text?: string;
    image?: string;
    buttons?: Array<{
      text: string;
      url: string;
      variant?: 'primary' | 'secondary';
    }>;
    subheading?: string;
    greeting?: string;
    signature?: string;
    backgroundImage?: string;
    date?: string;
    location?: string;
    subtitle?: string;
    url?: string;
    // Photos/Gallery
    photos?: Array<{
      url: string;
      alt?: string;
    }>;
    backgroundColor?: string;
    // Quote block
    quote?: string;
    quoteSubheading?: string;
    // Footer block
    footerText?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    copyright?: string;
    unsubscribeUrl?: string;
    // Zichovec-specific
    products?: Array<{
      name: string;
      price: string;
      image?: string;
    }>;
    locations?: Array<{
      name: string;
      address: string;
    }>;
    posts?: Array<{
      title: string;
      date: string;
      image?: string;
    }>;
    boxes?: Array<{
      title: string;
      subtitle: string;
      color?: string;
    }>;
  };
}

export interface Newsletter {
  id: string;
  name: string;
  blocks: NewsletterBlock[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockTemplate {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  color: string;
  defaultContent: NewsletterBlock['content'];
}
