using DAL.Models;
using DAL.Repository.UserRP.UserTokens;
using DBL.AuditTrail_Service;
using DBL.SystemConfig_Service;
using DBL.Tools;
using Utils.Constant;
using Utils.Enums;
using Utils.Tools;

namespace DBL.User_Service.UserTokensService
{
    public class UserTokensService : IUserTokensService
    {
        private readonly IUserTokensRepository _userTokensRepository;
        private readonly ISystemConfigService _systemConfigService;

        public UserTokensService(IUserTokensRepository userTokensRepository, ISystemConfigService systemConfigService)
        {
            _userTokensRepository = userTokensRepository;
            _systemConfigService = systemConfigService;
        }

        public async Task<TUserToken> CreateAsync(int UserId, short TokenType)
        {
            try
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"Receive Request to Generate Token. User Id: {UserId}, Token Type: {((Enum_EmailToken)TokenType).GetDescription()}");
                var oUserTokenExpiration = await _systemConfigService.GetSystemConfigByKeyAsync(ConstantCode.SystemConfig_Key.UserTokenExpiration);

                var newToken = new TUserToken
                {
                    UserId = UserId,
                    Token = AuthToken.GenerateToken(),
                    TokenType = TokenType,
                    CreatedDateTime = DateTime.Now,
                    ExpiresDateTime = DateTime.Now.AddHours(1), // By Default set it 1 hour
                    IsUsed = false
                };

                if (oUserTokenExpiration != null)
                {
                    // Assign the expiresDateTime base on System Config
                    if (int.TryParse(oUserTokenExpiration.Value, out int expirationHours))
                    {
                        if (expirationHours > 0) // Expiration hours cant be 0
                        {
                            newToken.ExpiresDateTime = DateTime.Now.AddHours(expirationHours);
                        }
                    }
                }

                // ## Create User Record
                await _userTokensRepository.CreateAsync(newToken);

                LogHelper.RaiseLogEvent(Enum_LogLevel.Information, $"{RespCode.RespMessage_Insert_Successful}. User Id: {UserId}");

                return newToken;
            }
            catch (Exception ex)
            {
                LogHelper.RaiseLogEvent(Enum_LogLevel.Error, $"Exception when insert user's token. User Id: {UserId}, Token Type: {TokenType}", ex);
                return null;
            }
        }

        public async Task<TUserToken> GetByTokenAsync(string token)
        {
            return await _userTokensRepository.GetByTokenAsync(token);
        }

        public async Task<TUserToken> GetByUserIdAsync(int UserId)
        {
            return await _userTokensRepository.GetByUserIdAsync(UserId);
        }

        public async Task UpdateAsync(TUserToken userTokens)
        {
            await _userTokensRepository.UpdateAsync(userTokens);
        }
    }
}
