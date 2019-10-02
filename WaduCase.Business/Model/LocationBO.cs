using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class ProvinceBO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string term { get; set; }
        public string keyword { get; set; }
    }

    public class DistrictBO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string term { get; set; }
        public string keyword { get; set; }

        public int provinceid { get; set; }
    }
    public class WardBO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string term { get; set; }
        public string keyword { get; set; }

        public int provinceid { get; set; }
        public int districtid { get; set; }
    }
}
