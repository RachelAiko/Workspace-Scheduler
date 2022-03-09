using static API.Helpers.AuthHelper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;
using System;
using System.Net;
using API.Models;

namespace MongoDBWebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReservationController : ControllerBase
	{
		private readonly ReservationService _reservationService;
		private readonly UserService _userService;
		private readonly WorkspaceService _workspaceService;

		public ReservationController(ReservationService reservationService, UserService userService, WorkspaceService workspaceService)
		{
			_reservationService = reservationService;
			_userService = userService;
			_workspaceService = workspaceService;
		}

		/*
				// GET all reservations for current user (protected per user/role)
				[HttpGet]
				public async Task<ActionResult<List<Reservation>>> GetReservations()
				{
					try
					{
						var user = await AuthorizeUser(Request);
						string userID = user[0];
						var rsv = await _reservationService.GetReservations(userID);
						return rsv;

					}
					catch (Exception e)
					{
						return HandleError(e);
					}	
				}
		*/

		// GET all reservations (admin only)
		[HttpGet]
		public async Task<ActionResult<List<Reservation>>> GetReservations()
		{
			var user = await AuthorizeUser(Request);
			//throw new Exception("Invalid User Id");
			string userID = user[0];
			if (!await _userService.IsAdmin(userID))
			{
				return Unauthorized();
			}
			var rsv = await _reservationService.GetAllReservations();
			return rsv;
		}

		// GET all reservations for a user (protected per user/role)
		[HttpGet("{requestedID}")]
		public async Task<ActionResult<List<Reservation>>> GetReservations(string requestedID)
		{
			var user = await AuthorizeUser(Request);
			//throw new Exception("Invalid User Id");
			string userID = user[0];
			if (userID != requestedID && !await _userService.IsAdmin(userID))
			{
				return Unauthorized();
			}
			var rsv = await _reservationService.GetReservations(requestedID);
			return rsv;
		}

		// GET all reservations for specific date (protected general)
		[HttpGet("search")]
		public async Task<ActionResult<List<Reservation>>> SearchReservations(
			[FromQuery(Name = "date")] DateTime date
		)
		{
			AuthorizeRequest(Request);
			var rsv = await _reservationService.GetReservationsByDate(date);
			return rsv;
		}

		// POST a new reservation for a user (protected per user/role)
		[HttpPost("{date}/{workspaceID}")]
		public async Task<ActionResult<Reservation>> CreateReservation(DateTime date, string workspaceID, [FromBody] string reservedForID)
		{
			var user = await AuthorizeUser(Request);
			string creatorID = user[0];
			if (creatorID != reservedForID && !await _userService.IsAdmin(creatorID))
			{
				return Unauthorized();
			}
			if (!await _workspaceService.IsAvailable(workspaceID))
			{
				return BadRequest("Workspace is permanently reserved");
			}
			var validated = await _reservationService.ValidateReservation(creatorID, date, reservedForID);
			if (validated[0] == false)
			{
				return BadRequest("User already has a reservation on " + date);
			}
			else if (validated[1] == false)
			{
				return BadRequest("You have already made 3 reservations for this week");
			}
			var rsv = await _reservationService.CreateReservation(creatorID, date, reservedForID, workspaceID);
			return rsv;
		}

		// DELETE a reservation for specific user (protected per user/role)
		[HttpDelete("{reservationID}")]
		public async Task<ActionResult<Reservation>> DeleteReservation(string reservationID)
		{
			var user = await AuthorizeUser(Request);
			string userID = user[0];
			var rsv = await _reservationService.FindReservation(reservationID);
			if (userID != rsv.ReservedFor.AuthID && !await _userService.IsAdmin(userID))
			{
				return Unauthorized();
			}
			await _reservationService.DeleteReservation(reservationID);
			return NoContent();
		}

		/*Deprecated Error / Exception Handler Method
		//Error Handling moved to ExceptionHandlingMiddleware and error model(s)
		public ObjectResult HandleError(Exception e)
        {
			Console.WriteLine("---------********************************---------");
			Console.WriteLine(e.Source);
			Console.WriteLine("------------------");
			Console.WriteLine(e.StackTrace);
			Console.WriteLine("------------------");
			Console.WriteLine(e.Message);
			//Console.WriteLine(e.GetType);
			Console.WriteLine("---------*********************************---------");
            if (e.Source == "FirebaseAdmin")
            {
                return Unauthorized("Unauthorized: " + e.Message);
            }

			//if (e.Source)
            return null;
        }
		*/
	}
}