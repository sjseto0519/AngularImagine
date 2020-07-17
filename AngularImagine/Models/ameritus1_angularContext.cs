using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AngularByDoing.Models
{
  /// <summary>
  /// Command:
  /// Scaffold-DbContext "Server=198.38.83.200;Initial Catalog=ameritus1_angular;Persist Security Info=True;
  /// User ID=ameritus1_sseto001;Password=**********" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force
  /// </summary>
  public partial class ameritus1_angularContext : DbContext
    {
        public ameritus1_angularContext()
        {
        }

        public ameritus1_angularContext(DbContextOptions<ameritus1_angularContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BackupJson> BackupJson { get; set; }
        public virtual DbSet<SystemJson> SystemJson { get; set; }
    public virtual DbSet<ImagineJson> ImagineJson { get; set; }
    public virtual DbSet<CombinationsJson> CombinationsJson { get; set; }
    public virtual DbSet<SysUser> SysUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:DefaultSchema", "ameritus1_sseto001");

            modelBuilder.Entity<BackupJson>(entity =>
            {
                entity.HasKey(e => e.Date);

                entity.ToTable("BackupJson", "dbo");

                entity.Property(e => e.Date)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<SystemJson>(entity =>
            {
                entity.ToTable("SystemJson", "dbo");
            });

      modelBuilder.Entity<ImagineJson>(entity =>
      {
        entity.ToTable("ImagineJson", "dbo");
      });

      modelBuilder.Entity<CombinationsJson>(entity =>
      {
        entity.ToTable("CombinationsJson", "dbo");
      });

      modelBuilder.Entity<SysUser>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("sysUser");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
        }
    }
}
