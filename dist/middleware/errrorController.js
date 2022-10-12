"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.errorController = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var sendErrorDev = function (err, res) {
    var statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: err.statusCode,
        message: err.message,
        error: err,
        stack: err.stack,
        name: err.name
    });
};
var sendErrorProd = function (err, res) {
    var statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            //stack: err.stack,
            name: err.name,
            operation: err.isOperational
        });
    }
    ;
    //  else if(err.stack){
    //     res.status(statusCode).json({
    //         success: false,
    //         message:"Unable to perform requested operation because you are doing something wrong. read stack error for the error",
    //         stack: err.stack,
    //         name: err.name,
    //         mess:err.message
    //     })
    //}
    //  else {
    //     res.status(statusCode).json({
    //         success: false,
    //         error: err.message,
    //         message:"Something went wrong, please contact Admin",
    //     })
    // }
};
var errorController = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.ENV === "dev") {
        sendErrorDev(err, res);
    }
    ;
    if (process.env.ENV === "prod") {
        sendErrorProd(err, res);
        var error = __assign({}, err);
        if (error.name === 'ExpiredCodeException') {
            var message = error.message;
            var status_1 = error.statusCode || 401;
            return res.status(status_1).json({
                success: false,
                message: message
            });
        }
        ;
        if (error.name === "Error") {
            res.status(error.status || 401);
            return res.json({
                success: false,
                message: error.message
            });
        }
        ;
        if (error.name === "NotAuthorizedException") {
            var status_2 = error.statusCode || 401;
            return res.status(status_2).json({
                success: false,
                error: error.message
            });
        }
        ;
    }
    else {
        return res.status(err.statusCode || 400).json({
            success: false,
            error: err.message,
            message: "Something went wrong, please contact Admin"
        });
    }
};
exports.errorController = errorController;
