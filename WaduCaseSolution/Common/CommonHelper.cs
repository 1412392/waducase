using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace WaduCase.Common
{
    public class CommonHelper
    {
        public static int GetRandom()
        {
            Random a = new Random();
            return a.Next(1, int.MaxValue) - 1;
        }
        public static IEnumerable<string> GetIPAddresses()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            return (from ip in host.AddressList where ip.AddressFamily == AddressFamily.InterNetwork select ip.ToString()).ToList();
        }
        public static string FilterVietkey(String strSource)
        {
            if (string.IsNullOrEmpty(strSource)) return "";
            strSource = ConvertISOToUnicode(strSource);
            strSource = strSource.Replace("\0", "");
            if (strSource.Trim().Length == 0)
                return "";
            return ConvertToUnsign3(strSource);

        }
        public static string ConvertToUnsign3(string str)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = str.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty)
                        .Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
        public static string ConvertISOToUnicode(String strSource)
        {
            String strUni = "á à ả ã ạ Á À Ả Ã Ạ ă ắ ằ ẳ ẵ ặ Ă Ắ Ằ Ẳ Ẵ Ặ â ấ ầ ẩ ẫ ậ Â Ấ Ầ Ẩ Ẫ Ậ đ Đ é è ẻ ẽ ẹ É È Ẻ Ẽ Ẹ ê ế ề ể ễ ệ Ê Ế Ề Ể Ễ Ệ í ì ỉ ĩ ị Í Ì Ỉ Ĩ Ị ó ò ỏ õ ọ Ó Ò Ỏ Õ Ọ ô ố ồ ổ ỗ ộ Ô Ố Ồ Ổ Ỗ Ộ ơ ớ ờ ở ỡ ợ Ơ Ớ Ờ Ở Ỡ Ợ ú ù ủ ũ ụ Ú Ù Ủ Ũ Ụ ư ứ ừ ử ữ ự Ư Ứ Ừ Ử Ữ Ự ý ỳ ỷ ỹ ỵ Ý Ỳ Ỷ Ỹ Ỵ";
            String strISO = "á à &#7843; ã &#7841; Á À &#7842; Ã &#7840; &#259; &#7855; &#7857; &#7859; &#7861; &#7863; &#258; &#7854; &#7856; &#7858; &#7860; &#7862; â &#7845; &#7847; &#7849; &#7851; &#7853; Â &#7844; &#7846; &#7848; &#7850; &#7852; &#273; &#272; é è &#7867; "
                            + "&#7869; &#7865; É È &#7866; &#7868; &#7864; ê &#7871; &#7873; &#7875; &#7877; &#7879; Ê &#7870; &#7872; &#7874; &#7876; &#7878; í ì &#7881; &#297; &#7883; Í Ì &#7880; &#296; &#7882; ó ò &#7887; õ &#7885; Ó Ò &#7886; Õ &#7884; ô "
                            + "&#7889; &#7891; &#7893; &#7895; &#7897; Ô &#7888; &#7890; &#7892; &#7894; &#7896; &#417; &#7899; &#7901; &#7903; &#7905; &#7907; &#416; &#7898; &#7900; &#7902; &#7904; &#7906; ú ù &#7911; &#361; &#7909; Ú Ù &#7910; &#360; &#7908; &#432; &#7913; &#7915; &#7917; &#7919; &#7921; &#431; "
                            + "&#7912; &#7914; &#7916; &#7918; &#7920; ý &#7923; &#7927; &#7929; &#7925; Ý &#7922; &#7926; &#7928; &#7924;";

            String[] arrCharUni = strUni.Split(" ".ToCharArray());
            String[] arrCharISO = strISO.Split(" ".ToCharArray());

            String strResult = strSource;
            for (int i = 0; i < arrCharUni.Length; i++)
                strResult = strResult.Replace(arrCharISO[i], arrCharUni[i]);

            strUni = "À Á Â Ã Ä Å Æ Ç È É Ê Ë Ì Í Î Ï Ð Ñ Ò Ó Ô Õ Ö Ø Ù Ú Û Ü Ý Þ ß à á â ã ä å æ ç è é ê ë ì í î ï ð ñ ò ó ô õ ö ø ù ú û ü ý þ ÿ";
            strISO = "&#192; &#193; &#194; &#195; &#196; &#197; &#198; &#199; &#200; &#201; &#202; &#203; &#204; &#205; &#206; "
                + "&#207; &#208; &#209; &#210; &#211; &#212; &#213; &#214; &#216; &#217; &#218; &#219; &#220; &#221; &#222; "
                + "&#223; &#224; &#225; &#226; &#227; &#228; &#229; &#230; &#231; &#232; &#233; &#234; &#235; &#236; &#237; &#238; &#239; "
                + "&#240; &#241; &#242; &#243; &#244; &#245; &#246; &#248; &#249; &#250; &#251; &#252; &#253; &#254; &#255;";

            String[] arrCharUni1 = strUni.Split(" ".ToCharArray());
            String[] arrCharISO1 = strISO.Split(" ".ToCharArray());

            for (int i = 0; i < arrCharUni1.Length; i++)
                strResult = strResult.Replace(arrCharISO1[i], arrCharUni1[i]);

            strResult = strResult.Replace("\0", "");
            return strResult;
        }
        public static string GenTerm(string strInput)
        {
            if (string.IsNullOrEmpty(strInput))
            {
                return string.Empty;
            }
            strInput = FilterVietkey(strInput);//chuyển về chuỗi tiếng việt, nếu có html , iso code
            string seoUrlPattern = @"[^a-zA-Z0-9-_]";
            string sNewUrl = strInput;// Globals.FormatURLText(strInput); 
            sNewUrl = Regex.Replace(sNewUrl, seoUrlPattern, "-");
            sNewUrl = Regex.Replace(sNewUrl, "(-)+", "-").Trim('-').ToLower();
            sNewUrl = sNewUrl.Replace("-", "_");//tao term ko trùng
            return sNewUrl.ToLower();
        }
        
    }
    
}