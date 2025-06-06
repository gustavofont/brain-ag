export function errorResponse(err: unknown, statusCode: number) {
  if (err instanceof Error) {
    return {
      statusCode,
      message: err.message,
    };
  } else {
    return {
      statusCode,
      message: 'Unknown error',
    };
  }
}

export function informationalResponse(
  statusCode: number,
  message?: string,
  data?: object,
) {
  return {
    statusCode,
    message,
    data,
  };
}
