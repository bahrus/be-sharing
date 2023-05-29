# be-sharing [WIP]

Share values from (enhancements of) the adorned element to other neighboring DOM (custom) elements.

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
    <span itemprop="count"></span>
</div>
```

## Formatting (WIP)

*be-sharing* provides out-of-the box formatting for the data and time elements.

```html
<data itemprop=count>
```

... sets the value attribute of the data element equal to the raw numeric value (num.toString()).  The text content is set to num.toLocaleDateString().

It can take the lang attribute into account [ TODO], and uses a custom attribute

So what be-sharing is doing can best be explained by words:

1.  Find the nearest element with an itemscope attribute (starting from the adorned element).
2.  Observe the be-scoped object that adorns the element with the itemscope attribute.
3.  Pass the value of count to all elements within the itemscope which has itemprop = count.


These are default, out-of-the box settings that *be-sharing* provides.  It is basically breathing life into the [microdata standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata).

The sentence contained inside the be-sharing is adopting what we dub ["Hemingway Notation"](https://bookanalysis.com/ernest-hemingway/writing-style/).

## If sharing values from a custom element [Untested]

*be-sharing* can also work well together with https://github.com/bahrus/be-propagating

Specify:

```html
<my-custom-element-no-shadow itemscope>
    <span itemprop="count"></span>
    <template be-sharing='
        Share count from element props.
    '></template>
</my-custom-element-no-shadow>
```




