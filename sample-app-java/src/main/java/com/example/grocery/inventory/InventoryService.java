package com.example.grocery.inventory;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

// NOTE: Intentionally NOT thread-safe. Module 05 asks learners to reproduce and fix this.
@Service
public class InventoryService {
    private final Map<String, Integer> onHand = new HashMap<>();

    public int onHand(String sku) {
        return onHand.getOrDefault(sku, 0);
    }

    public void receive(String sku, int qty) {
        onHand.merge(sku, qty, Integer::sum);
    }

    public boolean adjust(String sku, int delta) {
        int current = onHand.getOrDefault(sku, 0);
        if (current + delta < 0) return false;
        onHand.put(sku, current + delta);
        return true;
    }
}
