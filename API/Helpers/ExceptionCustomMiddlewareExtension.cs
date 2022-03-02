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
                //Assign exception Status Code based on thrown exception
                var code = exception switch
                {
                    ArgumentException => context.Response.StatusCode = 500, 
                    FormatException => context.Response.StatusCode = 500, 
                    FirebaseAdmin.Auth.FirebaseAuthException => context.Response.StatusCode = 401, 
                    Newtonsoft.Json.JsonReaderException => context.Response.StatusCode = 500, 
                    _ => context.Response.StatusCode = 500
                };
                //Assign exception message based on thrown exception
                var message = exception switch
                {
                    ArgumentException => "Argument Exception", 
                    FormatException => "Invalid Authentication Token", 
                    FirebaseAdmin.Auth.FirebaseAuthException => "Expired Authentication Token", 
                    Newtonsoft.Json.JsonReaderException => "Json Reader Exception", 
                    _ => exception.Message
                };

                await context.Response.WriteAsync(new Error()
                {
                    Code = context.Response.StatusCode,
                    Message = message
                }.ToString());
            }
    }
}



