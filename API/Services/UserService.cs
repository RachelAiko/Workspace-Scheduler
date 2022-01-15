using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDBWebAPI.Models;

namespace MongoDBWebAPI.Services
{
	public class UserService
	{
		private readonly IMongoCollection<User> _users;
		public UserService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_users = database.GetCollection<User>(settings.UserCollectionName);
		}

		// POST a new user (protected per user/role)
		// pass in jwt (user)
		public async Task<User> CreateUser(string _authID, string _firstName, string _lastName, string _email)
		{
			User newUser = new User();
			newUser.AuthID = _authID;
			newUser.FirstName = _firstName;
			newUser.LastName = _lastName;
			newUser.Email = _email;

			await _users.InsertOneAsync(newUser);
			return newUser;
		}
	}
}