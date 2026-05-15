package com.example.grocery.pricing;

import java.math.BigDecimal;

public record Product(
    String sku,
    String name,
    BigDecimal unitPrice,
    boolean taxable,
    boolean soldByWeight
) {}
