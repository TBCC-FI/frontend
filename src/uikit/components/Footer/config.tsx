import { Language } from '../LangSelector/types'
import { FooterLinkType } from './types'

export const footerAboutUsLinks: FooterLinkType[] = [
  {
    label: 'Announcement',
    href: '#',
  },
  {
    label: 'Blog',
    href: '#',
  },
  {
    label: 'TBCC Token',
    href: '#',
  },
  {
    label: 'Team',
    href: '#',
  },
]
export const footerSupportLinks: FooterLinkType[] = [
  {
    label: 'Fees',
    href: '#',
  },
  {
    label: 'Trading Rules',
    href: '#',
  },
  {
    label: 'FAQ',
    href: '#',
  },
  {
    label: 'Submit a Ticket',
    href: '#',
  },
  {
    label: 'Affiliate Program',
    href: '#',
  }
]

export const socials: FooterLinkType[] = [ 
  {
    label: 'Telegram channel',
    href: 'https://t.me/b8dex',
  },
  {
    label: 'Telegram chat',
    href: 'https://t.me/b8dex',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/b8dex',
  },
  {
    label: 'Facebook',
    href: 'https://instagram.com/b8dex_exchange_',
  },
  {
    label: 'Discord',
    href: 'https://instagram.com/b8dex_exchange_',
  }
]

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}))
