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
    benefits?: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    reviews?: Array<{
      text: string;
      author: string;
      position: string;
    }>;
    events?: Array<{
      date: string;
      title: string;
      instructor: string;
      buttonText?: string;
      buttonUrl?: string;
    }>;
    // Event block
    eventDate?: string;
    eventTitle?: string;
    instructor?: string;
    description?: string;
    // Photos block
    photos?: Array<{
      url: string;
      alt?: string;
    }>;
    // Summary block
    pairs?: Array<{
      subheading: string;
      text: string;
    }>;
    backgroundColor?: string;
    // Summary block additional fields
    subheading1?: string;
    text1?: string;
    subheading2?: string;
    text2?: string;
    // Promo block
    leftImage?: string;
    headline?: string;
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

export interface Benefit {
  title?: string;
  description?: string;
  icon?: string;      // inline SVG for editor preview
  iconUrl?: string;   // hosted PNG used in email/export
}
