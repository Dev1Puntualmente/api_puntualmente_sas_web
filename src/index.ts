import app from "./app";
import initializeRoutes from "./router";
import dataSource from "./db/dataSource";
import appConfig from "./config/app/singleton";
import AppConfig from "./config/app/appConfig";
import logger from "./modules/common/logger/logger";
import initializeDataSource from "./db/initializeDataSource";

const startServer = async (appConfig: AppConfig) => {
    try {
        await initializeDataSource(dataSource);
        await initializeRoutes(app, appConfig);

        app.listen(appConfig.API_PORT, () => {
            logger.info(`🚀 App is started in port ${appConfig.API_PORT}`);
            logger.info(
                `🔗 API URL: http://localhost:${appConfig.API_PORT}${appConfig.API_PREFIX}${appConfig.API_VERSION}`
            );
        });

        app.get(`${appConfig.API_PREFIX}${appConfig.API_VERSION}`, (req, res) => {
            res.status(200).json({"message": "API is running", apiUrl: `${appConfig.API_BASE_URL}`});
        })
        ;

    } catch (error) {
        logger.error(`❌ Error initializing: ${error}`);
        process.exit(1);
    }
}

startServer(appConfig);