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
    public class SearchDAO
    {
        public static List<ProductBO> SearchProduct(string query, int OrderBy = 0)
        {
            try
            {
                List<ProductBO> lstProduct = new List<ProductBO>();
                var collection = MongoClientHelper.Current.ConnectDatabase().GetCollection<BsonDocument>("product");

                //search and các từ 
                //vi dụ: ốp lưng dơi =>ốp and lưng and dơi
                //"\"op\" \"lung\" \"doi\""
                var keywords = query.Replace("+", " plus ").Replace("(", " ").Replace("-", " ").Replace(")", " ").
                    Replace("&", " ").Replace("|", " ").Split(' ');
                string rsl = "";
                if (keywords.Length == 1)
                {
                    rsl = query;
                }
                else
                {
                    foreach (var item in keywords)
                    {
                        if (string.IsNullOrEmpty(item)) continue;
                        rsl += $"\"{item}\" ";

                    }
                }
                rsl = rsl.Trim();
                string sortString = OrderBy == 1 ? "{newprice: 1}" : OrderBy == 2 ? "{newprice: -1}" : "";

                List<BsonDocument> cussor = new List<BsonDocument>();
                if (OrderBy == 0)
                {
                    cussor = collection.Find(
                       Builders<BsonDocument>.Filter.And(Builders<BsonDocument>.Filter.Text(rsl),
                                                      Builders<BsonDocument>.Filter.Eq("isdeleted", 0)))
                       .Project(Builders<BsonDocument>.Projection.MetaTextScore("textScore"))
                        .Sort(Builders<BsonDocument>.Sort.MetaTextScore("textScore"))
                       .ToList();
                }
                else
                {
                    cussor = collection.Find(
                       Builders<BsonDocument>.Filter.And(Builders<BsonDocument>.Filter.Text(rsl),
                                                      Builders<BsonDocument>.Filter.Eq("isdeleted", 0)))
                       .Project(Builders<BsonDocument>.Projection.MetaTextScore("textScore"))
                        .Sort(Builders<BsonDocument>.Sort.MetaTextScore("textScore"))
                        .Sort(sortString)
                       .ToList();
                }

                foreach (var document in cussor)
                {

                    var pro = BsonSerializer.Deserialize<ProductBO>(document);
                    lstProduct.Add(pro);

                }
                return lstProduct;

            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
