using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Models;
using Newtonsoft.Json;

namespace WaduCase.Controllers
{
    public class ProductController : Controller
    {

        public ActionResult Index(string metatitle, int id, int attribute_pa_chon_chat_lieu_op_lung = 0, string cart_item_key = "")
        {

            if (metatitle.Length <= 0 || metatitle.Split('-').Count() <= 1)
            {
                return RedirectToAction("NotFound", "Error");
            }


            var product = ProductDAO.GetProductByID(id);
            if (product == null)
            {
                return RedirectToAction("NotFound", "Error");
            }
            product.avatar.OrderBy(x => x.displayorder);
            product.slide.OrderBy(x => x.displayorder);

            if (product.collectionid > 0)
            {
                ViewBag.CollectionName = BrandModel.GetCollectionByID(Convert.ToInt32(product.collectionid)).name;
            }
            else
            {
                ViewBag.BrandName = BrandModel.GetBrandByID(Convert.ToInt32(product.brandid)).name;
            }

            ViewBag.CurrentMaterialID = attribute_pa_chon_chat_lieu_op_lung;
            CartSession cart = new CartSession();

            if (!String.IsNullOrEmpty(cart_item_key))
            {
                List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;
                if (lstCartItem != null)
                {
                    cart = lstCartItem.Where(x => x.ItemKey == cart_item_key).FirstOrDefault();
                }

            }
            if (cart == null) cart = new CartSession();
            if (!String.IsNullOrEmpty(cart.Order))
            {
                cart.OrderObject = JsonConvert.DeserializeObject<dynamic>(cart.Order);
                cart.OrderObject_Additional = cart.OrderObject.product[0];

            }

            ViewBag.CurrentCartItem = cart;
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            ViewBag.CommonInfo = commonInfo;
            return View(product);
        }

        public ActionResult RelativeProduct(ProductBO objProductBO)
        {
            var listRelativeProduct = ProductDAO.GetListRelativeProduct(objProductBO.id, Convert.ToInt32(objProductBO.brandid), Convert.ToInt32(objProductBO.collectionid));

            if (objProductBO.collectionid > 0)
            {
                ViewBag.CollectionName = BrandModel.GetCollectionByID(Convert.ToInt32(objProductBO.collectionid)).name;
                ViewBag.CollectionID = objProductBO.collectionid;
            }
            else
            {
                ViewBag.BrandName = BrandModel.GetBrandByID(Convert.ToInt32(objProductBO.brandid)).name;
                ViewBag.BrandID = objProductBO.brandid;
            }

            return PartialView(listRelativeProduct);
        }
        public ActionResult RealProductAtWaduCase(ProductBO objProduct)
        {
            int id = 3;

            List<RealCaseBO> lstRealCase = CollectionDAO.GetListRealCaseByCollectionID(id, 8);
            return PartialView(lstRealCase);
        }
    }
}