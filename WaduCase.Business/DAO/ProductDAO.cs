using WaduCaseBusiness.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WaduCaseBusiness.Model;
using MongoDB.Driver.Linq;

namespace WaduCaseBusiness.DAO
{
    public class ProductDAO
    {
        public static ProductBO GetProductByID(int id)
        {
            try
            {
                ProductBO product = new ProductBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("_id", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return null;

                product = BsonSerializer.Deserialize<ProductBO>(cursor);

                return product;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static long CountTotalProduct()
        {
            try
            {
                ProductBO product = new ProductBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(filter).CountDocuments();
                return cursor;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static ProductBO GetProductByPhoneModelID(int id)
        {
            try
            {
                ProductBO product = new ProductBO();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("phonemodelid", id);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return null;

                product = BsonSerializer.Deserialize<ProductBO>(cursor);

                return product;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static List<ProductBO> GetListRelativeProduct(int id, int brandid, int collectionid)
        {
            try
            {
                List<ProductBO> lstProduct = new List<ProductBO>();
                //lay top 8 thang
                int MaxNumberProduct = 8;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                FilterDefinition<BsonDocument> filterAfter = null;

                if (collectionid > 0)
                {
                    filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("collectionid", collectionid);

                    filterAfter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Gt("collectionid", 0)
                        & filterBuilder.Ne("collectionid", collectionid);

                }
                else
                {
                    filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("brandid", brandid);

                    filterAfter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("collectionid", 0)
                      & filterBuilder.Ne("brandid", brandid);
                }

                var cursor = collection.Find(filter).Limit(MaxNumberProduct).ToList();
                if (cursor == null) return lstProduct;
                foreach (var document in cursor)
                {
                    var product = BsonSerializer.Deserialize<ProductBO>(document);
                    lstProduct.Add(product);
                }
                if (lstProduct.Count < MaxNumberProduct)
                {

                    cursor = collection.Find(filterAfter).Limit(MaxNumberProduct - lstProduct.Count).ToList();

                    if (cursor != null)
                    {
                        foreach (var document in cursor)
                        {
                            var product = BsonSerializer.Deserialize<ProductBO>(document);
                            lstProduct.Add(product);
                        }
                    }
                }
                return lstProduct;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public static int InsertProduct(ProductBO product, ref string errorMessage)
        {
            try
            {
                //tao id: lay id max hien tai+1
                product.id = GetMaxProductID() + 1;

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<ProductBO>("product");

                collection.InsertOne(product);
                return product.id;
            }
            catch (Exception ex)
            {
                errorMessage = ex.ToString();
                return -1;
            }
        }

        private static int GetMaxProductID()
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                //var filter = filterBuilder.Eq("isdeleted", 0);
                var cursor = collection.Find(Builders<BsonDocument>.Filter.Empty).Sort(Builders<BsonDocument>.Sort.Descending("_id")).FirstOrDefault();

                var product = BsonSerializer.Deserialize<ProductBO>(cursor);
                return product.id;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static int UpdateProduct(ProductBO newUpdateBO, ref string errorMessage)
        {
            var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<ProductBO>("product");
            var filterBuilder = Builders<ProductBO>.Filter;
            var filter = filterBuilder.Eq("id", newUpdateBO.id);

            var result = collection.ReplaceOne(filter, newUpdateBO);
            if (result.IsAcknowledged)
            {
                return newUpdateBO.id;
            }
            return -1;

        }

        public static List<ProductBO> GetListProductByCollectionID(int collectionid, int OrderBy, int pageIndex = 0, int pageSize = 1000)
        {
            try
            {
                List<ProductBO> lstProduct = new List<ProductBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("collectionid", collectionid);
                List<BsonDocument> cursor = new List<BsonDocument>();

                if (OrderBy == 1)
                {
                    cursor = collection.Find(filter).SortBy(bson => bson["newprice"]).Skip(pageIndex * pageSize).Limit(pageSize).ToList();
                }
                else if (OrderBy == 2)
                {
                    cursor = collection.Find(filter).SortByDescending(bson => bson["newprice"]).Skip(pageIndex * pageSize).Limit(pageSize).ToList();

                }
                else
                {
                    cursor = collection.Find(filter).SortByDescending(bson => bson["createddate"]).Skip(pageIndex * pageSize).Limit(pageSize).ToList();

                }
                foreach (var document in cursor)
                {
                    var brand = BsonSerializer.Deserialize<ProductBO>(document);
                    lstProduct.Add(brand);

                }
                return lstProduct;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static List<ProductBO> GetListProductByBrandID(int brandid, int OrderBy, int pageIndex = 0, int pageSize = 500)
        {
            try
            {
                List<ProductBO> lstProduct = new List<ProductBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("isdeleted", 0) & filterBuilder.Eq("brandid", brandid);
                var cursor = collection.Find(filter).Skip(pageIndex * pageSize).Limit(pageSize).ToList();

                if (OrderBy == 1)
                {
                    cursor = collection.Find(filter).SortBy(bson => bson["newprice"]).Skip(pageIndex * pageSize).Limit(pageSize).ToList();
                }
                else if (OrderBy == 2)
                {
                    cursor = collection.Find(filter).SortByDescending(bson => bson["newprice"]).Skip(pageIndex * pageSize).Limit(pageSize).ToList();

                }
                else
                {
                    cursor = collection.Find(filter).SortByDescending(bson => bson["createddate"]).Skip(pageIndex * pageSize).Limit(pageSize).ToList();

                }

                foreach (var document in cursor)
                {
                    var brand = BsonSerializer.Deserialize<ProductBO>(document);
                    lstProduct.Add(brand);

                }
                return lstProduct;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public static List<CollectionWithProduct> AggregateProductByCollection()
        {
            //thống kê san phẩm trong collection, phonemodel
            var productCollection = MongoClientHelper.Current.ConnectDatabase().GetCollection<ProductBO>("product");
            var collectionCollection = MongoClientHelper.Current.ConnectDatabase().GetCollection<CollectionBO>("collection");

            var query = from p in collectionCollection.AsQueryable()
                        join o in productCollection on p.id equals o.collectionid into joined
                        where p.isdeleted == 0
                        select new CollectionWithProduct()
                        {
                            id = p.id,
                            name = p.name,
                            products = joined.Where(x => x.isdeleted == 0)
                        };
            var finalResult = query.ToList();

            return finalResult;


        }

        public static List<BrandWithProduct> AggregateProductByBrand()
        {
            //thống kê san phẩm trong collection, phonemodel
            var productCollection = MongoClientHelper.Current.ConnectDatabase().GetCollection<ProductBO>("product");
            var brandCollection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BrandBO>("brand");

            var query = from p in brandCollection.AsQueryable()

                        join o in productCollection on p.id equals o.brandid into joined
                        where p.isdeleted == 0
                        select new BrandWithProduct()
                        {
                            id = p.id,
                            name = p.name,
                            products = joined.Where(x => x.isdeleted == 0)
                        };
            var finalResult = query.ToList();

            return finalResult;


        }

        public static bool DeleteProduct(int id, string userID)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<ProductBO>("product");

                var filter = Builders<ProductBO>.Filter.Where(_ => _.id == id);
                var update = Builders<ProductBO>.Update.Set(_ => _.isdeleted, 1)
                    .Set(_ => _.deleteduser, userID)
                    .Set(_ => _.deleteddate, DateTime.Now);


                var options = new FindOneAndUpdateOptions<ProductBO>();
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

