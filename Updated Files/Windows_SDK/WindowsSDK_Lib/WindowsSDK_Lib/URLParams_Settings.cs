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
    public class URLParams_Settings
    {

        string URL_Encode = null;
        string adwidth = null;
        string adheight = null;
        string zoneid = null;
        string background = null;
        string timezone = null;

        public string Generated_Params(string zone_id_ref, string age_id_ref, string gender_id_ref, string color_id_ref, string loc_id_ref, string back_id_ref, string keyword_id_ref)
        {

            Config conf = new Config();

            Device_Settings settings_value = new Device_Settings();
            settings_value.Device_Info();
            adwidth = settings_value.screenwidth;
            adheight = settings_value.screenheight;
            timezone = settings_value.timezone;
            Ad_View adv = new Ad_View();

            zoneid = adv.getZoneid();
            background = adv.getBackground();
            URL_Encode = conf.ADSERVER_URL + "?zoneid=" + zone_id_ref + "&adwidth=" + adwidth + "&adheight=" + adheight + "&keyword=" + keyword_id_ref + "&local_time=" + timezone + "&background=" + back_id_ref + "&systemtype=windows" + "&screenwidth=" + settings_value.screenwidth + "&screenheight=" + settings_value.screenheight + "&Os=" + settings_value.os + "&Osv=" + settings_value.osv + "&Displaywidth=" + settings_value.displaywidth + "&Displayheight=" + settings_value.displayheight + "&Model=" + settings_value.model + "&Udid=" + settings_value.udid + "&Connectiontype=" + settings_value.connectiontype + "&Carrier=" + settings_value.carrier + "&age=" + age_id_ref + "&gender=" + gender_id_ref + "&color=" + color_id_ref + "&loc=" + loc_id_ref; // URL to deliver Ad with dynamic zoneid fetch from user // Payal Live

            return URL_Encode;
        }
    }
    
}
