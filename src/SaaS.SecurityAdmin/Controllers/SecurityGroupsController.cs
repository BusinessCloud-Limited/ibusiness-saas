using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;
using System.Net;

namespace SaaS.SecurityAdmin.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]

public class SecurityGroupsController : ControllerBase
{
    private readonly ISecurityGroup _securityGroup;
    private DBResponse _dbResponse = new();

    public SecurityGroupsController(ISecurityGroup securityGroup)
    {
        _securityGroup = securityGroup;
    }

    [HttpPost]
    public async Task<IActionResult> Create(SecurityGroup group)
    {
       
       if(ModelState.IsValid)
        {
            try 
            {
                 _dbResponse = await _securityGroup.AddGroupAsync(group);
                return new OkObjectResult(_dbResponse);
            }
            catch (Exception ex)
            {
                _dbResponse.ResponseCode = "02";
                _dbResponse.ResponseMsg = "Security group initialization failed with error " + ex.Message;
                return new BadRequestObjectResult(_dbResponse);
            }
          
        }
        else
        {
            
            return new BadRequestResult();
        }
    }
}
