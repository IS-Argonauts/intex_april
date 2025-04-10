using Microsoft.AspNetCore.Identity;

namespace RootkitAuth.API.Data;

public class EmailSenderAdapter : IEmailSender<IdentityUser>
{
    private readonly Microsoft.AspNetCore.Identity.UI.Services.IEmailSender _inner;

    public EmailSenderAdapter(Microsoft.AspNetCore.Identity.UI.Services.IEmailSender inner)
    {
        _inner = inner;
    }

    public Task SendConfirmationLinkAsync(IdentityUser user, string email, string confirmationLink)
        => _inner.SendEmailAsync(email, "Confirm your email", confirmationLink);

    public Task SendPasswordResetLinkAsync(IdentityUser user, string email, string resetLink)
        => _inner.SendEmailAsync(email, "Reset your password", resetLink);

    public Task SendPasswordResetCodeAsync(IdentityUser user, string email, string resetCode)
        => _inner.SendEmailAsync(email, "Reset code", resetCode);
}