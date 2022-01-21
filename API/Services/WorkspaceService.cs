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
		public async Task<List<Workspace>> Get(string _officeID)
		{
			List<Workspace> workspaces;
			workspaces = await _workspaces.Find(wrk => wrk.Office.Id == _officeID).ToListAsync();
			return workspaces;
		}
	}
}