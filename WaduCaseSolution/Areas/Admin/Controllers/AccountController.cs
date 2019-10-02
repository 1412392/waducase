
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Common;
using WaduCaseBusiness.Model;
using WaduCaseBusiness.DAO;

namespace WaduCase.Areas.Admin.Controllers
{
    [SessionAuthorize]
    public class AccountController : BaseController
    {

        public ActionResult Index(string role = "customer")
        {

            var lstUser = AccountDAO.GetListUserByRole(role);
            ViewBag.ListUserType = AccountDAO.StaticAccount();
            ViewBag.Role = role;
            if (lstUser == null)
            {
                lstUser = new List<UserBO>();
            }

            return View(lstUser);
        }
        public ActionResult UpdateAccount(int id = 0)
        {
            UserBO model = new UserBO();

            if (id > 0)
            {
                model = AccountDAO.GetUserByID(id);
                if (model == null) return RedirectToAction("Index");
            }

            return View(model);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult UpdateAccount(UserBO userbo)
        {
            if (ModelState.IsValid)
            {
                UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
                string errorMessage = "";
                int result = 0;
                userbo.isactive = 1;
                if (string.IsNullOrEmpty(userbo.role))
                {
                    ModelState.AddModelError("", "Phải chọn quyền cho user!");
                    return View(userbo);
                }
                if (String.IsNullOrEmpty(userbo.username))
                {
                    ModelState.AddModelError("", "Phải nhập username!");
                    return View(userbo);
                }

                if (userbo.id > 0)
                {
                    //get updatemodel
                    UserBO newUpdateBO = new UserBO();
                    newUpdateBO = AccountDAO.GetUserByID(userbo.id);
                    if (newUpdateBO == null)
                    {
                        ModelState.AddModelError("", "User không tồn tại!");
                        return View(userbo);
                    }

                    newUpdateBO.updateduser = Convert.ToInt32(user.UserID);
                    newUpdateBO.updateddate = DateTime.Now;
                    newUpdateBO.note = userbo.note;
                    newUpdateBO.address = userbo.address;
                    newUpdateBO.phone = userbo.phone;
                    newUpdateBO.email = userbo.email;
                    newUpdateBO.fullname = userbo.fullname;
                    newUpdateBO.avatar = userbo.avatar;
                    newUpdateBO.role = userbo.role;

                    //update password
                    if (!String.IsNullOrEmpty(userbo.password))
                    {
                        newUpdateBO.password = Encryptor.MD5Hash(userbo.password);
                        newUpdateBO.rawpassword = userbo.password;
                    }

                    result = AccountDAO.UpdateAccount(newUpdateBO, ref errorMessage);
                    SetAlert($"Cập nhật Account {newUpdateBO.id}-{newUpdateBO.username} thành công", "success");
                }
                else
                {

                    if (String.IsNullOrEmpty(userbo.password))
                    {
                        ModelState.AddModelError("", "Phải nhập password!");
                        return View(userbo);
                    }

                    //check username tồn tại chưa
                    var existuser = UserDAO.GetUserByUserName(userbo.username);
                    if (existuser != null && existuser.id > 0)
                    {
                        ModelState.AddModelError("", "Username đã tồn tại. Mời chọn username khác!");
                        return View(userbo);
                    }

                    userbo.createduser = Convert.ToInt32(user.UserID);
                    userbo.createddate = DateTime.Now;

                    userbo.password = Encryptor.MD5Hash(userbo.password);
                    userbo.rawpassword = userbo.password;

                    result = AccountDAO.InsertAccount(userbo, ref errorMessage);
                    SetAlert($"Thêm Account {userbo.username} thành công", "success");
                }

                if (result > 0)
                {
                    return RedirectToAction("Index", "Account");
                }
                else
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra. Thêm thất bại: " + errorMessage);
                }


            }

            return View(userbo);

        }

        [HttpPost]
        public JsonResult DeleteAccount(int id)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            //check for prouduct exits on brand
            string messageDelete = "";
            bool resultDelete = false;

            resultDelete = AccountDAO.DeleteAccount(id, Convert.ToInt32(user.UserID));
            messageDelete = "Xóa thành công";
            SetAlert($"Xóa user {id} thành công", "success");
            return Json(
                    new
                    {
                        status = resultDelete,
                        message = messageDelete
                    });
        }

    }
}