using System;
using System.Net;
using System.Windows;
using System.Threading;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace WindowsSDK_Lib
{
    public class Async_Downloading
    {
        public static string Dynamic_Value;
        public static string change;
        public static string data;
        public static string passing_params;

        public static void Download_String_Async(object sender, DownloadStringCompletedEventArgs e)
        {
            data = (string)e.Result;
            change = data;
            // System.Diagnostics.Debug.WriteLine("function called------------>" + data);
        }


        public string Download_Async_Task(string url)
        {

            var web_Client = new WebClient();

            Uri uri = new Uri(url);

            web_Client.DownloadStringCompleted += new DownloadStringCompletedEventHandler(Download_String_Async);

            web_Client.DownloadStringAsync(new Uri(url)); // Download string from url

            Dynamic_Value = change;

            // System.Diagnostics.Debug.WriteLine("function called------------>" + data);

            if (Dynamic_Value != null)
            {

                JSONReaderParser parse = new JSONReaderParser();

                passing_params = parse.JSON_parser(Dynamic_Value);
            }

            else
            {
                passing_params = "";
            }

            return passing_params;

        }

    }
}