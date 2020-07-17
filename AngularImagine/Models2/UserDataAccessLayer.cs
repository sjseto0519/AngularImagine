//using Microsoft.Extensions.Configuration;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.IO;
//using System.Linq;
//using System.Threading.Tasks;

//namespace AngularByDoing.Models
//{
//  public class UserDataAccessLayer
//  {
//    public static IConfiguration Configuration { get; set; }

//    //To Read ConnectionString from appsettings.json file
//    private static string GetConnectionString()
//    {
//      var builder = new ConfigurationBuilder()
//          .SetBasePath(Directory.GetCurrentDirectory())
//          .AddJsonFile("appsettings.json");

//      Configuration = builder.Build();

//      string connectionString = Configuration["ConnectionStrings:myConString"];

//      return connectionString;

//    }

//    string connectionString = GetConnectionString();

//    //To Validate the login
//    public string ValidateLogin(LoginJson user)
//    {
//      using (SqlConnection con = new SqlConnection(connectionString))
//      {
//        SqlCommand cmd = new SqlCommand("spValidateUserLogin", con);
//        cmd.CommandType = CommandType.StoredProcedure;

//        cmd.Parameters.AddWithValue("@LoginID", user.UserName);
//        cmd.Parameters.AddWithValue("@LoginPassword", user.Password);

//        con.Open();
//        string result = cmd.ExecuteScalar().ToString();
//        con.Close();

//        return result;
//      }
//    }
//  }
//}
