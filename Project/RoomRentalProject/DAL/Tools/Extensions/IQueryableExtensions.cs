using System.Linq.Expressions;
using System.Reflection;

public static class IQueryableExtensions
{
    public static IQueryable<T> OrderByProperty<T>(this IQueryable<T> source, string propertyName, bool descending)
    {
        if (string.IsNullOrWhiteSpace(propertyName))
        {
            return source; // No sorting if property name is empty
        }

        // Create a parameter to represent the entity (e.g., `e => e.Property`)
        var parameter = Expression.Parameter(typeof(T), "e");

        // Create an expression to represent the property access (e.g., `e.PropertyName`)
        var property = Expression.Property(parameter, propertyName);

        // Create the lambda expression (e.g., `e => e.PropertyName`)
        var lambda = Expression.Lambda(property, parameter);

        // Determine the method name (OrderBy or OrderByDescending)
        var methodName = descending ? "OrderByDescending" : "OrderBy";

        // Create the MethodCallExpression that represents the OrderBy/OrderByDescending method
        var methodCallExpression = Expression.Call(
            typeof(Queryable),
            methodName,
            new Type[] { typeof(T), property.Type },
            source.Expression,
            Expression.Quote(lambda)
        );

        // Apply the sorting to the IQueryable and return
        return source.Provider.CreateQuery<T>(methodCallExpression);
    }

    public static IQueryable<T> SearchByFields<T>(this IQueryable<T> source, string searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm))
        {
            return source;
        }

        // Get all string properties of the entity type
        var stringProperties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                        .Where(p => p.PropertyType == typeof(string));

        // Start building the predicate expression
        var parameter = Expression.Parameter(typeof(T), "e");
        Expression orExpression = null;

        foreach (var property in stringProperties)
        {
            // Create the expression to access the property (e.g., `e.Name`)
            var propertyAccess = Expression.Property(parameter, property.Name);

            // Create the expression to represent the search term (e.g., `searchTerm`)
            var searchExpression = Expression.Constant(searchTerm);

            // Create the expression to represent the Contains method (e.g., `e.Name.Contains(searchTerm)`)
            var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var containsExpression = Expression.Call(propertyAccess, containsMethod, searchExpression);

            // Combine the expressions with an OR operator
            orExpression = orExpression == null ? containsExpression : Expression.OrElse(orExpression, containsExpression);
        }

        // Apply the predicate to the query
        if (orExpression != null)
        {
            var lambda = Expression.Lambda<Func<T, bool>>(orExpression, parameter);
            return source.Where(lambda);
        }

        return source;
    }
}
