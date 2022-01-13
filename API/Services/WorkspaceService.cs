using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDBWebAPI.Models;

namespace MongoDBWebAPI.Services
{
	public class WorkspaceService
	{
		private readonly IMongoCollection<Workspace> _workspaces;
		public WorkspaceService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_workspaces = database.GetCollection<Workspace>(settings.WorkspaceCollectionName);
		}

		// GET all workspaces for specific office (protected general)
		// pass in jwt, office ID
		public List<Workspace> Get(int _officeID)
		{
			List<Workspace> workspaces;
			workspaces = _workspaces.Find(wrk => wrk.OfficeID == _officeID).ToList();
			return workspaces;
		}
	}
}