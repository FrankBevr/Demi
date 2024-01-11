import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Incento",
  description: "Incentives System for AI Nodes",
  themeConfig: {
    nav: [
      { text: 'Intro', link: '../01-Intro/01-Summary' },
      { text: 'Main', link: '../02-Main/00-Overview' },
      { text: 'Outro', link: '../03-Outro/01-Summary' },
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
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/frankbevr/incento' }
    ]
  }
})

