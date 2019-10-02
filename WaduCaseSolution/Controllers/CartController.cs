using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Collections;
using WaduCase.Models;
using WaduCaseBusiness.DAO;
using WaduCaseBusiness.Model;
using WaduCase.Common;
using Newtonsoft.Json;

namespace WaduCase.Controllers
{
    public class CartController : Controller
    {
        static string FolderPath = "~/Assets/img/customer/{0}/{1}";//productid/sesssionid
        // GET: Cart
        public ActionResult Index()
        {
            List<CartSession> lstCartItem = new List<CartSession>();
            lstCartItem = Session["fancycart"] as List<CartSession>;
            if (lstCartItem == null)
            {
                lstCartItem = new List<CartSession>();
            }

            return View(lstCartItem);
        }
        [HttpPost]
        public ActionResult Index(string fpd_product, string fpd_product_thumbnail,
            string product_id, int attribute_pa_chon_chat_lieu_op_lung, int quantity = 1, string fpd_cartitemkey = "")
        {
            try
            {
                List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;
                if (lstCartItem == null) lstCartItem = new List<CartSession>();


                var product = ProductDAO.GetProductByID(Convert.ToInt32(product_id));
                if (product == null) return RedirectToAction("Index");


                Random rd = new Random();
                string sessionID = HttpContext.Session.SessionID;
                CartSession cartItem = new CartSession();
                var tempCartItem = lstCartItem.Where(x => x.ItemKey == fpd_cartitemkey).FirstOrDefault();

                if (tempCartItem != null)//update lai thiet ke
                {
                    cartItem = tempCartItem;
                }


                if (tempCartItem == null)//new => create
                {
                    cartItem.ItemKey = sessionID + "_" + DateTime.Now.Ticks;
                    cartItem.Quantity = quantity;
                    cartItem.ProductID = Convert.ToInt32(product_id);
                    cartItem.Name = product.name;
                    cartItem.Price = product.newprice;
                }

                cartItem.MaterialID = Convert.ToInt32(attribute_pa_chon_chat_lieu_op_lung);
                cartItem.MaterialName = product.material.Where(x => x.id == cartItem.MaterialID).FirstOrDefault() != null ?
                    product.material.Where(x => x.id == cartItem.MaterialID).FirstOrDefault().name : "Chưa Chọn Chất Liệu Ốp Lưng";


                cartItem.Order = fpd_product;
                dynamic order = JObject.Parse(fpd_product);
                List<dynamic> allCustomElement = new List<dynamic>();
                if (order.product[0].elements.Count <= 3)//chưa co design
                {
                    cartItem.Thumbnail = fpd_product_thumbnail;

                    if (tempCartItem == null)//th them moi, not update
                    {
                        lstCartItem.Add(cartItem);

                    }


                    Session["fancycart"] = lstCartItem;

                    return RedirectToAction("Index");
                }


                if (!Object.ReferenceEquals(null, order) && order.product[0].elements.Count >= 4)
                {

                    allCustomElement = ((IEnumerable)order.product[0].elements).Cast<dynamic>()
                           .Where(p => p.title != "upload" && p.title != "fullimage" && p.title != "specialpoint").ToList();

                }

                #region create folder, image design
                string folderDir = Server.MapPath(String.Format(FolderPath, product_id, sessionID));
                if (!Directory.Exists(folderDir))
                {
                    Directory.CreateDirectory(folderDir);
                }


                if (fpd_product_thumbnail.Contains("data:image/png"))//neeus hinh design
                {
                    string _imageName = String.Format(FolderPath, product_id, sessionID) + "/" + rd.Next(1000, 1000000).ToString() + "_" + DateTime.Now.Ticks + ".png";
                    string _imagePath = Server.MapPath(_imageName);
                    string _base64 = fpd_product_thumbnail.Substring(fpd_product_thumbnail.IndexOf(',') + 1);
                    MemoryStream _ms = new MemoryStream(Convert.FromBase64String(_base64));
                    System.Drawing.Image _img = System.Drawing.Image.FromStream(_ms);

                    _img.Save(_imagePath, System.Drawing.Imaging.ImageFormat.Png);

                    cartItem.Thumbnail = _imageName;
                }


                #endregion
                cartItem.ListCustomerImage = new List<string>();
                foreach (var item in allCustomElement)
                {
                    if (item.type != "image") continue;
                    string imageData = item.source;
                    string imageTitle = item.title ?? sessionID + ".jpg";

                    if (!imageData.Contains("data:image"))//nếu là hình hệ thống
                    {
                        cartItem.ListCustomerImage.Add(imageData);
                        continue;
                    }



                    string _path = String.Format(FolderPath, product_id, sessionID) + "/" + item.title;
                    string imagePath = Server.MapPath(_path);
                    string base64 = imageData.Substring(imageData.IndexOf(',') + 1);

                    MemoryStream ms = new MemoryStream(Convert.FromBase64String(base64));
                    System.Drawing.Image img = System.Drawing.Image.FromStream(ms);

                    img.Save(imagePath, imageTitle.Contains(".jpg") || imageTitle.Contains(".jpeg") ? System.Drawing.Imaging.ImageFormat.Jpeg : System.Drawing.Imaging.ImageFormat.Png);
                    cartItem.ListCustomerImage.Add(imageData);

                }

                if (tempCartItem == null)//th them moi, not update
                {
                    lstCartItem.Add(cartItem);

                }

                Session["fancycart"] = lstCartItem;

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        [HttpPost]
        public JsonResult RemoveItem(string ItemKey)
        {
            try
            {
                var status = true;
                List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;

                if (lstCartItem == null)
                {
                    status = false;
                }
                else
                {
                    //delete
                    lstCartItem.Remove(lstCartItem.Where(x => x.ItemKey == ItemKey).FirstOrDefault());
                    status = true;

                }
                return Json(new
                {
                    status
                });

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        [HttpPost]
        public JsonResult UpdateQuantity(string ItemKey, int Quantity, string Action)
        {
            try
            {
                var status = true;
                List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;

                if (lstCartItem == null)
                {
                    status = false;
                }
                else
                {
                    if (Quantity <= 0)
                    {
                        //delete
                        lstCartItem.Remove(lstCartItem.Where(x => x.ItemKey == ItemKey).FirstOrDefault());

                    }
                    else
                    {
                        foreach (var item in lstCartItem)
                        {
                            if (item.ItemKey == ItemKey)
                            {
                                if (Action == "minus")
                                {
                                    item.Quantity--;
                                    if (item.Quantity <= 0)
                                    {
                                        //delete
                                        lstCartItem.Remove(lstCartItem.Where(x => x.ItemKey == ItemKey).FirstOrDefault());

                                    }
                                    break;
                                }
                                else if (Action == "plus")
                                {
                                    item.Quantity++; break;
                                }


                            }
                        }

                    }
                    status = true;

                }
                return Json(new
                {
                    status
                });

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public ActionResult Checkout()
        {
            List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;
            if (lstCartItem == null) lstCartItem = new List<CartSession>();
            if (lstCartItem.Count <= 0)
            {
                return RedirectToAction("Index");
            }

            //load danh sách Province
            var listProvince = LocationDAO.GetListProvinces();
            ViewBag.ListProvince = listProvince;
            ViewBag.ListCartItem = lstCartItem;
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            ViewBag.CommonInfo = commonInfo;

            return View();
        }
        public JsonResult GetListDistrictByProvinceID(int proid)
        {
            var listDistrict = LocationDAO.GetListDistrictByProvinceID(proid);

            return Json(new
            {
                items = listDistrict.Select(x => new
                {
                    id = x.id,
                    text = x.name
                })
            }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetListWardByDistrictID(int disid)
        {
            var listWard = LocationDAO.GetListWardByDistrictID(disid);

            return Json(new
            {
                items = listWard.Select(x => new
                {
                    id = x.id,
                    text = x.name
                })
            }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult Checkout(FormCollection form)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var lstIP = CommonHelper.GetIPAddresses();

                    OrderBO order = new OrderBO();
                    order.id = DateTime.Now.Ticks.ToString();
                    order.createdate = DateTime.Now;
                    order.fullname = form["fullname"].ToString();

                    int districtID = Convert.ToInt32(form["district"].ToString());
                    int provinceID = Convert.ToInt32(form["province"].ToString());
                    int wardID = Convert.ToInt32(form["ward"].ToString());
                    var provinceBO = LocationDAO.GetProvinceByID(provinceID);
                    var districtBO = LocationDAO.GetDistrictByID(districtID);
                    var wardBO = LocationDAO.GetWardByID(wardID);



                    order.district = districtBO.name;
                    order.province = provinceBO.name;
                    order.ward = wardBO.name;

                    order.email = form["email"].ToString();
                    order.phone = form["phone"].ToString();
                    order.fulladdress = form["orderfulladdress"].ToString();

                    order.note = form["ordernote"].ToString();
                    var listItemKey = form["listitemkey"].Split('|');
                    if (listItemKey == null || listItemKey.Count() <= 0 ||
                        String.IsNullOrEmpty(order.fullname)
                        || String.IsNullOrEmpty(order.phone) || String.IsNullOrEmpty(order.fulladdress)
                        || String.IsNullOrEmpty(order.district) || String.IsNullOrEmpty(order.province)
                        || String.IsNullOrEmpty(order.ward))
                    {//phai dien day du thong tin
                        return RedirectToAction("Checkout");

                    }
                    //get list item
                    List<CartSession> lstCartItem = new List<CartSession>();
                    lstCartItem = Session["fancycart"] as List<CartSession>;
                    if (lstCartItem == null)
                    {
                        return RedirectToAction("Checkout");
                    }
                    List<CartItemBO> lstCartItemBO = new List<CartItemBO>();
                    foreach (var item in lstCartItem)
                    {
                        CartItemBO cartItem = JsonConvert.DeserializeObject<CartItemBO>(JsonConvert.SerializeObject(item));
                        lstCartItemBO.Add(cartItem);

                    }
                    order.listitem = lstCartItemBO;

                    //check payment method
                    var payment = form["payment_method"];
                    if (payment.ToLower().Trim() == "bacs")
                    {
                        order.paymenttype = 2;
                    }
                    else
                    {
                        order.paymenttype = 1;
                    }

                    //tính discount
                    if (order.paymenttype == 2)
                    {
                        order.totaldiscount = order.listitem.Sum(x => x.FinalPrice) * 5 / 100;
                    }
                    order.iporder = lstIP != null && lstIP.Count() > 0 ? lstIP.First() : "";
                    order.status = 1;
                    order.statusname = "Chưa xử lý";

                    //insert to mongodb

                    string error = "";
                    var result = OrderDAO.CreateOrder(order, ref error);
                    if (result)
                    {
                        //remove item in cart
                        lstCartItem.Clear();
                        #region create account
                        //add user vào thông tin tài khoản luôn
                        //check đã tồn tại username
                        string username = !String.IsNullOrEmpty(order.email) ? order.email : order.phone;
                        var userBO = UserDAO.GetUserByUserNameNotAdmin(username);
                        if (userBO != null && userBO.id > 0)
                        {
                            return RedirectToAction("ChekoutSuccess", new { orderid = order.id });
                        }

                        UserBO user = new UserBO();
                        user.username = username;
                        user.password = "e10adc3949ba59abbe56e057f20f883e";//123456
                        user.phone = order.phone;
                        user.isactive = 1;
                        user.role = "customer";
                        user.fullname = order.fullname;
                        user.address = order.fulladdress + ", " + order.ward + ", " + order.district + ", " + order.province;
                        user.email = order.email;
                        user.createddate = DateTime.Now;
                        user.note = "User được tạo tự động khi submit đơn hàng thành công";
                        string errorMessage = String.Empty;
                        result = UserDAO.CreateUser(user, ref errorMessage);
                        #endregion

                    }

                    return RedirectToAction("ChekoutSuccess", new { orderid = order.id });

                }
                else
                {
                    List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;
                    if (lstCartItem == null) lstCartItem = new List<CartSession>();
                    if (lstCartItem.Count <= 0)
                    {
                        return RedirectToAction("Index");
                    }

                    //load danh sách Province
                    var listProvince = LocationDAO.GetListProvinces();
                    ViewBag.ListProvince = listProvince;
                    ViewBag.ListCartItem = lstCartItem;
                    var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
                    ViewBag.CommonInfo = commonInfo;

                    return View("Checkout");
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "* Quý khách vui lòng nhập đầy đủ thông tin để gửi đơn hàng ạ!");
                List<CartSession> lstCartItem = Session["fancycart"] as List<CartSession>;
                if (lstCartItem == null) lstCartItem = new List<CartSession>();
                if (lstCartItem.Count <= 0)
                {
                    return RedirectToAction("Index");
                }

                //load danh sách Province
                var listProvince = LocationDAO.GetListProvinces();
                ViewBag.ListProvince = listProvince;
                ViewBag.ListCartItem = lstCartItem;
                var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
                ViewBag.CommonInfo = commonInfo;

                return View("Checkout");
            }


        }

        public ActionResult ChekoutSuccess(string orderid = "")
        {
            if (string.IsNullOrEmpty(orderid))
            {
                return RedirectToAction("Index");
            }
            var commonInfo = LocationDAO.GetCommonInfoByID("commoninfo");
            ViewBag.CommonInfo = commonInfo;
            OrderBO order = OrderDAO.GetOrderByID(orderid);


            return View(order);
        }
    }
}