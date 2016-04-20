using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Tasks;
using System.IO;
using System.Threading;
using System.Windows.Threading;
using dJAX_Lib;

namespace dJAX_Demo_App
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();  
        }

        private void button1_Click(object sender,EventArgs e)
        {      
            Ad_View Obj = new Ad_View(); //Create Object to library function
            Obj.zone_id = textBox1.Text; // Enter your zone id 
            //Obj.Background = "LightCyan";// Set Background for Web browser
            Obj.macaddress = "22:33:44:55:66:88";
            Obj.wlan = "192.168.1.11";
            Obj.vlan = "testr";
            Obj.age = "20";
            Obj.gender = "male";
            Obj.color = "dark";
            Obj.height = "124";
            Obj.weight = "50";
            Obj.marital_status = "single";
            Obj.custom_variable = "gender=male";
            string Ad_Request = Obj.getAd_Request(); // get the generated ad for zoneid requested
            webBrowser1.IsScriptEnabled = true;  // Enable webBrowser script support 
            webBrowser1.NavigateToString(Ad_Request); // Delivery the  Ad in your webBrowser Element
          
            DispatcherTimer rotate = new DispatcherTimer();
            rotate.Interval = new TimeSpan(0, 0, 100);// int hours, int minutes, int seconds
            rotate.Tick += new EventHandler(button1_Click);
            rotate.Start();
            System.Diagnostics.Debug.WriteLine("Source -> " + webBrowser1.Source);
        }

   }
}
