import { Express } from "express";
import { DataSource, EntityTarget } from "typeorm";

import CommonService from "../service/commonService";
import AppConfig from "../../../config/app/appConfig";
import ModuleConfig from "../types/moduleConfigTypes";
import createCommonRouter from "../router/createCommonRouter";
import CommonController from "../controller/commonController";
import BaseEntity from "../types/serviceTypes";

/**
 * Configura un módulo completo (servicio, controlador y rutas) automáticamente
 * @param app Instancia de Express
 * @param config Configuración de la aplicación
 * @param dataSource Fuente de datos TypeORM
 * @param moduleName Nombre del módulo (se usará para la ruta)
 * @param moduleConfig Configuración del módulo
 */
const configureModule = <T extends BaseEntity, D extends object>(
  app: Express,
  config: AppConfig,
  dataSource: DataSource,
  moduleName: string,
  moduleConfig: ModuleConfig<T, D>
) => {
  try {
    const service = new CommonService<T, D>(
      moduleConfig.entity as EntityTarget<T>,
      dataSource,
      moduleConfig.dtoClass,
      moduleConfig.relations || []
    );
    const controller = new CommonController<D>(service);
    const router = createCommonRouter<D>(
      controller, 
      moduleConfig.dtoClass
    );
    const routeName = `${moduleName}s`;
    const url = `${config.API_PREFIX}${config.API_VERSION}/${routeName}`;
    app.use(url, router);

    console.log(`✅ Module ${moduleName} configured and routes loaded: ${url}`);

    return { service, controller, router };
  } catch (error) {
    console.error(`❌ Error configuring module ${moduleName}:`, error);
    throw error;
  }
};

export default configureModule;