using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBWebAPI.Models;

namespace MongoDBWebAPI.Services
{
	public class WorkspaceService
	{
		private readonly IMongoCollection<Workspace> _workspaces;
		private readonly IMongoCollection<WorkspaceType> _workspaceTypes;
		private readonly IMongoCollection<User> _users;
		private readonly IMongoCollection<Reservation> _reservations;
		public WorkspaceService(IDatabaseSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_workspaces = database.GetCollection<Workspace>(settings.WorkspaceCollectionName);
			_workspaceTypes = database.GetCollection<WorkspaceType>(settings.WorkspaceTypeCollectionName);
			_users = database.GetCollection<User>(settings.UserCollectionName);
			_reservations = database.GetCollection<Reservation>(settings.ReservationCollectionName);
		}

		public async Task<bool> IsAvailable(string _workspaceID)
		{
			var workspace = await _workspaces.Find(wrk => wrk.Id == _workspaceID).SingleOrDefaultAsync();
			return !workspace.IsPermanent;
		}

		public async Task<bool> UserHasPermanent(string _userID)
		{
			var workspace = await _workspaces.Find(wrk => wrk.PermanentFor.AuthID == _userID).SingleOrDefaultAsync();
			if (workspace != null) return true;
			else return false;
		}

		// GET all workspaces for specific office (protected general)
		public async Task<List<Workspace>> Get()
		{
			List<Workspace> workspaces = null;
			List<WorkspaceType> types = await _workspaceTypes.Find(wksp => true).ToListAsync();
			int counter = 0;
			foreach (WorkspaceType type in types)
			{
				List<Workspace> currentType = await _workspaces.Find(wrk => true && wrk.WorkspaceType == type)
					.Sort(new BsonDocument("SpaceNumber", 1)).ToListAsync();
				if (counter == 0) workspaces = currentType;
				else workspaces.AddRange(currentType);
				counter++;
			}
			return workspaces;
		}

		// PUT workspace for permanent reservation (protected admin)
		public async Task<Workspace> MakePermanent(string _workspaceID, string _permanentForID)
		{
			var user = await _users.Find(usr => usr.AuthID == _permanentForID).SingleOrDefaultAsync();
			var workspace = await _workspaces.Find(wrk => wrk.Id == _workspaceID).SingleOrDefaultAsync();
			List<Reservation> reservations = await _reservations.Find(rsv => rsv.Workspace.Id == _workspaceID).ToListAsync();
			foreach (Reservation reservation in reservations)
			{
				await _reservations.FindOneAndDeleteAsync(rsv => rsv.Id == reservation.Id);
			}
			workspace.IsPermanent = true;
			workspace.PermanentFor = user;
			await _workspaces.ReplaceOneAsync(wrk => wrk.Id == _workspaceID, workspace);
			return workspace;
		}

		// PUT workspace to remove permanent reservation (protected admin)
		public async Task<Workspace> RemovePermanent(string _workspaceID)
		{
			var workspace = await _workspaces.Find(wrk => wrk.Id == _workspaceID).SingleOrDefaultAsync();
			workspace.IsPermanent = false;
			workspace.PermanentFor = null;
			await _workspaces.ReplaceOneAsync(wrk => wrk.Id == _workspaceID, workspace);
			return workspace;
		}
	}
}