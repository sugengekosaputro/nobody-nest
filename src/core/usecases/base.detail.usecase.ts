import { ResponseDto } from "../../dtos/response.dto";

/**
 * Abstract base class for handling detail retrieval use cases.
 *
 * @template TQuery - The type of query parameters used to fetch the entity (e.g., an ID or UUID).
 * @template TEntity - The type of the entity being retrieved.
 *
 * Usage:
 * Extend this class in your use case for fetching entity details,
 * and implement the `execute` and `executeAsResponse` methods to handle retrieval logic.
 */
export abstract class BaseDetailUsecase<TQuery, TEntity> {
  /**
   * Executes the detail retrieval use case and returns the raw entity.
   *
   * @param query - The query parameters for finding the entity.
   * @returns A promise of the retrieved entity.
   * @throws Throws an error (e.g., NotFoundException) if the entity is not found.
   */
  abstract execute(query: TQuery): Promise<TEntity>;

  /**
   * Executes the detail retrieval use case and returns a response DTO.
   *
   * @param query - The query parameters for finding the entity.
   * @returns A promise of the response DTO containing the entity.
   */
  abstract executeAsResponse(query: TQuery): Promise<ResponseDto>;
}
