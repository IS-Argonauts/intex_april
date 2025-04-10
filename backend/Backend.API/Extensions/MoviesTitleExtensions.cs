using System.Text;
using RootkitAuth.API.Models;
using RootkitAuth.API.Models.DTOs;

namespace RootkitAuth.API.Extensions;

public static class MoviesTitleExtensions
{
    private const string baseUrl = "https://mlworkspace9652940464.blob.core.windows.net/movieposters";

    public static MoviesTitleDTO ToDto(this MoviesTitle movie)
    {
        return new MoviesTitleDTO
        {
            ShowId = movie.ShowId,
            Id = movie.Id,
            Title = movie.Title,
            Type = movie.Type,
            Director = movie.Director,
            Cast = movie.Cast,
            Country = movie.Country,
            ReleaseYear = movie.ReleaseYear,
            Rating = movie.Rating,
            Duration = movie.Duration,
            Description = movie.Description,
            Genre = movie.Genre,
            CriticallyAcclaimed = movie.CriticallyAcclaimed,
            PosterUrl = $"{baseUrl}/{Uri.EscapeDataString(CleanTitle(movie.Title))}.jpg"
        };
    }
    
    private static string CleanTitle(string? title)
    {
        if (string.IsNullOrWhiteSpace(title)) return "";
 
        title = title.Normalize(NormalizationForm.FormC); // Normalize to composed form
        
        return title
            .Replace(":", "")
            .Replace("&", "")
            .Replace("'", "")
            .Replace(",", "")
            .Replace(".", "")
            .Replace("!", "")
            .Replace("?", "")
            .Replace("(", "")
            .Replace(")", "")
            .Replace("-", "") // Replace dash variants if needed
            .Trim();
    }
}