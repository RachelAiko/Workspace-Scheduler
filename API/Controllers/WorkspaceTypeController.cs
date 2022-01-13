using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;

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

		// [HttpGet]
		// public ActionResult<List<WorkspaceType>> Get() => _workspaceTypeService.Get();
	}
}