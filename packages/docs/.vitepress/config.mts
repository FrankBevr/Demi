import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Demi",
  head: [['link', { rel: 'icon', href: 'https://i.ibb.co/NL8Vj8N/image.png' }]],
  description: "Incentives System for AI Nodes",
  themeConfig: {
    logo: "https://i.ibb.co/NL8Vj8N/image.png",
    nav: [
      { text: 'Intro', link: '/01-Intro/01-Summary' },
      { text: 'Main', link: '/02-Main/00-Overview' },
      { text: 'Outro', link: '/03-Outro/01-Summary' },
    ],
    sidebar: [
      {
        text: 'Intro',
        items: [
          { text: 'Summary', link: '/01-Intro/01-Summary' },
        ]
      },
      {
        text: 'Main',
        items: [
          { text: 'Overview', link: '/02-Main/00-Overview' },
        ]
      },
      {
        text: 'Outro',
        items: [
          { text: 'Summary', link: '/03-Outro/01-Summary' },
        ]
      },
      {
        text: 'Notes',
        items: [
          { text: 'Validation Evalution Call', link: '/04-Notes/Call-BotondFrank-14012024' },
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/frankbevr/Demi' }
    ]
  }
})

