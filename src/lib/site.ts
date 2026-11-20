// One source of truth for who we are: used by meta tags, JSON-LD, sitemap and llms.txt.
export const SITE = {
  name: 'OWASP Sofia',
  legalName: 'OWASP Sofia Chapter',
  url: 'https://owasp.bg',
  email: 'contact@owasp.bg',
  members: '800+', // Meetup group members; update by hand
  logo: '/assets/images/logo-black-stroke.png',
  image: '/assets/images/og-default.jpg',
  description:
    'OWASP Sofia — българският чаптър на OWASP Foundation. Безплатни срещи за сигурност на приложенията (AppSec), DevSecOps и киберсигурност в София, с презентации, записи и слайдове.',
  descriptionEn:
    'OWASP Sofia is the Bulgarian chapter of the OWASP Foundation: free, community-run meetups on application security, DevSecOps and cybersecurity in Sofia, Bulgaria.',
  leaders: [
    { name: 'Miglen Evlogiev', url: 'https://www.linkedin.com/in/miglen/' },
    { name: 'Todor Todorov', url: 'https://www.linkedin.com/in/totollygeek/' },
    { name: 'Martin Stoynov', url: 'https://www.linkedin.com/in/martinstnv/' },
    { name: 'Georgi Ribarski', url: 'https://bg.linkedin.com/in/gribarski' },
  ],
  links: {
    meetup: 'https://www.meetup.com/owasp-sofia-chapter/',
    luma: 'https://luma.com/owasp-sofia',
    sessionize: 'https://sessionize.com/owasp-sofia/',
    discord: 'https://discord.com/channels/849266967856414731/981867323298312223',
    slack: 'https://owasp.org/slack/invite',
    linkedin: 'https://www.linkedin.com/company/107314221/',
    facebook: 'https://www.facebook.com/owaspbg',
    github: 'https://github.com/owaspbg',
    owaspChapter: 'https://owasp.org/chapters/sofia',
  },
} as const;

export const abs = (path: string) => new URL(path, SITE.url).href;
