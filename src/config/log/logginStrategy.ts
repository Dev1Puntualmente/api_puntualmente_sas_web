import { isProduction } from "../app/environmentConfig";
import { loggerFactory } from "./loggerFactory";
import { productionLogger, developmentLogger } from "../utils/loggerEnvironments";

const logginStrategy = () => {
    return isProduction ? loggerFactory.createLogger(productionLogger) : loggerFactory.createLogger(developmentLogger);
}

export default logginStrategy;
