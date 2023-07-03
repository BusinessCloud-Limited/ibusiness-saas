using SaaS.SecurityAdmin.Models;

namespace SaaS.SecurityAdmin.Interfaces;

public interface ISecurityGroup
{
    Task<IEnumerable<SecurityGroup>> GetAllGroups();

    Task<SecurityGroup> GetGroupByID(string GroupID);

     Task<DBResponse> AddGroupAsync(SecurityGroup _SecurityGroup);
}
