using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class OrderBO
    {
        public string id { get; set; }
        public int userid { get; set; }
        public string fullname { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string province { get; set; }
        public string district { get; set; }
        public string ward { get; set; }

        public string fulladdress { get; set; }
        public string note { get; set; }
        public List<CartItemBO> listitem { get; set; }

        public double shipfee { get; set; }
        public double vat { get; set; }

        public int promotionid { get; set; }
        public double totaldiscount { get; set; }


        public double totalmoney
        {
            get
            {
                return listitem.Sum(x => x.FinalPrice) + shipfee + vat - totaldiscount;
            }
            set
            {
                value = listitem.Sum(x => x.FinalPrice) + shipfee + vat - totaldiscount;
            }
        }

        public int paymenttype { get; set; }//1:cod, 2: ck

        public DateTime? createdate { get; set; }

        public int status { get; set; }//1: chờ duyệt, 2: đóng gói chuyển đi,3: đã giao hàng, 4: bị hủy bỏ,5: bị lỗi
        public string statusname { get; set; }
        public DateTime? deliverydate { get; set; }

        public bool iscanceled { get; set; }
        public DateTime? canceleddate { get; set; }
        public string canceleduser { get; set; }

        public bool isdeleted { get; set; }
        public DateTime? deleteddate { get; set; }
        public string deletedduser { get; set; }
        public string iporder { get; set; }


    }

}

