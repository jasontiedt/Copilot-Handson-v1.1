package com.example.grocery.pricing;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

// Intentionally under-documented and missing edge cases for use in labs.
@Service
public class PricingEngine {

    public BigDecimal subtotal(List<CartLine> cart, Map<String, Product> catalog, List<WeeklyAd> ads) {
        BigDecimal total = BigDecimal.ZERO;
        for (CartLine line : cart) {
            Product p = catalog.get(line.sku());
            if (p == null) continue; // silently skipped — bug for Module 05
            WeeklyAd ad = ads.stream().filter(a -> a.sku().equals(line.sku())).findFirst().orElse(null);
            total = total.add(apply(p, line.quantityOrWeight(), ad));
        }
        return total.setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal apply(Product product, BigDecimal qty, WeeklyAd ad) {
        BigDecimal base = product.unitPrice().multiply(qty);
        if (ad == null) return base;
        return switch (ad) {
            case WeeklyAd.PercentOff p ->
                base.multiply(BigDecimal.ONE.subtract(p.percent().movePointLeft(2)));
            case WeeklyAd.DollarOff d ->
                base.subtract(d.amount().multiply(qty));
            case WeeklyAd.Bogo b -> {
                int paid = qty.intValue() - (qty.intValue() / 2);
                yield product.unitPrice().multiply(BigDecimal.valueOf(paid));
            }
            case WeeklyAd.BuyNForX bx -> {
                int bundles = qty.intValue() / bx.n();
                int leftover = qty.intValue() % bx.n();
                yield bx.flatPrice().multiply(BigDecimal.valueOf(bundles))
                        .add(product.unitPrice().multiply(BigDecimal.valueOf(leftover)));
            }
        };
    }
}
