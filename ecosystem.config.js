require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'frontend-service',
    script: './frontend/build/app.js',
  },
  {
    name: 'api-service',
    script: './backend/build/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Shahtarov/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH},
      'post-deploy': 'npm i && npm run build',
    },
  },
};