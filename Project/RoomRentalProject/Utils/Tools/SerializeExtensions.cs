using System.Text.Json;

namespace Utils.Tools
{
    public static class SerializeExtensions
    {
        //Serialize model or list into Json
        public static string? JsonSerializeOrNull<T>(this object obj)
        {
            if (obj == null)
                return null;

            if (obj is List<T> list)
                return JsonSerializer.Serialize(list);

            if (obj is T model)
                return JsonSerializer.Serialize(model);

            return null;  // If the object is not of type List<T> or T, return null
        }

        //Deserialize model or list into Json
        public static object? JsonDeserializeOrNull<T>(this string jsonString)
        {
            if (string.IsNullOrEmpty(jsonString))
                return null;

            try
            {
                var deserializedList = JsonSerializer.Deserialize<List<T>>(jsonString);
                if (deserializedList != null)
                {
                    return deserializedList;
                }

                return JsonSerializer.Deserialize<T>(jsonString);
            }
            catch (JsonException)
            {
                return null;
            }
        }
    }
}