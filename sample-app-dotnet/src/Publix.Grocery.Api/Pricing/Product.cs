namespace Publix.Grocery.Api.Pricing;

public sealed record Product(
    string Sku,
    string Name,
    decimal UnitPrice,
    bool Taxable,
    bool SoldByWeight);
