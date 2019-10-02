using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;
using WaduCase.Common;

namespace WaduCase.Areas.Admin.Controllers
{
    [SessionAuthorize]
    public class ProductController : BaseController
    {

        public ActionResult Index(int collectionID = 0, int brandID = 0)
        {

            var lstProduct = new List<ProductBO>();
            if (collectionID == 0 && brandID == 0)
            {
                //mac dinh lay san phẩm của bộ sưu tập thứ 3: ốp lưng siêu anh hùng
                lstProduct = ProductDAO.GetListProductByCollectionID(3, 1);

            }
            else
            {

                if (collectionID > 0)
                {
                    lstProduct = ProductDAO.GetListProductByCollectionID(collectionID, 1);
                }
                if (brandID > 0)
                {
                    lstProduct = ProductDAO.GetListProductByBrandID(brandID, 1);
                }
            }

            ViewBag.ListBrandProduct = ProductDAO.AggregateProductByBrand().OrderByDescending(x => x.products.Count()).ToList();
            ViewBag.ListCollectionProduct = ProductDAO.AggregateProductByCollection().OrderByDescending(x => x.products.Count()).ToList();
            ViewBag.CollectionID = collectionID;
            ViewBag.BrandID = brandID;

            return View(lstProduct);
        }

        public ActionResult UpdateProduct(int id = 0)
        {

            ProductBO model = new ProductBO();
            ViewBag.ProductType = 0;
            if (id > 0)
            {
                model = ProductDAO.GetProductByID(id);
                if (model == null) return RedirectToAction("Index");
                if (model.collectionid > 0)
                {
                    ViewBag.ProductType = 1;
                }
                else
                {
                    ViewBag.ProductType = 2;
                }
            }

            InitSelectListCollection();
            InitSelectListPhoneModel();
            return View(model);
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult UpdateProduct(ProductBO product, FormCollection form)
        {
            ProductBO model = new ProductBO();
            if (ModelState.IsValid)
            {
                var productType = Convert.ToInt32(form["producttype"]);
                var lstAvatar = Convert.ToString(form["tbavatar"]);
                var lstSlide = Convert.ToString(form["tbslide"]);
                var lstDesignImage = Convert.ToString(form["tbdesignimage"]);
                var lstMaterial = Convert.ToString(form["tbmaterial"]);

                if (product.keyword == null || product.keyword.Count <= 0 || product.keyword.First() is null)
                {
                    ModelState.AddModelError("", "Phải nhập Keyword!");
                    InitSelectListCollection();
                    InitSelectListPhoneModel();
                    return View(product);
                }

                if (String.IsNullOrEmpty(lstAvatar) || lstAvatar.Split(';').Count() < 2)
                {
                    ModelState.AddModelError("", "Phải chọn 2 Avatar cho sản phẩm!");
                    InitSelectListCollection();
                    InitSelectListPhoneModel();
                    return View(product);
                }
                if (String.IsNullOrEmpty(lstSlide) || lstSlide.Split(';').Count() < 2)
                {
                    ModelState.AddModelError("", "Phải chọn ít nhất 2 Slide cho sản phẩm!");
                    InitSelectListCollection();
                    InitSelectListPhoneModel();
                    return View(product);
                }
                if (productType == 2 && (String.IsNullOrEmpty(lstDesignImage) || lstDesignImage.Split(';').Count() < 3))
                {
                    ModelState.AddModelError("", "Phải chọn 3 hình thiết kế cho sản phẩm!");
                    InitSelectListCollection();
                    InitSelectListPhoneModel();
                    return View(product);
                }
                if (productType == 2 && (String.IsNullOrEmpty(lstMaterial) || lstMaterial.Split(',').Count() < 1))
                {
                    ModelState.AddModelError("", "Phải chọn chất liệu cho sản phẩm!");
                    InitSelectListCollection();
                    InitSelectListPhoneModel();
                    return View(product);
                }




                var lstKeyword = product.keyword.First().Split(',').ToList();

                UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
                string errorMessage = "";
                int result = -1;
                product.isdeleted = 0;
                product.avatar = new List<ImageBO>();
                product.slide = new List<ImageBO>();
                var finalListAvatar = lstAvatar.Split(';');
                for (int i = 0; i < finalListAvatar.Count(); i++)
                {
                    product.avatar.Add(new ImageBO()
                    {
                        displayorder = i + 1,
                        url = finalListAvatar[i]
                    });
                }
                var finalListSlide = lstSlide.Split(';');
                for (int i = 0; i < finalListSlide.Count(); i++)
                {
                    product.slide.Add(new ImageBO()
                    {
                        displayorder = i + 1,
                        url = finalListSlide[i]
                    });
                }

                if (product.id > 0)//upadte
                {
                    //get updatemodel
                    ProductBO newUpdateBO = new ProductBO();
                    newUpdateBO = ProductDAO.GetProductByID(product.id);
                    if (newUpdateBO == null)
                    {
                        ModelState.AddModelError("", "Product không tồn tại");

                        InitSelectListCollection();
                        InitSelectListPhoneModel();

                        return View(product);
                    }

                    newUpdateBO.updateduser = user.UserID.ToString();
                    newUpdateBO.updateddate = DateTime.Now;
                    newUpdateBO.description = product.description;
                    newUpdateBO.htmldescription = product.htmldescription;
                    newUpdateBO.keyword = lstKeyword;
                    newUpdateBO.metadescription = product.metadescription;
                    newUpdateBO.metakeyword = product.metakeyword;
                    newUpdateBO.name = product.name;
                    newUpdateBO.seoname = product.seoname;
                    newUpdateBO.displayorder = product.displayorder;
                    newUpdateBO.avatar = product.avatar;
                    newUpdateBO.slide = product.slide;




                    if (productType == 1)//bst
                    {
                        newUpdateBO.brandid = 0;
                        newUpdateBO.phonemodelid = 0;
                        newUpdateBO.material = null;
                        newUpdateBO.collectionid = product.collectionid;

                    }
                    else if (productType == 2)//hang
                    {
                        newUpdateBO.designimage = new List<DesignImage>();
                        var finalListDesign = lstDesignImage.Split(';');
                        newUpdateBO.designimage.Add(new DesignImage()
                        {
                            fullimage = finalListDesign[0],
                            specialpoint = finalListDesign[1],
                            background = finalListDesign[2]
                        });

                        newUpdateBO.material = new List<MaterialBO>();
                        var finalListMaterial = lstMaterial.Split(',');
                        for (int i = 0; i < finalListMaterial.Count(); i++)
                        {
                            newUpdateBO.material.Add(new MaterialBO()
                            {
                                description = "",
                                id = i + 1,
                                name = finalListMaterial[i]
                            });
                        }



                        newUpdateBO.collectionid = 0;
                        newUpdateBO.phonemodelid = product.phonemodelid;
                        //get brandID from phonemodelid
                        var BrandObj = PhoneModelDAO.GetPhoneModelByID(Convert.ToInt32(product.phonemodelid));
                        if (BrandObj != null)
                        {
                            product.brandid = BrandObj.brandid;
                            newUpdateBO.brandid = BrandObj.brandid;
                        }


                    }
                    result = ProductDAO.UpdateProduct(newUpdateBO, ref errorMessage);
                    SetAlert($"Cập nhật sản phẩm {product.id}-{product.name} thành công", "success");
                }
                else
                {

                    product.createduser = user.UserID.ToString();
                    product.createddate = DateTime.Now;
                    product.keyword = lstKeyword;
                    if (productType == 1)//collection
                    {
                        product.brandid = 0;
                        product.phonemodelid = 0;
                        product.material = null;
                        product.designimage = null;
                    }
                    else if (productType == 2)//phonemodel
                    {
                        product.collectionid = 0;
                        //get brandID from phonemodelid
                        var BrandObj = PhoneModelDAO.GetPhoneModelByID(Convert.ToInt32(product.phonemodelid));
                        if (BrandObj != null) product.brandid = BrandObj.brandid;

                        product.designimage = new List<DesignImage>();
                        var finalListDesign = lstDesignImage.Split(';');
                        product.designimage.Add(new DesignImage()
                        {
                            fullimage = finalListDesign[0],
                            specialpoint = finalListDesign[1],
                            background = finalListDesign[2]
                        });

                        product.material = new List<MaterialBO>();
                        var finalListMaterial = lstMaterial.Split(',');
                        for (int i = 0; i < finalListMaterial.Count(); i++)
                        {
                            product.material.Add(new MaterialBO()
                            {
                                description = "",
                                id = i + 1,
                                name = finalListMaterial[i]
                            });
                        }

                    }

                    result = ProductDAO.InsertProduct(product, ref errorMessage);
                    SetAlert($"Thêm sản phẩm {product.name} thành công", "success");
                }

                if (result > 0)
                {
                    if (productType == 1)
                    {
                        return RedirectToAction("Index", "Product", new { collectionID = product.collectionid });
                    }
                    else
                    {
                        return RedirectToAction("Index", "Product", new { brandID = product.brandid });
                    }

                }
                else
                {
                    ModelState.AddModelError("", "Có lỗi xảy ra. Thêm thất bại: " + errorMessage);

                    InitSelectListCollection();
                    InitSelectListPhoneModel();

                    return View(product);
                }


            }

            InitSelectListCollection();
            InitSelectListPhoneModel();

            return View(product);
        }

        [HttpPost]
        public JsonResult DeleteProduct(int id)
        {
            UserLogin user = (UserLogin)Session[CommonConstants.USER_SESSION];
            //check for prouduct exits on brand
            string messageDelete = "";
            bool resultDelete = false;

            resultDelete = ProductDAO.DeleteProduct(id, user.UserID.ToString());
            messageDelete = "Xóa thành công";
            SetAlert($"Xóa sản phẩm {id} thành công", "success");
            return Json(
                    new
                    {
                        status = resultDelete,
                        message = messageDelete
                    });
        }
        public void InitSelectListBrand(long? selectedID = null)
        {

            ViewBag.BrandID = new SelectList(BrandModel.GetAllBrand(), "id", "name", selectedID);

        }
        public void InitSelectListCollection(long? selectedID = null)
        {

            ViewBag.CollectionID = new SelectList(CollectionDAO.GetAllCollection(), "id", "name", selectedID);

        }
        public void InitSelectListPhoneModel(long? selectedID = null)
        {

            var litsPhoneModel = new SelectList(PhoneModelDAO.GetAllPhoneModel(), "id", "name", selectedID);
            ViewBag.PhoneModelID = litsPhoneModel;
        }
    }
}