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
    photos?: Array<{
      url: string;
      alt?: string;
    }>;
    backgroundColor?: string;
    quote?: string;
    quoteSubheading?: string;
    footerText?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    copyright?: string;
    unsubscribeUrl?: string;
    // Zichovec-specific
    menuItems?: Array<{ text: string; url: string }>;
    benefits?: Array<{ icon: string; title: string; description: string }>;
    products?: Array<{
      name: string;
      price: string;
      image?: string;
      alcohol?: string;
      volume?: string;
      salePrice?: string;
      tags?: string[];
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
      subtitle?: string;
      color?: string;
      features?: Array<{ label: string; value: string }>;
      buttonText?: string;
      buttonUrl?: string;
      bgColor?: string;
    }>;
    places?: Array<{ image: string; name: string; buttonText: string; buttonUrl: string }>;
    categories?: Array<{ image: string; tag: string }>;
    email?: string;
    socials?: string[];
    columns?: Array<{ title: string; links: string[] }>;
    viewAllText?: string;
    viewAllUrl?: string;
    positions?: Array<{ title: string; description: string; buttonText: string; buttonUrl: string; bgColor: string }>;
    // Text two columns
    leftColumn?: string;
    rightColumn?: string;
    // Body text + box
    introText?: string;
    sections?: Array<{ heading: string; text: string }>;
    metaDate?: string;
    metaAuthor?: string;
    metaTags?: string;
    metaShare?: string;
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
