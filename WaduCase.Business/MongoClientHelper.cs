using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness
{
    public class MongoClientHelper
    {

        public string Mongo_Connection_String;
        public string MongoDatabaseName = "waducase";

        private MongoClient db = null;


        public MongoClientHelper()
        {
            this.Mongo_Connection_String = ConfigurationManager.AppSettings["MONGO_CONNECTION"];
            db = new MongoClient(this.Mongo_Connection_String);

        }
        public IMongoDatabase ConnectDatabase()
        {
            return db.GetDatabase(MongoDatabaseName);
        }
        public MongoClient GetClient()
        {
       
            return db;
        }




        #region Singleton
        private static MongoClientHelper _instace;
        public static MongoClientHelper Current => _instace ?? (_instace = new MongoClientHelper());
        #endregion
    }
}
