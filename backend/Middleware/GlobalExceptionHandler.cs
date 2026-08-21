using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace backend.Middleware;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger = logger;

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "An unexpected error occurred: {Message}", exception.Message);

        var problemDetails = new ProblemDetails
        {
            Instance = httpContext.Request.Path
        };

        if (exception is ArgumentException argumentException)
        {
            var isNotFound = argumentException.Message.Contains("not found", StringComparison.OrdinalIgnoreCase);
            var statusCode = isNotFound ? StatusCodes.Status404NotFound : StatusCodes.Status400BadRequest;

            httpContext.Response.StatusCode = statusCode;
            problemDetails.Status = statusCode;
            problemDetails.Title = isNotFound ? "Not Found" : "Bad Request";
            problemDetails.Detail = argumentException.Message;
        }
        else
        {
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            problemDetails.Status = StatusCodes.Status500InternalServerError;
            problemDetails.Title = "Internal Server Error";
            problemDetails.Detail = "An unexpected error occurred on the server.";
        }

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}
