using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;

namespace SaaS.SecurityAdmin.Services;

public class SecurityGroupService : ISecurityGroup
{
    public  Task<DBResponse> AddGroupAsync(SecurityGroup _SecurityGroup)
    {
          throw new NotImplementedException();
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
