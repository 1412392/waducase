using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TrieuTraiTimKara
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
              name: "Product Detail",
              url: "san-pham/{metatitle}-{id}",
              defaults: new { controller = "Product", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "WaduCase.Controllers" }
          );

            routes.MapRoute(
               name: "Collection",
               url: "danh-muc/bo-suu-tap/{metatitle}-{id}",
               defaults: new { controller = "Category", action = "Collection", id = UrlParameter.Optional },
                namespaces: new[] { "WaduCase.Controllers" }
           );

            routes.MapRoute(
                   name: "Manufacture",
                   url: "danh-muc/hang-dien-thoai/{metatitle}-{id}",
                   defaults: new { controller = "Category", action = "Index", id = UrlParameter.Optional },
                    namespaces: new[] { "WaduCase.Controllers" }
               );

            routes.MapRoute(
                name: "SearchResult",
                url: "tim-kiem",
                defaults: new { controller = "Search", action = "SearchProduct", id = UrlParameter.Optional },
                 namespaces: new[] { "WaduCase.Controllers" }
            );

            routes.MapRoute(
               name: "Cart",
               url: "gio-hang",
               defaults: new { controller = "Cart", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WaduCase.Controllers" }
           );

            routes.MapRoute(
              name: "Checkout",
              url: "thanh-toan",
              defaults: new { controller = "Cart", action = "Checkout", id = UrlParameter.Optional },
               namespaces: new[] { "WaduCase.Controllers" }
          );
            routes.MapRoute(
             name: "ChekoutSuccess",
             url: "thanh-toan-thanh-cong",
             defaults: new { controller = "Cart", action = "ChekoutSuccess", id = UrlParameter.Optional },
              namespaces: new[] { "WaduCase.Controllers" }
         );

            routes.MapRoute(
           name: "Contact",
           url: "lien-he",
           defaults: new { controller = "Home", action = "Contact", id = UrlParameter.Optional },
            namespaces: new[] { "WaduCase.Controllers" }
       );

            routes.MapRoute(
          name: "PolicyPayment",
          url: "chinh-sach-thanh-toan",
          defaults: new { controller = "Home", action = "PolicyPayment", id = UrlParameter.Optional },
           namespaces: new[] { "WaduCase.Controllers" }
      );

            routes.MapRoute(
          name: "PolicyReturn",
          url: "chinh-sach-doi-tra",
          defaults: new { controller = "Home", action = "PolicyReturn", id = UrlParameter.Optional },
           namespaces: new[] { "WaduCase.Controllers" }
      );
            routes.MapRoute(
          name: "PolicyShip",
          url: "chinh-sach-giao-hang",
          defaults: new { controller = "Home", action = "PolicyShip", id = UrlParameter.Optional },
           namespaces: new[] { "WaduCase.Controllers" }
      );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                 namespaces: new[] { "WaduCase.Controllers" }
            );
        }
    }
}
