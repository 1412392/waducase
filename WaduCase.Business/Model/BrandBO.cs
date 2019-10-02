using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class BrandBO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string seoname { get; set; }

        public string description { get; set; }
        public string logo { get; set; }
        public DateTime? createddate { get; set; }
        public DateTime? updateddate { get; set; }
        public DateTime? deleteddate { get; set; }
        public int isdeleted { get; set; }
        public string createduser { get; set; }
        public string updateduser { get; set; }
        public string deleteduser { get; set; }
        public string keyword { get; set; }
        public string metakeyword { get; set; }
        public string metadescription { get; set; }


    }
}
