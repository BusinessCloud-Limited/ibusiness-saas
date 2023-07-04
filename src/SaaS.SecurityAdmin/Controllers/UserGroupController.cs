using Microsoft.AspNetCore.Mvc;
using SaaS.SecurityAdmin.Interfaces;

namespace SaaS.SecurityAdmin.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserGroupController : ControllerBase
{
    private readonly IUserGroup _userGroupService;

    public UserGroupController(IUserGroup userGroupService)
    {
        _userGroupService = userGroupService;
    }
}
