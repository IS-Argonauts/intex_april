using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RootkitAuth.API.Data;
using RootkitAuth.API.Models;
using RootkitAuth.API.Services;
using Google.Apis.Auth;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//        options.JsonSerializerOptions.WriteIndented = true; // Optional: make it pretty
//    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.ConfigureApplicationCookie(options =>
//{
//    options.LoginPath = "/auth/login"; // Update this to your actual login path
//});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true; // 🔥 Add this
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Database Contexts
builder.Services.AddDbContext<MoviesDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CompetitionConnection")));


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

// Identity Setup
//builder.Services.AddIdentity<IdentityUser, IdentityRole>()
//    .AddEntityFrameworkStores<ApplicationDbContext>()
//    .AddDefaultTokenProviders();

// Google Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
});

// Authorization
builder.Services.AddAuthorization();



builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<MoviesDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddAuthorization();



// Email Services
builder.Services.AddTransient<Microsoft.AspNetCore.Identity.UI.Services.IEmailSender, Microsoft.AspNetCore.Identity.UI.Services.NoOpEmailSender>();
builder.Services.AddTransient<IEmailSender<ApplicationUser>, EmailSenderAdapter>();

// Identity Claims Customization
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

//builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();
builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, CustomUserClaimsPrincipalFactory>();


// Cookie Settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/auth/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
        else
        {
            policy.WithOrigins("https://proud-meadow-034f6310f.6.azurestaticapps.net")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

// Dev pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => Results.Ok("Welcome to the public home page!"));

app.MapControllers();
//app.MapIdentityApi<IdentityUser>();

//app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
//{
//    await signInManager.SignOutAsync();

//    // Ensure authentication cookie is removed
//    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
//    {
//        HttpOnly = true,
//        Secure = true,
//        SameSite = SameSiteMode.None
//    });


// Logout
//app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
//{
    //await signInManager.SignOutAsync();

//    return Results.Ok(new { message = "Logout successful" });
//}).RequireAuthorization();
app.MapIdentityApi<ApplicationUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Ensure authentication cookie is removed

  context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// Ping authenticated

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!(user.Identity?.IsAuthenticated ?? false))
        return Results.Unauthorized();

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    return Results.Json(new { email });
}).RequireAuthorization();

// Google Login Endpoint
app.MapPost("/google-login", async (
    HttpContext context,
    SignInManager<ApplicationUser> signInManager,
    UserManager<ApplicationUser> userManager) =>
{
    var json = await context.Request.ReadFromJsonAsync<Dictionary<string, string>>();
    var credential = json?["credential"];

    if (string.IsNullOrEmpty(credential))
        return Results.BadRequest("Missing credential");

    try
    {
        var payload = await Google.Apis.Auth.GoogleJsonWebSignature.ValidateAsync(credential);
        var email = payload.Email;

        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new ApplicationUser { UserName = email, Email = email };
            var createResult = await userManager.CreateAsync(user);
            if (!createResult.Succeeded)
                return Results.BadRequest("Failed to create user");
        }

        await signInManager.SignInAsync(user, isPersistent: false);

        return Results.Ok(new { message = "Signed in with Google", email });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Google login error: " + ex.Message);
        return Results.BadRequest("Invalid Google login");
    }
});


app.Run();

