module.exports = {
  apps: [
    {
      name: 'phimhay247-nuxt-app',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      watch: ['.output/server'],
      watch_delay: 1000,
      ignore_watch: ['.output/public'],
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      update_env: true
    }
  ]
};
