namespace Grocery.Api.Inventory;

// NOTE: Intentionally NOT thread-safe. Module 05 asks learners to reproduce and fix this.
public sealed class InventoryService
{
    private readonly Dictionary<string, int> _onHand = new();

    public int OnHand(string sku) => _onHand.TryGetValue(sku, out var v) ? v : 0;

    public void Receive(string sku, int qty) =>
        _onHand[sku] = OnHand(sku) + qty;

    public bool Adjust(string sku, int delta)
    {
        var current = OnHand(sku);
        if (current + delta < 0) return false;
        _onHand[sku] = current + delta;
        return true;
    }
}
