using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaduCaseBusiness.Model
{
    public class UserBO
    {
        public int id { get; set; }
        [DisplayName("Username")]
        public string username { get; set; }

        [DisplayName("Mật khẩu (nếu muốn đổi mật khẩu thì nhập mật khẩu mới)")]
        public string password { get; set; }

        public string rawpassword { get; set; }
        public int isactive { get; set; }

        [DisplayName("Chọn quyền")]
        public string role { get; set; }
        public List<string> authorities { get; set; }

        [DisplayName("Họ tên")]
        public string fullname { get; set; }

        [DisplayName("Email")]
        public string email { get; set; }

        [DisplayName("Phone")]
        public string phone { get; set; }
        [DisplayName("Địa chỉ")]
        public string address { get; set; }
        public DateTime? createddate { get; set; }
        public DateTime? updateddate { get; set; }

        public DateTime? deleteddate { get; set; }
        public int deleteduser { get; set; }
        public int createduser { get; set; }
        public int updateduser { get; set; }


        [DisplayName("Hình đại diện")]
        public string avatar { get; set; }
        public string note { get; set; }
    }
}
