using Publix.Grocery.Api.Pricing;

namespace Publix.Grocery.Api;

public sealed class ProductCatalog
{
    private readonly Dictionary<string, Product> _catalog = new()
    {
        ["MILK-1G"]   = new("MILK-1G",   "Whole Milk 1gal",   3.49m, false, false),
        ["BANANA"]    = new("BANANA",    "Bananas (per lb)",  0.59m, false, true),
        ["BREAD-WW"]  = new("BREAD-WW",  "Whole Wheat Bread", 2.99m, false, false),
    };

    public IReadOnlyList<Product> All() => _catalog.Values.ToList();

    public IReadOnlyDictionary<string, Product> AsMap() => _catalog;

    public IReadOnlyList<Product> Search(string q) =>
        _catalog.Values.Where(p => p.Name.Contains(q, StringComparison.OrdinalIgnoreCase)).ToList();
}
