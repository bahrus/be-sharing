# be-sharing [WIP]

>**Note**: This enhancement works best with browsers that support the @scope css selector.

Share values from (enhancements of) the adorned element to other neighboring DOM (custom) elements, specializing, but not limited to, microdata enhanced elements.

be-sharing is one DOM custom enhancement among a triumvirate of enhancements that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Example 1

*be-sharing* works nicely together with https://github.com/bahrus/be-scoped

```html
<div itemscope 
    be-scoped='{
        "count": 30
    }'
    be-sharing='
        Share count from scope.
    '
>
    <data itemprop="count"></data>
</div>
```

If there are multiple scope properties to share, list them with the comma delimiter.  For example:

## Example 2

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "greeting": "hello"
    }'
    be-sharing='
        Share count, greeting from scope.
    '
>
    <data itemprop="count"></data>
    <span itemprop="greeting"></span>
</div>
```

<details>
    <summary>Tiny typing reduction</summary>
    
It's a bit redundant to type "beSharing / Share".

Instead, this also works:

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "greeting": "hello"
    }'
    be-sharing='
        ^ count, greeting from scope.
    '
>
    <data itemprop="count"></data>
    <span itemprop="greeting"></span>
</div>
```

</details>

We can share all properties from scope:

## Example 3

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "greeting": "hello"
    }'
    be-sharing='
        Share * from scope.
    '
>
    <data itemprop="count"></data>
    <span itemprop="greeting"></span>
</div>
```

Example 4:  Sharing values to non microdata recognized properties with inline binding

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "description": "Mr. Banks flying a kite with his kids.",
        "isHappy": true
    }'
    be-sharing='
        Share * from scope.
    '
>
    <link itemprop=isHappy be-it=disabled>
    <meta itemprop=count be-it=maxLength>
    <input>
    <meta itemprop=description be-it=alt>
    <img>
</div>
```


Example 5:  Share by name, id

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "greeting": "hello"
    }'
    be-sharing='
        ^ count, greeting from scope by itemprop.
        ^ count from scope by name.
        ^ greeting from scope by id.
    '
>
    <data itemprop="count"></data>
    <span itemprop="greeting"></span>
    <input name="count" type=number>
    <div id=greeting></div>
</div>
```

However, unlike using itemscope, this is "one way binding".  be-derived provides no hydrating support for deriving data by id or name.


<!--

Example 6:  Without inline binding [TODO]

```html
<div itemscope 
    be-scoped='{
        "description": "Mr. Banks flying a kite with his kids.",
        "summary": "Mr. Banks with kids.",
    }'
    be-sharing='
        Share description, summary from scope to alt, title properties of img element.
    '
>
    <img>
</div>
```
-->

Example 7:  Support for streaming HTML [Untested]

>**Note:** Because the HTML may stream in slowly, we aren't guaranteed that *be-sharing* will be able to distribute everything on the first go.  To guarantee nothing is missed, add a *be-a-beacon* adorned element as the last child of the itemscope tag. (Hopefully the platform will resolve this issue soon.)  Alternative, adorn a script element at the bottom of the page, and put all the sharing statements there, as shown below

## Formatting

*be-sharing* provides special out-of-the box, microdata-compatible formatting for the *data*, *time* and *output* elements.

For example:

```html
<data itemprop=count></data>
```

... sets the *value* attribute of the data element equal to the raw numeric value (num.toString()).  The text content is set to num.toLocaleString().

However, that is only the default setting.  Behind the scenes, *be-sharing* is making use of the [be-intl](https://github.com/bahrus/be-intl) custom enhancement, which formats *data*, *output* and *time* elements.  If no custom formatting is provided, it just uses default locale settings.  But as that link indicates, to customize how the formatting should take place, specify those settings thusly:

```html
<data itemprop=count lang=de-DE be-intl='{ "style": "currency", "currency": "EUR" }'></data>
```



## Sharing values from a custom element

*be-sharing* can also work well together with custom elements that use standard property getters/setters.

Specify:

```html
<my-custom-element-no-shadow itemscope be-sharing='
    Share count from $0.
'>
    <span itemprop="count"></span>
</my-custom-element-no-shadow>
```

If the custom element we want to observe is the host element that uses shadowDOM, replace "$0" with "host".

## Flattening/mapping properties from a custom element to scope [TODO]

```html
<my-custom-element-no-shadow itemscope be-sharing='
    Share $0:numberOfWidgets as count.
    Share $0:greetingsAndSalutations:monday:morningMessage as greeting.
'>
    <data itemprop=count></data>
    <span itemprop=greeting></span>
</my-custom-element-no-shadow>
```

This use of be-sharing only distributes property values to the **light children** of the custom element (outside any elements with itemscope attribute).  Using "donut" css selection via @scope when available.  

### Use Case 1:  Cerebral web components

What this opens up is an interesting breed of custom elements:  Custom elements that don't use shadow DOM, and only defines properties / business logic tied to those properties.  It leaves the actual content contained within the custom element up to the developer / consumers of the custom element.  

### Use Case 2:  Shared state web components

Another scenario:  The custom element does have Shadow DOM, which the internal custom element takes care of binding to, but expects (or allows for) some interplay between some of the properties it supports and the light children, again leaving that up to the developer/consumer.  Essentially, the "encapsulation" model is softened somewhat to allow the light children to engage in the state of the custom element.

<!-- move this to be-piped 
## Acting on shared scope changes [TODO]

```html
<div itemscope 
    be-scoped='{
        "count": 30
    }'
    be-sharing='
        Share count from scope.
    '
>
    <span itemprop="count"></span>
    <script be-sharing='
        Pipe count from scope to do something.
    '>
        export function doSomething({count, scope, scopedElement}){

        }
    </script>
</div>
```
-->
