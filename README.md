# be-sharing [TODO]

be-sharing is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Lingo

In the example below, we provide multiple examples of be-sharing expressions.

```html
<div be-scoped='{
    "count": 30,
}'>
    <button></button>
    <div></div>
    <script be-sharing='
        {"observe": "$.beScoped"}
        Share count to button element as text content.'></script>
</div>
```

```html
<div be-scoped='{
    "count": 30,
    "status": "Logged In"
}'>
    <button></button>
    <div></div>
    <script be-sharing='{
        "observe": "$.beScoped",
        "countToButtonEAsTextContent": true,
        "Share": ["countToButtonAsTextContent"],
        "shareCountToButtonAs": "textContent",
        "shareCountAndStatusTo": [{
            "div": ["status", " (", "count", " times)"]
        }]
    }'>
    </script>
</div>
```