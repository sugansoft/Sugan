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
using WindowsSDK_Lib;

namespace WindowsSDK_Demo_App
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }
        private void button1_Click(object sender, EventArgs e)
        {

            //Create Object to library function
            string zone = textBox1.Text; // Enter your zone id 

            //Obj.Background = "LightCyan";// Set Background for Web browser

            Ad_View adv = new Ad_View();

            adv.setZoneid(zone);

            adv.setBackground("LightCyan");// Set Background for Web browser

            adv.setAge("25");

            adv.setGender("male");

            adv.setColor("fair");

            adv.setKeyword("mov,books");

            adv.setLocation("http://www.w3schools.com");

            string Ad_Request = adv.getAd_Request(); // get the generated ad for zoneid requested

            webBrowser1.IsScriptEnabled = true;  // Enable webBrowser script support 

            webBrowser1.NavigateToString(Ad_Request); // Delivery the  Ad in your webBrowser Element

            DispatcherTimer rotate = new DispatcherTimer();
            rotate.Interval = new TimeSpan(0, 0, 50);// int hours, int minutes, int seconds
            rotate.Tick += new EventHandler(button1_Click);
            rotate.Start();

        }

       

    }
}