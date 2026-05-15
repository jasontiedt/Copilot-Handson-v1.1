**Title:** Two ads on the same SKU — which one wins?

I'm trying to add both a BOGO and a 20%-off ad to milk for the holiday week. The subtotal in my test cart comes back the same as if only one ad was active. Is that right? Shouldn't both stack?

(I think someone asked about this last quarter but I can't find the issue.)

Related: the docs don't say anything about ad precedence.

## What I tried

```bash
curl -X POST http://localhost:8080/api/pricing/quote \
  -H 'content-type: application/json' \
  -d '{
    "cart": [{"sku":"MILK-1G","qty":2}],
    "ads": [
      {"kind":"Bogo","sku":"MILK-1G"},
      {"kind":"PercentOff","sku":"MILK-1G","percent":20}
    ]
  }'
```

Returns `{"subtotal": 3.49}`. Expected $2.79 if 20% off the post-BOGO price?
