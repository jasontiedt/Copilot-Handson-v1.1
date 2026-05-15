package com.publix.grocery.pricing;

import java.math.BigDecimal;

public record CartLine(String sku, BigDecimal quantityOrWeight) {}
