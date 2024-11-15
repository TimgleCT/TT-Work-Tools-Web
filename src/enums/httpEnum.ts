export enum ResultEnum {
    DATA_SUCCESS = 0,
    SUCCESS = 200,
    SERVER_ERROR = 500,
    CSRF_ERROR = 419,
    UNAUTHORIZED = 401,
    SERVER_FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOKEN_OVERDUE = 886,
    TIMEOUT = 60000,
}

export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ContentTypeEnum {
    JSON = 'application/json;charset=UTF-8',
    FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
}