module.exports = {
    title: 'Syncbit Docs',
    description: '',
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Signalling Server", link: "/signalling-server/" }
        ],
        // Enable sidebar on specific pages
        sidebar: [
            '/signalling-server/'
        ]
    },
    markdown: {
        plugins: [
            [require('markdown-it-custom-header-link')]
        ]
    }
}