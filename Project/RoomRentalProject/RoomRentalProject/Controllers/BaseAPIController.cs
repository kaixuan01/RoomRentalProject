using Microsoft.AspNetCore.Mvc;

namespace E_commerce.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public abstract class BaseAPIController : ControllerBase
    {
        // Common logic or properties for all controllers
        protected IActionResult HandleException(Exception ex, string message = "An error occurred")
        {
            return BadRequest(new { Error = $"{message}: {ex.Message}" });
        }
    }
}