/**
 * Abstract base class for handling update use cases.
 *
 * @template TQuery - The type of query parameters used to identify the entity to update (e.g., an ID or UUID).
 * @template TPayload - The type of the payload containing the update data (e.g., DTO).
 * @template TOutput - The type of output returned after the update process (e.g., a response or updated entity).
 *
 * Usage:
 * Extend this class in your use case for updating entities,
 * and implement the `execute` method to handle the update logic.
 */
export abstract class BaseUpdateUsecase<TQuery, TPayload, TOutput> {
  /**
   * Executes the update use case.
   *
   * @param query - The query parameters for finding the entity to update.
   * @param payload - The update data to apply to the entity.
   * @returns A promise of the updated entity or a response object.
   */
  abstract execute(query: TQuery, payload: TPayload): Promise<TOutput>;
}
