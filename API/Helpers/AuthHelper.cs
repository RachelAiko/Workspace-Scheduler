using System;
using System.Net;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
	public static class AuthHelper
	{
		public async static void AuthorizeRequest(HttpRequest request)
		{
				//request.Headers.TryGetValue("Authorization", out var idToken);
				if (request.Headers.TryGetValue("Authorization", out var idToken))
				{
					try
					{
						FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
						.VerifyIdTokenAsync(idToken);
					}
					catch (Exception e)
					{
						//Exception e is invalid 64 bit token or if Key 'Authorization' exists but has empty value
					}
					
				}
				
		}

		public async static Task<string[]> AuthorizeUser(HttpRequest request)
		{
				//request.Headers.TryGetValue("Authorization", out var idToken);
				if (request.Headers.TryGetValue("Authorization", out var idToken))
				{
					try
					{
						FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
						decodedToken.Claims.TryGetValue("email", out var userEmail);
						string[] decodedUser = { decodedToken.Uid, userEmail.ToString() };
						Console.WriteLine(request);
						return decodedUser;
					}
					catch(Exception e)
					{
						//Exception e is invalid 64 bit token or if Key 'Authorization' exists but has empty value
						
					}
				}
				return null;
		}
	}
}