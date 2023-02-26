# be-sharing [TODO]

be-sharing is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Lingo

In the example below, we provide multiple examples of be-sharing expressions.

```html
<div be-scoped='{
    "count": 30,
    "status": "Logged in",
    "propWithAndAndToInName": "hello"
}'>
    <button></button>
    <div></div>
    <span></span>
    <script be-sharing='
        {"shareCountAndStatusTo":  [{"div": ["status", " (", "count", " times)"]}]}
        Set observing realm to parent. //this is the default.
        Set home in on path to be scoped:scope.  //not set by default.
        Set sharing realm to parent. //this is the default.
        Share count to button element as text content.'>
    </script>
</div>
```

## JSON lingo

```html
<div be-scoped='{
    "count": 30,
    "status": "Logged In"
}'>
    <button></button>
    <div></div>
    <script be-sharing='{
        "observingRealm": "parent",
        "homeInOnPath": "beDecorated.beScoped.scope",
        "sharingRealm": "parent",
        "shareCountAndStatusTo":  [{"div": ["status", " (", "count", " times)"]}],
        "Share": ["countToButtonEAsTextContent"],
        "share": [{
            "props": ["propWithAndAndToInName"],
            "transform": {
                "span": "propWithAndAndToInName"
            }
        }]
    }'>
    </script>
</div>
```

