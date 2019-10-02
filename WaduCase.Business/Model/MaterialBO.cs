using MongoDB.Bson.Serialization.Attributes;
using System.Runtime.Serialization;

namespace WaduCaseBusiness.Model
{
    [BsonNoId]
    public class MaterialBO
    {
        [BsonElement("id")]
        public int id { get; set; }

        public string name { get; set; }
        public string description { get; set; }
    }
}