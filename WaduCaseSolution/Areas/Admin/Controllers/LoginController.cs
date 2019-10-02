using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Areas.Admin.Models;
using WaduCase.Common;
using WaduCaseBusiness.DAO;

namespace WaduCase.Areas.Admin.Controllers
{

    public class LoginController : Controller
    {
        // GET: Admin/Login

        [SessionAuthorize]
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginModel model)
        {

            if (ModelState.IsValid)//kiểm tra model valid
            {

                int result = UserDAO.Login(model.Username, Encryptor.MD5Hash(model.Password));

                if (result == 1)
                {

                    var user = UserDAO.GetUserByUserName(model.Username);
                    var usersession = new UserLogin();
                    usersession.UserName = user.username;
                    usersession.UserID = user.id;
                    usersession.Avatar = user.avatar;

                    Session.Add(CommonConstants.USER_SESSION, usersession);
                    return RedirectToAction("Index", "Home");//trả về Action Index của Home Controller Admin

                }
                else if (result == -1)
                {
                    ModelState.AddModelError("", "Thông tin đăng nhập không đúng. Vui lòng nhập lại.");
                }
                else if (result == 0)
                {
                    ModelState.AddModelError("", "Tài khoản đang bị khóa");
                }


            }
            return View("Index");//return view index (kh có view login cùng tên)
        }

    }
}