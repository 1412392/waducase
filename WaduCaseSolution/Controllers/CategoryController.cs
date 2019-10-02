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
    public class CategoryController : Controller
    {

        public ActionResult Index(string metatitle, int id, string orderby = "")
        {
            if (metatitle.Length <= 0 && metatitle.Split('-').Count() < 2)
            {
                return RedirectToAction("NotFound", "Error");
            }
            var brandInfo = BrandModel.GetBrandByID(id);
            if (brandInfo == null)
            {
                return RedirectToAction("NotFound", "Error");
            }
            ViewBag.OrderBy = orderby;
            return View(brandInfo);
        }
        public ActionResult Collection(string metatitle, int id, string orderby = "")
        {
            if (metatitle.Length <= 0 && metatitle.Split('-').Count() < 2)
            {
                return RedirectToAction("NotFound", "Error");
            }

            var collectionInfo = CollectionDAO.GetCollectionByID(id);
            if (collectionInfo == null)
            {
                return RedirectToAction("NotFound", "Error");
            }

            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            ViewBag.OrderBy = orderby;
            ViewBag.CommonInfo = commonInfo;
            return View(collectionInfo);
        }
        public ActionResult SideBar(int currentID, bool isCollectionLoad)
        {
            var lstCollection = CollectionDAO.GetAllCollection();
            var lstBrand = BrandModel.GetAllBrand();
            if (lstCollection.Count == 0 && lstBrand.Count() == 0)
            {
                return RedirectToAction("NotFound", "Error");
            }
            ViewBag.ListCollection = lstCollection;

            ViewBag.ListBrand = lstBrand;
            ViewBag.CurrentID = currentID;
            ViewBag.IsCollectionLoad = isCollectionLoad;
            return PartialView();
        }
        public ActionResult ListProduct(int id, bool isCollection, string orderBy)
        {
            var lstProduct = new List<ProductBO>();
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
            if (isCollection)
            {
                lstProduct = ProductDAO.GetListProductByCollectionID(id, OrderBy);

            }
            else
            {
                lstProduct = ProductDAO.GetListProductByBrandID(id, OrderBy);
            }
            return PartialView(lstProduct);
        }

        public ActionResult GetAllCollection()
        {
            List<CollectionBO> lstCollection = CollectionDAO.GetAllCollection();

            return PartialView(lstCollection);
        }
        public ActionResult ListRealCaseByCollectionID(int id, string name)
        {
            List<RealCaseBO> lstRealCase = CollectionDAO.GetListRealCaseByCollectionID(id, 8);
            ViewBag.CollectionID = id;
            ViewBag.CollectionName = name;
            return PartialView(lstRealCase);
        }

        public ActionResult ListRealCaseByBrandID(int id, string name)
        {
            List<RealCaseBO> lstRealCase = CollectionDAO.GetListRealCaseByBrandID(id, 8);
            ViewBag.CollectionID = id;
            ViewBag.CollectionName = name;
            return PartialView("ListRealCaseByCollectionID");
        }
    }
}