using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
	public static class AuthHelper
	{
		public async static void AuthorizeRequest(HttpRequest request)
		{
			request.Headers.TryGetValue("Authorization", out var idToken);
			FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
				.VerifyIdTokenAsync(idToken);
		}

		public async static Task<string[]> AuthorizeUser(HttpRequest request)
		{
			request.Headers.TryGetValue("Authorization", out var idToken);
			FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
				.VerifyIdTokenAsync(idToken);
			decodedToken.Claims.TryGetValue("email", out var userEmail);
			string[] decodedUser = { decodedToken.Uid, userEmail.ToString() };
			return decodedUser;
		}
	}
}