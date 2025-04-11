using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RootkitAuth.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordAndRoleToMoviesUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            //migrationBuilder.CreateTable(
            //    name: "movies_ratings",
            //    columns: table => new
            //    {
            //        user_id = table.Column<int>(type: "INTEGER", nullable: false),
            //        show_id = table.Column<string>(type: "TEXT", nullable: false),
            //        rating = table.Column<int>(type: "INTEGER", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_movies_ratings", x => new { x.show_id, x.user_id });
            //    });

            //migrationBuilder.CreateTable(
            //    name: "movies_titles",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "INTEGER", nullable: false)
            //            .Annotation("Sqlite:Autoincrement", true),
            //        show_id = table.Column<string>(type: "TEXT", nullable: true),
            //        type = table.Column<string>(type: "TEXT", nullable: true),
            //        title = table.Column<string>(type: "TEXT", nullable: true),
            //        director = table.Column<string>(type: "TEXT", nullable: true),
            //        cast = table.Column<string>(type: "TEXT", nullable: true),
            //        country = table.Column<string>(type: "TEXT", nullable: true),
            //        release_year = table.Column<int>(type: "INTEGER", nullable: true),
            //        rating = table.Column<string>(type: "TEXT", nullable: true),
            //        duration = table.Column<string>(type: "TEXT", nullable: true),
            //        description = table.Column<string>(type: "TEXT", nullable: true),
            //        Action = table.Column<int>(type: "INTEGER", nullable: true),
            //        Adventure = table.Column<int>(type: "INTEGER", nullable: true),
            //        AnimeSeriesInternationalTVShows = table.Column<int>(name: "Anime Series International TV Shows", type: "INTEGER", nullable: true),
            //        BritishTVShowsDocuseriesInternationalTVShows = table.Column<int>(name: "British TV Shows Docuseries International TV Shows", type: "INTEGER", nullable: true),
            //        Children = table.Column<int>(type: "INTEGER", nullable: true),
            //        Comedies = table.Column<int>(type: "INTEGER", nullable: true),
            //        ComediesDramasInternationalMovies = table.Column<int>(name: "Comedies Dramas International Movies", type: "INTEGER", nullable: true),
            //        ComediesInternationalMovies = table.Column<int>(name: "Comedies International Movies", type: "INTEGER", nullable: true),
            //        ComediesRomanticMovies = table.Column<int>(name: "Comedies Romantic Movies", type: "INTEGER", nullable: true),
            //        CrimeTVShowsDocuseries = table.Column<int>(name: "Crime TV Shows Docuseries", type: "INTEGER", nullable: true),
            //        Documentaries = table.Column<int>(type: "INTEGER", nullable: true),
            //        DocumentariesInternationalMovies = table.Column<int>(name: "Documentaries International Movies", type: "INTEGER", nullable: true),
            //        Docuseries = table.Column<int>(type: "INTEGER", nullable: true),
            //        Dramas = table.Column<int>(type: "INTEGER", nullable: true),
            //        DramasInternationalMovies = table.Column<int>(name: "Dramas International Movies", type: "INTEGER", nullable: true),
            //        DramasRomanticMovies = table.Column<int>(name: "Dramas Romantic Movies", type: "INTEGER", nullable: true),
            //        FamilyMovies = table.Column<int>(name: "Family Movies", type: "INTEGER", nullable: true),
            //        Fantasy = table.Column<int>(type: "INTEGER", nullable: true),
            //        HorrorMovies = table.Column<int>(name: "Horror Movies", type: "INTEGER", nullable: true),
            //        InternationalMoviesThrillers = table.Column<int>(name: "International Movies Thrillers", type: "INTEGER", nullable: true),
            //        InternationalTVShowsRomanticTVShowsTVDramas = table.Column<int>(name: "International TV Shows Romantic TV Shows TV Dramas", type: "INTEGER", nullable: true),
            //        Kids = table.Column<int>(type: "INTEGER", nullable: true),
            //        LanguageTVShows = table.Column<int>(name: "Language TV Shows", type: "INTEGER", nullable: true),
            //        Musicals = table.Column<int>(type: "INTEGER", nullable: true),
            //        NatureTV = table.Column<int>(name: "Nature TV", type: "INTEGER", nullable: true),
            //        RealityTV = table.Column<int>(name: "Reality TV", type: "INTEGER", nullable: true),
            //        Spirituality = table.Column<int>(type: "INTEGER", nullable: true),
            //        TVAction = table.Column<int>(name: "TV Action", type: "INTEGER", nullable: true),
            //        TVComedies = table.Column<int>(name: "TV Comedies", type: "INTEGER", nullable: true),
            //        TVDramas = table.Column<int>(name: "TV Dramas", type: "INTEGER", nullable: true),
            //        TalkShowsTVComedies = table.Column<int>(name: "Talk Shows TV Comedies", type: "INTEGER", nullable: true),
            //        Thrillers = table.Column<int>(type: "INTEGER", nullable: true),
            //        critically_acclaimed = table.Column<string>(type: "TEXT", nullable: true),
            //        genre = table.Column<string>(type: "TEXT", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_movies_titles", x => x.id);
            //    });

        //    migrationBuilder.CreateTable(
        //        name: "movies_users",
        //        columns: table => new
        //        {
        //            user_id = table.Column<int>(type: "INTEGER", nullable: false)
        //                .Annotation("Sqlite:Autoincrement", true),
        //            name = table.Column<string>(type: "TEXT", nullable: true),
        //            phone = table.Column<string>(type: "TEXT", nullable: true),
        //            email = table.Column<string>(type: "TEXT", nullable: true),
        //            age = table.Column<int>(type: "INTEGER", nullable: true),
        //            gender = table.Column<string>(type: "TEXT", nullable: true),
        //            Netflix = table.Column<int>(type: "INTEGER", nullable: true),
        //            Amazon = table.Column<int>(type: "INTEGER", nullable: true),
        //            Disney = table.Column<int>(type: "INTEGER", nullable: true),
        //            Paramount = table.Column<int>(type: "INTEGER", nullable: true),
        //            Max = table.Column<int>(type: "INTEGER", nullable: true),
        //            Hulu = table.Column<int>(type: "INTEGER", nullable: true),
        //            Apple = table.Column<int>(type: "INTEGER", nullable: true),
        //            Peacock = table.Column<int>(type: "INTEGER", nullable: true),
        //            city = table.Column<string>(type: "TEXT", nullable: true),
        //            state = table.Column<string>(type: "TEXT", nullable: true),
        //            zip = table.Column<int>(type: "INTEGER", nullable: true),
        //            password = table.Column<string>(type: "TEXT", nullable: true),
        //            role = table.Column<string>(type: "TEXT", nullable: true)
        //        },
        //        constraints: table =>
        //        {
        //            table.PrimaryKey("PK_movies_users", x => x.user_id);
        //        });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movies_ratings");

            migrationBuilder.DropTable(
                name: "movies_titles");

            migrationBuilder.DropTable(
                name: "movies_users");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);
        }
    }
}
