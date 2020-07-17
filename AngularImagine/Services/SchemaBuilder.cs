using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularByDoing.Services
{
  public class SchemaBuilder
  {

    private string _json;
    private JObject _obj;
    private bool _isValid;
    private bool _isValidAgainstSchema;
    private List<string> _keys;
    private JSchema _schema;
    private JObject _toValidate;
    private string _extraKey;

    public SchemaBuilder(string json)
    {
      _isValid = true;
      _json = json;
    }

    public bool IsValid
    {
      get
      {
        return _isValid && _isValidAgainstSchema;
      }
    }

    public SchemaBuilder ReadInput(string input)
    {
      try
      {
        _toValidate = JObject.Parse(input);
      }
      catch (Exception)
      {
        _isValid = false;
        return this;
      }
      if (_toValidate == null)
      {
        _isValid = false;
        return this;
      }
      var keyLength = _toValidate.Properties().Count();
      if (keyLength != _keys.Count && keyLength != _keys.Count+1)
      {
        _isValid = false;
        return this;
      }
      if (keyLength == _keys.Count+1)
      {
        string extra = null;
        foreach (var property in _toValidate.Properties())
        {
          if (_keys.Contains(property.Name))
          {
            continue;
          } else
          {
            if (string.IsNullOrWhiteSpace(property.Name))
            {
              _isValid = false;
              return this;
            }
            if (extra != null)
            {
              _isValid = false;
              return this;
            }
            extra = property.Name;
          }
        }
        _extraKey = extra;
      }
      return this;
    }

    public SchemaBuilder GetSchema()
    {
      if (!_isValid)
        return this;
      JObject schema = new JObject();
      schema["type"] = "object";
      schema["additionalProperties"] = false;
      JObject properties = new JObject();
      JArray requiredArray = new JArray();
      if (_extraKey != null)
      {
        _keys.Add(_extraKey);
      }
      foreach (var key in _keys)
      {
        JObject property = new JObject();
        property["type"] = "array";
        JObject item = new JObject();
        item["type"] = "object";
        JArray requiredObject = new JArray();
        requiredObject.Add(new JValue("deed"));
        requiredObject.Add(new JValue("hint"));
        item["required"] = requiredObject;
        JObject itemProperties = new JObject();
        item["properties"] = itemProperties;
        item["additionalProperties"] = false;
        JObject deed = new JObject();
        deed["type"] = "string";
        itemProperties["deed"] = deed;
        JObject hint = new JObject();
        hint["type"] = "string";
        itemProperties["hint"] = hint;
        property["items"] = item;
        properties[key] = property;
        requiredArray.Add(new JValue(key));
      }
      schema["required"] = requiredArray;
      schema["properties"] = properties;
      string s = schema.ToString(Newtonsoft.Json.Formatting.None);
      _schema = JSchema.Parse(s);
      return this;
    }

    public SchemaBuilder IsValidAgainstSchema()
    {
      if (!_isValid)
        return this;
      IList<string> errorMessages;
      _isValidAgainstSchema = _toValidate.IsValid(_schema, out errorMessages);

      return this;
    }

    public SchemaBuilder GetKeys()
    {
      if (!_isValid)
        return this;
      _keys = _obj.Properties().Select(f => f.Name).ToList();
      return this;
    }

    public SchemaBuilder Validate()
    {
      JObject obj = null;
      try
      {
        obj = JObject.Parse(_json);
      } catch (Exception)
      {
        _obj = null;
        _isValid = false;
        return this;
      }
      _obj = obj;
      _isValid = true;
      _isValidAgainstSchema = true;
      return this;
    }
  }
}
