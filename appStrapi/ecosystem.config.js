module.exports = {
    apps: [
      {
        name: 'dist strapi zero',
        // cwd: '/home/debian/appVue/dist',

        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          // PORT: 8080 // spécifier le port ici
        }
      }
    ]
  }
  