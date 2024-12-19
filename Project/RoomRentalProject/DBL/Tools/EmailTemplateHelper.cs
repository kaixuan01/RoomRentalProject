using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBL.Tools
{
    public static class EmailTemplateHelper
    {
        public static string ReplacePlaceholders(string templateContent, Dictionary<string, string> placeholders)
        {
            if (string.IsNullOrEmpty(templateContent))
            {
                throw new ArgumentNullException(nameof(templateContent), "Template content cannot be null or empty.");
            }

            if (placeholders == null || placeholders.Count == 0)
            {
                return templateContent;
            }

            foreach (var placeholder in placeholders)
            {
                templateContent = templateContent.Replace($"{{{{{placeholder.Key}}}}}", placeholder.Value);
            }

            return templateContent;
        }
    }
}
