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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Text;
using System.Net.Browser;
using System.Configuration;
using System.IO;
using Microsoft.Phone.Net.NetworkInformation;
using System.Net.NetworkInformation;
using Microsoft.Phone.Tasks;
using System.Windows.Threading;

namespace WindowsSDK_Lib
{
    public class Ad_View
    {
        public string zone_id = null;    //Zoneid to deliver ad
        public static string data;        //Get Data from the URL
        public string setAd_Response; // Return JSON ad_tag value
        public static string change; // To Hold data values 
        public string url;
        //  public string Background = "Black";
        public string Background = null;
        public string zone_id_ref = null;
        public string age_id_ref = null;
        public string gender_id_ref = null;
        public string color_id_ref = null;
        public string loc_id_ref = null;
        public string back_id_ref = null;
        public string keyword_id_ref = null;

        // Custom Variable
        public string age = null;
        public string gender = null;
        public string color = null;
        public string loc = null;
        public string keyword = null;

        public string getZoneid()
        {
            return zone_id;
        }
        public void setZoneid(string zone_id)
        {
            this.zone_id = zone_id;
        }
        public string getBackground()
        {
            return Background;
        }
        public void setBackground(string Background)
        {
            this.Background = Background;
        }
        public string getKeyword()
        {
            return keyword;
        }
        public void setKeyword(string keyword)
        {
            this.keyword = keyword;
        }
        public string getAge()
        {
            return age;
        }
        public void setAge(string age)
        {
            this.age = age;
        }

        public string getGender()
        {
            return gender;
        }
        public void setGender(string gender)
        {
            this.gender = gender;
        }

        public string getColor()
        {
            return color;
        }
        public void setColor(string color)
        {
            this.color = color;
        }
        public string getLocation()
        {
            return loc;
        }
        public void setLocation(string loc)
        {
            this.loc = loc;
        }


        public string getAd_Request()
        {

            URLParams_Settings decode_params = new URLParams_Settings();

            zone_id_ref = getZoneid();
            age_id_ref = getAge();
            gender_id_ref = getGender();
            color_id_ref = getColor();
            loc_id_ref = getLocation();
            back_id_ref = getBackground();
            keyword_id_ref = getKeyword();

            url = decode_params.Generated_Params(zone_id_ref, age_id_ref, gender_id_ref, color_id_ref, loc_id_ref, back_id_ref, keyword_id_ref);

            // Device Information Fetch End
            //System.Diagnostics.Debug.WriteLine("URL Value = " + url);

            //System.Diagnostics.Debug.WriteLine("Data------------>" + data); // Display URL value in silverlight console      

            Async_Downloading async_Down = new Async_Downloading();
            setAd_Response = async_Down.Download_Async_Task(url);

            //System.Diagnostics.Debug.WriteLine("RESPONSE-------"+setAd_Response);

            return setAd_Response;
        }
    }
}
