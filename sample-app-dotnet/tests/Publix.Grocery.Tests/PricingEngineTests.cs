using FluentAssertions;
using Publix.Grocery.Api.Pricing;
using Xunit;

namespace Publix.Grocery.Tests;

public class PricingEngineTests
{
    private readonly PricingEngine _engine = new();

    [Fact]
    public void Subtotal_WithNoAds_SumsLineItems()
    {
        var milk = new Product("MILK-1G", "Whole Milk 1gal", 3.49m, false, false);
        var cart = new[] { new CartLine("MILK-1G", 2m) };
        var catalog = new Dictionary<string, Product> { ["MILK-1G"] = milk };

        var total = _engine.Subtotal(cart, catalog, Array.Empty<WeeklyAd>());

        total.Should().Be(6.98m);
    }

    // M03: add tests for PercentOff, DollarOff, Bogo, BuyNForX, missing SKU,
    // weight-based items, and stacking-conflict cases. Find at least one bug.
}
