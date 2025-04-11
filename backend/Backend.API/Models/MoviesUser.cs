using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RootkitAuth.API.Models;

[Table("movies_users")]
public partial class MoviesUser
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("phone")]
    public string? Phone { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("age")]
    public int? Age { get; set; }

    [Column("gender")]
    public string? Gender { get; set; }

    public int? Netflix { get; set; }

    public int? Amazon { get; set; }

    public int? Disney { get; set; }

    public int? Paramount { get; set; }

    public int? Max { get; set; }

    public int? Hulu { get; set; }

    public int? Apple { get; set; }

    public int? Peacock { get; set; }

    [Column("city")]
    public string? City { get; set; }

    [Column("state")]
    public string? State { get; set; }

    [Column("zip")]
    public int? Zip { get; set; }

    [Column("password")]
    public string? Password { get; set; }

    [Column("role")]
    public string? Role { get; set; } = "user";

}
