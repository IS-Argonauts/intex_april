using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RootkitAuth.API.Models;

namespace RootkitAuth.API.Data;

public class MoviesDbContext : DbContext
{
    public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
    {
    }
    
    public DbSet<MoviesRating> MoviesRatings { get; set; }
    public DbSet<MoviesTitle> MoviesTitles { get; set; }
    public DbSet<MoviesUser> MoviesUsers { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MoviesRating>()
            .HasKey(mr => new { mr.ShowId, mr.UserId });
    }

}