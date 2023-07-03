using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;

namespace SaaS.SecurityAdmin.Services;

public class UserGroupService : IUserGroup
{
    public Task<DBResponse> AddUserGroupAsync(UserGroup _UserGroup)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<UserGroup>> GetAllUserGroups()
    {
        throw new NotImplementedException();
    }

    public Task<UserGroup> GetUserGroupByID(string UserGroupID)
    {
        throw new NotImplementedException();
    }
}
