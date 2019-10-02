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
    public class PhoneModelDAO
    {
        public static List<PhoneModelBO> GetAllPhoneModel()
        {
            try
            {
                List<PhoneModelBO> lstPhoneModel = new List<PhoneModelBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("phonemodel");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(filter).ToList();
                foreach (var document in cursor)
                {
                    var phonemodel = BsonSerializer.Deserialize<PhoneModelBO>(document);
                    lstPhoneModel.Add(phonemodel);

                }
                return lstPhoneModel;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static PhoneModelBO GetPhoneModelByID(int id)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("phonemodel");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                return BsonSerializer.Deserialize<PhoneModelBO>(cursor);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public static bool UpdatePhoneModel(PhoneModelBO newUpdateBO, ref string errorMessage)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<PhoneModelBO>("phonemodel");
                var filterBuilder = Builders<PhoneModelBO>.Filter;
                var filter = filterBuilder.Eq("id", newUpdateBO.id);

                var result = collection.ReplaceOne(filter, newUpdateBO);
                if (result.IsAcknowledged)
                {
                    return true;
                }
                return false;

            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return false;
            }
        }


        public static bool InsertPhoneModel(PhoneModelBO phoneModel, ref string errorMessage)
        {
            try
            {
                //tao id: lay id max hien tai+1
                phoneModel.id = GetMaxPhoneModel() + 1;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<PhoneModelBO>("phonemodel");

                collection.InsertOne(phoneModel);
                return true;
            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return false;
            }
        }

        private static int GetMaxPhoneModel()
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("phonemodel");
                var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(Builders<BsonDocument>.Filter.Empty).Sort(Builders<BsonDocument>.Sort.Descending("_id")).FirstOrDefault();

                var phonemodel = BsonSerializer.Deserialize<PhoneModelBO>(cursor);
                return phonemodel.id;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public static bool DeletePhoneModel(int id, string userID)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<PhoneModelBO>("phonemodel");
                //var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("_id", id);
                //update isdeleted=1
                var filter = Builders<PhoneModelBO>.Filter.Where(_ => _.id == id);
                var update = Builders<PhoneModelBO>.Update.Set(_ => _.isdeleted, 1)
                    .Set(_ => _.deleteduser, userID)
                    .Set(_ => _.deleteddate, DateTime.Now);


                var options = new FindOneAndUpdateOptions<PhoneModelBO>();
                var result = collection.FindOneAndUpdate(filter, update, options);

                return true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
