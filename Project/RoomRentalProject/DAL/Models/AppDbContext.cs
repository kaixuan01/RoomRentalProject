using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EUserRole> EUserRoles { get; set; }

    public virtual DbSet<TAuditTrail> TAuditTrails { get; set; }

    public virtual DbSet<TAuditTrailDetail> TAuditTrailDetails { get; set; }

    public virtual DbSet<TEmail> TEmails { get; set; }

    public virtual DbSet<TSystemConfig> TSystemConfigs { get; set; }

    public virtual DbSet<TUser> TUsers { get; set; }

    public virtual DbSet<TUserLoginHistory> TUserLoginHistories { get; set; }

    public virtual DbSet<TUserToken> TUserTokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(local);Initial Catalog=Project_Base;Integrated Security=True;Encrypt=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EUserRole>(entity =>
        {
            entity.ToTable("E_UserRole");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<TAuditTrail>(entity =>
        {
            entity.ToTable("T_AuditTrail");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.Action).HasMaxLength(30);
            entity.Property(e => e.CreatedDate).HasPrecision(0);
            entity.Property(e => e.Module).HasMaxLength(100);
            entity.Property(e => e.Remark).HasMaxLength(300);
            entity.Property(e => e.TableName).HasMaxLength(100);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        modelBuilder.Entity<TAuditTrailDetail>(entity =>
        {
            entity.ToTable("T_AuditTrailDetails");

            entity.HasIndex(e => e.AuditTrailId, "IX_T_AuditTrailDetails_Audit_Trail_Id");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.AuditTrailId)
                .HasMaxLength(20)
                .HasColumnName("Audit_Trail_Id");
            entity.Property(e => e.Field).HasMaxLength(100);
            entity.Property(e => e.NewData)
                .HasMaxLength(300)
                .HasColumnName("New_Data");
            entity.Property(e => e.OriginalData)
                .HasMaxLength(300)
                .HasColumnName("Original_Data");

            entity.HasOne(d => d.AuditTrail).WithMany(p => p.TAuditTrailDetails).HasForeignKey(d => d.AuditTrailId);
        });

        modelBuilder.Entity<TEmail>(entity =>
        {
            entity.ToTable("T_Email");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.CreatedDateTime).HasPrecision(0);
            entity.Property(e => e.EmailSubject).HasMaxLength(300);
            entity.Property(e => e.IcntFailedSend).HasColumnName("ICntFailedSend");
            entity.Property(e => e.RecipientEmail).HasMaxLength(200);
            entity.Property(e => e.RecipientName).HasMaxLength(200);
            entity.Property(e => e.Remark).HasMaxLength(300);
            entity.Property(e => e.SentDateTime).HasPrecision(0);
            entity.Property(e => e.Status)
                .HasMaxLength(1)
                .HasComment("Status of the email\r\nP - Pending\r\nC - Completed\r\nF - Failed");
        });

        modelBuilder.Entity<TSystemConfig>(entity =>
        {
            entity.ToTable("T_SystemConfig");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.CreatedDate).HasPrecision(0);
            entity.Property(e => e.Description).HasMaxLength(300);
            entity.Property(e => e.Key).HasMaxLength(300);
            entity.Property(e => e.UpdatedBy).HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasPrecision(0);
            entity.Property(e => e.Value).HasMaxLength(300);
        });

        modelBuilder.Entity<TUser>(entity =>
        {
            entity.ToTable("T_User");

            entity.HasIndex(e => e.UserRoleId, "IX_T_User_UserRoleId");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.CreatedDate).HasPrecision(0);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.ICountFailedLogin)
                .HasComment("Used to count user login failed attempt.")
                .HasColumnName("iCountFailedLogin");
            entity.Property(e => e.IsBlocked).HasComment("User Status\r\nFalse (0) - Active\r\nTrue (1)  - Blocked");
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Password).HasMaxLength(300);
            entity.Property(e => e.Phone).HasMaxLength(30);
            entity.Property(e => e.UserRoleId).HasComment("User role id in E_UserRole table");
            entity.Property(e => e.Username).HasMaxLength(100);

            entity.HasOne(d => d.UserRole).WithMany(p => p.TUsers).HasForeignKey(d => d.UserRoleId);
        });

        modelBuilder.Entity<TUserLoginHistory>(entity =>
        {
            entity.ToTable("T_UserLoginHistory");

            entity.HasIndex(e => e.UserId, "IX_T_UserLoginHistory_UserId");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.LoginDateTime).HasPrecision(0);
            entity.Property(e => e.LogoutDateTime).HasPrecision(0);
            entity.Property(e => e.Remark).HasMaxLength(300);
            entity.Property(e => e.UserId).HasMaxLength(20);

            entity.HasOne(d => d.User).WithMany(p => p.TUserLoginHistories).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<TUserToken>(entity =>
        {
            entity.ToTable("T_UserTokens");

            entity.HasIndex(e => e.UserId, "IX_T_UserTokens_UserId");

            entity.Property(e => e.Id).HasMaxLength(20);
            entity.Property(e => e.CreatedDateTime).HasPrecision(0);
            entity.Property(e => e.ExpiresDateTime).HasPrecision(0);
            entity.Property(e => e.Token)
                .HasMaxLength(255)
                .HasComment("Store Base64 Encoded Token");
            entity.Property(e => e.TokenType)
                .HasMaxLength(100)
                .HasComment("Type of the token\r\n1. EmailConfirmation = Used for confirming a newly created user's email address.\r\n2. ResetPassword = Used when a user requests a password reset after forgetting their password.");
            entity.Property(e => e.UserId).HasMaxLength(20);

            entity.HasOne(d => d.User).WithMany(p => p.TUserTokens).HasForeignKey(d => d.UserId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
