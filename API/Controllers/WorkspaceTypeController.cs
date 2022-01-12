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
	public class WorkspaceTypeController : ControllerBase
	{
		private readonly WorkspaceTypeService _workspaceTypeService;

		public WorkspaceTypeController(WorkspaceTypeService workspaceTypeService)
		{
			_workspaceTypeService = workspaceTypeService;
		}

		// Route to get all workspace types
		[HttpGet]
		public ActionResult<List<WorkspaceType>> Get() => _workspaceTypeService.Get();
	}
}