using WaduCaseBusiness.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCaseBusiness.Model;
using WaduCase.Models;

namespace WaduCase.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            var lstBrand = BrandModel.GetAllBrand();
            var lstPhoneModel = new List<PhoneModelBO>();

            foreach (var item in lstBrand)
            {
                var result = BrandModel.GetPhoneModelByBrandID(item.id);
                if (result != null)
                {
                    lstPhoneModel.AddRange(result);
                }

            }
            ViewBag.ListBrand = lstBrand;
            ViewBag.ListModel = lstPhoneModel;
            ViewBag.CommonInfo = commonInfo;

            return View();
        }

        public ActionResult MenuBar(bool isMobile)
        {
            List<CollectionBO> lstCollection = CollectionDAO.GetAllCollection();



            if (isMobile)
            {
                return PartialView("MenuBarMobile", lstCollection);
            }


            //gio-hang
            List<CartSession> lstCartItem = new List<CartSession>();
            lstCartItem = Session["fancycart"] as List<CartSession>;
            if (lstCartItem == null)
            {
                lstCartItem = new List<CartSession>();
            }
            ViewBag.ListCartItem = lstCartItem;

            return PartialView("MenuBar", lstCollection);

        }
        public ActionResult GetFeatureCollection()
        {
            List<CollectionBO> lstCollection = CollectionDAO.GetFeatureCollection(2);

            return PartialView("FeatureCollection", lstCollection);

        }

        public ActionResult CartMobile()
        {
            //gio-hang
            List<CartSession> lstCartItem = new List<CartSession>();
            lstCartItem = Session["fancycart"] as List<CartSession>;
            if (lstCartItem == null)
            {
                lstCartItem = new List<CartSession>();
            }

            return PartialView(lstCartItem);
        }

        public ActionResult CommonInfo()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            return PartialView(commonInfo);
        }

        public ActionResult Footer()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            return PartialView(commonInfo);
        }

        public ActionResult Contact()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            return View(commonInfo);
        }
        public ActionResult PolicyShip()
        {

            return View();
        }
        public ActionResult PolicyReturn()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            return View(commonInfo);
        }
        public ActionResult PolicyPayment()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            return View(commonInfo);
        }
    }
}