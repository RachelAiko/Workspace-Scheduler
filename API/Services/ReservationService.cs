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

		// GET all reservations for specific date (protected general)
		// pass in jwt (user), date, office ID
		public async Task<List<Reservation>> GetReservationsByDate(string _date, string _officeID)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.Date == _date && rsv.Workspace.Office.Id == _officeID).ToListAsync();
			return reservations;
		}

		// GET all reservations for specific user (protected per user/role)
		// pass in jwt (user)
		public async Task<List<Reservation>> GetReservationsByUser(string _userID)
		{
			List<Reservation> reservations;
			reservations = await _reservations.Find(rsv => rsv.ReservedFor.AuthID == _userID).ToListAsync();
			return reservations;
		}

		// POST a new reservation for specific user (protected per user/role)
		// pass in jwt (user), date, reservedForID, workspace ID
		public async Task<Reservation> CreateReservation(string _date, string _creatorID, string _reservedForID, string _workspaceID)
		{
			Reservation newReservation = new Reservation();
			newReservation.Date = _date;
			newReservation.Creator = await _users.Find(usr => usr.AuthID == _creatorID).SingleOrDefaultAsync();
			newReservation.ReservedFor = await _users.Find(usr => usr.AuthID == _reservedForID).SingleOrDefaultAsync();
			newReservation.Workspace = await _workspaces.Find(wrk => wrk.Id == _workspaceID).SingleOrDefaultAsync();
			await _reservations.InsertOneAsync(newReservation);
			return newReservation;
		}

		// DELETE a reservation for specific user (protected per user/role)
		// pass in jwt (user), reservationID
		// **FindOneAndDelete returns deleted document, DeleteOne deletes single document
		public async Task<Reservation> DeleteReservation(string _reservationID)
		{
			Reservation reservation;
			reservation = await _reservations.FindOneAndDeleteAsync(rsv => rsv.Id == _reservationID);
			return reservation;
		}
	}
}