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
        => optionsBuilder.UseMySQL("Server=45.127.5.153;Port=3306;Database=Room_Rental;User=root;Password=20250112@stay_seeker;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EEmailToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("E_EmailToken");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<EStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("E_Status");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<EUserRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("E_UserRole");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<EUserStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("E_UserStatus");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<TAuditTrail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_AuditTrail");

            entity.Property(e => e.Action).HasMaxLength(30);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Module).HasMaxLength(100);
            entity.Property(e => e.Remark).HasMaxLength(300);
            entity.Property(e => e.TableName).HasMaxLength(100);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        modelBuilder.Entity<TAuditTrailDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

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

            entity.HasOne(d => d.AuditTrail).WithMany(p => p.TAuditTrailDetails)
                .HasForeignKey(d => d.AuditTrailId)
                .HasConstraintName("T_AuditTrailDetails_ibfk_1");
        });

        modelBuilder.Entity<TEmail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Email");

            entity.HasIndex(e => e.Status, "Status");

            entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");
            entity.Property(e => e.EmailContent).HasColumnType("text");
            entity.Property(e => e.EmailSubject).HasMaxLength(300);
            entity.Property(e => e.IcntFailedSend).HasColumnName("ICntFailedSend");
            entity.Property(e => e.RecipientEmail).HasMaxLength(200);
            entity.Property(e => e.RecipientName).HasMaxLength(200);
            entity.Property(e => e.Remark).HasMaxLength(300);
            entity.Property(e => e.SentDateTime).HasColumnType("datetime");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.TEmails)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("T_Email_ibfk_1");
        });

        modelBuilder.Entity<TProperty>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Properties");

            entity.HasIndex(e => e.ApprovedBy, "ApprovedBy");

            entity.HasIndex(e => e.CreatedBy, "CreatedBy");

            entity.HasIndex(e => e.Address, "IDX_PropertyAddress");

            entity.HasIndex(e => e.Price, "IDX_PropertyPrice");

            entity.HasIndex(e => e.PropertyStatus, "IDX_PropertyStatus");

            entity.HasIndex(e => e.OwnerId, "OwnerId");

            entity.HasIndex(e => e.UpdatedBy, "UpdatedBy");

            entity.Property(e => e.ApprovedAt).HasColumnType("datetime");
            entity.Property(e => e.AreaSize).HasPrecision(10);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.Latitude).HasPrecision(9, 6);
            entity.Property(e => e.Longitude).HasPrecision(9, 6);
            entity.Property(e => e.Price).HasPrecision(10);
            entity.Property(e => e.Remark).HasMaxLength(1000);
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.TPropertyApprovedByNavigations)
                .HasForeignKey(d => d.ApprovedBy)
                .HasConstraintName("T_Properties_ibfk_4");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TPropertyCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("T_Properties_ibfk_2");

            entity.HasOne(d => d.Owner).WithMany(p => p.TPropertyOwners)
                .HasForeignKey(d => d.OwnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("T_Properties_ibfk_1");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.TPropertyUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("T_Properties_ibfk_3");
        });

        modelBuilder.Entity<TPropertyFacility>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_PropertyFacilities");

            entity.HasIndex(e => e.CreatedBy, "CreatedBy");

            entity.HasIndex(e => e.PropertyId, "IDX_PropertyId");

            entity.HasIndex(e => new { e.PropertyId, e.FacilityType }, "IDX_PropertyId_FacilityType");

            entity.HasIndex(e => e.UpdatedBy, "UpdatedBy");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TPropertyFacilityCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("T_PropertyFacilities_ibfk_2");

            entity.HasOne(d => d.Property).WithMany(p => p.TPropertyFacilities)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("T_PropertyFacilities_ibfk_1");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.TPropertyFacilityUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("T_PropertyFacilities_ibfk_3");
        });

        modelBuilder.Entity<TPropertyLanguage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_PropertyLanguages");

            entity.HasIndex(e => e.CreatedBy, "CreatedBy");

            entity.HasIndex(e => e.PropertyId, "IDX_PropertyId");

            entity.HasIndex(e => new { e.PropertyId, e.LanguageId }, "IDX_PropertyId_LanguageId");

            entity.HasIndex(e => e.LanguageId, "IDX_PropertyLanguageId");

            entity.HasIndex(e => e.UpdatedBy, "UpdatedBy");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PropertyDescription).HasMaxLength(4000);
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TPropertyLanguageCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("T_PropertyLanguages_ibfk_2");

            entity.HasOne(d => d.Property).WithMany(p => p.TPropertyLanguages)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("T_PropertyLanguages_ibfk_1");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.TPropertyLanguageUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("T_PropertyLanguages_ibfk_3");
        });

        modelBuilder.Entity<TPropertyPhoto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_PropertyPhotos");

            entity.HasIndex(e => e.CreatedBy, "CreatedBy");

            entity.HasIndex(e => e.PropertyId, "IDX_PropertyId");

            entity.HasIndex(e => e.UpdatedBy, "UpdatedBy");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.PhotoFilePath).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.TPropertyPhotoCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("T_PropertyPhotos_ibfk_2");

            entity.HasOne(d => d.Property).WithMany(p => p.TPropertyPhotos)
                .HasForeignKey(d => d.PropertyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("T_PropertyPhotos_ibfk_1");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.TPropertyPhotoUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("T_PropertyPhotos_ibfk_3");
        });

        modelBuilder.Entity<TSystemConfig>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_SystemConfig");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(300);
            entity.Property(e => e.Key).HasMaxLength(300);
            entity.Property(e => e.UpdatedBy).HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Value).HasMaxLength(300);
        });

        modelBuilder.Entity<TUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_User");

            entity.HasIndex(e => e.Status, "Status");

            entity.HasIndex(e => e.UserRoleId, "UserRoleId");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.ICountFailedLogin).HasColumnName("iCountFailedLogin");
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Password).HasMaxLength(300);
            entity.Property(e => e.Phone).HasMaxLength(30);
            entity.Property(e => e.Username).HasMaxLength(100);

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.TUsers)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("T_User_ibfk_2");

            entity.HasOne(d => d.UserRole).WithMany(p => p.TUsers)
                .HasForeignKey(d => d.UserRoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("T_User_ibfk_1");
        });

        modelBuilder.Entity<TUserLoginHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_UserLoginHistory");

            entity.HasIndex(e => e.UserId, "IX_T_UserLoginHistory_UserId");

            entity.Property(e => e.LoginDateTime).HasColumnType("datetime");
            entity.Property(e => e.LogoutDateTime).HasColumnType("datetime");
            entity.Property(e => e.Remark).HasMaxLength(300);

            entity.HasOne(d => d.User).WithMany(p => p.TUserLoginHistories)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("T_UserLoginHistory_ibfk_1");
        });

        modelBuilder.Entity<TUserToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_UserTokens");

            entity.HasIndex(e => e.UserId, "IX_T_UserTokens_UserId");

            entity.HasIndex(e => e.TokenType, "TokenType");

            entity.Property(e => e.CreatedDateTime).HasColumnType("datetime");
            entity.Property(e => e.ExpiresDateTime).HasColumnType("datetime");
            entity.Property(e => e.Token).HasMaxLength(255);

            entity.HasOne(d => d.TokenTypeNavigation).WithMany(p => p.TUserTokens)
                .HasForeignKey(d => d.TokenType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("T_UserTokens_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.TUserTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("T_UserTokens_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
