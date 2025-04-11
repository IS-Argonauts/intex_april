using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RootkitAuth.API.Models;
using RootkitAuth.API.Models.DTOs;
using System.Threading.Tasks;
 
namespace RootkitAuth.API.Controllers;
 
[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly SignInManager<ApplicationUser> _signInManager; // ✅ Add this line
 
    public AuthController(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        SignInManager<ApplicationUser> signInManager) // ✅ Add this to constructor
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager; // ✅ Set the field
    }
 
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDTO model)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
 
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
                return Conflict(new { message = "Email already exists." });
 
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email
            };
 
            var result = await _userManager.CreateAsync(user, model.Password);
 
            if (!result.Succeeded)
            {
                Console.WriteLine("❌ Registration failed:");
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"  - {error.Description}");
                }
 
                return StatusCode(500, new { errors = result.Errors });
            }
 
            if (!await _roleManager.RoleExistsAsync("user"))
            {
                await _roleManager.CreateAsync(new IdentityRole("user"));
            }
 
            await _userManager.AddToRoleAsync(user, "user");
 
            Console.WriteLine($"✅ Registration successful: {model.Email}");
 
            return Ok(new { message = "Registration successful!" });
        }
        catch (Exception ex)
        {
            Console.WriteLine("🔥 EXCEPTION DURING REGISTRATION:");
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
 
            return StatusCode(500, new { error = "Server error", detail = ex.Message });
        }
    }
 
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDTO model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
 
        var result = await _signInManager.PasswordSignInAsync(
            model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);
 
        if (!result.Succeeded)
        {
            Console.WriteLine($"❌ Login failed for {model.Email}");
            return Unauthorized(new { message = "Invalid email or password." });
        }
 
        Console.WriteLine($"✅ {model.Email} successfully logged in");
        return Ok(new { message = "Login successful!" });
    }
}