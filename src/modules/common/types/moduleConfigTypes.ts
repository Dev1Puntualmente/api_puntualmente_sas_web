import { ClassConstructor } from "class-transformer";
import { EntityTarget, ObjectLiteral } from "typeorm";
import { Router } from "express";

import CommonController from "../controller/commonController";
import BaseEntity from "../types/serviceTypes";

/**
 * Interfaz para definir la configuración del módulo
 * @template T Tipo de la entidad que extiende BaseEntity
 * @template D Tipo del DTO
 */
export default interface ModuleConfig<T extends BaseEntity, D> {
  entity: EntityTarget<T>;
  dtoClass: ClassConstructor<D>;
  relations?: string[];
  customRoutes?: (router: Router, controller: CommonController<D>) => void;
}