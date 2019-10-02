using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WaduCaseBusiness.DAO;

namespace WaduCase.Common
{
    public class ProductHelper
    {
        public static string GenProductURL(string name, int id, bool isFromPhoneModel = false)
        {
            name = ReplaceWord(name);
            string url = "";
            if (isFromPhoneModel)
            {
                //find productID and productname from phonemodelID
                var product = ProductDAO.GetProductByPhoneModelID(id);
                if (product == null) return "#";

                url = $"/san-pham/in-op-lung-{ReplaceWord(product.name).Replace(" ", "-")}-{product.id}";
            }
            else
            {
                url = $"/san-pham/in-op-lung-{name.Replace(" ", "-")}-{id}";
            }

            return url;

        }

        public static string GenBrandURL(string name, int id)
        {
            name = ReplaceWord(name);
            string url = $"/danh-muc/hang-dien-thoai/op-lung-dien-thoai-{name.Replace(" ", "-")}-{id}";

            return url;

        }
        public static string GenCollectionURL(string name, int id)
        {
            name = ReplaceWord(name);
            string url = $"/danh-muc/bo-suu-tap/{name.Replace(" ", "-")}-{id}";

            return url;

        }
        private static string ReplaceWord(string name)
        {
            return name.ToLower().Replace("(", " ").Replace(")", " ").Replace("+", " plus ")
                .Replace("/", " ").Trim();
        }
    }
}