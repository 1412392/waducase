using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaduCase.Common;
using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;

namespace WaduCase.Areas.Admin.Controllers
{
    [SessionAuthorize]
    public class CategoryController : BaseController
    {
        #region collection
        public ActionResult Collection(int page = 1, int pageSize = 100)
        {
            var lstCollection = CollectionDAO.GetAllCollection();
            if (lstCollection == null)
            {
                lstCollection = new List<CollectionBO>();
            }

            return View(lstCollection.OrderBy(x => x.displayorder).ToList());
        }
        public ActionResult UpdateCollection(int id = 0)
        {
            CollectionBO model = new CollectionBO();

            if (id > 0)
            {
                model = CollectionDAO.GetCollectionByID(id);
            }
            return View(model);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult UpdateCollection(CollectionBO collectionModel)
        {
            if (ModelState.IsValid)
            {
                UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
                string errorMessage = "";
                bool result = false;
                collectionModel.isdeleted = 0;
                if (collectionModel.id > 0)
                {
                    //get updatemodel
                    CollectionBO newUpdateBO = new CollectionBO();
                    newUpdateBO = CollectionDAO.GetCollectionByID(collectionModel.id);
                    if (newUpdateBO == null)
                    {
                        ModelState.AddModelError("", "Collection không tồn tại");
                        return View(collectionModel);
                    }

                    newUpdateBO.updateduser = user.UserID.ToString();
                    newUpdateBO.updateddate = DateTime.Now;
                    newUpdateBO.description = collectionModel.description;
                    newUpdateBO.keyword = collectionModel.keyword;
                    newUpdateBO.logo = collectionModel.logo;
                    newUpdateBO.metadescription = collectionModel.metadescription;
                    newUpdateBO.metakeyword = collectionModel.metakeyword;
                    newUpdateBO.name = collectionModel.name;
                    newUpdateBO.seoname = collectionModel.seoname;
                    newUpdateBO.displayorder = collectionModel.displayorder;

                    result = CollectionDAO.UpdateCollection(newUpdateBO, ref errorMessage);
                    SetAlert($"Cập nhật Collection {collectionModel.id}-{collectionModel.name} thành công", "success");
                }
                else
                {
                    collectionModel.createduser = user.UserID.ToString();
                    collectionModel.createddate = DateTime.Now;
                    result = CollectionDAO.InsertCollection(collectionModel, ref errorMessage);
                    SetAlert($"Thêm Collection {collectionModel.name} thành công", "success");
                }

                if (result)
                {
                    return RedirectToAction("Collection", "Category");
                }
                else
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra. Thêm thất bại: " + errorMessage);
                }


            }

            return View(collectionModel);

        }
        [HttpPost]
        public JsonResult DeleteCollection(int id)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            //check for prouduct exits on brand
            string messageDelete = "";
            bool resultDelete = false;
            var lstProduct = ProductDAO.GetListProductByCollectionID(id, 1);
            if (lstProduct.Count > 0)
            {
                resultDelete = false;
                messageDelete = "Hiện đang có " + lstProduct.Count + " sản phẩm thuộc bộ sưu tập này. Không thể xóa!";
            }
            else
            {
                resultDelete = CollectionDAO.DeleteCollection(id, user.UserID.ToString());
                messageDelete = "Xóa thành công";
                SetAlert($"Xóa Collection {id} thành công", "success");
            }


            return Json(
                    new
                    {
                        status = resultDelete,
                        message = messageDelete
                    });
        }
        #endregion

        #region brand
        public ActionResult Brand(int page = 1, int pageSize = 100)
        {
            var lstBrand = BrandModel.GetAllBrand(page, pageSize);
            if (lstBrand == null)
            {
                lstBrand = new List<BrandBO>();
            }
            return View(lstBrand);
        }
        public ActionResult UpdateBrand(int id = 0)
        {
            BrandBO model = new BrandBO();

            if (id > 0)
            {
                model = BrandModel.GetBrandByID(id);
            }
            return View(model);
        }


        [HttpPost, ValidateInput(false)]
        public ActionResult UpdateBrand(BrandBO brandModel)
        {
            if (ModelState.IsValid)
            {
                UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
                string errorMessage = "";
                bool result = false;
                brandModel.isdeleted = 0;
                if (brandModel.id > 0)
                {
                    //get updatemodel
                    BrandBO newUpdateBO = new BrandBO();
                    newUpdateBO = BrandModel.GetBrandByID(brandModel.id);
                    if (newUpdateBO == null)
                    {
                        ModelState.AddModelError("", "Brand không tồn tại");
                        return View(brandModel);
                    }

                    newUpdateBO.updateduser = user.UserID.ToString();
                    newUpdateBO.updateddate = DateTime.Now;
                    newUpdateBO.description = brandModel.description;
                    newUpdateBO.isdeleted = 0;
                    newUpdateBO.keyword = brandModel.keyword;
                    newUpdateBO.logo = brandModel.logo;
                    newUpdateBO.metadescription = brandModel.metadescription;
                    newUpdateBO.metakeyword = brandModel.metakeyword;
                    newUpdateBO.name = brandModel.name;
                    newUpdateBO.seoname = brandModel.seoname;

                    result = BrandModel.UpdateBrand(newUpdateBO, ref errorMessage);
                    SetAlert($"Cập nhật Brand {brandModel.id}-{brandModel.name} thành công", "success");
                }
                else
                {
                    brandModel.createduser = user.UserID.ToString();
                    brandModel.createddate = DateTime.Now;
                    result = BrandModel.InsertBrand(brandModel, ref errorMessage);
                    SetAlert($"Thêm Brand {brandModel.name} thành công", "success");
                }

                if (result)
                {
                    return RedirectToAction("Brand", "Category");
                }
                else
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra. Thêm thất bại: " + errorMessage);
                }


            }

