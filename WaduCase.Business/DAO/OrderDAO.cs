
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
    public class OrderDAO
    {
        /// <summary>
        /// lây ds đơn hàng theo trang thái
        /// 1. chưa xử lý
        /// 2. đang xử lý
        /// 3. đã xử lý
        /// 4. đã hủy
        /// 5. đã xóa
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public static List<OrderBO> GetListOrderByStatusID(int status)
        {
            try
            {
                List<OrderBO> lstOrder = new List<OrderBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("order");
                var filterBuilder = Builders<BsonDocument>.Filter;
                var filter = filterBuilder.Eq("status", status);
                List<BsonDocument> cursor = new List<BsonDocument>();



                cursor = collection.Find(filter).SortByDescending(bson => bson["createdate"]).ToList();

                foreach (var document in cursor)
                {
                    var order = BsonSerializer.Deserialize<OrderBO>(document);
                    lstOrder.Add(order);

                }
                return lstOrder;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public static bool CreateOrder(OrderBO order, ref string error)
        {
            try
            {

                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<OrderBO>("order");

                collection.InsertOne(order);
                return true;
            }
            catch (Exception ex)
            {
                error = ex.ToString();
                return false;
            }
        }

        public static OrderBO GetOrderByID(string orderid)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("order");
                var filterBuilder = Builders<BsonDocument>.Filter;
                FilterDefinition<BsonDocument> filter = null;
                filter = filterBuilder.Eq("_id", orderid);
                var cursor = collection.Find(filter).FirstOrDefault();
                if (cursor == null) return new OrderBO();

                return BsonSerializer.Deserialize<OrderBO>(cursor);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static int UpdateOrderStatus(string orderID, OrderBO updateOrder)
        {
            var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<OrderBO>("order");
            var filterBuilder = Builders<OrderBO>.Filter;
            var filter = filterBuilder.Eq("id", orderID);

            var result = collection.ReplaceOne(filter, updateOrder);



            if (result.IsAcknowledged)
            {
                return updateOrder.status;
            }
            return -1;

        }

        public static List<OrderWithStatus> StaticOrderStatus()
        {
            var orderCollection = MongoClientHelper.Current.ConnectDatabase().GetCollection<OrderBO>("order");


            var query = orderCollection.AsQueryable()
            .GroupBy(c => new
            {
                c.status
            })
            .Select(n => new OrderWithStatus
            {
                StatusID = n.Key.status,
                ProductCount = n.Count()
            }
            )
            .OrderBy(n => n.StatusID).ToList();
            var finalResult = query.ToList();
            return finalResult;
        }

        public static bool DeleteOrder(string id, string user)
        {
            try
            {
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<OrderBO>("order");

                var filter = Builders<OrderBO>.Filter.Where(_ => _.id == id);
                var update = Builders<OrderBO>.Update.Set(_ => _.isdeleted, true)
                    .Set(_ => _.deletedduser, user)
                      .Set(_ => _.status, 5)
                       .Set(_ => _.statusname, "Đã xóa")
                    .Set(_ => _.deleteddate, DateTime.Now);


                var options = new FindOneAndUpdateOptions<OrderBO>();
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
