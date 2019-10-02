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
    public class CollectionDAO
    {
        public static List<CollectionBO> GetAllCollection()
        {
            try
            {
                List<CollectionBO> lstCollection = new List<CollectionBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("collection");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(filter).SortBy(bson => bson["displayorder"]).ToList();
                foreach (var document in cursor)
                {
                    var brand = BsonSerializer.Deserialize<CollectionBO>(document);
                    lstCollection.Add(brand);

                }
                return lstCollection;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public static List<CollectionBO> GetFeatureCollection(int limit)
        {
            try
            {
                List<CollectionBO> lstCollection = new List<CollectionBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("collection");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(filter).SortBy(bson => bson["displayorder"]).Limit(limit).ToList();
                foreach (var document in cursor)
                {
                    var brand = BsonSerializer.Deserialize<CollectionBO>(document);
                    lstCollection.Add(brand);

                }
                return lstCollection;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static List<RealCaseBO> GetListRealCaseByCollectionID(int id, int limit = 8)
        {
            try
            {
                List<RealCaseBO> lstRealCase = new List<RealCaseBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("realcase");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("brandid", 0) & filterBuilder.Eq("collectionid", id);
                var cursor = collection.Find(filter).SortBy(bson => bson["displayorder"]).Limit(limit).ToList();
                foreach (var document in cursor)
                {
                    var realCase = BsonSerializer.Deserialize<RealCaseBO>(document);
                    lstRealCase.Add(realCase);

                }
                return lstRealCase;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static List<RealCaseBO> GetListRealCaseByBrandID(int id, int limit = 8)
        {
            try
            {
                List<RealCaseBO> lstRealCase = new List<RealCaseBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("realcase");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("brandid", id) & filterBuilder.Eq("collectionid", 0);
                var cursor = collection.Find(filter).SortBy(bson => bson["displayorder"]).Limit(limit).ToList();
                foreach (var document in cursor)
                {
                    var realCase = BsonSerializer.Deserialize<RealCaseBO>(document);
                    lstRealCase.Add(realCase);

                }
                return lstRealCase;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static CollectionBO GetCollectionByID(int id)
        {
            try
            {
                CollectionBO _collection = new CollectionBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("collection");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return null;

                _collection = BsonSerializer.Deserialize<CollectionBO>(cursor);

                return _collection;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static bool UpdateCollection(CollectionBO newUpdateBO, ref string errorMessage)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<CollectionBO>("collection");
                var filterBuilder = Builders<CollectionBO>.Filter;
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

        public static bool InsertCollection(CollectionBO collectionModel, ref string errorMessage)
        {
            try
            {
                //tao id: lay id max hien tai+1
                collectionModel.id = GetMaxCollectionID() + 1;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<CollectionBO>("collection");

                collection.InsertOne(collectionModel);
                return true;
            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return false;
            }
        }

        private static int GetMaxCollectionID()
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("collection");
                var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(Builders<BsonDocument>.Filter.Empty).Sort(Builders<BsonDocument>.Sort.Descending("_id")).FirstOrDefault();

                var brand = BsonSerializer.Deserialize<CollectionBO>(cursor);
                return brand.id;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static bool DeleteCollection(int id, string userID)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<CollectionBO>("collection");
                //var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("_id", id);
                //update isdeleted=1
                var filter = Builders<CollectionBO>.Filter.Where(_ => _.id == id);
                var update = Builders<CollectionBO>.Update.Set(_ => _.isdeleted, 1)
                    .Set(_ => _.deleteduser, userID)
                    .Set(_ => _.deleteddate, DateTime.Now);


                var options = new FindOneAndUpdateOptions<CollectionBO>();
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
