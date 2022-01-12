using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;

// FILE ONLY BEING USED FOR TESTING

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

		// Route to get all workspaces
		[HttpGet]
		public ActionResult<List<Workspace>> Get() => _workspaceService.Get();
	}
}