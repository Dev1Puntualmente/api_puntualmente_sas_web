import { Request, Response } from "express";
import CommonService from "../service/commonService";

/**
 * Controlador genérico para manejar operaciones HTTP básicas
 * @template D Tipo del DTO (Data Transfer Object)
 */
export default class CommonController<D> {
  protected service: CommonService<any, D>;

  /**
   * Constructor del controlador
   * @param service Instancia del servicio común para las operaciones con la entidad
   */
  constructor(service: CommonService<any, D>) {
    this.service = service;
  }

  /**
   * Obtiene todos los registros
   * @param req Objeto Request de Express
   * @param res Objeto Response de Express
   */
  findAll = async (req: Request, res: Response) => {
    try {
      const results = await this.service.findAll();
      res.json(results);
    } catch (error) {
      console.error(`❌ Error in findAll method: ${error}`);
      res.status(500).json({ message: "Error retrieving data", error });
    }
  };

  /**
   * Obtiene un registro por su ID
   * @param req Objeto Request de Express con el parámetro id
   * @param res Objeto Response de Express
   */
  findById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = await this.service.findById(id);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    } catch (error) {
      console.error(`❌ Error in findById method: ${error}`);
      res.status(500).json({ message: "Error retrieving data", error });
    }
  };

  /**
   * Crea un nuevo registro
   * @param req Objeto Request de Express con los datos en el body
   * @param res Objeto Response de Express
   */
  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const entity = await this.service.create(data);
      res.status(201).json(entity);
    } catch (error) {
      console.error(`❌ Error in create method: ${error}`);
      res.status(400).json({ message: "Error creating entity", error });
    }
  };

  /**
   * Actualiza un registro existente
   * @param req Objeto Request de Express con el parámetro id y los datos en el body
   * @param res Objeto Response de Express
   */
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedEntity = await this.service.update(id, req.body);
      if (!updatedEntity) {
        return res.status(404).json({ message: "Entity not found" });
      }
      res.json(updatedEntity);
    } catch (error) {
      console.error(`❌ Error in update method: ${error}`);
      res.status(400).json({ message: "Error updating entity", error });
    }
  };

  /**
   * Elimina lógicamente un registro (soft delete)
   * @param req Objeto Request de Express con el parámetro id
   * @param res Objeto Response de Express
   */
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const success = await this.service.delete(id);
      if (!success) {
        return res.status(404).json({ message: "Entity not found" });
      }
      res.json({ message: "Entity deleted successfully" });
    } catch (error) {
      console.error(`❌ Error in delete method: ${error}`);
      res.status(500).json({ message: "Error deleting entity", error });
    }
  };

  /**
   * Encuentra registros que coincidan con ciertos criterios
   * @param req Objeto Request de Express con los criterios en el body
   * @param res Objeto Response de Express
   */
  findBy = async (req: Request, res: Response) => {
    try {
      const criteria = req.body;
      const results = await this.service.findBy(criteria);
      res.json(results);
    } catch (error) {
      console.error(`❌ Error in findBy method: ${error}`);
      res.status(500).json({ message: "Error retrieving data", error });
    }
  };

  /**
   * Encuentra un único registro que coincida con ciertos criterios
   * @param req Objeto Request de Express con los criterios en el body
   * @param res Objeto Response de Express
   */
  findOneBy = async (req: Request, res: Response) => {
    try {
      const criteria = req.body;
      const result = await this.service.findOneBy(criteria);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json(result);
    } catch (error) {
      console.error(`❌ Error in findOneBy method: ${error}`);
      res.status(500).json({ message: "Error retrieving data", error });
    }
  };
}