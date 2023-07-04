using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaaS.SecurityAdmin.Interfaces;
using SaaS.SecurityAdmin.Models;
using System.Net;

namespace SaaS.SecurityAdmin.Controllers;
[Route("api/Adm/v1/[controller]")]
[ApiController]
public class SecurityGroupsController : ControllerBase
{
        private readonly ISecurityGroup _SGService;
        private DBResponse _DBResponse = new DBResponse();             
        public SecurityGroupsController(ISecurityGroup SGService)
        {
          _SGService = SGService;
        }
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create([FromBody] SecurityGroup _SecurityGroup)
    {
        if (ModelState.IsValid) 
        {


            {
                try
                {
                    _DBResponse = await _SGService.AddGroupAsync(_SecurityGroup);
                    return new OkObjectResult(_DBResponse);

                }
                catch (Exception ex)
                {                  
                    _DBResponse.ResponseCode = "02";
                    _DBResponse.ResponseMsg = "Security group initialization failed with error "+ex.Message;
                    return new BadRequestObjectResult(_DBResponse);
                }


            }

        }
        else
        {            
            return new BadRequestResult();
        }
    }
}
