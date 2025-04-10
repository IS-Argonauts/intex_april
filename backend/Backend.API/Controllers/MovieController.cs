using System.Text;
using Microsoft.AspNetCore.Mvc;
using RootkitAuth.API.Data;
using RootkitAuth.API.Extensions;
using RootkitAuth.API.Models;
using RootkitAuth.API.Models.DTOs;

namespace RootkitAuth.API.Controllers;


[Route("[controller]")]
[ApiController]
public class MovieController : ControllerBase
{
    private MoviesDbContext _context;

    public MovieController(MoviesDbContext context)
    {
        _context = context;
    }

    [HttpGet("AllRatings")]
    public IActionResult GetAllRatings()
    {
        var ratings = _context.MoviesRatings.ToList();
        return Ok(ratings);
    }

    [HttpGet("AllMovies")]
    public IActionResult GetAllMovies([FromQuery] int page = 1, [FromQuery] int pageSize = 100,
        [FromQuery] string? searchQuery = null)
    {
        const string baseUrl = "https://mlworkspace9652940464.blob.core.windows.net/movieposters";

        if (page < 1) page = 1;
        if (pageSize > 1000) pageSize = 1000;

        var skip = (page - 1) * pageSize;
        var query = _context.MoviesTitles.AsQueryable();

        if (!string.IsNullOrEmpty(searchQuery))
        {
            var searchLower = searchQuery.ToLower();

            // 🔍 Check for exact match
            var exactMatch = _context.MoviesTitles
                .FirstOrDefault(m => m.Title.ToLower() == searchLower);

            if (exactMatch != null)
            {
                var result = new List<MoviesTitleDTO> {
                    exactMatch.ToDto()
                };

                return Ok(new { movies = result, totalCount = 1 });
            }

            // 🔎 Apply partial match filter
            query = query.Where(m => m.Title.ToLower().Contains(searchLower));
        }

        var totalCount = query.Count();

        var movies = query
            .Skip(skip)
            .Take(pageSize)
            .AsEnumerable()
            .Select(m => m.ToDto())
            .ToList();

        return Ok(new { movies, totalCount });
    }

    [HttpGet("AllUsers")]
    public IActionResult GetAllUsers()
    {
        var users = _context.MoviesUsers.ToList();
        return Ok(users);
    }
    
    [HttpGet("SingleMovie")]
    public IActionResult GetSingleMovie([FromQuery] int id)
    {
        const string baseUrl = "https://mlworkspace9652940464.blob.core.windows.net/movieposters";
        var movie = _context.MoviesTitles.SingleOrDefault(m => m.Id == id);

        if (movie == null)
        {
            return NotFound();
        }
        
        var movieDto = movie.ToDto();
        movieDto.PosterUrl = $"{baseUrl}/{Uri.EscapeDataString(CleanTitle(movie.Title))}.jpg";
        return Ok(movieDto);
    }
    
    [HttpGet("Count")]
    public IActionResult GetMovieCount()
    {
        var count = _context.MoviesTitles.Count();
        return Ok(count);
    }

    [HttpPost("AddMovie")]
    public IActionResult AddMovie([FromBody] MoviesTitleDTO movieDto)
    {
        if (!ModelState.IsValid)
        {
            // Log what exactly failed during model binding
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray()
                );

            return BadRequest(new
            {
                message = "Model binding failed",
                errors
            });
        }

        int nextId = (_context.MoviesTitles.Max(m => (int?)m.Id) ?? 0) + 1;
        movieDto.Id = nextId;
        movieDto.ShowId = nextId.ToString();
        _context.MoviesTitles.Add(movieDto);
        _context.SaveChanges();

        return Ok(movieDto);
    }


    [HttpPut("UpdateMovie/{id}")]
    public IActionResult UpdateMovie(int id, [FromBody] MoviesTitleDTO movieDto)
    {
        var movie = _context.MoviesTitles.FirstOrDefault(m => m.Id == id);

        if (movie == null)
        {
            return NotFound();
        }
        
        movie.Title = movieDto.Title;
        movie.Type = movieDto.Type;
        movie.Director = movieDto.Director;
        movie.Cast = movieDto.Cast;
        movie.Country = movieDto.Country;
        movie.ReleaseYear = movieDto.ReleaseYear;
        movie.Rating = movieDto.Rating;
        movie.Duration = movieDto.Duration;
        movie.Description = movieDto.Description;
        movie.Action = movieDto.Action;
        movie.Adventure = movieDto.Adventure;
        movie.AnimeSeriesInternationalTvShows = movieDto.AnimeSeriesInternationalTvShows;
        movie.BritishTvShowsDocuseriesInternationalTvShows = movieDto.BritishTvShowsDocuseriesInternationalTvShows;
        movie.Children = movieDto.Children;
        movie.Comedies = movieDto.Comedies;
        movie.ComediesDramasInternationalMovies = movieDto.ComediesDramasInternationalMovies;
        movie.ComediesInternationalMovies = movieDto.ComediesInternationalMovies;
        movie.ComediesRomanticMovies = movieDto.ComediesRomanticMovies;
        movie.CrimeTvShowsDocuseries = movieDto.CrimeTvShowsDocuseries;
        movie.Documentaries = movieDto.Documentaries;
        movie.DocumentariesInternationalMovies = movieDto.DocumentariesInternationalMovies;
        movie.Docuseries = movieDto.Docuseries;
        movie.Dramas = movieDto.Dramas;
        movie.DramasInternationalMovies = movieDto.DramasInternationalMovies;
        movie.DramasRomanticMovies = movieDto.DramasRomanticMovies;
        movie.FamilyMovies = movieDto.FamilyMovies;
        movie.Fantasy = movieDto.Fantasy;
        movie.HorrorMovies = movieDto.HorrorMovies;
        movie.InternationalMoviesThrillers = movieDto.InternationalMoviesThrillers;
        movie.InternationalMoviesThrillers = movieDto.InternationalMoviesThrillers;
        movie.InternationalTvShowsRomanticTvShowsTvDramas = movieDto.InternationalTvShowsRomanticTvShowsTvDramas;
        movie.Kids = movieDto.Kids;
        movie.LanguageTvShows = movieDto.LanguageTvShows;
        movie.Musicals = movieDto.Musicals;
        movie.NatureTv = movieDto.NatureTv;
        movie.RealityTv = movieDto.RealityTv;
        movie.Spirituality = movieDto.Spirituality;
        movie.TvAction = movieDto.TvAction;
        movie.TvDramas = movieDto.TvDramas;
        movie.TalkShowsTvComedies = movieDto.TalkShowsTvComedies;
        movie.Thrillers = movieDto.Thrillers;
        movie.CriticallyAcclaimed = movieDto.CriticallyAcclaimed;
        movie.Genre = movieDto.Genre;
        
        _context.MoviesTitles.Update(movie);
        _context.SaveChanges();
        return Ok();
    }

    [HttpDelete("DeleteMovie/{id}")]
    public IActionResult DeleteMovie(int id)
    {
        var movie = _context.MoviesTitles.FirstOrDefault(m => m.Id == id);
        if (movie == null)
        {
            return NotFound();
        }

        _context.MoviesTitles.Remove(movie);
        _context.SaveChanges();

        return NoContent();
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