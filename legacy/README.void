# be-sharing

be-sharing is one decorator among a triumvirate of decorators that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Hemingway Notation

The following example demonstrates use of Hemingway Notation as much as possible, but also JSON as needs warrant.  In this case we use JSON to take advantage of interpolating capabilities of the [trans-render](https://github.com/bahrus/trans-render) library.


```html
<div be-scoped='{
    "count": 30,
    "status": "Logged in",
    "propWithAndAndToInName": "hello"
}'>
    <button></button>
    <div class=inner></div>
    <span></span>
</div>
<script be-sharing='
    {   
        "declare": {
            "innerClass": {
                ".inner": ["", "status", " (", "count", " times)"]
            }
        }     
    }
    Observe previous element sibling. //This is the default.
    Scrutinize beScoped:scope.  //Not set by default.  //Special intervention for properties that start with be[\s] or be[A-Z].
    Set sharing realm to previous element sibling. //This is the default.
    Share count to button element as text content.
    Share prop with \and \and \to in name to span element.
    Share count and status to inner class.
'>
</script>
```


## Avoiding unnecessary work for server-rendered content. [TODO]

If the server can be trained to generate the initial view, including setting properties via attributes, a little bit of extra unnecessary work will be incurred by be-sharing, as it will share values that were already transmitted via the server.  The solution is to add a little more configuration to instruct be-sharing to avoid this:


```html
```html
<div be-scoped='{
    "count": 30,
    "status": "Logged in",
    "propWithAndAndToInName": "hello"
}'>
    <button>30</button>
    <div class=inner>Logged in (30 times)</div>
    <span>hello</span>
</div>
<script be-sharing='
    ...
    Skip initial render. //"initial render" is commentary, and can be any verbiage that explains what skip is doing.
    ...
'>
</script>
```

```
