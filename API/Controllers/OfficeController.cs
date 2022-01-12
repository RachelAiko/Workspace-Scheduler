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
	public class OfficeController : ControllerBase
	{
		private readonly OfficeService _officeService;

		public OfficeController(OfficeService officeService)
		{
			_officeService = officeService;
		}

		// Route to get all reservations
		[HttpGet]
		public ActionResult<List<Office>> Get() => _officeService.Get();
	}
}