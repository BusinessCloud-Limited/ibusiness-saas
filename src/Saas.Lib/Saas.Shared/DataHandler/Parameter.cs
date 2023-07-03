using System.Data;

namespace Saas.Shared.DataHandler;

//Holds a parameter value, name and sql type
public class Parameter
{
    public Parameter(string name, string value, SqlDbType type)
    {
        Name = name; Value = value; Type = type;
    }

    public Parameter() 
    { 
        Name = string.Empty; Value = string.Empty; Type = SqlDbType.NVarChar;
    }

    public string Name { get; set; }

    public string Value { get; set; }

    public SqlDbType Type { get; set; }

}
//Generic parameters
public class Parameter<T>
{
    public Parameter(string name, T value, SqlDbType type)
    {
        Name = name;
        Value = value;
        Type = type;
    }

    public Parameter()
    { 
        Value = default;
        Name = string.Empty;
        Type = SqlDbType.NVarChar;  //Added by James Wanyeki on 20230702 for type safety
    }

    public string Name { get; set; }

    public T? Value { get; set; }

    public SqlDbType Type { get; set; }
}
