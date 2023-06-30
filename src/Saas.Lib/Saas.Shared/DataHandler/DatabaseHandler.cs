using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Saas.Shared.Options;
using System.Data;

namespace Saas.Shared.DataHandler;
public class DatabaseHandler : IDatabaseHandler
{
    private SqlConnection? _connection;
    private SqlCommand? command;

    private string? _connectionString;


    public int CommandTimeout { get; set; } = 30; //30 seconds as default

    public DatabaseHandler(IOptions<SqlOptions> sqloptions)
    {
        _connectionString = sqloptions.Value.IbizzSaasConnectionString;
    }

    public void CloseResources()
    {
        //clear parameters for further use
        CommandTimeout = 30;
          command?.DisposeAsync();
        _connection?.DisposeAsync();
    }

    public SqlDataReader ExecuteReader(string procedureQuery, ICollection<Parameter> parameters, string? conString = null, CommandType cType = CommandType.StoredProcedure)
    {
        Task<SqlDataReader> task = ExecuteReaderBulk(procedureQuery, parameters, conString, cType);
        return task.Result;
    }
    public async Task<SqlDataReader> ExecuteReaderAsync(string procedureQuery, ICollection<Parameter> parameters, string? conString = null, CommandType cType = CommandType.StoredProcedure)
    {
        SqlDataReader reader = await ExecuteReaderBulk(procedureQuery, parameters, conString, cType);

        return reader;
    }

    private Task<SqlDataReader> ExecuteReaderBulk(string procedureQuery, ICollection<Parameter> parameters, string? conString = null, CommandType cType = CommandType.StoredProcedure)
    {
        try
        {
            InitializeDataHandler(procedureQuery, parameters, conString, cType);

            if (command is SqlCommand cmd)
            {
                Task<SqlDataReader> reader = cmd.ExecuteReaderAsync();
                return reader;
            }
            else
            {
                throw new Exception("Reader cannot be null");
            }
        }
        catch
        {
            throw;
        }
    }


    public async Task<SqlDataReader> ExecuteReaderAsync<T>(string procedureQuery, ICollection<Parameter<T>> Tparameters, string? conString = null, CommandType cType = CommandType.StoredProcedure)
    {
        _connectionString = conString ?? _connectionString;
        try
        {
            _connection = new SqlConnection(_connectionString);
            {
                //Open connection to database only when it's closed
                if (_connection.State != ConnectionState.Open)
                {
                    await _connection.OpenAsync();
                }

                command = new SqlCommand(procedureQuery, _connection);
                {
                    command.CommandType = cType;
                    command.CommandTimeout = CommandTimeout;

                    foreach (Parameter<T> parameter in Tparameters)
                    {                   
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = parameter.Value;

                    }

                    SqlDataReader reader = await command.ExecuteReaderAsync();

                    return reader;
                }
            }
        }
        catch (SqlException)
        {
            throw;
        }
        catch (Exception)
        {
            throw;
        }
    }

    private void InitializeDataHandler(string procedureQuery, ICollection<Parameter> parameters, string? conString = null, CommandType cType = CommandType.StoredProcedure)
    {
        _connectionString = conString ?? _connectionString;
        try
        {
            _connection = new SqlConnection(_connectionString);
            {
                //Open connection to database only when it's closed
                if (_connection.State != ConnectionState.Open)
                {
                    _connection.OpenAsync().Wait();
                }

                command = new SqlCommand(procedureQuery, _connection);
                {
                    command.CommandType = cType;
                    command.CommandTimeout = CommandTimeout;

                    foreach (Parameter parameter in parameters)
                    {
                        switch (parameter.Type)
                        {
                            case SqlDbType.Int:
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = int.Parse(parameter.Value ?? "-1");

                                break;

                            case SqlDbType.TinyInt:
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = short.Parse(parameter.Value ?? "-1");
                                break;

                            case SqlDbType.BigInt:
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = long.Parse(parameter.Value ?? "-1");
                                break;

                            case SqlDbType.Money:
                            case SqlDbType.Decimal:
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = decimal.Parse(parameter.Value ?? "-1");
                                break;

                            case SqlDbType.DateTime:
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = DateTime.Parse(parameter.Value ?? "-1");
                                break;

                            default:
                                command.Parameters.AddWithValue(parameter.Name, parameter.Type).Value = parameter.Value;
                                break;
                        }

                    }
                }
            }
        }
        catch (SqlException)
        {
            throw;
        }
        catch (Exception)
        {
            throw;
        }

    }

}
