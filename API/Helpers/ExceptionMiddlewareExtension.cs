using API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Net;
namespace API.Helpers
{
	public static class ExceptionMiddlewareExtension
	{
		public static void ConfigureExceptionMiddleware(this IApplicationBuilder app)
		{
			app.UseMiddleware<ExceptionCustomMiddlewareExtension>();
		}
		public static void ConfigureExceptionHandler(this IApplicationBuilder app)
		{
			app.UseExceptionHandler(appError =>
			{
				appError.Run(async context =>
							{
								context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
								context.Response.ContentType = "application/json";
								var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
								if (contextFeature != null)
								{
									await context.Response.WriteAsync(new Error()
									{
										Code = context.Response.StatusCode,
										Message = "Internal Server Error."
									}.ToString());
								}
							});
			});
		}
	}


}