            return View(brandModel);

        }


        [HttpPost]
        public JsonResult DeleteBrand(int id)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            //check for prouduct exits on brand
            string messageDelete = "";
            bool resultDelete = false;
            var lstProduct = ProductDAO.GetListProductByBrandID(id, 1);
            if (lstProduct.Count > 0)
            {
                resultDelete = false;
                messageDelete = "Hiện đang có " + lstProduct.Count + " sản phẩm thuộc Brand này. Không thể xóa!";
            }
            else
            {
                resultDelete = BrandModel.DeleteBrand(id, user.UserID.ToString());
                messageDelete = "Xóa thành công";
                SetAlert($"Xóa Brand {id} thành công", "success");
            }


            return Json(
                    new
                    {
                        status = resultDelete,
                        message = messageDelete
                    });
        }
        #endregion

        #region phonemodel
        public ActionResult PhoneModel(int page = 1, int pageSize = 100)
        {
            var lstCollection = PhoneModelDAO.GetAllPhoneModel();
            var lstBrand = BrandModel.GetAllBrand();

            if (lstCollection == null)
            {
                lstCollection = new List<PhoneModelBO>();
            }
            if (lstBrand == null)
            {
                lstBrand = new List<BrandBO>();
            }
            ViewBag.ListBrand = lstBrand;

            return View(lstCollection.OrderBy(x => x.group).ToList());
        }
        public ActionResult UpdatePhoneModel(int id = 0)
        {
            PhoneModelBO model = new PhoneModelBO();

            if (id > 0)
            {
                model = PhoneModelDAO.GetPhoneModelByID(id);
            }
            InitSelectListBrand();
            return View(model);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult UpdatePhoneModel(PhoneModelBO phoneModel)
        {
            if (ModelState.IsValid)
            {
                UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
                string errorMessage = "";
                bool result = false;
                phoneModel.isdeleted = 0;
                if (phoneModel.id > 0)
                {
                    //get updatemodel
                    PhoneModelBO newUpdateBO = new PhoneModelBO();
                    newUpdateBO = PhoneModelDAO.GetPhoneModelByID(phoneModel.id);
                    if (newUpdateBO == null)
                    {
                        ModelState.AddModelError("", "PhoneModel không tồn tại");
                        return View(phoneModel);
                    }

                    newUpdateBO.updateduser = user.UserID.ToString();
                    newUpdateBO.updateddate = DateTime.Now;
                    newUpdateBO.description = phoneModel.description;
                    newUpdateBO.keyword = phoneModel.keyword;

                    newUpdateBO.metadescription = phoneModel.metadescription;
                    newUpdateBO.metakeyword = phoneModel.metakeyword;
                    newUpdateBO.name = phoneModel.name;
                    newUpdateBO.seoname = phoneModel.seoname;
                    newUpdateBO.brandid = phoneModel.brandid;
                    newUpdateBO.group = !String.IsNullOrEmpty(phoneModel.group) ? phoneModel.group.Trim() : "";
                    newUpdateBO.groupterm = CommonHelper.GenTerm(phoneModel.group);

                    result = PhoneModelDAO.UpdatePhoneModel(newUpdateBO, ref errorMessage);
                    SetAlert($"Cập nhật PhoneModel {phoneModel.id}-{phoneModel.name} thành công", "success");
                }
                else
                {
                    phoneModel.createduser = user.UserID.ToString();
                    phoneModel.createddate = DateTime.Now;
                    phoneModel.groupterm = CommonHelper.GenTerm(phoneModel.group);

                    result = PhoneModelDAO.InsertPhoneModel(phoneModel, ref errorMessage);
                    SetAlert($"Thêm PhoneModel {phoneModel.name} thành công", "success");
                }

                if (result)
                {
                    return RedirectToAction("PhoneModel", "Category");
                }
                else
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra. Thêm thất bại: " + errorMessage);
                    InitSelectListBrand();
                }


            }

            return View(phoneModel);

        }
        [HttpPost]
        public JsonResult DeletePhoneModel(int id)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            //check for prouduct exits on brand
            string messageDelete = "";
            bool resultDelete = false;
            var Product = ProductDAO.GetProductByPhoneModelID(id);
            if (Product != null && !String.IsNullOrEmpty(Product.name) && Product.phonemodelid > 0)
            {
                resultDelete = false;
                messageDelete = "Hiện đang có " + 1 + " sản phẩm gắn với model này. Không thể xóa!";
            }
            else
            {
                resultDelete = PhoneModelDAO.DeletePhoneModel(id, user.UserID.ToString());
                messageDelete = "Xóa thành công";
                SetAlert($"Xóa phone model {id} thành công", "success");
            }


            return Json(
                    new
                    {
                        status = resultDelete,
                        message = messageDelete
                    });
        }

        #endregion
        public void InitSelectListBrand(long? selectedID = null)
        {

            ViewBag.BrandID = new SelectList(BrandModel.GetAllBrand(), "id", "name", selectedID);

        }
    }
}