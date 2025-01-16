using DAL.Models;
using DAL.Repository.PropertyRP.PropertyRepository.Class;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Enums;

namespace DAL.Repository.PropertyRP.PropertyRepository
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDbContext _appDbContext;

        public PropertyRepository(AppDbContext context)
        {
            _appDbContext = context;
        }

        public async Task CreateAsync(TProperty property)
        {
            throw new NotImplementedException();
        }

        public async Task<TProperty> GetByIdAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<TProperty> GetByOwnerIdAsync(int ownerId)
        {
            throw new NotImplementedException();
        }

        public async Task<IQueryable<PropertyL>> GetPropertyListing(PropertyListing_REQ oReq)
        {
            var query = _appDbContext.TProperties
                .Include(u => u.UserRole) // Include the UserRole navigation property
                .AsQueryable();
        }

        public async Task UpdateAsync(TProperty property)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateStatusAsync(List<long> ids, Enum_PropertyStatus status)
        {
            throw new NotImplementedException();
        }
    }
}