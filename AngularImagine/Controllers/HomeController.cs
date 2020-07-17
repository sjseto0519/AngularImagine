using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AngularByDoing.Models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Schema;
using AngularByDoing.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace AngularByDoing.Controllers
{
    public class HomeController : Controller
    {


    private const string JSONTYPE = "CombinationsJson";
    private const int EXPIRY = 45;

        private ameritus1_angularContext ameritus1_angularContext;
        public HomeController(ameritus1_angularContext sc)
        {
            ameritus1_angularContext = sc;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Data()
        {
            return Json(new DoingJson()
            {
              Id = 1,
              Json = new JsonSource(ameritus1_angularContext)[HomeController.JSONTYPE]
            }
              );
        }

        [HttpGet]
        [Authorize]
        public JsonResult Check()
        {
          return Json("Success");
        }

        public async Task<IActionResult> SignOut()
        {
          await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
          return Json("Signed out");
        }

        [Authorize]
        [HttpPost]
        public IActionResult PostData([FromBody]DoingJson json)
        {
            if (json != null)
            {
              var source = (new JsonSource(ameritus1_angularContext));
              
              var schemaBuilder = new SchemaBuilder(source[HomeController.JSONTYPE])
                .Validate()
                //.GetKeys()
                //.ReadInput(json.Json)
                //.GetSchema()
                //.IsValidAgainstSchema()
                ;
              if (schemaBuilder.IsValid)
              {
                source[HomeController.JSONTYPE] = json.Json;
                ameritus1_angularContext.SaveChanges();
                return Json("Success");
              } else
              {
          return Json("Invalid Json");
        }
            } else
            {
              return Json("An unknown error has occurred");
            }
        }

    [Authorize]
    [HttpPost]
    public IActionResult BackupData([FromBody]DoingJson json)
    {
      if (json != null)
      {
        var backup = ameritus1_angularContext.BackupJson;
        var source = (new JsonSource(ameritus1_angularContext));
        var schemaBuilder = new SchemaBuilder(source[HomeController.JSONTYPE])
          .Validate()
          //.GetKeys()
          //.ReadInput(json.Json)
          //.GetSchema()
          //.IsValidAgainstSchema()
          ;
        if (schemaBuilder.IsValid)
        {
          var currentDate = DateTime.Now.ToShortDateString();
          if (!backup.Any(f => f.Date == currentDate))
          {
            backup.Add(new BackupJson { Date = currentDate, Json = json.Json });
            ameritus1_angularContext.SaveChanges();
            return Json("Success");
          } else
          {
            return Json("Backup already exists");
          }
        }
        else
        {
          return Json("Invalid Json");
        }
      }
      else
      {
        return Json("An unknown error has occurred");
      }
    }

    [HttpPost]
    public async Task<IActionResult> PostLogin([FromBody]SysUser json)
    {
      if (json != null)
      {
        HashingService hserv = new HashingService(json.UserId, json.UserPassword);
        bool found = ameritus1_angularContext.SysUser.Any(f => f.FirstName == json.FirstName
        &&
        f.LastName == json.LastName
        &&
        hserv.IsMatchingUserName(HashingService.ToHash(f.UserId), HashingService.ToSalt(f.UserId))
        &&
        hserv.IsMatchingUserPassword(HashingService.ToHash(f.UserPassword), HashingService.ToSalt(f.UserPassword)));
        if (found)
        {
          var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, json.UserId)
                    };
          ClaimsIdentity userIdentity = new ClaimsIdentity(claims, "login");
          ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);

          await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties
          {
            IsPersistent = true,
            ExpiresUtc = DateTime.UtcNow.AddMinutes(HomeController.EXPIRY)
          });
          return Json("Success");
        } else
        {
          return Json("Invalid credentials");
        }
      }
      else
      {
        return Json("An unknown error has occurred");
      }
    }

    public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
