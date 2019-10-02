using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Common;

namespace WaduCase.Areas.Admin
{
    public class SessionAuthorize : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return httpContext.Session[Common.CommonConstants.USER_SESSION] != null;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new
            {
                Controller = "Login",
                Action = "Index",
                Area = "Admin"
            }));
        }

    }
}