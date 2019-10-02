using WaduCaseBusiness.Model;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization;
using PagedList;

namespace WaduCaseBusiness.DAO
{
    public class BrandModel
    {
        const int PAGESIZE_MAX_DEFAULT = 1000;

        public static int GetMaxBrandID()
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("brand");
                var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(Builders<BsonDocument>.Filter.Empty).Sort(Builders<BsonDocument>.Sort.Descending("_id")).FirstOrDefault();

                var brand = BsonSerializer.Deserialize<BrandBO>(cursor);
                return brand.id;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public static IEnumerable<BrandBO> GetAllBrand(int page = 1, int pageSize = 1000)
        {
            try
            {
                List<BrandBO> lstBrand = new List<BrandBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("brand");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(filter).ToCursor();
                foreach (var document in cursor.ToEnumerable())
                {
                    var brand = BsonSerializer.Deserialize<BrandBO>(document);
                    lstBrand.Add(brand);
                    //Console.WriteLine(document);
                }
                if (pageSize == PAGESIZE_MAX_DEFAULT)//danh cho th không phân trang
                {
                    return lstBrand;
                }
                else
                {
                    return lstBrand.ToPagedList(page, pageSize);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static bool UpdateBrand(BrandBO brandModel, ref string errorMessage)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BrandBO>("brand");
                var filterBuilder = Builders<BrandBO>.Filter;
                var filter = filterBuilder.Eq("id", brandModel.id);

                var result = collection.ReplaceOne(filter, brandModel);
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

        public static bool DeleteBrand(int id, string userID)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BrandBO>("brand");
                //var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("_id", id);
                //update isdeleted=1
                var filter = Builders<BrandBO>.Filter.Where(_ => _.id == id);
                var update = Builders<BrandBO>.Update.Set(_ => _.isdeleted, 1)
                    .Set(_ => _.deleteduser, userID)
                    .Set(_ => _.deleteddate, DateTime.Now);


                var options = new FindOneAndUpdateOptions<BrandBO>();
                var result = collection.FindOneAndUpdate(filter, update, options);

                return true;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static bool InsertBrand(BrandBO brandModel, ref string errorMessage)
        {
            try
            {
                //tao id: lay id max hien tai+1
                brandModel.id = GetMaxBrandID() + 1;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BrandBO>("brand");

                collection.InsertOne(brandModel);
                return true;
            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return false;
            }
        }

        public static BrandBO GetBrandByID(int id)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("brand");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                return BsonSerializer.Deserialize<BrandBO>(cursor);

            }
            catch (Exception)
            {

                throw;
            }
        }
        public static CollectionBO GetCollectionByID(int id)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("collection");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                return BsonSerializer.Deserialize<CollectionBO>(cursor);

            }
            catch (Exception)
            {

                throw;
            }
        }
        public static List<PhoneModelBO> GetPhoneModelByBrandID(int id)
        {
            try
            {
                List<PhoneModelBO> lstPhoneModel = new List<PhoneModelBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("phonemodel");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("brandid", id);
                var cursor = collection.Find(filter).ToList();
                if (cursor.Count <= 0) return null;
                foreach (var item in cursor)
                {
                    lstPhoneModel.Add(BsonSerializer.Deserialize<PhoneModelBO>(item));

                }

                return lstPhoneModel;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
    }
}
