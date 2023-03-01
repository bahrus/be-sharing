# be-sharing [WIP]

be-sharing is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Notation

The following example demonstrates use of Hemingway Notation as much as possible, but also JSON as needs warrant.

```html
<div be-scoped='{
    "count": 30,
    "status": "Logged in",
    "propWithAndAndToInName": "hello"
}'>
    <button></button>
    <div class=inner></div>
    <span></span>
    <script be-sharing='
        {        
            "shareExpressions":{
                "shareCountAndStatusTo":  {
                    "innerC": ["", "status", " (", "count", " times)"]
                }
            }
        }
        Set observing realm to parent. //this is the default.
        Set home in on path to be scoped:scope.  //not set by default.  //Special intervention for properties that start with be[space].
        Set sharing realm to parent. //this is the default.
        Share count to button element as text content.
        Share prop with \and \and \to in name to span element.
    '>
    </script>
</div>
```

## JavaScriptObjectNotation

```html
<div be-scoped='{
    "count": 30,
    "status": "Logged In"
}'>
    <button></button>
    <div class=inner></div>
    <span></span>
    <script be-sharing='{
        "observingRealm": "parent",
        "homeInOnPath": "beDecorated.beScoped.scope",
        "sharingRealm": "parent",
        "shareExpressions":{
            "shareCountAndStatusTo":  {
                "innerC": ["", "status", " (", "count", " times)"]
            }
        },
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

