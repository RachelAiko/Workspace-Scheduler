using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;

namespace MongoDBWebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OfficeController : ControllerBase
	{
		private readonly OfficeService _officeService;

		public OfficeController(OfficeService officeService)
		{
			_officeService = officeService;
		}

		// GET all offices
		[HttpGet]
		public async Task<ActionResult<List<Office>>> Get() => await _officeService.GetAll();
	}
}