package com.example.grocery.api;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.grocery.pricing.Product;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final Map<String, Product> catalog = new ConcurrentHashMap<>(Map.of(
        "MILK-1G", new Product("MILK-1G", "Whole Milk 1gal", new BigDecimal("3.49"), false, false),
        "BANANA",  new Product("BANANA",  "Bananas (per lb)", new BigDecimal("0.59"), false, true),
        "BREAD-WW",new Product("BREAD-WW","Whole Wheat Bread", new BigDecimal("2.99"), false, false)
    ));

    @GetMapping
    public List<Product> all() {
        return List.copyOf(catalog.values());
    }

    // Intentional: naive substring "search" that also exposes a log-injection risk for Module 06.
    @GetMapping("/search")
    public List<Product> search(@RequestParam String q) {
        System.out.println("Search query: " + q); // log injection if q has newlines
        return catalog.values().stream()
            .filter(p -> p.name().toLowerCase().contains(q.toLowerCase()))
            .toList();
    }
}
