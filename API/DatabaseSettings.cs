using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDBWebAPI.Models
{
	public class DatabaseSettings : IDatabaseSettings
	{
		public string OfficeCollectionName { get; set; }
		public string ReservationCollectionName { get; set; }
		public string WorkspaceCollectionName { get; set; }
		public string WorkspaceTypeCollectionName { get; set; }
		public string ConnectionString { get; set; }
		public string DatabaseName { get; set; }
	}

	public interface IDatabaseSettings
	{
		public string OfficeCollectionName { get; set; }
		public string ReservationCollectionName { get; set; }
		public string WorkspaceCollectionName { get; set; }
		public string WorkspaceTypeCollectionName { get; set; }
		public string ConnectionString { get; set; }
		public string DatabaseName { get; set; }
	}
}