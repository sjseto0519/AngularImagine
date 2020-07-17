using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularByDoing.Models
{
  public class JsonSource
  {

    public JsonSource(ameritus1_angularContext context)
    {
      _context = context;
      _sourceMap = new Dictionary<string, string>();
    }

    private ameritus1_angularContext _context;
    private Dictionary<string, string> _sourceMap;

    public string this[string type]
    {
      get
      {
        return _sourceMap.ContainsKey(type) ? _sourceMap[type] : GetType(type);
      }
      set
      {
        SetType(type, value);
      }
    }

    private string GetType(string type)
    {
      switch (type)
      {
        case "SystemJson":
          return _context.SystemJson.First().Json;
        case "ImagineJson":
          return _context.ImagineJson.First().Json;
        case "CombinationsJson":
          return _context.CombinationsJson.First().Json;
        default:
          throw new Exception("Type not found");
      }
    }

    private void SetType(string type, string json)
    {
      switch (type)
      {
        case "SystemJson":
          _context.SystemJson.First().Json = json;
          break;
        case "ImagineJson":
          _context.ImagineJson.First().Json = json;
          break;
        case "CombinationsJson":
          _context.CombinationsJson.First().Json = json;
          break;
        default:
          throw new Exception("Type not found");
      }
    }
  }
}
