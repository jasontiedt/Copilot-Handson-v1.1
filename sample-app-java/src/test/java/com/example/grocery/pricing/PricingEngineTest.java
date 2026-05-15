package com.example.grocery.pricing;

import static org.assertj.core.api.Assertions.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

class PricingEngineTest {

    private final PricingEngine engine = new PricingEngine();

    @Test
    void subtotal_withNoAds_sumsLineItems() {
        var milk = new Product("MILK-1G", "Whole Milk 1gal", new BigDecimal("3.49"), false, false);
        var cart = List.of(new CartLine("MILK-1G", new BigDecimal("2")));
        var total = engine.subtotal(cart, Map.of("MILK-1G", milk), List.of());
        assertThat(total).isEqualByComparingTo("6.98");
    }

    // M03: add tests for PercentOff, DollarOff, Bogo, BuyNForX, missing SKU,
    // weight-based items, and stacking-conflict cases. Find at least one bug.
}
