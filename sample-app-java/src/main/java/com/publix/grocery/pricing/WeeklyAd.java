package com.publix.grocery.pricing;

import java.math.BigDecimal;

/** A sealed hierarchy of promo types that can be attached to a SKU. */
public sealed interface WeeklyAd
    permits WeeklyAd.PercentOff, WeeklyAd.DollarOff, WeeklyAd.Bogo, WeeklyAd.BuyNForX {

    String sku();

    record PercentOff(String sku, BigDecimal percent) implements WeeklyAd {}
    record DollarOff(String sku, BigDecimal amount) implements WeeklyAd {}
    /** Buy one get one free (free item is the cheapest). */
    record Bogo(String sku) implements WeeklyAd {}
    /** Buy N units for a flat price. */
    record BuyNForX(String sku, int n, BigDecimal flatPrice) implements WeeklyAd {}
}
