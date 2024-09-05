require("dotenv").config();

const {
	DEPLOY_USER,
	DEPLOY_HOST,
	DEPLOY_PATH,
	DEPLOY_REF,
	DEPLOY_REPO,
	DEPLOY_FOLDER = "origin/master"
} = process.env;

module.exports = {
	apps: [
		{
			name: "frontend-service",
			script: "./build/app.js"
		}
	],

	deploy: {
		production: {
			user: DEPLOY_USER,
			host: DEPLOY_HOST,
			ref: DEPLOY_REF,
			repo: DEPLOY_REPO,
			path: DEPLOY_PATH,
			"pre-deploy": `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
			"post-deploy": `cd ~${DEPLOY_FOLDER} && npm i && npm run build && pm2 restart ecosystem.config.js`
		}
	}
};
