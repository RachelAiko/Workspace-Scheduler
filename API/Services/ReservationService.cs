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
		public ReservationService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_reservations = database.GetCollection<Reservation>(settings.ReservationCollectionName);
		}

		// Test to get all reservations
		public List<Reservation> Get()
		{
			List<Reservation> reservations;
			reservations = _reservations.Find(rsv => true).ToList();
			return reservations;
		}
	}
}