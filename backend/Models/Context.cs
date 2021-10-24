using System;
using Microsoft.EntityFrameworkCore;

namespace prid_2122_f02.Models {

    public class Context : DbContext {

        public Context(DbContextOptions<Context> options) : base(options) {}


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasIndex(u => u.Pseudo).IsUnique(); 
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique(); 

            modelBuilder.Entity<User>().HasData(
                new User {
                    UserID = 1,
                    Pseudo = "admin",
                    Password = "Password1,",
                    Email = "admin@mail.com",
                    Role = Role.Admin
                }, 
                new User { 
                    UserID = 2,
                    Pseudo = "Ben", 
                    Password = "Password1,", 
                    Email = "ben@mail.com", 
                    Firstname = "Benoît", 
                    Lastname = "Penelle",
                    Role = Role.Manager,
                    FeaturedImage = "assets/images/profile/dcr90a.webp"
                },
                new User { 
                    UserID = 3,
                    Pseudo = "Denis", 
                    Password = "Password1,", 
                    Email = "denis@mail.com", 
                    Firstname = "Denis", 
                    Lastname = "Capece", 
                    Birthdate = new DateTime(1976, 8, 7),
                    Role = Role.User,
                    FeaturedImage = "assets/images/profile/95.webp"
                },
                new User { 
                    UserID = 4,
                    Pseudo = "Guillaume", 
                    Password = "Password1,", 
                    Email = "guillaume@mail.com", 
                    Firstname = "Guillaume", 
                    Lastname = "Bare",
                    Role = Role.User,
                    FeaturedImage = "assets/images/profile/dickinsonBis.webp"
                },
                new User { 
                    UserID = 5,
                    Pseudo = "Stan", 
                    Password = "Password1,", 
                    Email = "stan@mail.com", 
                    Firstname = "Stanley", 
                    Lastname = "Peeters",
                    Role = Role.User,
                    FeaturedImage = "assets/images/profile/yuksek_away.webp"
                }
            );
        }

        public DbSet<User> Users { get; set; }

    }

}