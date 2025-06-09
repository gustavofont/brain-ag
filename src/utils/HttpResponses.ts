import logger from '@src/logges';

/**
 * Returns a HTTP Error Response based on params
 * @param statusCode Status code
 * @param message Server message
 * @param data Server Data
 * @returns HTTP Response
 */
export function errorResponse(err: unknown, statusCode: number) {
  logger.error(err);
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

/**
 * Returns a HTTP Response based on params
 * @param statusCode Status code
 * @param message Server message
 * @param data Server Data
 * @returns HTTP Response
 */
export function informationalResponse(
  statusCode: number,
  message?: string | object,
  data?: object,
) {
  if (message) {
    logger.info(message);
  }

  return {
    statusCode,
    message,
    data,
  };
}
