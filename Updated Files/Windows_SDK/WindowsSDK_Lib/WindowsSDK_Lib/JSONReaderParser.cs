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
using Newtonsoft.Json.Linq;

namespace WindowsSDK_Lib
{
    public class JSONReaderParser
    {

        public string setAd_Params; // Return JSON ad_tag value
        string ad_type = null;

        public string JSON_parser(String URL_Value)
        {
            //System.Diagnostics.Debug.WriteLine("Text from URL ->" + URL_Value);

            Config TAG = new Config();
            JObject o = JObject.Parse(URL_Value);

            var response = (string)o[TAG.TAG_AD_RESPONSE];
            if (response == "success")
            {
                var ad_tag_decode = (string)o[TAG.TAG_ADS][TAG.TAG_ADTAG];
                ad_type = (string)o[TAG.TAG_ADS][TAG.TAG_ADTAG];
                string ad_tag = ad_tag_decode.Replace(TAG.TAG_AMP, TAG.TAG_AMP_KEY).Replace(TAG.TAG_LT, TAG.TAG_LT_KEY).Replace(TAG.TAG_GT, TAG.TAG_GT_KEY).Replace(TAG.TAG_QUOT, TAG.TAG_QUOT_KEY).Replace(TAG.TAG_APOS, TAG.TAG_APOS_KEY);
              //  System.Diagnostics.Debug.WriteLine("Sample Code ad_tag---->" + ad_tag);
               // System.Diagnostics.Debug.WriteLine("Sample Code ad_type --->" + ad_type);
                string ad_tag_Live = ad_tag;
                setAd_Params = ad_tag_Live;
            }
            else
            {
                var description = (string)o[TAG.TAG_ERROR][TAG.TAG_ERR_DESC];
                setAd_Params = description;
            }


            return setAd_Params;
        }


    }
}
