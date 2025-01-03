/**
 * Abstract base class for handling create use cases.
 *
 * @template TInput - The type of input data required to create an entity (e.g., DTO).
 * @template TOutput - The type of output returned after the creation process (e.g., a response or entity).
 *
 * Usage:
 * Extend this class in your use case for creating entities,
 * and implement the `execute` method to handle the creation logic.
 */
export abstract class BaseCreateUsecase<TInput, TOutput> {
  /**
   * Executes the create use case.
   *
   * @param input - The input data required for creating the entity.
   * @returns A promise of the created entity or a response object.
   */
  abstract execute(input: TInput): Promise<TOutput>;
}
