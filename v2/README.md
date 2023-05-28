# be-sharing

Share values from (enhancements of) the adorned element to other neighboring DOM (custom) elements.

be-sharing is one DOM custom enhancement among a triumvirate of enhancements that rollup to [be-hydrated](https://github.com/bahrus/be-hydrated).

## Example 1 

*be-sharing* works nicely together with https://github.com/bahrus/be-scoped

```html
<div itemscope be-scoped='{
    "count": 30
}'>
    <span itemprop="count"></span>
    <template be-sharing='
        Share count.
    '></template>
</div>
```

*be-sharing* can adorn either the template or script HTML elements, whichever is more convenient.  The reason for specifying these two tags, is that as the circumstances grow in complexity, we can complement what the attribute specifies by stuff inside the template element, or the script element.  We will see examples of that below.

So what be-sharing is doing can best be explained by words:

1.  Find the nearest element with an itemscope attribute.
2.  Observe the be-scoped object that adorns the element with the itemscope attribute.
3.  Pass the value of count to all elements within the itemscope which has itemprop = count.

These are default, out-of-the box settings that *be-sharing* provides.  It is basically breating life into the [microdata standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata).