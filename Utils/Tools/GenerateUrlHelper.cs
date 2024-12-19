using System.Net;
using System.Web;

namespace Utils.Tools
{
    public static class GenerateUrlHelper
    {
        public static string GenerateUrl(string baseUrl, string urlPath, string? token = null, Dictionary<string, string>? queryParams = null)
        {
            if (!string.IsNullOrEmpty(token))
            {
                // URL-encode the token to make it safe for use in URLs
                var encodedToken = WebUtility.UrlEncode(token);

                // Replace the {token} placeholder in the path with the encoded token
                urlPath = urlPath.Replace("{token}", encodedToken);
            }

            // Combine the base URL and the path
            var uriBuilder = new UriBuilder(baseUrl)
            {
                Path = urlPath
            };

            // If there are query parameters, add them to the URL
            if (queryParams != null && queryParams.Count > 0)
            {
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);

                foreach (var param in queryParams)
                {
                    // URL-encode the key and value to make them safe for use in URLs
                    query[WebUtility.UrlEncode(param.Key)] = WebUtility.UrlEncode(param.Value);
                }

                uriBuilder.Query = query.ToString();
            }

            return uriBuilder.ToString();
        }
    }

}
