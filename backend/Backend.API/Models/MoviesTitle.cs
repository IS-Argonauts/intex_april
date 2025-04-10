using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RootkitAuth.API.Models;

[Table("movies_titles")]
public partial class MoviesTitle
{
    [Column("show_id")]
    public string? ShowId { get; set; }

    [Column("type")]
    public string? Type { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("director")]
    public string? Director { get; set; }

    [Column("cast")]
    public string? Cast { get; set; }

    [Column("country")]
    public string? Country { get; set; }

    [Column("release_year")]
    public int? ReleaseYear { get; set; }

    [Column("rating")]
    public string? Rating { get; set; }

    [Column("duration")]
    public string? Duration { get; set; }

    [Column("description")]
    public string? Description { get; set; }
    
    public int? Action { get; set; }

    public int? Adventure { get; set; }
    
    [Column("Anime Series International TV Shows")]
    public int? AnimeSeriesInternationalTvShows { get; set; }

    [Column("British TV Shows Docuseries International TV Shows")]
    public int? BritishTvShowsDocuseriesInternationalTvShows { get; set; }
    
    public int? Children { get; set; }
    
    public int? Comedies { get; set; }

    [Column("Comedies Dramas International Movies")]
    public int? ComediesDramasInternationalMovies { get; set; }

    [Column("Comedies International Movies")]
    public int? ComediesInternationalMovies { get; set; }

    [Column("Comedies Romantic Movies")]
    public int? ComediesRomanticMovies { get; set; }

    [Column("Crime TV Shows Docuseries")]
    public int? CrimeTvShowsDocuseries { get; set; }
    
    public int? Documentaries { get; set; }

    [Column("Documentaries International Movies")]
    public int? DocumentariesInternationalMovies { get; set; }

    public int? Docuseries { get; set; }

    public int? Dramas { get; set; }

    [Column("Dramas International Movies")]
    public int? DramasInternationalMovies { get; set; }

    [Column("Dramas Romantic Movies")]
    public int? DramasRomanticMovies { get; set; }

    [Column("Family Movies")]
    public int? FamilyMovies { get; set; }

    public int? Fantasy { get; set; }

    [Column("Horror Movies")]
    public int? HorrorMovies { get; set; }

    [Column("International Movies Thrillers")]
    public int? InternationalMoviesThrillers { get; set; }

    [Column("International TV Shows Romantic TV Shows TV Dramas")]
    public int? InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

    public int? Kids { get; set; }

    [Column("Language TV Shows")]
    public int? LanguageTvShows { get; set; }

    public int? Musicals { get; set; }

    [Column("Nature TV")]
    public int? NatureTv { get; set; }

    [Column("Reality TV")]
    public int? RealityTv { get; set; }
    
    public int? Spirituality { get; set; }

    [Column("TV Action")]
    public int? TvAction { get; set; }

    [Column("TV Comedies")]
    public int? TvComedies { get; set; }

    [Column("TV Dramas")]
    public int? TvDramas { get; set; }

    [Column("Talk Shows TV Comedies")]
    public int? TalkShowsTvComedies { get; set; }

    public int? Thrillers { get; set; }

    [Column("critically_acclaimed")]
    public string? CriticallyAcclaimed { get; set; }

    [Column("id")]
    public int? Id { get; set; }

    [Column("genre")]
    public string? Genre { get; set; }
}
