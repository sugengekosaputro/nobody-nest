export class ResponseDto {
  name?: string;
  message?: string;
  code?: number;
  status?: number;
  requestTime?: number;
  data?: any; // data can be any type (array, object, boolean, null, etc.)
  meta?: {
    page?: {
      current: number;
      total: number;
    };
    record?: {
      current: number;
      total: number;
    };
    link?: {
      first: string;
      next: string;
      prev: string | null;
      last: string;
      current: string;
    };
  };

  constructor(init?: Partial<ResponseDto>) {
    Object.assign(this, init);
  }
}
