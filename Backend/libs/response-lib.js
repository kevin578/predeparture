export function success(body) {
    return buildResponse(200, body);
  }
  
  export function failure(body) {
    return buildResponse(500, body);
  }
  
  function buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
  }