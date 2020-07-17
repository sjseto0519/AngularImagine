using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace AngularByDoing.Services
{
  public class HashingService
  {

    private string _userId;
    private string _userPassword;

    public HashingService(string userId, string userPassword)
    {
      _userId = userId;
      _userPassword = userPassword;
    }

    public static string ToHash(string store)
    {
      return store.Substring(store.IndexOf("|")+1);
    }

    public static byte[] ToSalt(string store)
    {
      return Convert.FromBase64String(store.Substring(0, store.IndexOf("|")));
    }

    public bool IsMatchingUserName(string hash, byte[] salt1)
    {
      // Generate the hash, with an automatic 32 byte salt
      Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(this._userId, salt1);
      rfc2898DeriveBytes.IterationCount = 10000;
      byte[] hash1 = rfc2898DeriveBytes.GetBytes(20);
      //Return the salt and the hash
      return Convert.ToBase64String(hash1) == hash;
    }

    public bool IsMatchingUserPassword(string hash, byte[] salt1)
    {
      // Generate the hash, with an automatic 32 byte salt
      Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(this._userPassword, salt1);
      rfc2898DeriveBytes.IterationCount = 1000000;
      byte[] hash1 = rfc2898DeriveBytes.GetBytes(20);
      //Return the salt and the hash
      return Convert.ToBase64String(hash1) == hash;
    }
  }
}
