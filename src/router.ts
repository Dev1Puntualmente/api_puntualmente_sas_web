import path from "path";
import { globSync } from "glob";
import { Express } from "express";

import logger from "./modules/common/logger/logger";
import { baseDir, fileExt } from "./config/app/environmentConfig"
import AppConfig from "./config/app/appConfig";


/**
 * Inicializa todas las rutas manualmente registradas
 * @param app Instancia de Express
 * @param config Configuración de la aplicación
 */
const initializeRoutes = async (app: Express, config: AppConfig) => {
  try {
    logger.info(`Entorno: ${process.env.NODE_ENV}`);
    const routeFiles = globSync(`${baseDir}/modules/**/routes/*.${fileExt}`, { absolute: true });

    if (routeFiles.length === 0) {
      logger.warn("⚠️ No route files found.");
      return;
    }

    logger.info(`⌛ Found ${routeFiles.length} route files.`);
    logger.info("⌛ Importing routes...");

    await Promise.all(
      routeFiles.map(async (routeFile) => {
        try {
          const routePath = path.resolve(routeFile);
          const pathParts = routePath.split(path.sep);
          const modulesIndex = pathParts.indexOf("modules");
          const moduleName = pathParts[modulesIndex + 1];
          
          logger.info(`⌛ Importing: ${moduleName}s`);
          const routerModule = await import(routePath);

          if (routerModule?.default) {
            const url = `${config.API_PREFIX}${config.API_VERSION}/${moduleName}s`;
            app.use(url, routerModule.default);
            logger.info(`✅ Routes loaded: ${url}`);
          } else {
            logger.warn(`⚠️ No export default found in ${routeFile}`);
          }
        } catch (importError) {
          logger.error(`❌ Error importing ${routeFile}:`, importError);
        }
      })
    );
  } catch (error) {
    logger.error("❌ Error initializing routes:", error);
  }
};

export default initializeRoutes;