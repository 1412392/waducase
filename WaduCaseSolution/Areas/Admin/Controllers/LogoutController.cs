using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Common;

namespace WaduCase.Areas.Admin.Controllers
{
    public class LogoutController : Controller
    {
        // GET: Admin/Logout
        
        public ActionResult Index()
        {

            try
            {
                Session.Remove(CommonConstants.USER_SESSION);
            }
            catch (Exception e)
            {

            }
            return RedirectToAction("Index", "Login");

        }
    }
}