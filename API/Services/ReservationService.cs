using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBWebAPI.Models;

namespace MongoDBWebAPI.Services
{
	public class ReservationService
	{
		private readonly IMongoCollection<Reservation> _reservations;
		public ReservationService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_reservations = database.GetCollection<Reservation>(settings.ReservationCollectionName);
		}

		// GET all reservations for specific date (protected general)
		// pass in jwt (user), date, office id
		public List<Reservation> GetReservationsByDate(int _officeID, string _date)
		{
			List<Reservation> reservations;
			reservations = _reservations.Find(rsv => rsv.Date == _date && rsv.OfficeID == _officeID).ToList();
			return reservations;
		}

		// TODO
		// GET all reservations for specific user (protected per user/role)
		// pass in jwt (user)

		// POST a new reservation for specific user (protected per user/role)
		// pass in jwt (user), date, space number, office
		public Reservation CreateReservation(string _date, string _creatorID,
			string _reservedForID, string _reservedForFirstName, string _reservedForLastName, int _officeID, int _spaceNumber)
		{
			Reservation newReservation = new Reservation();
			newReservation.Date = _date;
			newReservation.CreatorID = _creatorID;
			newReservation.ReservedForID = _reservedForID;
			newReservation.ReservedForFirstName = _reservedForFirstName;
			newReservation.ReservedForLastName = _reservedForLastName;
			newReservation.OfficeID = _officeID;
			newReservation.SpaceNumber = _spaceNumber;

			_reservations.InsertOne(newReservation);
			return newReservation;
		}

		// TODO
		// DELETE a reservation for specific user (protected per user/role)
		// pass in jwt (user), reservationID
	}
}