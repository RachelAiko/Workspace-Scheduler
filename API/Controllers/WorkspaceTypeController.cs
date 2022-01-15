using Microsoft.AspNetCore.Mvc;
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