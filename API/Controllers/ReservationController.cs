using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDBWebAPI.Models;
using MongoDBWebAPI.Services;

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

		// GET all reservations for specific date (protected general)
		// pass in jwt (user), date, office number
		[HttpGet("ByDate/{date}/{officeID}")]
		public async Task<ActionResult<List<Reservation>>> GetReservationsByDate(string date, string officeID)
		{
			var rsv = await _reservationService.GetReservationsByDate(date, officeID);
			return rsv;
		}

		// GET all reservations for specific user (protected per user/role)
		// pass in jwt (user)
		[HttpGet("ByUser/{userID}")]
		public async Task<ActionResult<List<Reservation>>> GetReservationsByUser(string userID)
		{
			var rsv = await _reservationService.GetReservationsByUser(userID);
			return rsv;
		}

		// POST a new reservation for specific user (protected per user/role)
		// pass in jwt (user), date, space number, office
		[HttpPost("{date}/{creatorID}/{reservedForID}/{workspaceID}")]
		public async Task<ActionResult<Reservation>> CreateReservation(string date, string creatorID, string reservedForID, string workspaceID)
		{
			var rsv = await _reservationService.CreateReservation(date, creatorID, reservedForID, workspaceID);
			return rsv;
		}

		// DELETE a reservation for specific user (protected per user/role)
		// pass in jwt (user), reservationID
		[HttpDelete("{reservationID}")]
		public async Task<ActionResult<Reservation>> DeleteReservation(string reservationID)
		{
			var rsv = await _reservationService.DeleteReservation(reservationID);
			return rsv;
		}
	}
}