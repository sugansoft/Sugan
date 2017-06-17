using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace WindowsSDK_Lib
{
    public class Config
    {

        public string value = null;

        public string ADSERVER_URL = "http://platform.maxxrtb.com/api/request1.php";


        // AD REQUEST API RESPONSE - JSON FIELDS LIST

        public string TAG_AD_RESPONSE = "response";

        public string TAG_ADS = "ads";

        public string TAG_CLICK_URL = "click_url";

        public string TAG_ADTAG = "ad_tag";

        public string TAG_IMAGE_PATH = "image_path";

        public string TAG_BEACON_URL = "imp_url";

        public string TAG_AD_TYPE = "ad_type";

        public string TAG_ERROR = "error";

        public string TAG_ERR_CODE = "code";

        public string TAG_ERR_DESC = "description";

        // AD Request Key Params

        public string TAG_AMP = "&amp;";

        public string TAG_AMP_KEY = "&";

        public string TAG_LT = "&lt;";

        public string TAG_LT_KEY = "<";

        public string TAG_GT = "&gt;";

        public string TAG_GT_KEY = ">";

        public string TAG_QUOT = "&quot;";

        public string TAG_QUOT_KEY = "\"";

        public string TAG_APOS = "&apos;";

        public string TAG_APOS_KEY = "'";
    }
}
