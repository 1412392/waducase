using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WaduCaseBusiness.Model;

namespace WaduCaseBusiness.DAO
{
    public class UserDAO
    {
        public static int Login(string username, string password)
        {
            try
            {
                UserBO user = new UserBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("username", username) & filterBuilder.Eq("password", password) &
                   filterBuilder.Eq("role", "admin");
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return -1;//không tồn tại

                user = BsonSerializer.Deserialize<UserBO>(cursor);
                if (user.isactive == 1)
                {
                    return 1;
                }
                else
                {
                    return 0;//ngung hoat dong
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static UserBO GetUserByUserName(string username)
        {
            try
            {
                UserBO user = new UserBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("username", username) & filterBuilder.Eq("isactive", 1);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return null;//không tồn tại

                user = BsonSerializer.Deserialize<UserBO>(cursor);

                return user;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static bool CreateUser(UserBO user, ref string errorMessage)
        {
            try
            {
                //tao id: lay id max hien tai+1
                user.id = GetMaxUserID() + 1;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<UserBO>("account");

                collection.InsertOne(user);
                return true;
            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return false;
            }

        }


        private static int GetMaxUserID()
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(Builders<BsonDocument>.Filter.Empty).Sort(Builders<BsonDocument>.Sort.Descending("_id")).FirstOrDefault();

                var user = BsonSerializer.Deserialize<UserBO>(cursor);
                return user.id;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static UserBO GetUserByUserNameNotAdmin(string username)
        {
            try
            {
                UserBO user = new UserBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("username", username) & filterBuilder.Eq("role", "customer") & filterBuilder.Eq("isactive", 1);

                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return null;//không tồn tại

                user = BsonSerializer.Deserialize<UserBO>(cursor);

                return user;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
