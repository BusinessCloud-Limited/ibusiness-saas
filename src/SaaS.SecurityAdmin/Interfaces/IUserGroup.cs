using SaaS.SecurityAdmin.Models;

namespace SaaS.SecurityAdmin.Interfaces;

public interface IUserGroup
{
    Task<IEnumerable<UserGroup>> GetAllUserGroups();

    Task<UserGroup> GetUserGroupByID(string UserGroupID);

    Task<DBResponse> AddUserGroupAsync(UserGroup _UserGroup);
}
