//using System;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata;
//using Microsoft.Extensions.Configuration;

//namespace AngularByDoing.Models
//{
//    public partial class ameritus1_angularContext : DbContext
//    {
//        public ameritus1_angularContext()
//        {
//        }

//        public ameritus1_angularContext(DbContextOptions<ameritus1_angularContext> options)
//            : base(options)
//        {
//        }

//        public virtual DbSet<DoingJson> DoingJson { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
                
//            }
//        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.HasAnnotation("Relational:DefaultSchema", "ameritus1_sseto001");

//            modelBuilder.Entity<DoingJson>(entity =>
//            {
//                entity.ToTable("DoingJson", "dbo");
//            });
//        }
//    }
//}
