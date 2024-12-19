namespace DBL.SystemConfig_Service
{
    public class UpdateSystemConfig_REQ
    {
        public List<SysConfig> sysConfigList { get; set; } = new List<SysConfig>();
    }

    public class SysConfig
    {
        public string key { get; set; }
        public string value { get; set; }
    }
}
