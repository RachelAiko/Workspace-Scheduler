using static API.Helpers.AuthHelper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;
using System;
using System.Net;

namespace MongoDBWebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReservationController : ControllerBase
	{
		private readonly ReservationService _reservationService;

		public ReservationController(ReservationService reservationService)
		{
			_reservationService = reservationService;
		}

		// GET all reservations for current user (protected per user/role)
		[HttpGet]
		public async Task<ActionResult<List<Reservation>>> GetReservations()
		{
			var user = await AuthorizeUser(Request);
			if (user != null)
			{
			string userID = user[0];
			var rsv = await _reservationService.GetReservations(userID);
			return rsv;
			} else 
			{
				return Unauthorized();
			}
		}

		// GET all reservations for specific user (protected per user/role)
		[HttpGet("{requestedID}")]
		public async Task<ActionResult<List<Reservation>>> GetReservationsForOtherUser(string requestedID)
		{
			var user = await AuthorizeUser(Request);
			if (user != null)
			{
				string userID = user[0];
				if (!await _reservationService.IsAdmin(userID))
				{
					return Unauthorized();
				}
				try
				{
					var rsv = await _reservationService.GetReservations(requestedID);
					return rsv;
				}
				catch(Exception e)
				{
					//Exception e is invalid requestedID or null requestedID
					return null;
				}
			} else 
			{
				return Unauthorized();
			}
			
		}

		// GET all reservations for specific date (protected general)
		[HttpGet("ByDate/{date}/{officeID}")]
		public async Task<ActionResult<List<Reservation>>> GetReservationsByDate(string date, string officeID)
		{
			AuthorizeRequest(Request);
			var rsv = await _reservationService.GetReservationsByDate(date, officeID);
			return rsv;
		}

		// POST a new reservation for specific user (protected per user/role)
		[HttpPost("{date}/{workspaceID}")]
		public async Task<ActionResult<Reservation>> CreateReservation(string date, string workspaceID)
		{
			var user = await AuthorizeUser(Request);
			string creatorID = user[0];
			string reservedForID = creatorID;
			var rsv = await _reservationService.CreateReservation(creatorID, date, reservedForID, workspaceID);
			return rsv;
		}

		// DELETE a reservation for specific user (protected per user/role)
		[HttpDelete("{reservationID}")]
		public async Task<ActionResult<Reservation>> DeleteReservation(string reservationID)
		{
			var rsv = await _reservationService.DeleteReservation(reservationID);
			return rsv;
		}
	}
}