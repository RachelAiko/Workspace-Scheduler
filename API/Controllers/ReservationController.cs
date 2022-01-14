using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

		// [HttpGet]
		// public ActionResult<List<Reservation>> Get() => _reservationService.Get();

		// GET all reservations for specific date (protected general)
		// pass in jwt (user), date, office number
		[HttpGet("{officeID}/{date}")]
		public ActionResult<List<Reservation>> GetReservationsByDate(int officeID, string date)
		{
			var rsv = _reservationService.GetReservationsByDate(officeID, date);
			return rsv;
		}

		// GET all reservations for specific user (protected per user/role)
		// pass in jwt (user)
		[HttpGet("{userID}")]
		public ActionResult<List<Reservation>> GetReservationsByUser(string userID)
		{
			var rsv = _reservationService.GetReservationsByUser(userID);
			return rsv;
		}

		// POST a new reservation for specific user (protected per user/role)
		// pass in jwt (user), date, space number, office
		[HttpPost("{date}/{creatorID}/{reservedForID}/{reservedForFirstName}/{reservedForLastName}/{officeID}/{spaceNumber}")]
		public ActionResult<Reservation> CreateReservation(string date, string creatorID,
			string reservedForID, string reservedForFirstName, string reservedForLastName, int officeID, int spaceNumber)
		{
			var rsv = _reservationService.CreateReservation(date, creatorID, reservedForID, reservedForFirstName,
				reservedForLastName, officeID, spaceNumber);
			return rsv;
		}

		// DELETE a reservation for specific user (protected per user/role)
		// pass in jwt (user), reservationID
		[HttpDelete("{userID}")]
		public ActionResult<Reservation> DeleteReservation(string userID)
		{
			var rsv = _reservationService.DeleteReservation(userID);
			return rsv;
		}
	}
}