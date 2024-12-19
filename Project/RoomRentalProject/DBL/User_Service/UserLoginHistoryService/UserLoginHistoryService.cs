using DAL.Models;
using DAL.Repository.UserRP.UserLoginHistoryRepository;
using DAL.Shared.Class;
using DAL.Tools.ListingHelper;
using DBL.Tools;
using Utils;
using Utils.Enums;

namespace DBL.User_Service.UserLoginHistoryService
{
    public class UserLoginHistoryService : IUserLoginHistoryService
    {
        private readonly IUserLoginHistoryRepository _userLoginHistoryRepository;

        public UserLoginHistoryService(IUserLoginHistoryRepository userLoginHistoryRepository)
        {
            _userLoginHistoryRepository = userLoginHistoryRepository;
        }

        public async Task<ShareResp> CreateAsync(TUserLoginHistory oUserLoginHistory)
        {
            var rtnValue = new ShareResp();

            try
            {
                await _userLoginHistoryRepository.CreateAsync(oUserLoginHistory);

                rtnValue.Code = RespCode.RespCode_Success;
                rtnValue.Message = RespCode.RespMessage_Insert_Successful;
            }
            catch (Exception ex)
            {

                rtnValue.Code = RespCode.RespCode_Exception;
                rtnValue.Message = ex.Message;
            }

            return rtnValue;
        }

        public async Task<PagedResult<TUserLoginHistory>> GetLoginHistoryList(FilterParameters filterParameters, bool includeForeignRelationship = false)
        {
            var oUserLoginHistoryList = await _userLoginHistoryRepository.GetPagedListAsync(filterParameters, includeForeignRelationship);

            return oUserLoginHistoryList;
        }

        public async Task UpdateUserLogoutByUserIdAsync(string UserId)
        {
            var record = await _userLoginHistoryRepository.GetUserLoginHistoryByUserIdAsync(UserId);

            if (record == null)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Login History not found. User Id: {UserId}");
            }

            record.LogoutDateTime = DateTime.Now;

            await _userLoginHistoryRepository.UpdateAsync(record);
        }
    }
}
