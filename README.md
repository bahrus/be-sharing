# be-sharing [TODO]

be-sharing is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Lingo

In the example below, we provide multiple examples of saying the same thing.

```html
<div be-scoped='{
    "count": 30,
    "status": "Logged In"
}'>
    <button></button>
    <div></div>
    <script nomodule be-sharing='{
        "observe": "$.beScoped",
        "shareCountToButtonAs": "textContent",
        "shareCountAndStatusTo": [{
            "div": ["status", " (", "count", " times)"]
        }]
    }'>
    </script>
</div>
```