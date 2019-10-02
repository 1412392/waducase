using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class CollectionWithProduct
    {

        public int id;
        public string name { get; set; }
        public IEnumerable<ProductBO> products;
    }
    public class BrandWithProduct
    {

        public int id;
        public string name { get; set; }
        public IEnumerable<ProductBO> products;
    }
}
