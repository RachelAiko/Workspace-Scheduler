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

		public WorkspaceController(WorkspaceService workspaceService)
		{
			_workspaceService = workspaceService;
		}

		// GET all workspaces for specific office (protected general)
		// pass in jwt, office ID
		[HttpGet("{officeID}")]
		public async Task<ActionResult<List<Workspace>>> Get(string officeID)
		{
			var wrk = await _workspaceService.Get(officeID);
			return wrk;
		}
	}
}