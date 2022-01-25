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
		public async Task<User> CreateUser(string _name, string _authID, string _email)
		{
			User newUser = new User();
			newUser.Name = _name;
			newUser.AuthID = _authID;
			newUser.Email = _email;
			// add code to not add duplicate users
			await _users.InsertOneAsync(newUser);
			return newUser;
		}
	}
}