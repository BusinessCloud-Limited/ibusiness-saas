using Microsoft.Data.SqlClient;
using System.Data;

namespace Saas.Shared.DataHandler;
public interface IDatabaseHandler
{
    public void CloseResources();

    public int CommandTimeout { get; set; }

    public Task<SqlDataReader> ExecuteReaderAsync(string procedureQuery, ICollection<Parameter> parameters, string? conString = null, CommandType cType = CommandType.StoredProcedure);
    public SqlDataReader ExecuteReader(string procedureQuery, ICollection<Parameter> parameters, string? conString = null, CommandType cType = CommandType.StoredProcedure);
    public Task<SqlDataReader> ExecuteReaderAsync<T>(string procedureQuery, ICollection<Parameter<T>> Tparameters, string? conString = null, CommandType cType = CommandType.StoredProcedure);
}
