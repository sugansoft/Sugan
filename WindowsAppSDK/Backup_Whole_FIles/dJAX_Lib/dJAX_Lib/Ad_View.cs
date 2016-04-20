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

namespace dJAX_Lib
{
    public class Ad_View
    {
        public string zone_id;    //Zoneid to deliver ad
        public static string data;        //Get Data from the URL
        public string setAd_Params; // Return JSON ad_tag value
        public static string change; // To Hold data values 
        public string url;
        public string Background = "Black";
        public string adwidth;
        public string adheight;
        public string ad_type;
        public string os;
        public string osv;
        public string model;
        public string screenwidth;
        public string screenheight;
        public string displaywidth;
        public string displayheight;
        public string url_new;
        public string timezone;
        public string udid;
        public string useragent;
        public string ip;
        public string connectiontype;
        public string carrier;
        public bool isWiFiEnabled;
        public bool isNetworkAvailable;
        public bool isCellDataAvailable;

        // Custom Variables
        public string macaddress;
        public string wlan;
        public string vlan;
        public string age;
        public string gender;
        public string color;
        public string height;
        public string weight;
        public string marital_status;
        public string custom_variable;

        public static void Download_String_Async(object sender, DownloadStringCompletedEventArgs e)
         {             
                    data = (string)e.Result;
                    change = data;              
                    System.Diagnostics.Debug.WriteLine("function called------------>" + data);         
         }
      

