using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDBWebAPI.Models;

namespace MongoDBWebAPI.Services
{
	public class WorkspaceTypeService
	{
		private readonly IMongoCollection<WorkspaceType> _workspaceTypes;
		public WorkspaceTypeService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_workspaceTypes = database.GetCollection<WorkspaceType>(settings.WorkspaceTypeCollectionName);
		}

	}
}