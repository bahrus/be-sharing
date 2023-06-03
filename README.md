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
    <summary>Tiny typing reduction

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



Example 2:  Share to properties of non-microdata supporting elements [TODO]

Example 2a:  By name, id

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "greeting": "hello"
    }'
    be-sharing='
        Share count, greeting from scope by itemprop, name, id.
    '
>
    <data itemprop="count"></data>
    <span itemprop="greeting"></span>
    <input name="count" type=number>
    <div id=greeting></div>
</div>
```


Example 2b:  With inline binding

```html
<div itemscope 
    be-scoped='{
        "count": 30,
        "description": "Mr. Banks flying a kite with his kids.",
        "isHappy": true
    }'
    be-sharing='
        Share is happy, greeting from scope.
    '
>
    <link itemprop=isHappy be-it=disabled>
    <meta itemprop=count part=maxLength>
    <input>
    <meta itemprop=description part=alt>
    <img>
</div>
```

Example 2c:  Without inline binding

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

>**Note:** Because the HTML may stream in slowly, we aren't guaranteed that *be-sharing* will be able to distribute everything on the first go.  To guarantee nothing is missed, add a *be-a-beacon* adorned element as the last child of the itemscope tag. (Hopefully the platform will resolve this issue soon.)  Alternative, adorn a script element at the bottom of the page, and put all the sharing statements there, as shown 

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

## What be-sharing is doing

What be-sharing (with statement "Share count from scope.") is doing can best be explained by words:

1.  ~~Find the nearest element ancestor with an itemscope attribute (starting from the adorned element).~~ Only do this if adorning the script element.
2.  Observe the be-scoped object that adorns the element with the itemscope attribute.
3.  When the count property of the be-scoped object changes, pass the value of count to all elements within the itemscope which has attribute itemprop = count.


So *be-sharing* is basically breathing life into the [microdata standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata).

The sentence structure contained inside the be-sharing attribute is adopting what we dub ["Hemingway Notation"](https://bookanalysis.com/ernest-hemingway/writing-style/).

## Sharing values from a custom element [WIP]

*be-sharing* can also work well together with custom elements that use standard property getters/setters:

Specify:

```html
<my-custom-element-no-shadow itemscope be-sharing='
    Share count from $0.
'>
    <span itemprop="count"></span>
</my-custom-element-no-shadow>
```

## Flattening/mapping properties from a custom element to scope [TODO]

```html
<my-custom-element-no-shadow itemscope be-sharing='
    Echo $0:numberOfWidgets to scope:count.
    Echo $0:greetingsAndSalutations:monday:morningMessage to scope:greeting.
    Share count, greeting from scope.
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
        Pipe count to do something.
    '>
        export function doSomething({count, scope, scopedElement}){

        }
    <script>
</div>
```

