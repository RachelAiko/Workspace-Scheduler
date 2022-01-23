using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

		public async Task<bool> IsAdmin(string _userID)
		{
			var admin = await _users.Find(usr => usr.AuthID == _userID && usr.IsAdmin == true).SingleOrDefaultAsync(); ;
			if (admin != null) return true;
			else return false;
		}

		// GET all reservations for current user (protected per user/role)
		public async Task<List<Reservation>> GetReservations(string _userID)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.ReservedFor.AuthID == _userID).ToListAsync();
			return reservations;
		}

		// GET all reservations for specific user (protected per user/role)
		public async Task<List<Reservation>> GetReservationsForOtherUser(string _userID, string _requestedID)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.ReservedFor.AuthID == _userID).ToListAsync();
			return reservations;
		}

		// GET all reservations for specific date (protected general)
		public async Task<List<Reservation>> GetReservationsByDate(string _date, string _officeID)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.Date == _date && rsv.Workspace.Office.Id == _officeID).ToListAsync();
			return reservations;
		}

		// POST a new reservation for specific user (protected per user/role)
		public async Task<Reservation> CreateReservation(string _creatorID, string _date, string _reservedForID, string _workspaceID)
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