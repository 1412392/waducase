using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class OrderWithStatus
    {
        public int StatusID { get; set; }
        public string StatusName { get; set; }
        public int ProductCount { get; set; }
    }
}
