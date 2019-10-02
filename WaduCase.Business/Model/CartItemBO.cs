using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    [BsonIgnoreExtraElements]
    public class CartItemBO
    {
        public string ItemKey { get; set; }
        public int ProductID { get; set; }

        public double Price { get; set; }
        public string Order { get; set; }
        //public dynamic OrderObject { get; set; }
        //public dynamic OrderObject_Additional { get; set; }

        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Thumbnail { get; set; }
        public int MaterialID { get; set; }
        public string MaterialName { get; set; }
        public List<string> ListCustomerImage { get; set; }
        public double FinalPrice
        {
            get
            {
                return Price * Quantity;
            }
        }


    }
}
