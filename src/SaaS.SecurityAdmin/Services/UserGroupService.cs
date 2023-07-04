using Saas.Shared.DataHandler;
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;

namespace SaaS.SecurityAdmin.Services;

public class UserGroupService : IUserGroup
{
    private readonly IDatabaseHandler _databaseHandler;

    public UserGroupService(IDatabaseHandler databaseHandler)
    {
        _databaseHandler = databaseHandler;
    }

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
