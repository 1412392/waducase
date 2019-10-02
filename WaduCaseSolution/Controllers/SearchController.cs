using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Common;
using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;

namespace WaduCase.Controllers
{
    public class SearchController : Controller
    {
        // GET: Search
        public JsonResult Index(string query)
        {
            List<SearchBO> lstSuggestSearch = new List<SearchBO>();
            var lstProduct = SearchDAO.SearchProduct(query);
            if (lstProduct != null && lstProduct.Count() > 0)
            {
                foreach (var item in lstProduct)
                {
                    lstSuggestSearch.Add(new SearchBO()
                    {
                        id = item.id,
                        img = item.avatar.FirstOrDefault().url,
                        price = $"<del><span class='woocommerce-Price-amount amount'>{item.oldprice.ToString("N0")}<span class='woocommerce-Price-currencySymbol'>&#8363;</span></span></del> <ins><span class='woocommerce-Price-amount amount'>{item.newprice.ToString("N0")}<span class='woocommerce-Price-currencySymbol'>&#8363;</span></span></ins>",
                        type = "product",
                        url = ProductHelper.GenProductURL(item.name, item.id),
                        value = item.name
                    });
                }
            }
            else
            {
                lstSuggestSearch.Add(new SearchBO()
                {
                    id = 1000,
                    img = "",
                    price = "",
                    type = "product",
                    url = "",
                    value = "Không có sản phẩm nào"
                });
            }


            return Json(new
            {
                suggestions = lstSuggestSearch

            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SearchProduct(string s, string post_type, string orderBy = "none")
        {
            int OrderBy = 0;
            if (!string.IsNullOrEmpty(orderBy))
            {
                if (orderBy.ToLower() == "price")
                {
                    OrderBy = 1;//sort từ thấp tới cao
                }
                else if (orderBy.ToLower() == "price-desc")
                {
                    OrderBy = 2;//sort từ cao tới thấp
                }
            }

            ViewBag.Keyword = s;
            ViewBag.OrderBy = OrderBy;
            var lstProduct = SearchDAO.SearchProduct(s, OrderBy);

            return View(lstProduct);
        }
    }
}