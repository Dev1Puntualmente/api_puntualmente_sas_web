import { DataSource } from "typeorm";
import logger from "../modules/common/logger/logger";

const initializeDataSource = async (dataSource: DataSource) => {
  try {
    dataSource
      .initialize()
      .then(() => {
        logger.info(`🛢️ Connecting to ${dataSource.options.database}`);
      })
      .then(() => {
        logger.info(`🛢️ ${dataSource.options.database}  is connected!`);
      })
      .catch((error) => {
        logger.error(`❌ Error initializing 🛢️ ${dataSource.options.database}: ${error}`);
        throw error;
      });
  } catch (error) {
    logger.error(`❌ Error initializing 🛢️ ${dataSource.options.database}: ${error}`);
    throw error;
  }
};

export default initializeDataSource;