using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WaduCaseBusiness;
using WaduCaseBusiness.Model;

namespace WaduCaseBusiness.DAO
{
    public class AccountDAO
    {
        /// <summary>
        /// 1: user
        /// 2: admin
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        public static List<UserBO> GetListUserByRole(string role)
        {
            try
            {
                List<UserBO> lstUser = new List<UserBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isactive", 1) & filterBuilder.Eq("role", role.ToLower());
                List<BsonDocument> cursor = new List<BsonDocument>();

                cursor = collection.Find(filter).SortByDescending(bson => bson["createddate"]).ToList();

                foreach (var document in cursor)
                {
                    var user = BsonSerializer.Deserialize<UserBO>(document);
                    lstUser.Add(user);

                }
                return lstUser;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static UserBO GetUserByID(int id)
        {
            try
            {
                UserBO user = new UserBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("_id", id);
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

        public static bool AddAccount(UserBO user, ref string error)
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<UserBO>("account");

                collection.InsertOne(user);
                return true;
            }
            catch (Exception ex)
            {
                error = ex.ToString();
                return false;
            }
        }

        public static int UpdateAccount(UserBO newUpdateBO, ref string errorMessage)
        {
            var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<UserBO>("account");
            var filterBuilder = Builders<UserBO>.Filter;
            var filter = filterBuilder.Eq("id", newUpdateBO.id);

            var result = collection.ReplaceOne(filter, newUpdateBO);
            if (result.IsAcknowledged)
            {
                return newUpdateBO.id;
            }
            return -1;

        }

        public static int InsertAccount(UserBO userbo, ref string errorMessage)
        {
            try
            {
                //tao id: lay id max hien tai+1
                userbo.id = GetMaxUserID() + 1;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<UserBO>("account");

                collection.InsertOne(userbo);
                return userbo.id;
            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return -1;
            }
        }


        private static int GetMaxUserID()
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("account");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var cursor = collection.Find(Builders<BsonDocument>.Filter.Empty).Sort(Builders<BsonDocument>.Sort.Descending("_id")).FirstOrDefault();

                var user = BsonSerializer.Deserialize<UserBO>(cursor);
                return user.id;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        

        public static bool DeleteAccount(int id, int deleteuserid)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<UserBO>("account");

                var filter = Builders<UserBO>.Filter.Where(_ => _.id == id);
                var update = Builders<UserBO>.Update.Set(_ => _.isactive, 0)
                    .Set(_ => _.deleteduser, deleteuserid)
                    .Set(_ => _.deleteddate, DateTime.Now);


                var options = new FindOneAndUpdateOptions<UserBO>();
                var result = collection.FindOneAndUpdate(filter, update, options);

                return true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static List<UserType> StaticAccount()
        {
            var orderCollection = MongoClientHelper.Current.ConnectDatabase().GetCollection<UserBO>("account");


            var query = orderCollection.AsQueryable().Where(x => x.isactive == 1)
            .GroupBy(c => new
            {
                c.role
            })
            .Select(n => new UserType
            {
                role = n.Key.role,
                count = n.Count()
            }
            );
            var finalResult = query.ToList();
            return finalResult;
        }
    }
}
