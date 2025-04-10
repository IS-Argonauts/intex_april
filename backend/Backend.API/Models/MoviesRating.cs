using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Models;

[Keyless]
[Table("movies_ratings")]
public partial class MoviesRating
{
    [Column("user_id")]
    public int? UserId { get; set; }

    [Column("show_id")]
    public string? ShowId { get; set; }

    [Column("rating")]
    public int? Rating { get; set; }
}
