using Microsoft.Data.SqlClient;
using Saas.Shared.DataHandler;
using Saas.SignupAdministration.Web;
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;
using System.Data;
using System.Net;

namespace SaaS.SecurityAdmin.Services;

public class SecurityGroupService : ISecurityGroup
{
    private readonly IDatabaseHandler _databaseHandler;
    private readonly IApplicationUser _applicationUser;
    private DBResponse _dbResponse = new();

    public SecurityGroupService(IDatabaseHandler databaseHandler, IApplicationUser applicationUser)
    {
        _databaseHandler = databaseHandler;
        _applicationUser = applicationUser;
    }
    public async Task<DBResponse> AddGroupAsync(SecurityGroup _SecurityGroup)
    {
        try
        {


            List<Parameter> parameters = new()
            {
                new Parameter { Name = "GroupCode", Type = SqlDbType.NVarChar, Value = _SecurityGroup.GroupCode},
                new Parameter { Name = "GroupDesc", Type = SqlDbType.NVarChar, Value = _SecurityGroup.GroupDesc},
                new Parameter { Name = "Narration", Type = SqlDbType.NVarChar, Value = _SecurityGroup.Narration},
                new Parameter {Name = "UserID", Type = SqlDbType.NVarChar, Value = "mauricenganga41@gmail.com"},
                new Parameter {Name = "Terminus", Type=SqlDbType.NVarChar,Value = "1"}
            };

            using (SqlDataReader reader = await _databaseHandler.ExecuteReaderAsync("spSaveSecurityGroup", parameters))
            {
                while (reader.Read())
                {
                    string RetValue = reader["RetValue"].ToString() ?? string.Empty;
                    if (RetValue.Equals("1") || RetValue.Equals("2"))
                    {
                        _dbResponse.ResponseCode = "00";
                        _dbResponse.ResponseMsg = "Security group successfully created";
                    }
                    else
                    {
                        _dbResponse.ResponseCode = "01";
                        _dbResponse.ResponseMsg = "Creating security group failed";
                    }
                }
                await reader.CloseAsync();
                _databaseHandler.CloseResources();
                return _dbResponse;
            }


        }
        catch (Exception ex)
        {
<<<<<<< HEAD

            _DBResponse.ResponseCode = "01";
            _DBResponse.ResponseMsg = "Creating security group failed with exception " + ex.Message;
            return _DBResponse;
        }
=======
            _dbResponse.ResponseCode = "010";
            _dbResponse.ResponseMsg = ex.Message;
            return _dbResponse;
        }

        throw new NotImplementedException();
>>>>>>> security-groups-20230703
    }

    public async Task<IEnumerable<SecurityGroup>> GetAllGroups()
    {
        try
        {
            List<SecurityGroup> securityGroups = new();

            //using(SqlDataReader reader = await _databaseHandler.ExecuteReaderAsync("sp"))
            //{ while(reader.Read())
            //    {
            //    } }    
        }
        catch (Exception ex) { }
        throw new NotImplementedException();
    }

    public async Task<SecurityGroup> GetGroupByID(string GroupID)
    {

        try
        {
            List<Parameter> parameters = new List<Parameter>
            {
                new Parameter{Name = "", Type=SqlDbType.NVarChar }
            };

            SecurityGroup securityGroup = new();

            using (SqlDataReader reader = await _databaseHandler.ExecuteReaderAsync("l", parameters))
            {
                while (reader.Read())
                {

                }

                await reader.CloseAsync();
            }

            _databaseHandler.CloseResources();

        }
        catch (SqlException ex)
        {

        }
        throw new NotImplementedException();
    }
}
