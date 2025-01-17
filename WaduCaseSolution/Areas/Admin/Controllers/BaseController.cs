﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Common;

namespace WaduCase.Areas.Admin.Controllers
{
    public class BaseController : Controller
    {
        //protected override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //    var session = (UserLogin)Session[CommonConstants.USER_SESSION];
        //    if (session == null)
        //    {
        //        filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new
        //        {
        //            Controller = "Login",
        //            Action = "Index",
        //            Area = "Admin"
        //        }));
        //    }
         
        //}
        protected void SetAlert(string message, string type)
        {
            TempData["AlertMessage"] = message;
            if (type == "success")
            {
                TempData["AlertType"] = "alert-success";

            }
            else if (type == "warning")
            {
                TempData["AlertType"] = "alert-warning";
            }
            else if (type == "error")
            {
                TempData["AlertType"] = "alert-danger";
            }
        }
    }
}