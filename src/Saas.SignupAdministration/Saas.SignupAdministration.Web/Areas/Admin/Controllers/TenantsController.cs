﻿using Saas.Admin.Client;
using Saas.Identity.Services;

namespace Saas.SignupAdministration.Web.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize]
[Route("api/{area}/{controller}/[action]")]
[ValidateAntiForgeryToken]
// [AuthorizeForScopes(Scopes = new string[] { "tenant.read", "tenant.global.read", "tenant.write", "tenant.global.write", "tenant.delete", "tenant.global.delete" })]
public class TenantsController : ControllerBase 
{
    private readonly IAdminServiceClient _adminServiceClient;
    private readonly ICustomTenantService _tenantService;
    private readonly IApplicationUser _appuser;

    public TenantsController(IAdminServiceClient adminServiceClient, ICustomTenantService tenantService, IApplicationUser appuser)
    {
        _adminServiceClient = adminServiceClient;
        _tenantService = tenantService;
        _appuser = appuser;
    }

    // GET: Admin/Tenants/Admin
    // [HttpGet]
    //[Route("{area}/{controller}/admin")]
    //public async Task<IActionResult> Admin()
    //{
    //    var items = await _adminServiceClient.TenantsAllAsync();
    //    return Ok(items.Select(x => new TenantViewModel(x, ReferenceData.TenantCategories, ReferenceData.ProductServicePlans)));
    //}

    // GET: Admin/Tenants
    [HttpGet("/Admin/Tenants")]
    public async Task<IActionResult> Index()
    {
        if (!Guid.TryParse(HttpContext.User.GetNameIdentifierId(), out Guid userId))
        {
            throw new InvalidOperationException($"User name identifier is invalid '{HttpContext.User.GetNameIdentifierId()}'. The claim must be a Guid.");
        }

        var items = await _adminServiceClient.TenantsAsync(userId);
        return Ok(items.Select(x => new TenantViewModel(x, ReferenceData.TenantCategories, ReferenceData.ProductServicePlans)));
    }

    // GET: api/Admin/Tenants/Details/5
    [HttpGet]
    public async Task<IActionResult> Details(string id)
    {
        if (!Guid.TryParse(id, out var guid))
        {
            return NotFound();
        }

        var tenant = await _adminServiceClient.TenantsGETAsync(guid);
        
        return tenant == null
            ? NotFound()
            : Ok(new TenantViewModel(tenant, ReferenceData.TenantCategories, ReferenceData.ProductServicePlans));
    }

    // GET: api/Admin/Tenants/Create
    [HttpGet]
    public IActionResult Create()
    {
        return RedirectToAction(SR.OrganizationNameAction, SR.OnboardingWorkflowController, new { Area = "" });
    }

    // GET: Admin/Tenants/Edit/5
    //public async Task<IActionResult> Edit(string id)
    //{
    //    Guid guid = new();
    //    if (id is  null || !Guid.TryParse(id, out guid))
    //    {
    //        return NotFound();
    //    }

    //    var tenant = await _adminServiceClient.TenantsGETAsync(guid);
    //    if (tenant is null)
    //    {
    //        return NotFound();
    //    }
    //    ViewBag.ProductOptions = ReferenceData.ProductServicePlans.Select(x => new SelectListItem(x.Name, x.Id.ToString()));
    //    ViewBag.CategoryOptions = ReferenceData.TenantCategories.Select(x => new SelectListItem(x.Name, x.Id.ToString()));
    //    return View(new TenantViewModel(tenant, ReferenceData.TenantCategories, ReferenceData.ProductServicePlans));
    //}

    // POST: Admin/Tenants/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(string id, [Bind("Id,Name,Route,ProductTierId,CategoryId,CreatorEmail")] TenantDTO tenant)
    {
        Guid guid = new();
        if (!Guid.TryParse(id, out guid) || guid != tenant.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                await _adminServiceClient.TenantsPUTAsync(guid, tenant);
            }
            catch (ApiException)
            {
                return NotFound();
            }
            return RedirectToAction(nameof(Index));
        }
        return Ok(tenant);
    }

    // GET: Admin/Tenants/Delete/5
    [HttpGet]
    public async Task<IActionResult> Delete(string id)
    {
        Guid guid = new Guid();
        if (id == null || !Guid.TryParse(id, out guid))
        {
            return NotFound();
        }

        var tenant = await _adminServiceClient.TenantsGETAsync(guid);
        if (tenant == null)
        {
            return NotFound();
        }

        return Ok(tenant);
    }

    // POST: Admin/Tenants/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(string id)
    {
        Guid guid = new Guid();
        if (id == null || !Guid.TryParse(id, out guid))
        {
            return NotFound();
        }
        await _adminServiceClient.TenantsDELETEAsync(guid);
        return RedirectToAction(nameof(Index));
    }

    // POST: Admin/Tenants/Switch
    [HttpPost]
    public async Task<IActionResult> Switch(Guid tenantId)
    {
        try
        {
            bool res = await _tenantService.UpdateActiveTenantAsync(_appuser.NameIdentifier, tenantId);
            if(res)
            {
                return Ok(new { result = true, redirectTo = SR.SignInUrl });
            }
            return BadRequest(new {result = false, message = "Could not process your request"});

        }
        catch
        {
            return BadRequest(new { result = false, message = "Could not process your request" });
        }
    }
}
