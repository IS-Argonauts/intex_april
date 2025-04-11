using Microsoft.AspNetCore.Identity;
 
namespace RootkitAuth.API.Models;
 
public class ApplicationUser : IdentityUser
{
    // Custom fields (optional but useful)
    public string? Name { get; set; }
    public int? Age { get; set; }
    public string? City { get; set; }
 
    // For preference flags (optional)
    public int? Netflix { get; set; }
    public int? Amazon { get; set; }
    public int? Disney { get; set; }
    public int? Hulu { get; set; }
 
    // You don’t need to add `Role` here — Identity manages that separately via RoleManager
}