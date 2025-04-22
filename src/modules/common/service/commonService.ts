import {
    Repository,
    DataSource,
    EntityTarget,
    ObjectLiteral,
    DeepPartial,
    FindManyOptions,
    FindOptionsWhere,
} from "typeorm";
import { plainToInstance, ClassConstructor } from "class-transformer";
import BaseEntity from "../types/serviceTypes";


import logger from "../logger/logger";


/**
 * Servicio genérico para operaciones CRUD comunes
 * @template T Tipo de la entidad que extiende ObjectLiteral y BaseEntity
 * @template D Tipo del DTO (Data Transfer Object)
 */
export default class CommonService<T extends ObjectLiteral & BaseEntity, D> {
    protected repository: Repository<T>;
    private dataSource: DataSource;
    private dtoClass: ClassConstructor<D>;
    private relations: string[];

    /**
     * Constructor del servicio común
     * @param entity La entidad objetivo
     * @param dataSource La fuente de datos
     * @param dtoClass La clase constructora del DTO
     * @param relations Relaciones a incluir en las consultas
     */
    constructor(
        private entity: EntityTarget<T>,
        dataSource: DataSource,
        dtoClass: ClassConstructor<D>,
        relations: string[] = []
    ) {
        this.dataSource = dataSource;
        this.entity = entity;
        this.dtoClass = dtoClass;
        this.relations = relations;
        this.repository = this.dataSource.getRepository(this.entity);
    }

    /**
     * Encuentra todas las entidades según las opciones proporcionadas
     * @param options Opciones de búsqueda
     * @returns Promesa con un array de DTOs
     */
    async findAll(options?: FindManyOptions<T>): Promise<D[]> {
        try {
            const results = await this.repository.find({ relations: this.relations, ...options });
            return this.transformToDto(results.filter((result) => result.hasDeleted === false)) as D[];
        } catch (error) {
            console.error("Error in findAll method:", error);
            throw error;
        }
    }

    /**
     * Encuentra una entidad por su ID
     * @param id ID de la entidad a buscar
     * @returns Promesa con el DTO o null si no se encuentra
     */
    async findById(id: number | string): Promise<D | null> {
        try {
            const result = await this.repository.findOne({ where: { id } as any, relations: this.relations });
            return result && !result.hasDeleted ? (this.transformToDto(result) as D) : null;
        } catch (error) {
            console.error(`Error in findById method with id ${id}:`, error);
            throw error;
        }
    }

    /**
     * Encuentra entidades según condiciones especificadas
     * @param where Condiciones de búsqueda
     * @returns Promesa con un array de DTOs
     */
    async findBy(where: FindOptionsWhere<T>): Promise<D[]> {
        try {
            const results = await this.repository.find({ where, relations: this.relations });
            return this.transformToDto(results.filter((result) => result.hasDeleted === false)) as D[];
        } catch (error) {
            console.error("Error in findBy method:", error);
            throw error;
        }
    }

    /**
     * Encuentra una entidad según condiciones especificadas
     * @param where Condiciones de búsqueda
     * @returns Promesa con el DTO o null si no se encuentra
     */
    async findOneBy(where: FindOptionsWhere<T>): Promise<D | null> {
        try {
            const result = await this.repository.findOne({ where, relations: this.relations });
            return result && !result.hasDeleted ? (this.transformToDto(result) as D) : null;
        } catch (error) {
            console.error("Error in findOneBy method:", error);
            throw error;
        }
    }

    /**
     * Sanitiza los datos eliminando propiedades que no deberían ser modificables
     * @param data Datos a sanitizar
     * @returns Datos sanitizados
     * @private
     */
    private sanitizeData(data: DeepPartial<T>): DeepPartial<T> {
        ["id", "createdAt", "initAt"].forEach((key) => key in data && delete (data as any)[key]);
        return data;
    }

    /**
     * Crea una nueva entidad
     * @param data Datos para crear la entidad
     * @returns Promesa con el DTO de la entidad creada
     */
    async create(data: DeepPartial<T>): Promise<D> {
        try {
            const entity = this.repository.create(this.sanitizeData(data) as any);
            return this.transformToDto(await this.repository.save(entity)) as D;
        } catch (error) {
            console.error("Error in create method:", error);
            throw error;
        }
    }

    /**
     * Actualiza una entidad existente
     * @param id ID de la entidad a actualizar
     * @param data Datos para actualizar la entidad
     * @returns Promesa con el DTO actualizado o null si no se encuentra
     */
    async update(id: number | string, data: DeepPartial<T>): Promise<D | null> {
        try {
            await this.repository.update(id, this.sanitizeData(data) as any);
            return await this.findById(id);
        } catch (error) {
            console.error(`Error in update method with id ${id}:`, error);
            throw error;
        }
    }

    /**
     * Elimina lógicamente una entidad (soft delete)
     * @param id ID de la entidad a eliminar
     * @returns Promesa con un booleano indicando si la operación fue exitosa
     */
    async delete(id: number | string): Promise<boolean> {
        try {
            const result = await this.repository.update(id, { hasDeleted: true } as DeepPartial<T>);
            return !!result.affected;
        } catch (error) {
            console.error(`Error in delete method with id ${id}:`, error);
            throw error;
        }
    }

    /**
     * Obtiene un constructor de consultas (QueryBuilder)
     * @param alias Alias para la entidad en las consultas
     * @returns Constructor de consultas
     */
    getQueryBuilder(alias: string) {
        try {
            return this.repository.createQueryBuilder(alias);
        } catch (error) {
            console.error(`Error in getQueryBuilder method with alias ${alias}:`, error);
            throw error;
        }
    }

    /**
     * Obtiene el repositorio de la entidad
     * @returns El repositorio de la entidad
     */
    getRepository() {
        try {
            return this.repository;
        }
        catch (error) {
            console.error("Error in getRepository method:", error);
            throw error;
        }
    }

    /**
     * Ejecuta una consulta personalizada y transforma el resultado a DTO
     * @template R Tipo del resultado de la consulta
     * @param queryFunction Función que ejecuta la consulta personalizada
     * @returns Promesa con el resultado transformado a DTO
     */
    async executeCustomQuery<R extends T | T[]>(queryFunction: () => Promise<R>): Promise<R extends T[] ? D[] : D> {

        try {
            return this.transformToDto(await queryFunction()) as any;
        } catch (error) {
            console.error("Error in executeCustomQuery method:", error);
            throw error;
        }
    }

    /**
     * Transforma una entidad o un array de entidades a su correspondiente DTO
     * @param data Entidad o array de entidades a transformar
     * @returns DTO o array de DTOs transformados
     * @protected
     */
    protected transformToDto(data: T | T[]): D | D[] {

        if (!data) {
            console.warn("No data provided for transformation.");
            return null as any;
        }

        if (Array.isArray(data)) {

            if (data.length === 0) {
                console.warn("Empty array provided for transformation.");
                return [] as D[];
            }

            if (data.some(item => typeof item !== "object")) {
                console.error("Invalid data format: expected an array of objects.");
                return [] as D[];
            }

            const transformedData = [...data];

            transformedData.forEach((item: any) => {
                if ("hasDeleted" in item) {
                    delete item.hasDeleted;
                }
            });

            return plainToInstance(this.dtoClass, transformedData, { excludeExtraneousValues: true });

        } else {

            const transformedData = { ...data as any };
            if ("hasDeleted" in transformedData) {
                delete transformedData.hasDeleted;
            }
            return plainToInstance(this.dtoClass, transformedData, { excludeExtraneousValues: true });

        }
    }
}