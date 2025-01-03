export class TypeormHelper {
  static applyCondition<T extends object>(
    query: Partial<Record<keyof T, any>>,
    validFields: (keyof T)[], // Make sure validFields is an array of keys from T
  ): Partial<T> {
    const where: Partial<T> = {};

    validFields.forEach((field) => {
      const value = query[field];
      if (value !== undefined && value !== null) {
        // Safely cast the value to the appropriate type for `where[field]`
        where[field] = (
          field === 'id' && typeof value === 'string' ? Number(value) : value
        ) as T[keyof T]; // Ensure the value matches the field's type
      }
    });

    return where;
  }
}
