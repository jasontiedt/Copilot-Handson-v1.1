namespace Grocery.Api.Pricing;

// Intentionally under-documented and missing edge cases for use in labs.
public sealed class PricingEngine
{
    public decimal Subtotal(
        IReadOnlyList<CartLine> cart,
        IReadOnlyDictionary<string, Product> catalog,
        IReadOnlyList<WeeklyAd> ads)
    {
        decimal total = 0m;
        foreach (var line in cart)
        {
            if (!catalog.TryGetValue(line.Sku, out var p)) continue; // silently skipped — bug for Module 05
            var ad = ads.FirstOrDefault(a => a.Sku == line.Sku);
            total += Apply(p, line.QuantityOrWeight, ad);
        }
        return Math.Round(total, 2, MidpointRounding.AwayFromZero);
    }

    public decimal Apply(Product product, decimal qty, WeeklyAd? ad)
    {
        var basePrice = product.UnitPrice * qty;
        return ad switch
        {
            null => basePrice,
            WeeklyAd.PercentOff p => basePrice * (1m - p.Percent / 100m),
            WeeklyAd.DollarOff d  => basePrice - d.Amount * qty,
            WeeklyAd.Bogo         => product.UnitPrice * ((int)qty - (int)qty / 2),
            WeeklyAd.BuyNForX bx  =>
                bx.FlatPrice * ((int)qty / bx.N) + product.UnitPrice * ((int)qty % bx.N),
            _ => basePrice
        };
    }
}
