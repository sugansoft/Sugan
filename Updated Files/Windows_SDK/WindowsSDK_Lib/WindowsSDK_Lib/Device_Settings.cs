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
    public class Device_Settings
    {

        //Get Device Information 
        public string os = null;
        public string osv = null;
        public string model = null;
        public string screenwidth = null;
        public string screenheight = null;
        public string displaywidth = null;
        public string displayheight = null;
        public string url_new = null;
        public string timezone = null;
        public string udid = null;
        public string ip = null;
        public string connectiontype = null;
        public string carrier = null;

        //Tracking mobile new params
        public string viewerphone = null;
        public string latitude = null;
        public string longitude = null;
        public string didsha1 = null;
        public string didmd5 = null;
        public string language = null;
        public string useragent = null;
        public string appid = null;
        public string devicetype = null;

        public bool isWiFiEnabled;
        public bool isNetworkAvailable;
        public bool isCellDataAvailable;


        public void Device_Info()
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
            timezone = date.ToString("HH:mm:ss");
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
        }


    }
}
