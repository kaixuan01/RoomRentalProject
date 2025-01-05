using DAL.Models;
using DAL.Repository.SystemConfigRP;
using DAL.Shared.Class;
using DBL.AuditTrail_Service;
using DBL.Tools;
using Utils.Constant;
using Utils.Enums;

namespace DBL.SystemConfig_Service
{
    public class SystemConfigService : ISystemConfigService
    {
        private readonly ISystemConfigRepository _systemConfigRepository;
        private readonly IAuditTrailService _auditTrailService;

        public SystemConfigService(ISystemConfigRepository systemConfigRepository, IAuditTrailService auditTrailService) {
            _systemConfigRepository = systemConfigRepository;
            _auditTrailService = auditTrailService;
        }

        public async Task<TSystemConfig> GetSystemConfigByKeyAsync(string key)
        {
            return await _systemConfigRepository.GetByKeyAsync(key);
        }

        public async Task<List<TSystemConfig>> GetSystemConfigList()
        {
            var result = await _systemConfigRepository.GetAllAsync();
            return result;
         }

        public async Task<ShareResp> UpdateAsync(UpdateSystemConfig_REQ oReq)
        {
            var rtnValue = new ShareResp();

            try
            {
                var systemConfig = await GetSystemConfigList();
                // Used to create audit trail record
                var copySystemConfig = systemConfig.Clone();

                foreach (var item in oReq.sysConfigList)
                {
                    var oSystemConfig = await _systemConfigRepository.GetByKeyAsync(item.key);

                    if (oSystemConfig == null)
                    {
                        LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"System Config not found. Key: {item.key}");

                        rtnValue.Code = RespCode.RespCode_Failed;
                        rtnValue.Message = "System Config not found.";
                        return rtnValue;
                    }

                    oSystemConfig.Value = item.value;
                    oSystemConfig.UpdatedDate = DateTime.Now;

                    await _systemConfigRepository.UpdateAsync(oSystemConfig);
                }

                // Updated List
                var systemConfigDictionary = systemConfig.ToDictionary(config => config.Key, config => config.Value);
                // Old List
                var copySystemConfigDictionary = copySystemConfig.ToDictionary(config => config.Key, config => config.Value);

                await _auditTrailService.CreateAuditTrailAsync(ConstantCode.Module.SystemConfig, ConstantCode.Action.Edit, ConstantCode.TableName.SystemConfig, copySystemConfigDictionary, systemConfigDictionary);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Update_Successful;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, RespCode.RespMessage_Update_Successful);
            }
            catch (Exception ex)
            {
                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ex.Message;
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, string.Format(ConstantCode.LogMessageTemplate.GeneralExceptionMessageTemplate, ex.Message));
            }
            
            return rtnValue;
        }

    }
}
