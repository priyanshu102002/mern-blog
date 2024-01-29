// Jab system koi error na de phir v hm cross-check kr skte hai ki kya error aaya hai using errorHandler function  -> next(errorHandler(500, 'Internal Server Error'))

export const errorHandler = (statusCode, message) => {
    const error = new Error()
    error.statusCode = statusCode;
    error.message = message;
    return error;
};