using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
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

		public async Task<bool> IsAdmin(string _userID)
		{
			var admin = await _users.Find(usr => usr.AuthID == _userID && usr.IsAdmin == true).SingleOrDefaultAsync();
			if (admin != null) return true;
			else return false;
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

		public async Task<List<User>> GetAll()
		{
			List<User> users;
			users = await _users.Find(usr => true).ToListAsync();
			return users;
		}

		public async Task<User> GetCurrentUser(string _userID)
		{
			var user = await _users.Find(usr => usr.AuthID == _userID).SingleOrDefaultAsync();
			return user;
		}

		public async Task<Object> Query(string searchString)
		{
			var filter = Builders<User>.Filter.Empty;
			if (!string.IsNullOrEmpty(searchString))
			{
				//Filter searches through the Database for Name and/or Email
				filter = Builders<User>.Filter.Regex("Name", new BsonRegularExpression(searchString, "i")) |
						 Builders<User>.Filter.Regex("Email", new BsonRegularExpression(searchString, "i"));

			}
			List<User> userList = await _users.Find(filter).ToListAsync();
			if (userList.Count == 0)
			{
				return null;
			}
			return userList;
		}
	}
}