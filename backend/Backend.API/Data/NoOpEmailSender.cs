using Microsoft.AspNetCore.Identity;
using RootkitAuth.API.Models; // ✅ Add this if not already

namespace RootkitAuth.API.Data;

public class EmailSenderAdapter : IEmailSender<ApplicationUser> // 🔁 Change from IdentityUser to ApplicationUser
{
    private readonly Microsoft.AspNetCore.Identity.UI.Services.IEmailSender _inner;

    public EmailSenderAdapter(Microsoft.AspNetCore.Identity.UI.Services.IEmailSender inner)
    {
        _inner = inner;
    }

    public Task SendConfirmationLinkAsync(ApplicationUser user, string email, string confirmationLink)
        => _inner.SendEmailAsync(email, "Confirm your email", confirmationLink);

    public Task SendPasswordResetLinkAsync(ApplicationUser user, string email, string resetLink)
        => _inner.SendEmailAsync(email, "Reset your password", resetLink);

    public Task SendPasswordResetCodeAsync(ApplicationUser user, string email, string resetCode)
        => _inner.SendEmailAsync(email, "Reset code", resetCode);
}
