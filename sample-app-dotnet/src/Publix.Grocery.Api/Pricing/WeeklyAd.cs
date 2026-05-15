namespace Publix.Grocery.Api.Pricing;

public abstract record WeeklyAd(string Sku)
{
    public sealed record PercentOff(string Sku, decimal Percent) : WeeklyAd(Sku);
    public sealed record DollarOff(string Sku, decimal Amount) : WeeklyAd(Sku);
    /// <summary>Buy one, get one free (free item is the cheapest).</summary>
    public sealed record Bogo(string Sku) : WeeklyAd(Sku);
    /// <summary>Buy N units for a flat price.</summary>
    public sealed record BuyNForX(string Sku, int N, decimal FlatPrice) : WeeklyAd(Sku);
}
