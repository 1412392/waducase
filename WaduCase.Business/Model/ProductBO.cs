using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace WaduCaseBusiness.Model
{
    public class ProductBO
    {
        public int id { get; set; }
        [DisplayName("Tên")]
        public string name { get; set; }
        [DisplayName("Tên SEO")]
        public string seoname { get; set; }
        [DisplayName("Mô tả ngắn")]
        [AllowHtml]
        public string description { get; set; }
        public DateTime? createddate { get; set; }
        public DateTime? updateddate { get; set; }
        public DateTime? deleteddate { get; set; }

        public int isdeleted { get; set; }
        public string createduser { get; set; }
        public string updateduser { get; set; }
        public string deleteduser { get; set; }
        [DisplayName("Danh sách từ khóa (gõ và enter)")]
        public List<string> keyword { get; set; }

        [DisplayName("Keyword Thẻ Meta")]
        public string metakeyword { get; set; }

        [DisplayName("Description Thẻ Meta")]
        public string metadescription { get; set; }

        [DisplayName("Hãng")]
        public int brandid { get; set; }
        [DisplayName("Giá cũ")]
        public double oldprice { get; set; }

        [DisplayName("Giá mới")]
        public double newprice { get; set; }
        public List<PromotionBO> promotion { get; set; }

        [DisplayName("Chất liệu")]
        public List<MaterialBO> material { get; set; }

        [DisplayName("Hình slide (chọn 2 ảnh trở lên, 900*900)")]
        public List<ImageBO> slide { get; set; }

        [DisplayName("Hình thiết kế (chọn đúng chuẩn 3 ảnh, chọn theo thứ tự: 1. Hình full 2. Hình che 3.Nền đen)")]
        public List<DesignImage> designimage
        {
            get; set;
        }
        [DisplayName("Avatar (chọn 2 ảnh trở lên, 300*300)")]
        public List<ImageBO> avatar { get; set; }
        [DisplayName("Mô tả HTML")]
        [AllowHtml]
        public string htmldescription { get; set; }
        public List<CommentBO> comments { get; set; }

        [DisplayName("Bộ sưu tập")]
        public int collectionid { get; set; }

        [DisplayName("Thứ tự hiển thị")]
        public int displayorder { get; set; }

        [DisplayName("PhoneModel")]
        public int phonemodelid { get; set; }

        public double textScore { get; set; }
    }

    public class DesignImage
    {
        public string fullimage { get; set; }
        public string background { get; set; }
        public string specialpoint { get; set; }

    }
}
