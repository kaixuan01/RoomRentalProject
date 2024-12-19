using Newtonsoft.Json;

namespace DBL.Tools
{
    public static class CloneObjectHelper
    {
        public static T Clone<T>(this T source)
        {
            if (source == null)
            {
                return default(T);
            }

            var serializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Objects
            };

            var serializedObject = JsonConvert.SerializeObject(source, serializerSettings);
            return JsonConvert.DeserializeObject<T>(serializedObject, serializerSettings);
        }
    }
}
