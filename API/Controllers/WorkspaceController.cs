using static API.Helpers.AuthHelper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;

namespace MongoDBWebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WorkspaceController : ControllerBase
	{
		private readonly WorkspaceService _workspaceService;
		private readonly UserService _userService;

		public WorkspaceController(WorkspaceService workspaceService, UserService userService)
		{
			_workspaceService = workspaceService;
			_userService = userService;
		}

		// GET all workspaces for specific office (protected general)
		[HttpGet("{officeID}")]
		public async Task<ActionResult<List<Workspace>>> Get(string officeID)
		{
			AuthorizeRequest(Request);
			var wrk = await _workspaceService.Get(officeID);
			return wrk;
		}

		// PUT workspace for permanent reservation (protected admin)
		[HttpPut("{workspaceID}/{permanentForID}")]
		public async Task<ActionResult<Workspace>> MakePermanent(string workspaceID, string permanentForID)
		{
			var user = await AuthorizeUser(Request);
			string userID = user[0];
			if (!await _userService.IsAdmin(userID))
			{
				return Unauthorized();
			}
			else if (!await _workspaceService.IsAvailable(workspaceID)) return BadRequest("Workspace already permanently reserved");
			else if (await _workspaceService.UserHasPermanent(permanentForID)) return BadRequest("User already has a permanent reservation");
			var wrk = await _workspaceService.MakePermanent(workspaceID, permanentForID);
			return wrk;
		}

		// PUT workspace to remove permanent reservation (protected admin)
		[HttpPut("{workspaceID}")]
		public async Task<ActionResult<Workspace>> RemovePermanent(string workspaceID)
		{
			var user = await AuthorizeUser(Request);
			string userID = user[0];
			if (!await _userService.IsAdmin(userID))
			{
				return Unauthorized();
			}
			else if (await _workspaceService.IsAvailable(workspaceID)) return BadRequest("Workspace is not permanently reserved");
			var wrk = await _workspaceService.RemovePermanent(workspaceID);
			return wrk;
		}
	}
}