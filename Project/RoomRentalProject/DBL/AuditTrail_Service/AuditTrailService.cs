using DAL;
using DAL.Models;
using DAL.Repository.AuditTrailRP;
using DAL.Tools.ListingHelper;
using DBL.Tools;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Utils.Enums;
using Utils.Tools;

namespace DBL.AuditTrail_Service
{
    public class AuditTrailService : IAuditTrailService
    {
        private IAuditTrailRepository _auditTrailRepository;
        private readonly AppDbContext _appDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private string username = string.Empty;

        public AuditTrailService(IAuditTrailRepository auditTrailRepository, AppDbContext AppDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _auditTrailRepository = auditTrailRepository;
            _appDbContext = AppDbContext;
            _httpContextAccessor = httpContextAccessor;
            if (_httpContextAccessor.HttpContext != null)
            {
                username = _httpContextAccessor.HttpContext.Items["Username"] as string;

            }
        }

        public async Task CreateAuditTrailAsync<T>(string module, string action, T originalObject, T newObject)
        {
            try
            {
                // Get the primary key property name
                var keyName = _appDbContext.Model.FindEntityType(typeof(T))?
                    .FindPrimaryKey()?
                    .Properties
                    .Select(x => x.Name)
                    .SingleOrDefault();

                // Initialize primaryKeyValue
                object primaryKeyValue = null;

                if (!string.IsNullOrEmpty(keyName))
                {
                    var keyProperty = typeof(T).GetProperty(keyName);
                    if (keyProperty == null)
                    {
                        throw new InvalidOperationException($"Property '{keyName}' not found on {typeof(T).Name}.");
                    }

                    // Try to get the primary key value from either originalObject or newObject
                    primaryKeyValue = originalObject != null
                        ? keyProperty.GetValue(originalObject)
                        : newObject != null
                            ? keyProperty.GetValue(newObject)
                            : null;
                }

                var auditTrail = new TAuditTrail
                {
                    Module = module,
                    TableName = typeof(T).Name,
                    Action = action,
                    Username = username != null ? username : "Empty",
                    Remark = $"{action} {typeof(T).Name} record, id: {primaryKeyValue}",
                    CreatedDate = DateTime.Now,
                    TAuditTrailDetails = new List<TAuditTrailDetail>()
                };

                // Compare the original and new objects if both are not null
                if (originalObject != null && newObject != null)
                {
                    foreach (var property in typeof(T).GetProperties())
                    {
                        var originalValue = property.GetValue(originalObject)?.ToString();
                        var newValue = property.GetValue(newObject)?.ToString();

                        if (string.IsNullOrEmpty(originalValue) && string.IsNullOrEmpty(newValue))
                        {
                            break;
                        }

                        if (originalValue != newValue)
                        {
                            var auditTrailDetail = new TAuditTrailDetail
                            {
                                Field = property.Name,
                                OriginalData = originalValue,
                                NewData = newValue
                            };

                            auditTrail.TAuditTrailDetails.Add(auditTrailDetail);
                        }
                    }
                }
                // If originalObject is null, it's a Create action
                else if (originalObject == null && newObject != null)
                {
                    foreach (var property in typeof(T).GetProperties())
                    {
                        var newValue = property.GetValue(newObject)?.ToString();

                        if (string.IsNullOrEmpty(newValue))
                        {
                            break;
                        }

                        var auditTrailDetail = new TAuditTrailDetail
                        {
                            Field = property.Name,
                            OriginalData = null,  // No original data for Create
                            NewData = newValue
                        };

                        auditTrail.TAuditTrailDetails.Add(auditTrailDetail);
                    }
                }
                // If newObject is null, it's a Delete action
                else if (newObject == null && originalObject != null)
                {
                    foreach (var property in typeof(T).GetProperties())
                    {
                        var originalValue = property.GetValue(originalObject)?.ToString();

                        if (string.IsNullOrEmpty(originalValue))
                        {
                            break;
                        }

                        var auditTrailDetail = new TAuditTrailDetail
                        {
                            Field = property.Name,
                            OriginalData = originalValue,
                            NewData = null  // No new data for Delete
                        };

                        auditTrail.TAuditTrailDetails.Add(auditTrailDetail);
                    }
                }

                // Save the audit trail
                await _auditTrailRepository.CreateAsync(auditTrail);

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Insert Audit Trail successful (Object). Record: {JsonConvert.SerializeObject(auditTrail)}");
            }
            catch (Exception ex)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Error when Insert Audit Trail (Object). Exception Message: {ex.Message}");
            }
        }

        public async Task CreateAuditTrailAsync(string module, string action, string tableName, Dictionary<string, string> originalObject, Dictionary<string, string> newObject)
        {
            try
            {
                var auditTrail = new TAuditTrail
                {
                    Module = module,
                    TableName = tableName,
                    Action = action,
                    Username = username,
                    Remark = $"{action} {module}.",
                    CreatedDate = DateTime.Now,
                    TAuditTrailDetails = new List<TAuditTrailDetail>()
                };

                // Compare the original and new objects
                foreach (var key in originalObject.Keys)
                {
                    if (newObject.ContainsKey(key))
                    {
                        var originalValue = originalObject[key];
                        var newValue = newObject[key];

                        if (originalValue != newValue)
                        {
                            var auditTrailDetail = new TAuditTrailDetail
                            {
                                Field = key,
                                OriginalData = originalValue,
                                NewData = newValue
                            };
                            auditTrail.TAuditTrailDetails.Add(auditTrailDetail);
                        }
                    }
                }

                // Save the audit trail
                await _auditTrailRepository.CreateAsync(auditTrail);

                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Insert Audit Trail successful (Dictionary). Record: {JsonConvert.SerializeObject(auditTrail)}");
            }
            catch (Exception ex)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Error when Insert Audit Trail (Dictionary). Exception Message: {ex.Message}");
            }
        }

        public async Task<PagedResult<TAuditTrail>> GetPagedListAsync(FilterParameters filterParameters)
        {
            var rtnValue = await _auditTrailRepository.GetPagedListAsync(filterParameters, true);

            return rtnValue;
        }
    
    }
}
