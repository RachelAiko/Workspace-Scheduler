using System;
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
        public UserService(IUserDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<User> Get()
        {
            List<User> users;
            users = _users.Find(usr => true).ToList();
            return users;
        }

        public User Get(String id) => 
            _users.Find<User>(usr => usr.Id == id).FirstOrDefault();
    }
}