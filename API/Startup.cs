using System;
using System.IO;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;
using API.Helpers;

namespace API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<DatabaseSettings>(
				Configuration.GetSection(nameof(DatabaseSettings)));

			services.AddSingleton<IDatabaseSettings>(sp =>
				sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);

			services.AddSingleton<OfficeService>();
			services.AddSingleton<ReservationService>();
			services.AddSingleton<UserService>();
			services.AddSingleton<WorkspaceService>();
			services.AddSingleton<WorkspaceTypeService>();

			services.AddControllers();

			services.AddCors();

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
			});

			FirebaseApp.Create(new AppOptions
			{
				Credential = GoogleCredential.FromFile(Path.Combine(Directory.GetCurrentDirectory(), "keys", "workspace-scheduler-firebase-adminsdk-8abi1-d0c895d5df.json"))
			});

			// services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			// 	.AddJwtBearer(options =>
			// 		{
			// 			var firebaseProjectName = Configuration["workspace-scheduler"];
			// 			options.Authority = "https://securetoken.google.com/" + firebaseProjectName;
			// 			options.TokenValidationParameters = new TokenValidationParameters
			// 			{
			// 				ValidateIssuer = true,
			// 				ValidIssuer = "https://securetoken.google.com/" + firebaseProjectName,
			// 				ValidateAudience = true,
			// 				ValidAudience = firebaseProjectName,
			// 				ValidateLifetime = true
			// 			};
			// 		});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
			}
			app.ConfigureExceptionMiddleware();

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			//Inject Exception Middleware into App
			//app.UseMiddleware(typeof(ExceptionHandlingMiddleware));
		}
	}
}
