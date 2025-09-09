export interface ResponseT {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: {
    type: string;
    code: string;
    detail: string;
    attr: string;
    fa_details: string;
  };
  response: null | any;
}
