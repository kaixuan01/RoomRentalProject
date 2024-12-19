﻿using DAL.Shared.Class;
using DAL.Tools.ListingHelper;

namespace DAL.Repository.UserRP.UserRepository.Class
{
    public class UserListing_REQ : FilterParameters
    {
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; }
        public bool? Status { get; set; }
    }

    public class UserListing_RESP : ShareResp
    {
        public PagedResult<UserL> UserList = new PagedResult<UserL>();
    }

    public class UserL
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; }
        public string? Status { get; set; }
    }
}
