using Publix.Grocery.Api.Inventory;
using Publix.Grocery.Api.Pricing;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PricingEngine>();
builder.Services.AddSingleton<InventoryService>();
builder.Services.AddSingleton<ProductCatalog>();

var app = builder.Build();

app.MapGet("/api/products", (ProductCatalog catalog) => catalog.All());

// Intentional: logs raw user input (log injection) — Module 06.
app.MapGet("/api/products/search", (string q, ProductCatalog catalog, ILogger<Program> log) =>
{
    log.LogInformation("Search query: " + q);
    return catalog.Search(q);
});

app.MapPost("/api/pricing/quote", (QuoteRequest req, PricingEngine engine, ProductCatalog catalog) =>
    Results.Ok(new { subtotal = engine.Subtotal(req.Cart, catalog.AsMap(), req.Ads) }));

app.Run();

public sealed record QuoteRequest(IReadOnlyList<CartLine> Cart, IReadOnlyList<WeeklyAd> Ads);

public partial class Program { }
