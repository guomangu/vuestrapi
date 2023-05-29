module.exports = {
    apps: [
      {
        name: 'dist vue zero',
        // cwd: '/home/debian/appVue/dist',

        script: 'npx',
        args: 'serve -s dist -l 8080',
        env: {
          NODE_ENV: 'production',
          // PORT: 8080 // spécifier le port ici
        }
      }
    ]
  }
  