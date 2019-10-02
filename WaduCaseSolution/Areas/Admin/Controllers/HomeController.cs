using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;

namespace WaduCase.Areas.Admin.Controllers
{
    [SessionAuthorize]
    public class HomeController : BaseController
    {
        // GET: Admin/Home

        public ActionResult Index()
        {
            var totalProduct = ProductDAO.CountTotalProduct();
            var totalProductInBrand = ProductDAO.AggregateProductByBrand();
            var totalProductInCollection = ProductDAO.AggregateProductByCollection();

            ViewBag.TotalProduct = totalProduct;
            ViewBag.TotalProductInBrand = totalProductInBrand.Where(x => x.products.Count() > 0).Select(x => x.products).Sum(x => x.Count());
            ViewBag.TotalProductInCollection = totalProductInCollection.Where(x => x.products.Count() > 0).Select(x => x.products).Sum(x => x.Count());

            return View();
        }

        //thong tin chung
        public ActionResult CommonInfo()
        {
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            if (commonInfo == null)
            {
                commonInfo = new CommonBO();
            }
            return View(commonInfo);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult UpdateCommonInfo(CommonBO updateBO, FormCollection form)
        {
            string accName = form["accountname"];
            string bankName = form["bankname"];
            string accNumber = form["accountnumber"];
            updateBO.bankinfo = new List<BankInfo>();
            updateBO.bankinfo.Add(new BankInfo()
            {
                accountname = accName,
                accountnumber = accNumber,
                bankname = bankName
            });
            if (ModelState.IsValid)
            {
                var updateModel = LocationDAO.GetCommonInfoByID(updateBO.id);
                if (updateModel == null || String.IsNullOrEmpty(updateModel.id))
                {
                    SetAlert($"Không tồn tại Common này!", "error");
                    return View("CommonInfo", updateBO);
                }
                updateModel.email = updateBO.email;
                updateModel.facebookchat = updateBO.facebookchat;
                updateModel.facebookpage = updateBO.facebookpage;
                updateModel.factoryaddress = updateBO.factoryaddress;
                updateModel.hotline = updateBO.hotline;
                updateModel.phone = updateBO.phone;
                updateModel.mapurl = updateBO.mapurl;
                updateModel.officeaddress = updateBO.officeaddress;
                updateModel.zalochat = updateBO.zalochat;


                updateModel.bankinfo = new List<BankInfo>();
                updateModel.bankinfo.Add(new BankInfo()
                {
                    accountname = accName,
                    accountnumber = accNumber,
                    bankname = bankName
                });
                string errorMessage = "";
                var result = LocationDAO.UpdateCommonInfo(updateModel, ref errorMessage);
                SetAlert($"Cập nhật thông tin chung thành công", "success");
                return RedirectToAction("CommonInfo");

            }
            return View("CommonInfo", updateBO);
        }
    }
}