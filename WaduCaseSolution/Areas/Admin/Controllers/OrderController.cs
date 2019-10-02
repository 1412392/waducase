using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using WaduCase.Common;
using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;

namespace WaduCase.Areas.Admin.Controllers
{
    [SessionAuthorize]
    public class OrderController : Controller
    {

        public ActionResult Index(int status = 1)
        {
            var orders = OrderDAO.GetListOrderByStatusID(status);
            ViewBag.ListStatusOrder = OrderDAO.StaticOrderStatus();
            ViewBag.Status = status;
            if (orders == null)
            {
                orders = new List<OrderBO>();
            }

            return View(orders);

        }

        public JsonResult ViewOrder(string id)
        {
            var orders = OrderDAO.GetOrderByID(id);
            string html = String.Empty;
            if (orders != null && !String.IsNullOrEmpty(orders.id))
            {
                html = RenderRazorViewToString("_PartialDetailOrder", orders);
            }

            return Json(new
            {
                content = html
            }, JsonRequestBehavior.AllowGet);
        }
        public string RenderRazorViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext,
                                                                         viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View,
                                             ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }
        [HttpPost]
        public ActionResult UpdateOrderStatus(FormCollection form)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            string OrderID = Convert.ToString(form["orderid"]).Trim();
            int StatusID = Convert.ToInt32(form["selectstatus"]);


            var updateOrder = OrderDAO.GetOrderByID(OrderID);
            var result = -1;
            if (updateOrder != null && !String.IsNullOrEmpty(updateOrder.id) && updateOrder.id == OrderID)
            {
                updateOrder.status = StatusID;
                if (StatusID == 1)
                {
                    updateOrder.statusname = "Chưa xử lý";

                }
                else if (StatusID == 2)
                {
                    updateOrder.statusname = "Đang xử lý";

                }
                else if (StatusID == 3)
                {
                    updateOrder.statusname = "Đã hoàn tất";
                    updateOrder.deliverydate = DateTime.Now;

                }
                else if (StatusID == 4)
                {
                    updateOrder.statusname = "Đã hủy";
                    updateOrder.canceleddate = DateTime.Now;
                    updateOrder.iscanceled = true;
                    updateOrder.canceleduser = Convert.ToString(user.UserID);

                }
                result = OrderDAO.UpdateOrderStatus(OrderID, updateOrder);
            }


            return RedirectToAction("Index", new
            {
                status = result
            });
        }


        [HttpPost]
        public JsonResult DeleteOrder(string id)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            string messageDelete = "";
            bool resultDelete = false;

            resultDelete = OrderDAO.DeleteOrder(id, user.UserID.ToString());
            messageDelete = "Xóa thành công";
            return Json(
                    new
                    {
                        status = resultDelete,
                        message = messageDelete
                    });
        }
    }
}