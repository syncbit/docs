module.exports = {
    title: 'Synctune Docs',
    description: '',
    head: [
        [ 'link', { rel: 'icon', sizes: "16x16", href: '/favicon-16x16.ico' } ],
        [ 'link', { rel: 'icon', sizes: "32x32", href: '/favicon-32x32.ico' } ],
        [ 'link', { rel: 'icon', sizes: "64x64", href: '/favicon-64x64.ico' } ],
        [ 'link', { rel: 'icon', sizes: "128x128", href: '/favicon-128x128.ico' } ],
        [ 'meta', { name: 'theme-color', content: '#CF97F5'} ]
    ],
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Room Server", link: "/room-server/" }
        ],
        // Enable sidebar on specific pages
        sidebar: [
            '/room-server/'
        ]
    },
    markdown: {
        plugins: [
            [require('markdown-it-custom-header-link')]
        ]
    }
}