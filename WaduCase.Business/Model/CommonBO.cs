using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace WaduCaseBusiness.Model
{
    public class CommonBO
    {
        public string id { get; set; }
        public string phone { get; set; }
        public string hotline { get; set; }
        public string email { get; set; }
        public string facebookchat { get; set; }
        public string zalochat { get; set; }
        [AllowHtml]
        public string officeaddress { get; set; }

        [AllowHtml]
        public string factoryaddress { get; set; }
        public string owner { get; set; }
        public string programmer { get; set; }

        [AllowHtml]
        public string mapurl { get; set; }
        public string facebookpage { get; set; }
        public List<BankInfo> bankinfo { get; set; }
    }
    public class BankInfo
    {
        public string bankname { get; set; }
        public string accountnumber { get; set; }
        public string accountname { get; set; }
    }
}
