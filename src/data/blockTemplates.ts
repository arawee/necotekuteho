import { BlockTemplate } from '@/types/newsletter';

export const blockTemplates: BlockTemplate[] = [
  {
    id: 'intro-block',
    name: 'Úvod',
    type: 'intro-block',
    thumbnail: '/api/placeholder/200/150',
    color: 'black',
    defaultContent: {
      title: 'Dynamický styl jógy. Rychlejší tempo, síla, splynutí s dechem',
      text: 'Co je nového u nás Na Zatlance? Na co se můžete těšit v našem studiu v blízké době? Jaké novinky se udály a jaké workshopy a kurzy jsme si pro vás připravili? **Nejdůležitější novinky** z Yoga Movement najdete v našem newsletteru.',
      greeting: '*|IF:VOKATIV|* Krásný den, *|VOKATIV|*, *|ELSE|* Krásný den! *|END:IF|*',
      signature: 'S pozdravem\nTým yoga movement',
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      buttons: [
        { text: 'Rozvrh', url: '#', variant: 'primary' },
        { text: 'Dynamické lekce', url: '#', variant: 'secondary' }
      ]
    }
  },
  {
    id: 'thanks-block',
    name: 'Poděkování',
    type: 'thanks-block',
    thumbnail: '/api/placeholder/200/150',
    color: 'black',
    defaultContent: {
      title: 'Děkujeme za přihlášení!',
      text: 'zdravíme Vás z jógového studia Yoga Movement na Smíchově. Máme radost, že jste se k nám připojili.\n\nNyní si můžete vybrat **Vaši lekci zdarma***. Podívejte se na náš rozvrh a zjistěte, kdy probíhají lekce, které Vás zajímají. Vybranou lekci nám pošlete na tento email spolu s Vaším telefonním kontaktem pro kompletní rezervaci.',
      greeting: '*|IF:VOKATIV|* Krásný den, *|VOKATIV|*, *|ELSE|* Krásný den! *|END:IF|*',
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      buttons: [
        { text: 'Rozvrh', url: '#', variant: 'primary' },
        { text: 'Dynamické lekce', url: '#', variant: 'secondary' }
      ]
    }
  },
  {
    id: 'header-content',
    name: 'Informace',
    type: 'header-content',
    thumbnail: '/api/placeholder/200/150',
    color: 'blue',
    defaultContent: {
      title: 'Informace k lekcím',
      subheading: 'O nás',
      text: 'YOGA MOVEMENT, studio inspirované boutiqovými studii v Jihovýchodní Asii, jsme vytvořili pro všechny, kteří hledají prostor pro svou jógovou praxi, ať už s ní začínají nebo ji chtějí posunout dál.\nChtěli jsme vytvořit prostor, ve kterém se budete cítit skvěle nejen díky józe. Proto u nás najdete pohodlnou lounge zónu, vždy teplý bylinkový čaj nebo čistou vodu, eco jógamatky, které nekloužou ani při dynamické lekci a prostorné zázemí.\nA protože jóga je pro všechny, opravdu pro všechny, v rozvrhu najdete lekce klidné, dynamické i restorativní. Lekce zaměřené na detail v pozici nebo plynulé sekvence.\nKaždou lekci jsme pojmenovali, a to proto, že každý lektor má totiž vlastní styl učení, jiné pozadí svého jógového vzdělání a osobní přístup. Proto jsme dali každé lekci jméno, která odráží styl a individualitu lektora. I přestože v rozvrhu najdete netradiční názvy, všechny lekce navazují na tradiční jógovou filosofii a tradice Hatha a Vinyasa jógy.',
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      buttons: [
        { text: 'Rozvrh', url: '#', variant: 'primary' },
        { text: 'Dynamické lekce', url: '#', variant: 'secondary' }
      ]
    }
  },
  {
    id: 'text-content',
    name: 'Text',
    type: 'text-content',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      title: 'Informace k lekcím',
      subheading: 'O nás',
      text: 'YOGA MOVEMENT, studio inspirované boutiqovými studii v Jihovýchodní Asii, jsme vytvořili pro všechny, kteří hledají prostor pro svou jógovou praxi, ať už s ní začínají nebo ji chtějí posunout dál.\nChtěli jsme vytvořit prostor, ve kterém se budete cítit skvěle nejen díky józe. Proto u nás najdete pohodlnou lounge zónu, vždy teplý bylinkový čaj nebo čistou vodu, eco jógamatky, které nekloužou ani při dynamické lekci a prostorné zázemí.\nA protože jóga je pro všechny, opravdu pro všechny, v rozvrhu najdete lekce klidné, dynamické i restorativní. Lekce zaměřené na detail v pozici nebo plynulé sekvence.\nKaždou lekci jsme pojmenovali, a to proto, že každý lektor má totiž vlastní styl učení, jiné pozadí svého jógového vzdělání a osobní přístup. Proto jsme dali každé lekci jméno, která odráží styl a individualitu lektora. I přestože v rozvrhu najdete netradiční názvy, všechny lekce navazují na tradiční jógovou filosofii a tradice Hatha a Vinyasa jógy.'
    }
  },
  {
    id: 'summary',
    name: 'Shrnutí',
    type: 'summary',
    thumbnail: '/api/placeholder/200/150',
    color: 'yellow',
    defaultContent: {
      title: 'Co chystáme?',
      backgroundColor: '#F8F3EE',
      subheading1: 'Workshopy',
      text1: 'YOGA MOVEMENT, studio inspirované butiqovými studii v Jihovýchodní Asii, jsme vytvořili pro všechny, kteří hledají prostor pro svou jógovou praxi, ať už s ní začínají nebo ji chtějí posunout dál.',
      subheading2: 'Lekce',
      text2: 'Chtěli jsme vytvořit prostor, ve kterém se budete cítit skvěle nejen díky józe. Proto u nás najdete pohodlnou lounge zónu, vždy teplý bylinkový čaj nebo čistou vodu, eco jógamatky, které nekloužou ani při dynamické lekci a prostorné zázemí všatnách.',
      buttons: [
        { text: 'Rozvrh', url: '#', variant: 'primary' },
        { text: 'Dynamické lekce', url: '#', variant: 'secondary' }
      ]
    }
  },
  {
    id: 'single-photo',
    name: 'Fotka – velká',
    type: 'single-photo',
    thumbnail: '/api/placeholder/200/150',
    color: 'red',
    defaultContent: {
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png'
    }
  },
  {
    id: 'single-photo-square',
    name: 'Fotka – malá',
    type: 'single-photo-square',
    thumbnail: '/api/placeholder/200/150',
    color: 'red',
    defaultContent: {
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png'
    }
  },
  {
    id: 'photos',
    name: 'Galerie fotek',
    type: 'photos',
    thumbnail: '/api/placeholder/200/150',
    color: 'red',
    defaultContent: {
      photos: [
        { url: 'https://storage.googleapis.com/yogamovementstudio33228/hero.png', alt: 'Photo 1' },
        { url: 'https://storage.googleapis.com/yogamovementstudio33228/hero.png', alt: 'Photo 2' },
        { url: 'https://storage.googleapis.com/yogamovementstudio33228/hero.png', alt: 'Photo 3' },
        { url: 'https://storage.googleapis.com/yogamovementstudio33228/hero.png', alt: 'Photo 4' }
      ]
    }
  },
  {
    id: 'promo-block',
    name: 'Promo – velké',
    type: 'promo-block',
    thumbnail: '/api/placeholder/200/150',
    color: 'purple',
    defaultContent: {
      title: 'Yoga Movement Retreat',
      subtitle: 'The Art of Stillness',
      date: '4.—6. 4. 2025',
      location: 'Vila šťastná Samota, Vrchotovy Janovice',
      backgroundImage: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      url: '#'
    }
  },
  {
    id: 'promo-wide',
    name: 'Promo – malé',
    type: 'promo-wide',
    thumbnail: '/api/placeholder/200/150',
    color: 'purple',
    defaultContent: {
      title: 'Yoga Movement Retreat',
      subtitle: 'The Art of Stillness',
      date: '4.—6. 4. 2025',
      location: 'Vila šťastná Samota, Vrchotovy Janovice',
      backgroundImage: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      url: '#'
    }
  },
  {
    id: 'events',
    name: 'Akce – kalendář',
    type: 'events',
    thumbnail: '/api/placeholder/200/150',
    color: 'orange',
    defaultContent: {
      title: 'Nejbližší akce',
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      events: [
        {
          date: 'Neděle 1. 6. 15–17.30',
          title: 'Body & Mind Reset\nwith Face Workout',
          instructor: 'Kat Dymáková',
          buttonText: 'Dynamické lekce',
          buttonUrl: '#'
        },
        {
          date: 'Neděle 1. 6. 15–17.30',
          title: 'Body & Mind Reset\nwith Face Workout',
          instructor: 'Kat Dymáková',
          buttonText: 'Dynamické lekce',
          buttonUrl: '#'
        }
      ]
    }
  },
  {
    id: 'harmonogram',
    name: 'Harmonogram',
    type: 'harmonogram',
    thumbnail: '/api/placeholder/200/150',
    color: 'orange',
    defaultContent: {
      title: 'Harmonogram',
      events: [
        {
          date: '15–17.30',
          title: 'Body & Mind Reset\nwith Face Workout',
          instructor: 'Kat Dymáková'
        },
        {
          date: '15.00–17.30',
          title: 'Body & Mind Reset\nwith Face Workout',
          instructor: 'Kat Dymáková'
        },
        {
          date: 'Neděle 1. 6. 15.00–17.30',
          title: 'Body & Mind Reset\nwith Face Workout',
          instructor: 'Kat Dymáková'
        }
      ]
    }
  },
  {
    id: 'event',
    name: 'Akce – detail',
    type: 'event',
    thumbnail: '/api/placeholder/200/150',
    color: 'orange',
    defaultContent: {
      image: 'https://storage.googleapis.com/yogamovementstudio33228/header-bg-1.png',
      eventDate: 'Neděle 1.6. 15-17.30',
      eventTitle: 'Body & Mind Reset with Face Workout',
      instructor: 'Kat Dymáková',
      description: 'YOGA MOVEMENT, studio inspirované boutiqovými studii v Jihovýchodní Asii, jsme vytvořili pro všechny, kteří hledají prostor pro svou jógovou praxi, ať už s ní začínají nebo ji chtějí posunout dál.\nChtěli jsme vytvořit prostor, ve kterém se budete cítit skvěle nejen díky józe. Proto u nás najdete pohodlnou lounge zónu, vždy teplý bylinkový čaj nebo čistou vodu, eco jógamatky, které nekloužou ani při dynamické lekci a prostorné zázemí.\nA protože jóga je pro všechny, opravdu pro všechny, v rozvrhu najdete lekce klidné, dynamické i restorativní. Lekce zaměřené na detail v pozici nebo plynulé sekvence.\nKaždou lekci jsme pojmenovali, a to proto, že každý lektor má totiž vlastní styl učení, jiné pozadí svého jógového vzdělání a osobní přístup. Proto jsme dali každé lekci jméno, která odráží styl a individualitu lektora. I přestože v rozvrhu najdete netradiční názvy, všechny lekce navazují na tradiční jógovou filosofii a tradice Hatha a Vinyasa jógy.',
      buttons: [
        { text: 'Rozvrh', url: '#', variant: 'primary' },
        { text: 'Dynamické lekce', url: '#', variant: 'secondary' }
      ]
    }
  },
  {
    id: 'benefits-offset',
    name: 'Benefity',
    type: 'benefits-offset',
    thumbnail: '/api/placeholder/200/150',
    color: 'pink',
    defaultContent: {
      title: 'Co o nás říkají klienti. Opravdu.',
      benefits: [
        {
          title: 'Splynutí s dechem',
          description: 'Cvičíme v čistém a klidném prostředí, které podporuje soustředění a vnitřní harmonii.',
          icon: '<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.75 7.5C26.683 7.5 28.25 5.933 28.25 4C28.25 2.067 26.683 0.5 24.75 0.5C22.817 0.5 21.25 2.067 21.25 4C21.25 5.933 22.817 7.5 24.75 7.5Z" fill="#393939"/><path d="M22.6098 16.1957C23.0115 16.7943 23.5877 17.2548 24.2602 17.5147C24.9327 17.7745 25.6689 17.8212 26.3687 17.6482L32.1717 16.1974L31.3265 12.8024L25.5235 14.2532L23.1102 10.6359C22.5947 9.86343 21.7945 9.3262 20.8843 9.14144L14.1537 7.79394C13.4008 7.64284 12.619 7.74382 11.9292 8.08131C11.2394 8.41879 10.6798 8.974 10.337 9.66119L7.4355 15.4642L10.5663 17.0304L13.4678 11.2257L16.91 11.9152L8.0095 26.7499H0.25V30.2499H8.0095C9.231 30.2499 10.3808 29.5989 11.0108 28.5507L14.3673 22.9577L23.413 24.7672L26.591 34.3029L29.909 33.1952L26.7327 23.6612C26.5367 23.0759 26.1899 22.5525 25.7272 22.1439C25.2645 21.7353 24.7023 21.4558 24.0973 21.3337L18.779 20.2714L21.88 15.1019L22.6098 16.1957Z" fill="#393939"/></svg>'
        },
        {
          title: 'Rovnováha',
          description: 'Jóga vám pomůže zpomalit, uvolnit napětí a odcházet s pocitem klidu a obnovené energie.',
          icon: '<svg width="27" height="33" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2164 14.8845C20.9522 13.8609 22.3906 12.4072 23.3908 10.6658C24.3909 8.92426 24.9185 6.95467 24.9219 4.94985V3.29985H26.5833V-0.000152588H0V3.29985H1.66146V4.94985C1.66483 6.95467 2.19241 8.92426 3.19255 10.6658C4.19268 12.4072 5.63109 13.8609 7.36691 14.8845C7.95506 15.2277 8.30729 15.7837 8.30729 16.3695V16.6302C8.30729 17.2143 7.95506 17.7687 7.36691 18.1152C5.63109 19.1388 4.19268 20.5924 3.19255 22.3339C2.19241 24.0754 1.66483 26.045 1.66146 28.0498V29.6998H0V32.9998H26.5833V29.6998H24.9219V28.0498C24.9187 26.0454 24.3914 24.0761 23.3915 22.3349C22.3917 20.5937 20.9536 19.1402 19.2181 18.1168C18.6283 17.7703 18.276 17.2143 18.276 16.6302V16.3695C18.276 15.7837 18.6283 15.2277 19.2164 14.8845ZM17.53 20.9581C18.7685 21.6892 19.7945 22.7271 20.5077 23.9702C21.221 25.2134 21.597 26.6191 21.599 28.0498V29.6998H4.98438V28.0498C4.98655 26.6187 5.36281 25.2127 6.07634 23.9693C6.78987 22.7259 7.81621 21.6878 9.05495 20.9565C10.6682 20.011 11.6302 18.3924 11.6302 16.6302V16.3695C11.6302 14.6056 10.6666 12.9853 9.05329 12.0415C7.81488 11.3105 6.78884 10.2726 6.07559 9.02945C5.36235 7.78633 4.98634 6.3806 4.98438 4.94985V3.29985H21.599V4.94985C21.599 7.85385 20.0405 10.5697 17.53 12.0415C15.9168 12.9853 14.9531 14.6056 14.9531 16.3695V16.6302C14.9531 18.3924 15.9151 20.011 17.53 20.9581Z" fill="#393939"/></svg>'
        },
        {
          title: 'Síla',
          description: 'Naše studio se nachází jen kousek od stanice metra Anděl, což zajišťuje snadnou a pohodlnou dostupnost odkudkoli v Praze.',
          icon: '<svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.0002 0.00162888C29.6668 0.00162888 27.6935 1.94663 27.4885 2.15663L25.6785 3.96663L23.8602 2.1533C23.7054 1.99875 23.5218 1.87619 23.3197 1.79263C23.1176 1.70907 22.901 1.66614 22.6823 1.66629C22.4636 1.66645 22.2471 1.70968 22.0451 1.79353C21.8432 1.87738 21.6597 2.00019 21.5052 2.15496L19.4335 4.2283C17.8568 3.63386 16.1852 3.33061 14.5002 3.3333C6.6885 3.3333 0.333496 9.6883 0.333496 17.5C0.333496 25.3116 6.6885 31.6666 14.5002 31.6666C22.3118 31.6666 28.6668 25.3116 28.6668 17.5C28.6668 15.985 28.4268 14.5 27.9535 13.07L30.1952 10.8283C30.5071 10.515 30.6821 10.0909 30.6818 9.64878C30.6815 9.20671 30.5059 8.78279 30.1935 8.46996L28.0385 6.31996L29.8518 4.50663C30.2335 4.12496 31.2602 3.33496 32.0002 3.33496H33.6668V0.00162888H32.0002ZM24.4818 13.2983C25.0468 14.6383 25.3335 16.0516 25.3335 17.5C25.3335 23.4733 20.4735 28.3333 14.5002 28.3333C8.52683 28.3333 3.66683 23.4733 3.66683 17.5C3.66683 11.5266 8.52683 6.66663 14.5002 6.66663C16.1002 6.66663 17.6502 7.01663 19.1035 7.70663C19.7385 8.0083 20.4985 7.8783 20.9968 7.37996L22.6868 5.68996L26.6602 9.65163L24.8402 11.4716C24.6051 11.7057 24.4454 12.0046 24.3815 12.3301C24.3177 12.6556 24.3526 12.9928 24.4818 13.2983Z" fill="#393939"/><path d="M7.00019 17.5C6.99744 18.4854 7.19018 19.4614 7.56724 20.3718C7.9443 21.2821 8.4982 22.1086 9.19686 22.8034L11.5535 20.4467C10.7669 19.6584 10.3335 18.6134 10.3335 17.5C10.3335 16.3867 10.7669 15.3417 11.5535 14.5534C11.9396 14.1653 12.3989 13.8576 12.9047 13.6482C13.4105 13.4388 13.9528 13.3318 14.5002 13.3334V10C13.5149 9.99719 12.5387 10.1899 11.6284 10.567C10.7181 10.944 9.8916 11.498 9.19686 12.1967C8.4982 12.8915 7.9443 13.718 7.56724 14.6283C7.19018 15.5386 6.99744 16.5147 7.00019 17.5Z" fill="#393939"/></svg>'
        },
        {
          title: 'Dopamidetox',
          description: 'Nabízíme ranní i večerní lekce, abyste si mohli vybrat čas, který nejlépe vyhovuje vašemu rytmu.',
          icon: '<svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.6431 0.404205L27.7431 1.03754C24.4868 2.1689 21.0096 2.51608 17.5939 2.05087C14.0048 1.49387 10.3311 1.98883 7.01727 3.47587C5.26053 4.22391 3.7188 5.39949 2.53244 6.89557C1.34608 8.39165 0.552784 10.1607 0.224771 12.0417C-0.108889 13.8506 -0.0747575 15.7081 0.325128 17.5036C0.725014 19.299 1.48246 20.9954 2.55227 22.4917C2.45727 22.8242 2.36227 23.1567 2.2831 23.4892C1.64002 26.2237 1.32116 29.0243 1.3331 31.8334H4.49977C4.6486 29.5341 4.96078 27.2483 5.43394 24.9934C7.63071 26.1796 10.0942 26.7846 12.5906 26.7509C14.9189 26.7493 17.2232 26.2809 19.3673 25.3734C31.4164 20.2275 29.8331 3.11171 29.8331 2.39921L29.6431 0.404205ZM18.1323 22.46C13.9998 24.2175 9.05977 23.9167 6.28894 21.7475C6.75724 20.1817 7.39987 18.6733 8.20477 17.2509C8.8305 16.2271 9.56869 15.2765 10.4056 14.4167C11.2608 13.5478 12.2239 12.7921 13.2714 12.1684C15.436 10.8741 17.8365 10.0237 20.3331 9.66671V8.08337C17.4606 7.98393 14.6057 8.57011 12.0048 9.79337C9.34544 11.091 7.09014 13.089 5.48144 15.5725C4.88479 16.5211 4.3557 17.5105 3.8981 18.5334C3.16426 16.6561 2.95624 14.6142 3.29644 12.6275C3.51933 11.2366 4.09269 9.92538 4.9625 8.81735C5.8323 7.70932 6.96991 6.84099 8.2681 6.29421C10.1612 5.40937 12.2268 4.95515 14.3164 4.96421C15.2981 4.96421 16.2639 5.05921 17.2773 5.13837C20.4508 5.54783 23.6729 5.35987 26.7773 4.58421C26.6664 8.95421 25.8748 19.1667 18.1323 22.46Z" fill="#393939"/></svg>'
        }
      ]
    }
  },
  {
    id: 'reviews-offset',
    name: 'Recenze',
    type: 'reviews-offset',
    thumbnail: '/api/placeholder/200/150',
    color: 'pink',
    defaultContent: {
      title: 'Co o nás říkají klienti. Opravdu.',
      reviews: [
        {
          text: 'Objevila jsem radost z pohybu a relaxace. Profesionální lektoři a příjemné prostředí tvoří perfektní kombinaci pro každodenní cvičení.',
          author: 'Kateřina Brožová',
          position: 'Finance Manager Deloitte'
        },
        {
          text: 'Skvělé místo pro každého, kdo chce zklidnit mysl a posílit tělo!',
          author: 'Martin Horák',
          position: 'Financial Analyst PwC'
        },
        {
          text: '5 z 5. Krásné místo. Děkuji.',
          author: 'Martin Horák',
          position: 'Financial Analyst PwC'
        },
        {
          text: 'Yoga Movement je krásné a klidné místo s profesionálními lektory, kde se člověk opravdu uvolní. Oceňuji příjemné prostředí, kvalitní zázemí a individuální přístup ke cvičení.',
          author: 'Martin Horák',
          position: 'Financial Analyst PwC'
        }
      ]
    }
  },
  {
    id: 'quote',
    name: 'Citát',
    type: 'quote',
    thumbnail: '/api/placeholder/200/150',
    color: 'pink',
    defaultContent: {
      backgroundColor: '#F8F3EE',
      quoteSubheading: 'Zajímavost',
      quote: 'Nebojte se. Na začátku nebudu žádné mosty a ani stání na hlavě. A ano, skoro nikdo si na začátku nedosáhne na špičky nohou.'
    }
  },
  {
    id: 'plain-text',
    name: 'Prostý text',
    type: 'plain-text',
    thumbnail: '/api/placeholder/200/150',
    color: 'gray',
    defaultContent: {
      text: 'Zde můžete napsat jakýkoliv text bez formátování.'
    }
  },
  {
    id: 'footer',
    name: 'Patička',
    type: 'footer',
    thumbnail: '/api/placeholder/200/150',
    color: 'black',
    defaultContent: {
      footerText: 'Budeme se na Vás těšit na viděnou ve studiu.\n\nHezký den,\nAdéla & Tým Yoga Movement',
      backgroundColor: '#F8F3EE',
      socialLinks: [
        { platform: 'Facebook', url: 'https://www.facebook.com/yogamovementstudio/', icon: 'facebook' },
        { platform: 'Instagram', url: 'https://www.instagram.com/yogamovementstudio/', icon: 'instagram' },
        { platform: 'YouTube', url: '', icon: 'youtube' },
        { platform: 'Twitter', url: '', icon: 'twitter' }
      ],
      copyright: 'Copyright © 2025 Yoga Movement',
      unsubscribeUrl: '*|UNSUB|*'
    }
  }
];