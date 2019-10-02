using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class RealCaseBO
    {
        public int id { get; set; }
        public string url { get; set; }
        public int displayorder { get; set; }
        public int collectionid { get; set; }
        public int brandid { get; set; }
        public bool isshowhome { get; set; }
        public string title { get; set; }
        public string description { get; set; }
    }
}
