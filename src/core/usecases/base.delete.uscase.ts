import { ResponseDto } from "../../dtos/response.dto";

/**
 * Abstract base class for handling delete use cases.
 *
 * @template TQuery - The type of query parameters used to identify the entity to delete (e.g., an ID or UUID).
 * @template TEntity - The type of the entity being deleted.
 *
 * Usage:
 * Extend this class in your use case for deleting entities,
 * and implement the `execute` and `executeAsResponse` methods to handle the deletion logic.
 */
export abstract class BaseDeleteUsecase<TQuery> {
  /**
   * Executes the delete use case and removes the entity.
   *
   * @param query - The query parameters for finding the entity to delete.
   * @returns A promise that resolves when the entity is successfully deleted.
   * @throws Throws an error if the entity is not found.
   */
  abstract execute(query: TQuery): Promise<ResponseDto>;


}
