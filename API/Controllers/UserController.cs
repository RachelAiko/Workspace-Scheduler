using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;

namespace MongoDBWebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;

		public UserController(UserService userService)
		{
			_userService = userService;
		}

		// POST a new user(protected per user/role)
		// pass in jwt (user)
		[HttpPost("{authID}/{firstName}/{lastName}/{email}")]
		public async Task<ActionResult<User>> CreateUser(string authID, string firstName, string lastName, string email)
		{
			var usr = await _userService.CreateUser(authID, firstName, lastName, email);
			return usr;
		}
	}
}