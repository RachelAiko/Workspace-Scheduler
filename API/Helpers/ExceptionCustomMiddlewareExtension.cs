using API.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;
namespace API.Helpers
{
    public class ExceptionCustomMiddlewareExtension
    {
        private readonly RequestDelegate _next;
            public ExceptionCustomMiddlewareExtension(RequestDelegate next)
            {
                _next = next;
            }
            public async Task InvokeAsync(HttpContext httpContext)
            {
                try
                {
                    await _next(httpContext);
                }
                catch (Exception ex)
                {
                    await HandleExceptionAsync(httpContext, ex);
                }
            }
            private async Task HandleExceptionAsync(HttpContext context, Exception exception)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync(new Error()
                {
                    Code = context.Response.StatusCode,
                    Message = "Internal Server Error from the custom middleware."
                }.ToString());
            }
    }


}
