using System;
using System.Collections.Generic;
using System.Globalization;
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
		private readonly IMongoCollection<User> _users;
		private readonly IMongoCollection<Workspace> _workspaces;
		public ReservationService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_reservations = database.GetCollection<Reservation>(settings.ReservationCollectionName);
			_users = database.GetCollection<User>(settings.UserCollectionName);
			_workspaces = database.GetCollection<Workspace>(settings.WorkspaceCollectionName);
		}

		public async Task<bool[]> ValidateReservation(string _creatorID, DateTime _date, string _reservedForID)
		{
			bool[] results = { true, true };
			var existingReservation = await _reservations.Find(rsv => rsv.ReservedFor.AuthID == _reservedForID && rsv.Date == _date).SingleOrDefaultAsync();
			if (existingReservation != null)
			{
				results[0] = false;
			}
			////////////////////////
			// TODO: check if more than 3 reservations made during the same week or admin
			////////////////////////
			return results;
		}

		public async Task<Reservation> FindReservation(string _reservationID)
		{
			var reservation = await _reservations.Find(rsv => rsv.Id == _reservationID).SingleOrDefaultAsync();
			return reservation;
		}

		// GET all reservations (admin only)
		public async Task<List<Reservation>> GetAllReservations()
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.Date >= DateTime.Today).Sort(new BsonDocument("Date", 1)).ToListAsync();
			return reservations;
		}

		// GET all reservations for a user (protected per user/role)
		public async Task<List<Reservation>> GetReservations(string _requestedID)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.ReservedFor.AuthID == _requestedID && rsv.Date >= DateTime.Today).Sort(new BsonDocument("Date", 1)).ToListAsync();
			return reservations;
		}

		public DateTime ParseDate(string date)
		{
			return DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
		}

		// GET all reservations for specific date (protected general)
		public async Task<List<Reservation>> GetReservationsByDate(DateTime _date)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.Date == _date).ToListAsync();
			return reservations;
		}

		// POST a new reservation for specific user (protected per user/role)
		public async Task<Reservation> CreateReservation(string _creatorID, DateTime _date, string _reservedForID, string _workspaceID)
		{
			Reservation newReservation = new Reservation();
			newReservation.Creator = await _users.Find(usr => usr.AuthID == _creatorID).SingleOrDefaultAsync();
			newReservation.Date = _date;
			newReservation.ReservedFor = await _users.Find(usr => usr.AuthID == _reservedForID).SingleOrDefaultAsync();
			newReservation.Workspace = await _workspaces.Find(wrk => wrk.Id == _workspaceID).SingleOrDefaultAsync();
			await _reservations.InsertOneAsync(newReservation);
			return newReservation;
		}

		// DELETE a reservation for specific user (protected per user/role)
		// **FindOneAndDelete returns deleted document, DeleteOne deletes single document
		public async Task<Reservation> DeleteReservation(string _reservationID)
		{
			Reservation reservation;
			reservation = await _reservations.FindOneAndDeleteAsync(rsv => rsv.Id == _reservationID);
			return reservation;
		}
	}
}