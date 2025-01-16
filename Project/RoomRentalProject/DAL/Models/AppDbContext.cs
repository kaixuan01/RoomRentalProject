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

    public virtual DbSet<EEmailToken> EEmailTokens { get; set; }

    public virtual DbSet<EStatus> EStatuses { get; set; }

    public virtual DbSet<EUserRole> EUserRoles { get; set; }

    public virtual DbSet<EUserStatus> EUserStatuses { get; set; }

    public virtual DbSet<TAuditTrail> TAuditTrails { get; set; }

    public virtual DbSet<TAuditTrailDetail> TAuditTrailDetails { get; set; }

    public virtual DbSet<TEmail> TEmails { get; set; }

    public virtual DbSet<TProperty> TProperties { get; set; }

    public virtual DbSet<TPropertyFacility> TPropertyFacilities { get; set; }

    public virtual DbSet<TPropertyLanguage> TPropertyLanguages { get; set; }

    public virtual DbSet<TPropertyPhoto> TPropertyPhotos { get; set; }

    public virtual DbSet<TSystemConfig> TSystemConfigs { get; set; }

    public virtual DbSet<TUser> TUsers { get; set; }

    public virtual DbSet<TUserLoginHistory> TUserLoginHistories { get; set; }

    public virtual DbSet<TUserToken> TUserTokens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=Room_Rental;Integrated Security=True;Encrypt=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EEmailToken>(entity =>
        {
            entity.ToTable("E_EmailToken");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<EStatus>(entity =>
        {
            entity.ToTable("E_Status");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<EUserRole>(entity =>
        {
            entity.ToTable("E_UserRole");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<EUserStatus>(entity =>
        {
            entity.ToTable("E_UserStatus");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<TAuditTrail>(entity =>
        {
            entity.ToTable("T_AuditTrail");

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

            entity.Property(e => e.AuditTrailId).HasColumnName("Audit_Trail_Id");
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

            entity.Property(e => e.CreatedDateTime).HasPrecision(0);
            entity.Property(e => e.EmailSubject).HasMaxLength(300);
            entity.Property(e => e.IcntFailedSend).HasColumnName("ICntFailedSend");
            entity.Property(e => e.RecipientEmail).HasMaxLength(200);
            entity.Property(e => e.RecipientName).HasMaxLength(200);
            entity.Property(e => e.Remark).HasMaxLength(300);
            entity.Property(e => e.SentDateTime).HasPrecision(0);
            entity.Property(e => e.Status).HasComment("Please refer E_Status table");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.TEmails)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_T_Email_Status");
        });

        modelBuilder.Entity<TProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__T_Proper__3214EC07ACE7D70A");

            entity.ToTable("T_Properties");

            entity.HasIndex(e => e.Address, "IDX_PropertyAddress");

            entity.HasIndex(e => e.PropertyStatus, "IDX_PropertyLanguagId");

            entity.HasIndex(e => e.Price, "IDX_PropertyPrice");

            entity.HasIndex(e => e.PropertyStatus, "IDX_PropertyStatus");

            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.ApprovedAt).HasColumnType("datetime");
            entity.Property(e => e.AreaSize).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Remark).HasMaxLength(1000);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.TPropertyApprovedByNavigations)
                .HasForeignKey(d => d.ApprovedBy)
                .HasConstraintName("FK__T_Propert__Appro__59FA5E80");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TPropertyCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__T_Propert__Creat__5812160E");

            entity.HasOne(d => d.Owner).WithMany(p => p.TPropertyOwners)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__T_Propert__Owner__571DF1D5");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.TPropertyUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__T_Propert__Updat__59063A47");
        });

        modelBuilder.Entity<TPropertyFacility>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("T_PropertyFacilities");

            entity.HasIndex(e => new { e.PropertyId, e.FacilityType }, "IDX_PropertyId_FacilityType");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<TPropertyLanguage>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("T_PropertyLanguages");

            entity.HasIndex(e => new { e.PropertyId, e.LanguageId }, "IDX_PropertyId_LanguageId");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PropertyDescription).HasMaxLength(4000);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<TPropertyPhoto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__T_Proper__3214EC076A3F05FA");

            entity.ToTable("T_PropertyPhotos");

            entity.HasIndex(e => e.PropertyId, "IDX_PropertyId");

            entity.Property(e => e.PhotoFilePath).HasMaxLength(255);

            entity.HasOne(d => d.Property).WithMany(p => p.TPropertyPhotos)
                .HasForeignKey(d => d.PropertyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__T_Propert__Photo__619B8048");
        });

        modelBuilder.Entity<TSystemConfig>(entity =>
        {
            entity.ToTable("T_SystemConfig");

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

            entity.Property(e => e.CreatedDate).HasPrecision(0);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.ICountFailedLogin)
                .HasComment("Used to count user login failed attempt.")
                .HasColumnName("iCountFailedLogin");
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Password).HasMaxLength(300);
            entity.Property(e => e.Phone).HasMaxLength(30);
            entity.Property(e => e.Status).HasComment("Please refer E_UserStatus table");
            entity.Property(e => e.UserRoleId).HasComment("Please refer E_UserRole table");
            entity.Property(e => e.Username).HasMaxLength(100);

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.TUsers)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_T_User_Status");

            entity.HasOne(d => d.UserRole).WithMany(p => p.TUsers)
                .HasForeignKey(d => d.UserRoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_T_User_UserRoleId");
        });

        modelBuilder.Entity<TUserLoginHistory>(entity =>
        {
            entity.ToTable("T_UserLoginHistory");

            entity.HasIndex(e => e.UserId, "IX_T_UserLoginHistory_UserId");

            entity.Property(e => e.LoginDateTime).HasPrecision(0);
            entity.Property(e => e.LogoutDateTime).HasPrecision(0);
            entity.Property(e => e.Remark).HasMaxLength(300);

            entity.HasOne(d => d.User).WithMany(p => p.TUserLoginHistories).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<TUserToken>(entity =>
        {
            entity.ToTable("T_UserTokens");

            entity.HasIndex(e => e.UserId, "IX_T_UserTokens_UserId");

            entity.Property(e => e.CreatedDateTime).HasPrecision(0);
            entity.Property(e => e.ExpiresDateTime).HasPrecision(0);
            entity.Property(e => e.Token)
                .HasMaxLength(255)
                .HasComment("Store Base64 Encoded Token");
            entity.Property(e => e.TokenType).HasComment("Please refer E_EmailToken table");

            entity.HasOne(d => d.TokenTypeNavigation).WithMany(p => p.TUserTokens)
                .HasForeignKey(d => d.TokenType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_T_UserTokens_TokenType");

            entity.HasOne(d => d.User).WithMany(p => p.TUserTokens).HasForeignKey(d => d.UserId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
