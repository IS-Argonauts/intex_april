using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

public class EmailSenderAdapter : IEmailSender<IdentityUser>
{
    public Task SendConfirmationLinkAsync(IdentityUser user, string email, string confirmationLink)
    {
        // your logic here
        return Task.CompletedTask;
    }

    public Task SendPasswordResetLinkAsync(IdentityUser user, string email, string resetLink)
    {
        // your logic here
        return Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(IdentityUser user, string email, string resetCode)
    {
        // your logic here
        return Task.CompletedTask;
    }
}