        public string getAd_Request()
        {

            // Device Information Fetch start
            OperatingSystem OS = Environment.OSVersion;
            os = OS.Platform.ToString();
            osv = OS.Version.ToString();
            screenwidth = Application.Current.Host.Content.ActualWidth.ToString();
            screenheight = Application.Current.Host.Content.ActualHeight.ToString();
            displaywidth = Application.Current.RootVisual.RenderSize.Width.ToString();
            displayheight = Application.Current.RootVisual.RenderSize.Height.ToString();
            TimeZoneInfo time = TimeZoneInfo.Local;
            DateTime date = DateTime.Now;
            timezone = date.ToString();
            model = Microsoft.Phone.Info.DeviceStatus.DeviceName;
            byte[] mydevice = (byte[])Microsoft.Phone.Info.DeviceExtendedProperties.GetValue("DeviceUniqueId");
            udid = Convert.ToBase64String(mydevice);
            carrier = DeviceNetworkInformation.CellularMobileOperator;

            isWiFiEnabled = DeviceNetworkInformation.IsWiFiEnabled;
            isNetworkAvailable = DeviceNetworkInformation.IsNetworkAvailable;
            isCellDataAvailable = DeviceNetworkInformation.IsCellularDataEnabled;

            if (isNetworkAvailable != true)
            {
                connectiontype = "No Internet";
            }
            else
            {

                if (isWiFiEnabled == true)
                {
                    connectiontype = "WiFi";
                }
                else if (isCellDataAvailable == true)
                {
                    var currentList = new NetworkInterfaceList().Where(i => i.InterfaceState == ConnectState.Connected).Select(i => i.InterfaceSubtype);
                    if (currentList.Intersect(new NetworkInterfaceSubType[]
                    {
                        NetworkInterfaceSubType.Cellular_EVDO,
                        NetworkInterfaceSubType.Cellular_3G,
                        NetworkInterfaceSubType.Cellular_HSPA,
                        NetworkInterfaceSubType.Cellular_EVDV,
                    }).Any())
                        connectiontype = "3G";
                    if (currentList.Intersect(new NetworkInterfaceSubType[]
                    { 
                        NetworkInterfaceSubType.Cellular_GPRS,
                        NetworkInterfaceSubType.Cellular_1XRTT,
                        NetworkInterfaceSubType.Cellular_EDGE,
                    }).Any())
                        connectiontype = "2G";
                }
                else
                {
                    connectiontype = "Data Pack";
                }
            }
            adwidth = screenwidth;
            adheight = screenheight;

            // Device Information Fetch End

            //url_new = "http://192.168.1.200/development/shalin_dev/api/request1.php?zoneid=" + zone_id + "&adwidth=" + adwidth + "&adheight=" + adheight + "&background=" + Background + "&systemtype=windows" + "&screenwidth=" + screenwidth + "&screenheight=" + screenheight + "&os=" + os + "&osv=" + osv + "&displaywidth=" + displaywidth + "&displayheight=" + displayheight + "&model=" + model + "&udid=" + udid + "&connectiontype=" + connectiontype + "&carrier=" + carrier + "&macaddress=" + macaddress + "&wlan=" + wlan + "&vlan=" + vlan + "&age=" + age + "&gender=" + gender + "&color=" + color + "&height=" + height + "&weight=" + weight + "&marital_status=" + marital_status + "&" + custom_variable; // URL to deliver Ad with dynamic zoneid fetch from user // Elitecore Dev
            //url_new = "http://182.72.85.2/djaxtesting/shalin_test/api/request1.php?zoneid=" + zone_id + "&adwidth=" + adwidth + "&adheight=" + adheight +"&background=" + Background + "&systemtype=windows"+ "&screenwidth=" + screenwidth + "&screenheight=" + screenheight + "&os=" + os + "&osv=" + osv + "&displaywidth=" + displaywidth + "&displayheight=" + displayheight + "&model=" + model + "&udid=" + udid + "&connectiontype=" + connectiontype + "&carrier=" + carrier+ "&macaddress=" + macaddress + "&wlan=" + wlan + "&vlan=" + vlan + "&age=" + age + "&gender=" + gender + "&color=" + color + "&height=" + height + "&weight=" + weight + "&marital_status=" + marital_status+"&"+custom_variable; // URL to deliver Ad with dynamic zoneid fetch from user // Elitecore Testing 
            url_new   = "http://adserver.elitecore.co.in:8080/api/request1.php?zoneid=" + zone_id + "&adwidth=" + adwidth + "&adheight=" + adheight +"&background=" + Background + "&systemtype=windows"+ "&screenwidth=" + screenwidth + "&screenheight=" + screenheight + "&os=" + os + "&osv=" + osv + "&displaywidth=" + displaywidth + "&displayheight=" + displayheight + "&model=" + model + "&udid=" + udid + "&connectiontype=" + connectiontype + "&carrier=" + carrier+ "&macaddress=" + macaddress + "&wlan=" + wlan + "&vlan=" + vlan + "&age=" + age + "&gender=" + gender + "&color=" + color + "&height=" + height + "&weight=" + weight + "&marital_status=" + marital_status+"&"+custom_variable; // URL to deliver Ad with dynamic zoneid fetch from user // Elitecore Live
            url = url_new;
            
            System.Diagnostics.Debug.WriteLine("URL=" + url_new);  // URL display in console
            
            var web_Client = new WebClient();
            Uri uri = new Uri(url);
                 
            web_Client.DownloadStringCompleted += new DownloadStringCompletedEventHandler(Download_String_Async);
            web_Client.DownloadStringAsync(new Uri(url)); // Download string from url
        
            //System.Diagnostics.Debug.WriteLine("Data------------>" + data); // Display URL value in silverlight console      

            string textFromURL = change;    // Text value from URL 
            System.Diagnostics.Debug.WriteLine("Data textFromURL------------>" + textFromURL);
            if (textFromURL != null)
            {
                System.Diagnostics.Debug.WriteLine("Text from URL ->"+textFromURL);
                
                JObject o = JObject.Parse(textFromURL);
                var response = (string)o["response"];
                if (response =="success")
                {
                    var ad_tag_decode = (string)o["ads"]["ad_tag"];
                    ad_type = (string)o["ads"]["ad_type"];
                    string ad_tag = ad_tag_decode.Replace("&amp;", "&").Replace("&lt;", "<").Replace("&gt;", ">").Replace("&quot;", "\"").Replace("&apos;", "'");
                    System.Diagnostics.Debug.WriteLine("Sample Code ad_tag---->" + ad_tag);
                    System.Diagnostics.Debug.WriteLine("Sample Code ad_type --->" + ad_type);
                    string ad_tag_Live = ad_tag;
                    setAd_Params = ad_tag_Live;
                }
                else
                {
                    var description = (string)o["error"]["description"];
                    setAd_Params = description;
                }
            }
            else
            {               
                setAd_Params = ""; 
            }
    
            return setAd_Params;
        }
    }
}