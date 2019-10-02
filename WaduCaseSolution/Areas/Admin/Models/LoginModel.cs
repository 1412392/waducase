using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WaduCase.Areas.Admin.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Vui lòng nhập username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập password")]
        public string Password { get; set; }

       
    }
}