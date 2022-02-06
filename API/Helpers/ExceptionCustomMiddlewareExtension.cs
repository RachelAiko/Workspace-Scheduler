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
                catch (ArgumentException argumentEx)
                {
                    Console.WriteLine("Argument Exception");
                    await HandleExceptionAsync(httpContext, argumentEx);
                }
                catch (FormatException FormatEx)
                {
                    Console.WriteLine("Format Exception");
                    await HandleExceptionAsync(httpContext, FormatEx);
                }
                catch (FirebaseAdmin.Auth.FirebaseAuthException FirebaseAuthEx)
                {
                    Console.WriteLine("Firebase Auth Error");
                    await HandleExceptionAsync(httpContext, FirebaseAuthEx);
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

                var message = exception switch
                {
                    ArgumentException => "Argument Exception", FormatException => "Invalid Authentication Token", 
                    FirebaseAdmin.Auth.FirebaseAuthException => "Expired Authentication Token", _ => "Internal Server Error"
                };

                await context.Response.WriteAsync(new Error()
                {
                    Code = context.Response.StatusCode,
                    Message = message
                }.ToString());
            }
    }


}


/*


Console.WriteLine("---------********************************---------");
Console.WriteLine(e.Source);
Console.WriteLine("------------------");
Console.WriteLine(e.StackTrace);
Console.WriteLine("------------------");
Console.WriteLine(e.Message);
//Console.WriteLine(e.GetType);
Console.WriteLine("---------*********************************---------");



*/
