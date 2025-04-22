import { Router, RequestHandler} from "express";
import { ClassConstructor } from "class-transformer";
import CommonController from "../controller/commonController";
import validationMiddleware from "../../../middlewares/validationMiddleware";

/**
 * Crea un router genérico con las rutas estándar CRUD y validación de DTOs
 * @template D Tipo del DTO
 * @param controller Instancia del controlador para manejar las solicitudes
 * @param dtoClass Clase del DTO para validación
 * @param updateDtoClass Clase del DTO para actualizaciones (opcional, usa dtoClass por defecto)
 * @param customRoutes Función opcional para agregar rutas personalizadas
 * @returns Router configurado con las rutas estándar y personalizadas
 */
const createCommonRouter = <D extends object>(
  controller: CommonController<D>,
  dtoClass: ClassConstructor<D>,
  updateDtoClass?: ClassConstructor<any>,
  customRoutes?: (router: Router, controller: CommonController<D>) => void
): Router => {

  const router = Router();

  const validateUpdateDto = updateDtoClass || dtoClass;
  router.post("/", validationMiddleware(validateUpdateDto), controller.create as RequestHandler);
  // router.get("/:id", controller.findById as RequestHandler);
  // router.get("/", controller.findAll as RequestHandler);
  // router.put("/:id", validationMiddleware(validateUpdateDto), controller.update as RequestHandler);
  // router.delete("/:id", controller.delete as RequestHandler);
  // router.post("/find", controller.findBy as RequestHandler);
  // router.post("/findOne", controller.findOneBy as RequestHandler);

  if (customRoutes) {
    customRoutes(router, controller);
  }

  return router;
};

export default createCommonRouter;