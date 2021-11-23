using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson;

namespace API.Data
{
    public class DataContext
    {
        private IConfiguration _config;
        private IMongoDatabase db;
        
        public DataContext(IConfiguration config)
        {
            _config = config;
            var mongoClient = new MongoClient(_config.GetConnectionString("DefaultConnection"));
            db = mongoClient.GetDatabase("cmdev");

            bool isAlive = db.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(1000);

            if (!isAlive) {
                throw new Exception();
            }

            Console.WriteLine("Hello");
        }


    }
}