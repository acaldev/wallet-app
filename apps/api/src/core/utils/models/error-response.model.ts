export interface ErrorResponse {
  error: {
    code: string;
    title: string;
    messages: string[];
  };
}
