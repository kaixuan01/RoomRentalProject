using DAL.Models;
using System.Linq.Dynamic.Core;
using Utils;
using Utils.Enums;
using Utils.Tools;

namespace DAL.Data
{
    public static class DBInitializerSeedData
    {
        public static void InitializeDatabase(AppDbContext AppDbContext)
        {
            #region [ Seed Data ]

            var userRoles = new List<EUserRole>
            {
                CreateUserRole(Enum_UserRole.Admin, "Admin", "Administrator"),
                CreateUserRole(Enum_UserRole.Owner, "Owner", "Owner Account"),
                CreateUserRole(Enum_UserRole.NormalUser, "Normal User", "Customer Account"),
            };

            var systemConfig = new List<TSystemConfig>
            {
                CreateSystemConfig(ConstantCode.SystemConfig_Key.MaxLoginFailedAttempt, "3", "The maximum number of failed login attempts allowed before a user account is locked. Set this value to 0 to disable the lockout feature."),
                CreateSystemConfig(ConstantCode.SystemConfig_Key.EnableSendEmail_Background, "1", "Enables or disables the background email sending function. Set this value to 0 to disable or 1 to enable the function."),
                CreateSystemConfig(ConstantCode.SystemConfig_Key.SendEmailIntervalSec_Background, "10", "The interval, in seconds, at which emails are sent in the background. Eg. setting this value to 5 will cause the email sending function to execute every 5 seconds."),
                CreateSystemConfig(ConstantCode.SystemConfig_Key.SendEmailTotalRetry_Background, "3", "Specifies the maximum number of retry attempts for sending an email. If the number of failed attempts reaches this limit, further attempts to send emails to this address will be halted."),
                CreateSystemConfig(ConstantCode.SystemConfig_Key.UserTokenExpiration, "1", "Specifies the expiration time for user tokens in hours. Eg. Set value to 1 to let this token expire after 1 hour.")
            };

            var users = new List<TUser>
            {
                CreateUser("admin1", "admin", "Admin 1", "woonyap616@gmail.com", "0123456789", Enum_UserRole.Admin),
                CreateUser("admin2", "admin", "Admin 2", "kaixuan0131@gmail.com", "0123456789", Enum_UserRole.Admin),
                CreateUser("Owner1", "Owner", "Owner 1", "owner@owner.com", "0123456789", Enum_UserRole.Owner)
            };

            #endregion

            #region [ Process Seed Data]

            // 1. If there is no exist user role id, then add new record
            // 2. If there is exist user role id and name not equal, then update name and description
            foreach (var item in userRoles)
            {
                var oUserRole = AppDbContext.EUserRoles.FirstOrDefault(i => i.Id == item.Id);
                if (oUserRole == null)
                {
                    AppDbContext.EUserRoles.Add(item);
                }
                else if (oUserRole.Name != item.Name && oUserRole.Description != oUserRole.Description)
                {
                    oUserRole.Name = item.Name;
                    oUserRole.Description = item.Description;
                    AppDbContext.EUserRoles.Update(oUserRole);
                }
            }

            // If there is no default user exist, add the user list
            if(!AppDbContext.TUsers.Any())
            {
                AppDbContext.TUsers.AddRange(users);
            }

            // 1. If there is no exist system config key, then add new record
            foreach (var item in systemConfig)
            {
                var oSystemConfig = AppDbContext.TSystemConfigs.FirstOrDefault(i => i.Key == item.Key);
                if (oSystemConfig == null)
                {
                    AppDbContext.TSystemConfigs.Add(item);
                }
            }

            #endregion

            AppDbContext.SaveChanges();
        }

        // Method to create a TUser object with hashed password
        private static TUser CreateUser(string userName, string password, string name, string email, string phone, Enum_UserRole role)
        {
            return new TUser
            {
                Id = IdGeneratorHelper.GenerateId(),
                Username = userName,
                Password = PasswordHelper.HashPassword(password),
                Name = name,
                Email = email,
                Phone = phone,
                UserRoleId = (int)role,
                IsEmailVerified = true
            };
        }

        private static EUserRole CreateUserRole(Enum_UserRole role, string name, string description)
        {
            return new EUserRole
            {
                Id = (int)role,
                Name = name,
                Description = description
            };
        }

        private static TSystemConfig CreateSystemConfig(string key, string value, string description)
        {
            return new TSystemConfig
            {
                Id = IdGeneratorHelper.GenerateId(),
                Key = key,
                Value = value,
                Description = description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };
        }
    }
}
