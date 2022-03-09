using static API.Helpers.AuthHelper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;
using System;
using Newtonsoft.Json;

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
		[HttpPost]
		public async Task<ActionResult<User>> CreateUser([FromBody] string name)
		{
			var user = await AuthorizeUser(Request);
			string authID = user[0];
			string email = user[1];
			var usr = await _userService.CreateUser(name, authID, email);
			return usr;
		}

		// GET All users from database (protected by user/role)
		[HttpGet]
		public async Task<IActionResult> GetUsers()
		{
			var user = await AuthorizeUser(Request);
			string userID = user[0];
			if (!await _userService.IsAdmin(userID))
			{
				return Unauthorized();
			}
			var userList = await _userService.GetAll();
			return Ok(userList);
		}

		// GET Current user from database (protected)
		[HttpGet("me")]
		public async Task<IActionResult> GetCurrentUser()
		{
			var user = await AuthorizeUser(Request);
			string userID = user[0];
			var currentUser = await _userService.GetCurrentUser(userID);
			return Ok(currentUser);
		}

		// GET users data from Query input string (protected by user/role)
		[HttpGet("search")]
		public async Task<IActionResult> Search
		(
			[FromQuery(Name = "searchString")] string searchString
		)
		{
			var user = await AuthorizeUser(Request);
			var userList = await _userService.Query(searchString);
			if (userList == null)
			{
				return NotFound("No User Found");
			}
			return Ok(userList);
		}
	}
}