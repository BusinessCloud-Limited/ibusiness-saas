using Microsoft.Data.SqlClient;
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;
using System.Data;
using Saas.Shared.DataHandler;
namespace SaaS.SecurityAdmin.Services;

public class SecurityGroupService : ISecurityGroup
{
    private readonly IDatabaseHandler _dbHandler;
    //private readonly IDictionary<string, string> connectionStrings;
    DBResponse _DBResponse = new DBResponse();
    public SecurityGroupService(IConfiguration config, IDatabaseHandler dbHandler)
    {      
        //connectionStrings = config.GetRequiredSection(SqlOptions.SectionName).Get<Dictionary<string, string>>() ?? new Dictionary<string, string>();
        _dbHandler = dbHandler;
    }
    public  async Task<DBResponse> AddGroupAsync(SecurityGroup _SecurityGroup)
    {
        try
        {
            List<Parameter> parameters = new List<Parameter>
            {
                new Parameter{Value =_SecurityGroup.GroupCode??string.Empty, Name = "GroupCode", Type=SqlDbType.NVarChar },
                new Parameter{Value =_SecurityGroup.GroupDesc??string.Empty, Name = "GroupDesc", Type=SqlDbType.NVarChar },
                new Parameter{Value =_SecurityGroup.Narration ?? string.Empty   , Name = "Narration", Type=SqlDbType.NVarChar }             
            };

            using (SqlDataReader reader = await _dbHandler.ExecuteReaderAsync("spSaveSecurityGroup", parameters))
            {
                while (reader.Read())
                {
                    string RetValue = reader["RetValue"].ToString()??string.Empty;
                    if (RetValue.Equals("1")||RetValue.Equals("2"))
                    {
                        _DBResponse.ResponseCode = "00";
                        _DBResponse.ResponseMsg = "Security group successfully created";                        
                    }
                    else
                    {
                        _DBResponse.ResponseCode = "01";
                        _DBResponse.ResponseMsg = "Creating security group failed";
                    }
                }
                           
                await reader.CloseAsync();
                _dbHandler.CloseResources();
                return _DBResponse;
            }
           
        }
        catch (Exception ex)
        {

            _DBResponse.ResponseCode = "01";
            _DBResponse.ResponseMsg = "Creating security group failed with exception "+ex.Message;
            return _DBResponse;
        }
    }

    public Task<IEnumerable<SecurityGroup>> GetAllGroups()
    {
        throw new NotImplementedException();
    }

    public Task<SecurityGroup> GetGroupByID(string GroupID)
    {
        throw new NotImplementedException();
    }
}
