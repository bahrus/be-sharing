# be-sharing [WIP]

>**Note**: This enhancement works best with browsers that support the @scope css selector.

Share values from (enhancements of) the adorned element to other neighboring DOM (custom) elements, specializing in, but not limited to, microdata enhanced elements.

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

What this does:  Searches for all itemprop attributes, forms the list of names from all matches (outside child itemscopes).

This also works with $0, host, $parent (discussed below).

[TODO]  Search for itemprops within the scope, rather than what it is doing, to get the list.
[TODO]  Make Share * from $parent be the default.

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

## A DOM element that receives an object

When we pass things via the itemprop attribute, one significant scenario to consider is what happens if an object is passed.

There are a number of scenarios to consider.

In the example below, let's assume the itemprop attribute we are passing to is called myObjProp.  Suppose the object has a subObj field/property that we want to share.

|                     Scenario                              |                What Happens                            |                  How to access                   |
|-----------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------|
| 1. Target DOM element is meta tag.  Else:                 |  Object passed to value of be-it enhancement.          | Value of be-it will specify prop to forward to.  |
| 2. Target DOM element doesn't have an itemscope attribute |  Object is JSON.stringified to textContent.            | No access                                        |
| 3. Object is a non array instance of a class              |  Propagating object passed into scope.                 | Share myObjProp:subObj from props [as propName]  |
| 4. Object is a non array, non instance of a class         |  Object is assigned into scope                         | Share myObjProp:subObj from scope [as propName]  |
| 5. Object is an array                                     |  be-repeated is invoked                                | Use itemprop=itemListElement                     |

>**Note:** With scenario 3, updates will only happen when the full object (myObjProp) is replaced.
>**Note:** With scenario 2, updates happen as property getter/setters are updated inside the object.


## Sharing sub obj

If be-sharing shares an object, and the target has an itemscope attribute, 

1. Automatically creates a be-scoped, and assigns the properties to it.



## Flattening/mapping properties from a custom element to scope

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

## Loops

Preliminary support for loops is now provided.  Example markup:

```html
<paul-mccartney>
    <template>
        <div itemscope be-linked='
            Share * from host.
        '>
            <span itemprop="age"></span>
            <div itemscope itemprop="songs">
                <div aria-rowindex=0 itemscope itemprop="itemListElement" be-linked='
                    Share * from props.
                '>
                    <span itemprop="name"></span>
                </div>
            </div>
                

        </div>
        <be-hive></be-hive>
    </template>
</paul-mccartney>
```

The markup above is based on [this vocabulary](https://schema.org/ItemList).  For now, there is no check that the itemprop="itemListElement" matches the itemtype specified in the link.  But to be safe for possible future backwards incompatible changes, please include the itemtype:


```html
<paul-mccartney>
    <template>
        <div itemscope be-linked='
            Share * from host.
        '>
            <span itemprop="age"></span>
            <div itemscope itemprop="songs" itemtype="https://schema.org/ItemList">
                <div aria-rowindex=0 itemscope itemprop="itemListElement" be-linked='
                    Share * from props.
                '>
                    <span itemprop="name"></span>
                </div>
            </div>
                

        </div>
        <be-hive></be-hive>
    </template>
</paul-mccartney>
```

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

<!--

How to use with trans-render:

query every itemscope

lhs is still match (on top of itemscope).  So could be *.

Simply provide list of properties to bind:

Share count.


-->

test
