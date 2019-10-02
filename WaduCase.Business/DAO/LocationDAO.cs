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
    public class LocationDAO
    {
        static CommonBO CommonInfo = null;
        public static List<ProvinceBO> GetListProvinces()
        {
            try
            {
                List<ProvinceBO> lstProvince = new List<ProvinceBO>();

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("province");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Gt("_id", 0);
                var cursor = collection.Find(filter).ToList();
                if (cursor == null) return lstProvince;
                foreach (var document in cursor)
                {
                    var province = BsonSerializer.Deserialize<ProvinceBO>(document);
                    lstProvince.Add(province);
                }

                return lstProvince;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static List<DistrictBO> GetListDistrictByProvinceID(int proid)
        {

            try
            {
                List<DistrictBO> lstDistrict = new List<DistrictBO>();

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("district");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Eq("provinceid", proid);
                var cursor = collection.Find(filter).ToList();
                if (cursor == null) return lstDistrict;
                foreach (var document in cursor)
                {
                    var district = BsonSerializer.Deserialize<DistrictBO>(document);
                    lstDistrict.Add(district);
                }

                return lstDistrict;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static List<WardBO> GetListWardByDistrictID(int disid)
        {

            try
            {
                List<WardBO> lstWard = new List<WardBO>();

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("ward");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Eq("districtid", disid);
                var cursor = collection.Find(filter).ToList();
                if (cursor == null) return lstWard;
                foreach (var document in cursor)
                {
                    var ward = BsonSerializer.Deserialize<WardBO>(document);
                    lstWard.Add(ward);
                }

                return lstWard;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static bool UpdateCommonInfo(CommonBO updateModel, ref string errorMessage)
        {
            var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<CommonBO>("commoninfo");
            var filterBuilder = Builders<CommonBO>.Filter;
            var filter = filterBuilder.Eq("id", updateModel.id);

            var result = collection.ReplaceOne(filter, updateModel);
            if (result.IsAcknowledged)
            {
                return true;
            }
            return false;
        }

        public static ProvinceBO GetProvinceByID(int id)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("province");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return new ProvinceBO();

                return BsonSerializer.Deserialize<ProvinceBO>(cursor);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static DistrictBO GetDistrictByID(int id)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("district");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return new DistrictBO();

                return BsonSerializer.Deserialize<DistrictBO>(cursor);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static WardBO GetWardByID(int id)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("ward");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return new WardBO();

                return BsonSerializer.Deserialize<WardBO>(cursor);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static CommonBO GetCommonInfoByID(string id)
        {
            try
            {
                if (CommonInfo == null)
                {
                    CommonBO _collection = new CommonBO();
                    var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("commoninfo");
                    var filterBuilder = Builders<BsonDocument>.Filter;
                    var filter = filterBuilder.Eq("_id", id);
                    var cursor = collection.Find(filter).FirstOrDefault();
                    if (cursor == null) return null;

                    _collection = BsonSerializer.Deserialize<CommonBO>(cursor);
                    CommonInfo = _collection;
                    return _collection;
                }
                else
                {
                    return CommonInfo;
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
    }
}
